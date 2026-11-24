import test from 'node:test';
import assert from 'node:assert/strict';
import { robotsTxt } from './seo.js';

const site = 'https://daniel-nguyen.dev';

test('robots.txt allows crawling and points at the sitemap index', () => {
  const txt = robotsTxt(site);
  assert.match(txt, /^User-agent: \*$/m);
  assert.match(txt, /^Allow: \/$/m);
  assert.match(txt, /^Sitemap: https:\/\/daniel-nguyen\.dev\/sitemap-index\.xml$/m);
  assert.ok(!/disallow/i.test(txt));
});
