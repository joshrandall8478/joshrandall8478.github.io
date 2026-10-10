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

// True when an entry is marked `archived: true` in its frontmatter.
// Archived entries still build and stay reachable by URL, but list pages
// hide them until the "Show archived" toggle is on.
export function isArchived(mod) {
    return mod.frontmatter.archived === true;
}

// Entries for the home page and feeds: published and not archived.
export function current(modules) {
    return published(modules).filter((mod) => !isArchived(mod));
}

// Lowercased plain text (title, description, tools and body) used by the
// client-side search on list pages.
export function searchText(mod) {
    const { title = "", description = "", subtitle = "", tools = [] } = mod.frontmatter;
    let body = "";
    try {
        body = typeof mod.rawContent === "function" ? mod.rawContent() : "";
    } catch {}
    body = body
        .replace(/<[^>]+>/g, " ") // html tags
        .replace(/!?\[([^\]]*)\]\([^)]*\)/g, "$1"); // markdown links/images -> text
    return normalizeSearch([title, description, subtitle, tools.join(" "), body].join(" "));
}

// Shared by the index above and the search box, so a query like "dm-crypt"
// is split the same way as the text it is matched against.
export function normalizeSearch(text) {
    return text
        .replace(/[#>*_`~|-]+/g, " ") // markdown punctuation
        .replace(/\s+/g, " ")
        .trim()
        .toLowerCase();
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
