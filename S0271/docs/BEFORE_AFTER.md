# Step 10 — Before/after evidence

One large 16:9 frame uses the existing before-after video from the media manifest. The two period labels sit outside the frame. Native video controls provide explicit timeline scrubbing, playback and keyboard controls without a JavaScript dependency. Video is muted, inline, not autoplaying, and starts with its poster; a direct MP4 link remains available.

The description in `content.beforeAfter` states that comparison is meaningful only when the periods are sufficiently equivalent. The illustration caption explicitly disclaims actual performance data. No reduction percentage or numeric tCO₂e is introduced.

Run `node S0271/scripts/build-before-after.mjs` to regenerate the section or append `--check` to verify synchronization. The media reserves a 16:9 aspect ratio and is not cropped on mobile. Native controls remain available without JavaScript and under reduced motion.

Passed: generator checks, balanced HTML and unique IDs, exactly one comparison video, explicit controls/no autoplay, asset existence, successful complete MP4 decoding, and the four Journey end-scroll regression tests. Real-browser layout and native seeking/keyboard QA remain pending because no browser connection is available in this session.
