/**
 * Allowlist HTML sanitiser.
 *
 * Two places on this site render HTML they did not author: blog posts carry
 * `html` content blocks from the admin editor, and the docs assistant renders
 * model-generated answers. Neither should be trusted with a raw
 * `dangerouslySetInnerHTML` — an LLM will happily echo back whatever a visitor
 * pasted into it, and a CMS field is one compromised admin account away from
 * being an injection vector.
 *
 * Anything not on the allowlist is dropped, tag and attributes alike, while its
 * text content is kept. `javascript:` and `data:` URLs are stripped from links.
 */

const ALLOWED_TAGS = new Set([
  "a", "b", "blockquote", "br", "code", "em", "h1", "h2", "h3", "h4", "h5",
  "h6", "hr", "i", "li", "ol", "p", "pre", "span", "strong", "table", "tbody",
  "td", "th", "thead", "tr", "ul",
]);

/** Per-tag attribute allowlist. Everything else — including every on* handler. */
const ALLOWED_ATTRS: Record<string, Set<string>> = {
  a: new Set(["href", "title", "target", "rel"]),
};

const SAFE_URL = /^(https?:|mailto:|tel:|\/|#)/i;

/**
 * Tags whose *contents* are dropped along with the tag.
 *
 * Everything else not on the allowlist is unwrapped — the tag goes, the text
 * inside it stays — which is right for a stray <div> or <font>. It is wrong for
 * these: unwrapping <script> leaves its source rendered as visible body text.
 */
const DROP_WITH_CONTENT = new Set([
  "script", "style", "iframe", "object", "embed", "noscript", "template",
  "svg", "math", "form", "input", "button", "select", "textarea", "link",
  "meta", "base", "title",
]);

function scrub(node: Element) {
  const tag = node.tagName.toLowerCase();

  if (DROP_WITH_CONTENT.has(tag)) {
    node.remove();
    return;
  }

  // Snapshot first: the loop reparents and removes nodes as it goes.
  for (const child of Array.from(node.children)) scrub(child);

  if (!ALLOWED_TAGS.has(tag)) {
    // Keep the text, drop the element.
    node.replaceWith(...Array.from(node.childNodes));
    return;
  }

  const allowed = ALLOWED_ATTRS[tag] ?? new Set<string>();
  for (const attr of Array.from(node.attributes)) {
    if (!allowed.has(attr.name.toLowerCase())) {
      node.removeAttribute(attr.name);
    }
  }

  if (tag === "a") {
    const href = node.getAttribute("href");
    if (href && !SAFE_URL.test(href.trim())) {
      node.removeAttribute("href");
    }
    // Any link that opens a new tab gets noopener, whether or not it asked.
    if (node.getAttribute("target") === "_blank") {
      node.setAttribute("rel", "noopener noreferrer");
    }
  }
}

export function sanitizeHtml(dirty: string): string {
  if (!dirty) return "";
  // No DOM during a prerender pass — drop tags rather than ship them unchecked.
  if (typeof document === "undefined") return dirty.replace(/<[^>]*>/g, "");

  const doc = document.implementation.createHTMLDocument("sanitize");
  doc.body.innerHTML = dirty;
  for (const child of Array.from(doc.body.children)) scrub(child);
  return doc.body.innerHTML;
}

/** Plain text for copy-to-clipboard and reading-time counts. */
export function htmlToText(html: string): string {
  if (!html) return "";
  if (typeof document === "undefined") return html.replace(/<[^>]*>/g, " ");
  const el = document.createElement("div");
  el.innerHTML = sanitizeHtml(html);
  return el.textContent ?? "";
}
