import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile, stat } from 'node:fs/promises';
import { loadVideoSources } from '../src/js/components/media-performance.js';

const html = await readFile(new URL('../src/index.html', import.meta.url), 'utf8');

test('initial HTML does not attach video files or posters', () => {
  const videos = [...html.matchAll(/<video\b[\s\S]*?<\/video>/g)].map(match => match[0]);
  assert.equal(videos.length, 3);
  for (const video of videos) {
    assert.doesNotMatch(video, /<source\s+src=/);
    assert.doesNotMatch(video.match(/<video\b[^>]*>/)[0], /\sposter=/);
    assert.match(video, /data-poster=/);
    assert.match(video, /preload="none"/);
  }
});

test('all non-Hero content images use lazy loading', () => {
  const images = [...html.matchAll(/<img\b[^>]*>/g)].map(match => match[0]);
  const contentImages = images.filter(image => !image.includes('LOGO_no-bg.png') && !image.includes('fetchpriority="high"'));
  assert.ok(contentImages.length > 0);
  contentImages.forEach(image => assert.match(image, /loading="lazy"/));
});

test('selected Hero video exists and is not attached before interaction', async () => {
  const selected = await stat(new URL('../asset/video/video_hero.mp4', import.meta.url));
  assert.ok(selected.size > 0);
  assert.match(html, /data-src="\.\.\/asset\/video\/video_hero\.mp4"/);
  assert.doesNotMatch(html, /<source src="\.\.\/asset\/video\/video_hero\.mp4"/);
});

test('video source loader is idempotent and assigns poster just in time', () => {
  const source = {
    dataset: { src: 'video.mp4' },
    removeAttribute(name) { if (name === 'data-src') delete this.dataset.src; },
  };
  let loads = 0;
  const video = {
    dataset: { poster: 'poster.webp' },
    poster: '',
    querySelectorAll: () => [source],
    load: () => { loads += 1; },
  };
  assert.equal(loadVideoSources(video), true);
  assert.equal(source.src, 'video.mp4');
  assert.equal(video.poster, 'poster.webp');
  assert.equal(loads, 1);
  assert.equal(loadVideoSources(video), false);
  assert.equal(loads, 1);
});
