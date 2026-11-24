// Search-engine metadata builders.

/** schema.org Person for the home page. */
export function personJsonLd(site) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'Daniel Nguyen',
    url: site,
    jobTitle: 'Software Engineer',
    address: { '@type': 'PostalAddress', addressLocality: 'Calgary', addressRegion: 'AB', addressCountry: 'CA' },
    sameAs: ['https://github.com/DinhAnh-Nguyen', 'https://www.linkedin.com/in/dinhanh-nguyen/'],
  };
}

/** Serialise JSON-LD for an inline <script>; escapes "<" so content cannot close the tag. */
export function serializeJsonLd(data) {
  return JSON.stringify(data).replace(/</g, '\\u003c');
}

/** Body of robots.txt: allow everything and point crawlers at the sitemap index. */
export function robotsTxt(site) {
  return `User-agent: *\nAllow: /\n\nSitemap: ${new URL('sitemap-index.xml', site).href}\n`;
}
