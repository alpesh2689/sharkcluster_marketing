import { useCallback, useEffect, useRef, useState } from "react";
import { Bot, Check, Copy, RotateCcw, Send, ShieldCheck, User, X } from "lucide-react";
import { sanitizeHtml, htmlToText } from "@/lib/sanitizeHtml";

/**
 * Docs assistant.
 *
 * Answers from the SharkCluster documentation via the RAG service. It is
 * deliberately anonymous: the marketing site has no logged-in user, so no
 * identity is sent and the assistant cannot see servers, invoices or tickets.
 * Say so in the greeting rather than letting a visitor assume otherwise.
 *
 * Hidden entirely when VITE_CHATBOT_API is unset, so a preview build without
 * secrets does not show a button that cannot answer.
 */

const CHATBOT_API = (import.meta.env.VITE_CHATBOT_API ?? "").replace(/\/$/, "");

interface Suggestion {
  label: string;
  query: string;
}

interface Message {
  id: number;
  sender: "bot" | "user";
  text: string;
  time: string;
  isHtml?: boolean;
  sources?: string[];
  suggestions?: Suggestion[];
}

const SUGGESTIONS: Suggestion[] = [
  { label: "Backup types", query: "What backup types does SharkCluster offer?" },
  { label: "Deploying an app", query: "How do I deploy an application from Git?" },
  { label: "Cloud providers", query: "Which cloud providers can I use?" },
  { label: "Talk to a human", query: "How do I contact support?" },
];

const now = () =>
  new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

const greeting = (): Message => ({
  id: 1,
  sender: "bot",
  text:
    "Hi — I answer questions from the SharkCluster documentation. I can't see your account, servers, or invoices, so for anything account-specific you'll want support.",
  time: now(),
  suggestions: SUGGESTIONS,
});

/** The service returns sources in a few shapes depending on the document. */
function normaliseSources(raw: unknown): string[] {
  if (!Array.isArray(raw)) return [];
  return raw
    .map((entry) => {
      if (typeof entry === "string") return entry;
      if (entry && typeof entry === "object") {
        const rec = entry as Record<string, unknown>;
        const label = rec.title ?? rec.source ?? rec.filename ?? rec.file;
        if (typeof label === "string") return label;
      }
      return "";
    })
    .filter((s): s is string => s.length > 0)
    .slice(0, 4);
}

function looksLikeHtml(text: string): boolean {
  return /<(p|ul|ol|li|h[1-6]|pre|code|strong|em|br)\b/i.test(text);
}

function SharkMark({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" className={className} fill="none" aria-hidden="true">
      <path
        d="M9 10.5c0-1.1.9-2 2-2h6.5c2.5 0 4.5 1.8 4.5 4.2 0 1.7-1 2.8-2.3 3.4 1.6.5 2.8 1.7 2.8 3.6 0 2.5-2 4.3-4.8 4.3H11c-1.1 0-2-.9-2-2V10.5z"
        fill="currentColor"
      />
    </svg>
  );
}

