// RSS feed for projects, generated at build time.

const projectImports = import.meta.glob('./projects/*.md', { eager: true });
const SITE = 'https://joshrandall.net';

const escapeXml = (value) =>
    String(value ?? '')
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;');

export async function GET() {
    const projects = Object.values(projectImports)
        .filter((project) => !project.frontmatter.draft && !project.frontmatter.unlisted)
        .sort((a, b) => Date.parse(b.frontmatter.date) - Date.parse(a.frontmatter.date));

    const items = projects
        .map((project) => {
            const url = `${SITE}${project.url}/`;
            const date = new Date(project.frontmatter.date);
            const pubDate = Number.isNaN(date.getTime()) ? '' : `<pubDate>${date.toUTCString()}</pubDate>`;
            return [
                '<item>',
                `<title>${escapeXml(project.frontmatter.title)}</title>`,
                `<link>${url}</link>`,
                `<guid>${url}</guid>`,
                pubDate,
                `<description>${escapeXml(project.frontmatter.subtitle)}</description>`,
                '</item>',
            ].join('');
        })
        .join('\n');

    const xml = [
        '<?xml version="1.0" encoding="UTF-8"?>',
        '<rss version="2.0">',
        '<channel>',
        '<title>Joshua Randall — Projects</title>',
        `<link>${SITE}</link>`,
        '<description>Projects by Joshua Randall — software, homelab, and hardware builds.</description>',
        '<language>en-us</language>',
        items,
        '</channel>',
        '</rss>',
    ].join('\n');

    return new Response(xml, {
        headers: { 'Content-Type': 'application/rss+xml; charset=utf-8' },
    });
}
