import test from 'node:test';
import assert from 'node:assert/strict';
import { access, readFile, readdir } from 'node:fs/promises';
import { constants } from 'node:fs';
import { fileURLToPath } from 'node:url';

const root = new URL('../', import.meta.url);
const indexUrl = new URL('src/index.html', root);
const html = await readFile(indexUrl, 'utf8');

const localAssetPaths = [...html.matchAll(/(?:src|href|data-src|data-poster|srcset)="([^"]+)"/g)]
  .flatMap(([, value]) => value.split(',').map(candidate => candidate.trim().split(/\s+/)[0]))
  .filter(value => value.startsWith('../asset/'));

test('all local assets referenced by rendered HTML exist', async () => {
  assert.ok(localAssetPaths.length > 0);
  await Promise.all([...new Set(localAssetPaths)].map(async path => {
    const url = new URL(path, indexUrl);
    await assert.doesNotReject(access(fileURLToPath(url), constants.R_OK), path);
  }));
});

test('all fragment links resolve to unique document IDs', () => {
  const ids = [...html.matchAll(/\sid="([^"]+)"/g)].map(match => match[1]);
  assert.equal(new Set(ids).size, ids.length, 'duplicate IDs found');
  const targets = [...html.matchAll(/\shref="#([^"]+)"/g)].map(match => match[1]);
  for (const target of targets) assert.ok(ids.includes(target), `missing target #${target}`);
});

test('CSS imports resolve and responsive boundaries have no gap', async () => {
  const mainUrl = new URL('src/css/main.css', root);
  const main = await readFile(mainUrl, 'utf8');
  const imports = [...main.matchAll(/@import url\("([^"]+)"\)/g)].map(match => match[1]);
  await Promise.all(imports.map(path => assert.doesNotReject(access(fileURLToPath(new URL(path, mainUrl)), constants.R_OK), path)));
  const cssFiles = await readdir(new URL('src/css/sections/', root));
  const css = [main, await readFile(new URL('src/css/visual-polish.css', root), 'utf8'), ...await Promise.all(cssFiles.map(file => readFile(new URL(`src/css/sections/${file}`, root), 'utf8')))].join('\n');
  assert.doesNotMatch(css, /(?:63\.999|47\.999)rem/);
  assert.doesNotMatch(css, /var\(--gutter\)/);
  assert.match(css, /@media \(max-width: 64rem\)/);
  assert.match(css, /@media \(max-width: 48rem\)/);
});

test('fallback, motion and form behavior remain explicit', () => {
  assert.match(html, /<meta name="viewport" content="width=device-width, initial-scale=1">/);
  assert.doesNotMatch(html, /<video[^>]*\bautoplay\b/i);
  assert.doesNotMatch(html, /<form[^>]*\baction=/i);
  for (const button of html.matchAll(/<button\b([^>]*)>/gi)) assert.match(button[1], /\btype="button"/, button[0]);
  assert.match(html, /data-hero-picture/);
  assert.match(html, /<details class="faq-question/);
});
