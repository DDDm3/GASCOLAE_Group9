# Step 19 — Media performance

## Strategy

- Hero image remains the only eager content image. It uses AVIF first (about 114 KiB at desktop), responsive WebP fallback, fixed intrinsic dimensions and high fetch priority. Header logo is about 58 KiB.
- Every below-fold content image uses `loading=lazy`, explicit intrinsic dimensions, a CSS aspect ratio and responsive sources. Journey and Deliverables now include existing AVIF variants where available; the technology image retains WebP because no AVIF source exists.
- No video file or video poster URL is attached in the initial HTML. Hero loads its selected MP4 only after the explicit play action. The comparison video attaches sources and poster within 300px of the viewport, or immediately on pointer/focus interaction. The decorative CTA video attaches sources only when at least 35% visible, plays muted/inline while visible and pauses offscreen.
- All videos use `preload=none`. Reduced motion prevents CTA autoplay and shows its poster once the media enters its loading range. Hero and before-after media remain user-controlled.

The selected `Generate_ONE_complete_cinemati.mp4` Hero video is preserved unchanged. A visually equivalent H.264 derivative (`Generate_ONE_complete_cinemati-optimized.mp4`) is used for delivery: approximately 2.09 MiB instead of 8.20 MiB, a 74.5% reduction. It is 1280×720, 24 fps, yuv420p, audio-free and fast-start enabled.

## Changed implementation

Media data now maps the chosen cinematic source to its optimized delivery variant. Hero, comparison and contact generators emit deferred `data-src`/`data-poster` references. `media-performance.js` owns idempotent near-viewport loading for user-controlled media; contact playback reuses the same loader. Journey and Deliverables generators add AVIF sources.

## Remaining bottlenecks

- The page contains many large editorial images. Lazy loading prevents initial transfer, but a full-page scroll can still download numerous 1280/1920 assets; browser selection depends on viewport and device pixel ratio.
- Technology imagery has no AVIF export. Its 1920 WebP may remain heavier than equivalent AVIF.
- Poster files are roughly 116–417 KiB. They are deferred, but further poster-specific resizing could reduce transfer.
- The optimized Hero file is still about 2.09 MiB. A lower bitrate or smaller mobile crop would save more bandwidth but requires visual QA before replacing this version.

Automated checks cover zero initial video/poster attachment, lazy below-fold images, optimized-size reduction, idempotent source loading, generation consistency, syntax, accessibility and Journey regressions. Actual network waterfalls, LCP, CLS, decoding cost and playback smoothness remain unmeasured because no browser connection is available.
