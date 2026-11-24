import test from 'node:test';
import assert from 'node:assert/strict';
import { personJsonLd, serializeJsonLd, robotsTxt } from './seo.js';

const site = 'https://daniel-nguyen.dev';

test('robots.txt allows crawling and points at the sitemap index', () => {
  const txt = robotsTxt(site);
  assert.match(txt, /^User-agent: \*$/m);
  assert.match(txt, /^Allow: \/$/m);
  assert.match(txt, /^Sitemap: https:\/\/daniel-nguyen\.dev\/sitemap-index\.xml$/m);
  assert.ok(!/disallow/i.test(txt));
});

test('person JSON-LD has the required schema.org fields', () => {
  const p = personJsonLd(site);
  assert.equal(p['@context'], 'https://schema.org');
  assert.equal(p['@type'], 'Person');
  assert.equal(p.name, 'Daniel Nguyen');
  assert.equal(p.url, site);
  assert.equal(p.jobTitle, 'Software Engineer');
  assert.equal(p.address.addressLocality, 'Calgary');
  assert.equal(p.address.addressRegion, 'AB');
  assert.equal(p.address.addressCountry, 'CA');
});

test('person JSON-LD links GitHub and LinkedIn over https', () => {
  const { sameAs } = personJsonLd(site);
  assert.deepEqual(sameAs, [
    'https://github.com/DinhAnh-Nguyen',
    'https://www.linkedin.com/in/dinhanh-nguyen/',
  ]);
  assert.ok(sameAs.every((u) => new URL(u).protocol === 'https:'));
});

test('person JSON-LD omits email, employer, image and education', () => {
  const p = personJsonLd(site);
  for (const key of ['email', 'worksFor', 'image', 'alumniOf']) {
    assert.ok(!(key in p), key);
  }
});

test('serialised JSON-LD cannot close its script tag and still parses', () => {
  const out = serializeJsonLd({ name: '</script><b>' });
  assert.ok(!out.includes('<'));
  assert.equal(JSON.parse(out).name, '</script><b>');
});

test('serialised person data round-trips through JSON.parse', () => {
  const p = personJsonLd(site);
  const out = serializeJsonLd(p);
  assert.ok(!out.includes('<'));
  assert.deepEqual(JSON.parse(out), p);
});
