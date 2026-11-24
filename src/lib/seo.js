// Search-engine metadata builders.

/** Body of robots.txt: allow everything and point crawlers at the sitemap index. */
export function robotsTxt(site) {
  return `User-agent: *\nAllow: /\n\nSitemap: ${new URL('sitemap-index.xml', site).href}\n`;
}
