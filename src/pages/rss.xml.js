// RSS feed for posts, generated at build time.

const postImports = import.meta.glob('./posts/*.md', { eager: true });
const SITE = 'https://joshrandall.net';

const escapeXml = (value) =>
    String(value ?? '')
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;');

export async function GET() {
    const posts = Object.values(postImports)
        .filter((post) => !post.frontmatter.draft && !post.frontmatter.unlisted)
        .sort((a, b) => Date.parse(b.frontmatter.date) - Date.parse(a.frontmatter.date));

    const items = posts
        .map((post) => {
            const url = `${SITE}${post.url}/`;
            const date = new Date(post.frontmatter.date);
            const pubDate = Number.isNaN(date.getTime()) ? '' : `<pubDate>${date.toUTCString()}</pubDate>`;
            return [
                '<item>',
                `<title>${escapeXml(post.frontmatter.title)}</title>`,
                `<link>${url}</link>`,
                `<guid>${url}</guid>`,
                pubDate,
                `<description>${escapeXml(post.frontmatter.description)}</description>`,
                '</item>',
            ].join('');
        })
        .join('\n');

    const xml = [
        '<?xml version="1.0" encoding="UTF-8"?>',
        '<rss version="2.0">',
        '<channel>',
        '<title>Joshua Randall — Posts</title>',
        `<link>${SITE}</link>`,
        '<description>Posts on Linux, homelab, self-hosting, and software by Joshua Randall.</description>',
        '<language>en-us</language>',
        items,
        '</channel>',
        '</rss>',
    ].join('\n');

    return new Response(xml, {
        headers: { 'Content-Type': 'application/rss+xml; charset=utf-8' },
    });
}