export default function ChatbotWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>(() => [greeting()]);
  const [input, setInput] = useState("");
  const [thinking, setThinking] = useState(false);
  const [copiedId, setCopiedId] = useState<number | null>(null);
  const [conversationId, setConversationId] = useState<string | null>(null);

  const endRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const abortRef = useRef<AbortController | null>(null);

  useEffect(() => {
    if (open) endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, thinking, open]);

  useEffect(() => {
    if (open) inputRef.current?.focus();
  }, [open]);

  // Esc closes, matching the mobile nav and every other overlay on the site.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  // Any page can open the assistant: window.dispatchEvent(new Event("open-shark-ai"))
  useEffect(() => {
    const onOpen = () => setOpen(true);
    window.addEventListener("open-shark-ai", onOpen);
    return () => window.removeEventListener("open-shark-ai", onOpen);
  }, []);

  useEffect(() => () => abortRef.current?.abort(), []);

  const send = useCallback(
    async (text?: string) => {
      const question = (text ?? input).trim();
      if (!question || thinking) return;

      setMessages((prev) => [
        ...prev,
        { id: Date.now(), sender: "user", text: question, time: now() },
      ]);
      if (!text) setInput("");
      setThinking(true);

      abortRef.current?.abort();
      const controller = new AbortController();
      abortRef.current = controller;

      try {
        const res = await fetch(`${CHATBOT_API}/ask`, {
          method: "POST",
          headers: { accept: "application/json", "Content-Type": "application/json" },
          signal: controller.signal,
          body: JSON.stringify({
            question,
            conversation_id: conversationId,
            source_filter: null,
            // Anonymous by design — see the note at the top of this file.
            email: null,
          }),
        });
        if (!res.ok) throw new Error(`Assistant responded ${res.status}`);

        const data = (await res.json()) as {
          answer?: string;
          conversation_id?: string;
          sources?: unknown;
        };
        if (data.conversation_id) setConversationId(data.conversation_id);

        const answer = data.answer?.trim() || "I don't have an answer for that in the documentation.";
        setMessages((prev) => [
          ...prev,
          {
            id: Date.now() + 1,
            sender: "bot",
            text: answer,
            isHtml: looksLikeHtml(answer),
            sources: normaliseSources(data.sources),
            time: now(),
          },
        ]);
      } catch (err) {
        if ((err as Error).name === "AbortError") return;
        setMessages((prev) => [
          ...prev,
          {
            id: Date.now() + 1,
            sender: "bot",
            text: "I couldn't reach the documentation service just now. Try again in a moment, or head to /support.",
            time: now(),
          },
        ]);
      } finally {
        setThinking(false);
      }
    },
    [input, thinking, conversationId],
  );

  const copy = (message: Message) => {
    const text = message.isHtml ? htmlToText(message.text) : message.text;
    void navigator.clipboard.writeText(text);
    setCopiedId(message.id);
    window.setTimeout(() => setCopiedId(null), 2000);
  };

  const reset = () => {
    abortRef.current?.abort();
    setMessages([greeting()]);
    setConversationId(null);
    setThinking(false);
  };

  if (!CHATBOT_API) return null;

  return (
    <div className="pointer-events-none fixed bottom-5 right-5 z-50 sm:bottom-6 sm:right-6">
      {!open ? (
        <button
          onClick={() => setOpen(true)}
          aria-label="Open the documentation assistant"
          className="animate-scale-in pointer-events-auto group flex items-center gap-2.5 rounded-full bg-brand-500 py-3 pl-3 pr-4 text-white shadow-lg shadow-brand-500/30 transition-all hover:bg-brand-600 hover:shadow-xl hover:shadow-brand-600/30 active:scale-[0.97]"
        >
          <span className="relative flex h-7 w-7 items-center justify-center rounded-full bg-white/15">
            <SharkMark className="h-4 w-4" />
            <span className="absolute -right-0.5 -top-0.5 flex h-2.5 w-2.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-500" />
            </span>
          </span>
          <span className="text-sm font-semibold">Ask the docs</span>
        </button>
      ) : (
        <div
          role="dialog"
          aria-label="Documentation assistant"
          className="animate-scale-in pointer-events-auto flex h-[min(540px,80vh)] w-[min(92vw,384px)] flex-col overflow-hidden rounded-2xl border border-ink-200 bg-white shadow-2xl shadow-ink-900/15"
        >
          {/* Header */}
          <div className="flex shrink-0 items-center justify-between gap-3 bg-ink-900 px-4 py-3">
            <div className="flex items-center gap-2.5">
              <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand-500 text-white">
                <SharkMark className="h-4 w-4" />
              </span>
              <div>
                <p className="font-display text-sm font-bold leading-tight text-white">Docs assistant</p>
                <p className="text-[11px] leading-tight text-ink-400">Answers from the documentation</p>
              </div>
            </div>
            <div className="flex items-center gap-0.5">
              <button
                onClick={reset}
                aria-label="Start a new conversation"
                className="rounded-lg p-1.5 text-ink-400 transition-colors hover:bg-white/10 hover:text-white"
              >
                <RotateCcw className="h-4 w-4" />
              </button>
              <button
                onClick={() => setOpen(false)}
                aria-label="Close the assistant"
                className="rounded-lg p-1.5 text-ink-400 transition-colors hover:bg-white/10 hover:text-white"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          </div>

          {/* Transcript */}
          <div className="flex-1 space-y-4 overflow-y-auto bg-ink-50/40 p-4" aria-live="polite">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex flex-col ${msg.sender === "user" ? "items-end" : "items-start"}`}
              >
                <div
                  className={`flex max-w-[88%] items-end gap-2 ${
                    msg.sender === "user" ? "flex-row-reverse" : "flex-row"
                  }`}
                >
                  <span
                    className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-lg ${
                      msg.sender === "user" ? "bg-ink-900 text-white" : "bg-brand-500 text-white"
                    }`}
                  >
                    {msg.sender === "user" ? <User className="h-3.5 w-3.5" /> : <Bot className="h-3.5 w-3.5" />}
                  </span>
                  <div
                    className={`rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed ${
                      msg.sender === "user"
                        ? "rounded-br-sm bg-brand-500 text-white"
                        : "rounded-bl-sm border border-ink-200 bg-white text-ink-800"
                    }`}
                  >
                    {msg.isHtml ? (
                      <div
                        className="[&_a]:text-brand-600 [&_a]:underline [&_code]:rounded [&_code]:bg-ink-100 [&_code]:px-1 [&_code]:py-0.5 [&_code]:font-mono [&_code]:text-[12px] [&_li]:mb-1 [&_ol]:list-decimal [&_ol]:pl-4 [&_p:last-child]:mb-0 [&_p]:mb-2 [&_pre]:overflow-x-auto [&_pre]:rounded-lg [&_pre]:bg-ink-900 [&_pre]:p-2.5 [&_pre]:text-[12px] [&_pre]:text-ink-100 [&_strong]:font-semibold [&_ul]:list-disc [&_ul]:pl-4"
                        dangerouslySetInnerHTML={{ __html: sanitizeHtml(msg.text) }}
                      />
                    ) : (
                      <p className="whitespace-pre-wrap">{msg.text}</p>
                    )}

                    {msg.sources && msg.sources.length > 0 && (
                      <div className="mt-2.5 border-t border-ink-100 pt-2">
                        <p className="text-[10px] font-bold uppercase tracking-wider text-ink-400">Sources</p>
                        <div className="mt-1.5 flex flex-wrap gap-1">
                          {msg.sources.map((source) => (
                            <span
                              key={source}
                              className="rounded-full bg-ink-100 px-2 py-0.5 text-[10px] font-medium text-ink-600"
                            >
                              {source}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                <div
                  className={`mt-1 flex items-center gap-1.5 ${
                    msg.sender === "user" ? "justify-end pr-8" : "justify-start pl-8"
                  }`}
                >
                  <span className="text-[10px] font-medium text-ink-400">{msg.time}</span>
                  <button
                    onClick={() => copy(msg)}
                    aria-label="Copy this message"
                    className="rounded p-1 text-ink-300 transition-colors hover:bg-ink-100 hover:text-ink-600"
                  >
                    {copiedId === msg.id ? (
                      <Check className="h-3 w-3 text-emerald-500" />
                    ) : (
                      <Copy className="h-3 w-3" />
                    )}
                  </button>
                </div>

                {msg.suggestions && (
                  <div className="mt-2 flex flex-wrap gap-1.5 pl-8">
                    {msg.suggestions.map((chip) => (
                      <button
                        key={chip.label}
                        onClick={() => void send(chip.query)}
                        className="rounded-full border border-brand-200 bg-brand-50 px-2.5 py-1 text-[11px] font-semibold text-brand-700 transition-colors hover:border-brand-300 hover:bg-brand-100 active:scale-95"
                      >
                        {chip.label}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))}

            {thinking && (
              <div className="flex items-center gap-2">
                <span className="flex h-6 w-6 items-center justify-center rounded-lg bg-brand-500 text-white">
                  <Bot className="h-3.5 w-3.5" />
                </span>
                <span className="flex items-center gap-1 rounded-full border border-ink-200 bg-white px-3 py-2">
                  <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-brand-400" />
                  <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-brand-500 [animation-delay:0.15s]" />
                  <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-brand-600 [animation-delay:0.3s]" />
                </span>
              </div>
            )}
            <div ref={endRef} />
          </div>

          {/* Composer */}
          <div className="shrink-0 border-t border-ink-200 bg-white px-3 py-2.5">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                void send();
              }}
              className="flex items-center gap-1.5 rounded-xl border border-ink-200 bg-ink-50 p-1.5 transition-all focus-within:border-brand-400 focus-within:ring-2 focus-within:ring-brand-400/20"
            >
              <label htmlFor="docs-assistant-input" className="sr-only">
                Ask a question about the documentation
              </label>
              <input
                id="docs-assistant-input"
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask about backups, deploys, providers…"
                className="flex-1 bg-transparent px-2 text-sm text-ink-800 placeholder-ink-400 focus:outline-none"
              />
              <button
                type="submit"
                disabled={!input.trim() || thinking}
                aria-label="Send"
                className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand-500 text-white transition-all hover:bg-brand-600 active:scale-95 disabled:cursor-not-allowed disabled:opacity-40"
              >
                <Send className="h-3.5 w-3.5" />
              </button>
            </form>
            <p className="mt-1.5 flex items-center justify-center gap-1 text-[10px] font-medium text-ink-400">
              <ShieldCheck className="h-2.5 w-2.5 text-emerald-500" />
              Documentation only — no account access
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
