/**
 * Blog post content blocks.
 *
 * `blogs.content` is a TEXT column holding a JSON array written by the admin
 * blog editor. Parsing is deliberately forgiving: a post that fails to parse
 * renders an empty state rather than taking the page down, and the editor has
 * shipped two spellings for a few fields over time (`code`/`content`,
 * `html`/`content`, `src`/`url`), so both are accepted.
 */

export type ContentBlock =
  | { type: "heading"; level?: number; content?: string }
  | { type: "paragraph"; content?: string }
  | { type: "code"; language?: string; code?: string; content?: string }
  | { type: "html"; html?: string; content?: string }
  | { type: "image"; src?: string; url?: string; alt?: string }
  | { type: "list"; listType?: "ordered" | "unordered"; items?: string[] }
  | { type: "quote"; content?: string; author?: string };

export function parseBlocks(raw: string | null | undefined): ContentBlock[] {
  if (!raw) return [];
  try {
    const parsed: unknown = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed.filter(
      (b): b is ContentBlock => !!b && typeof b === "object" && typeof (b as ContentBlock).type === "string",
    );
  } catch {
    return [];
  }
}

function blockWordCount(block: ContentBlock): number {
  const count = (text: string) => text.split(/\s+/).filter(Boolean).length;
  switch (block.type) {
    case "html":
      return count((block.html ?? block.content ?? "").replace(/<[^>]*>/g, " "));
    case "list":
      return count((block.items ?? []).join(" "));
    case "code":
      return 0; // Code is scanned, not read — counting it inflates the estimate.
    default:
      return count(("content" in block ? block.content : "") ?? "");
  }
}

/** Reading time in whole minutes, never below one. */
export function readingTime(blocks: ContentBlock[]): number {
  const words = blocks.reduce((total, block) => total + blockWordCount(block), 0);
  return Math.max(1, Math.ceil(words / 200));
}

/** Heading blocks become the in-page table of contents. */
export function headingId(content: string, index: number): string {
  const slug = content
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-");
  return slug ? `${slug}-${index}` : `section-${index}`;
}
