import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { seo } from '../src/js/data/content.js';

const html = await readFile(new URL('../src/index.html', import.meta.url), 'utf8');

test('SEO content matches the data model exactly', () => {
  assert.deepEqual(html.match(/<title>([^<]+)<\/title>/g), [`<title>${seo.title}</title>`]);
  assert.equal(html.match(/<meta name="description" content="([^"]+)">/)[1], seo.description);
  assert.equal(html.includes('rel="canonical"'), false);
});

test('footer is unique and points to existing sections', () => {
  assert.equal((html.match(/<footer\b/g) ?? []).length, 1);
  for (const id of ['hero', 'overview', 'journey', 'service-levels', 'deliverables', 'faq', 'contact']) {
    assert.match(html, new RegExp(`id="${id}"`));
  }
});
