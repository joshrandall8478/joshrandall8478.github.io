// Helpers for working with markdown content collections.

// Filter out drafts/unlisted entries and sort newest-first.
export function published(modules) {
    return Object.values(modules)
        .filter((mod) => !mod.frontmatter.draft && !mod.frontmatter.unlisted)
        .sort((a, b) => Date.parse(b.frontmatter.date) - Date.parse(a.frontmatter.date));
}

// "4/21/26" -> "Apr 21, 2026"; falls back to the raw string.
export function formatDate(input) {
    const date = new Date(input);
    if (Number.isNaN(date.getTime())) return input;
    return date.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
}

// Estimated minutes to read a markdown module (~215 wpm).
export function readingTime(source) {
    try {
        const raw = typeof source === "function" ? source() : typeof source?.rawContent === "function" ? source.rawContent() : source;
        if (typeof raw !== "string" || !raw.trim()) return null;
        return Math.max(1, Math.round(raw.trim().split(/\s+/).length / 215));
    } catch {
        return null;
    }
}
