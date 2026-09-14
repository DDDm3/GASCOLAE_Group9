import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

const html = await readFile(new URL('../src/index.html', import.meta.url), 'utf8');
const cssFiles = [
  '../src/css/base.css', '../src/css/sections/contact.css', '../src/css/sections/technology.css',
  '../src/css/sections/journey.css', '../src/css/sections/deliverables.css',
];
const css = (await Promise.all(cssFiles.map(file => readFile(new URL(file, import.meta.url), 'utf8')))).join('\n');

test('document landmarks and heading hierarchy are present', () => {
  assert.match(html, /<html lang="vi">/);
  assert.equal((html.match(/<h1\b/g) ?? []).length, 1);
  assert.equal((html.match(/<main\b/g) ?? []).length, 1);
  assert.equal((html.match(/<footer\b/g) ?? []).length, 1);
  assert.equal((html.match(/<section\b/g) ?? []).length, (html.match(/<h2\b/g) ?? []).length + 1);
});

test('interactive controls have accessible names and form labels', () => {
  const controls = [...html.matchAll(/<(button|summary|input|textarea|select)\b([^>]*)>/g)];
  assert.ok(controls.length > 0);
  assert.equal((html.match(/<label\b/g) ?? []).length, (html.match(/<(input|textarea|select)\b/g) ?? []).length);
  assert.doesNotMatch(html, /<img\b[^>]*alt=""/);
  assert.doesNotMatch(html, /<a\b[^>]*>\s*<\/a>/);
});

test('video behavior and reduced-motion paths are explicit', () => {
  const videos = [...html.matchAll(/<video\b([^>]*)>/g)].map(match => match[1]);
  assert.ok(videos.length >= 3);
  for (const video of videos) {
    assert.match(video, /\bmuted\b/);
    assert.match(video, /\bplaysinline\b/);
    assert.doesNotMatch(video, /\bautoplay\b/);
  }
  assert.match(css, /prefers-reduced-motion:\s*reduce/);
  assert.match(css, /animation-duration:\s*0\.01ms\s*!important/);
});

test('focus and non-color state indicators exist', () => {
  assert.match(css, /:focus-visible/);
  assert.match(css, /technology-node\[aria-pressed="true"\]::after/);
  assert.match(css, /journey-navigation a\[aria-current="step"\].*text-decoration-thickness/s);
  assert.match(css, /contact-form\s*\{\s*--color-focus:\s*var\(--forest-700\)/);
});

test('core text color pairs meet WCAG AA contrast', () => {
  const luminance = hex => {
    const channels = hex.match(/[a-f\d]{2}/gi).map(channel => parseInt(channel, 16) / 255)
      .map(value => value <= 0.04045 ? value / 12.92 : ((value + 0.055) / 1.055) ** 2.4);
    return channels[0] * 0.2126 + channels[1] * 0.7152 + channels[2] * 0.0722;
  };
  const contrast = (foreground, background) => {
    const values = [luminance(foreground), luminance(background)].sort((a, b) => b - a);
    return (values[0] + 0.05) / (values[1] + 0.05);
  };
  for (const pair of [['#176B5B', '#DDEFE8'], ['#176B5B', '#F6F2E8'], ['#176B5B', '#FFFFFF'], ['#F6F2E8', '#0B2E2A'], ['#182523', '#DDEFE8']]) {
    assert.ok(contrast(...pair) >= 4.5, `${pair.join(' on ')} fails AA`);
  }
});
