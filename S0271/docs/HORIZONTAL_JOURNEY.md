# Step 09 — Horizontal measurement journey

The journey uses the five sourced `measurementJourney` entries and existing stage media mapping. QUANTIFY retains the complete conditions and screening fallback; VERIFY retains the verification-certificate limitation. Each stage uses oversized labels, an image and text in an open editorial layout. There are no repeated card surfaces.

On desktop at least 1024px wide and 800px high, with no reduced-motion preference, vertical scroll translates a horizontal track. The sticky area clears the fixed header. Five anchor controls let keyboard/touch users jump to stages without trapping wheel or keyboard events. The scroll distance is 0.7 viewport heights per transition. The active navigation item uses aria-current=step.

Mobile, reduced motion, disabled JavaScript and viewports too short for the actual text use ordinary vertical flow. No scroll transformations are applied in those modes. All source text remains in semantic HTML. Rebuild with `node S0271/scripts/build-journey.mjs`; add `--check` for synchronization validation.

Geometry is measured during setup/resize/font readiness, not during scrolling. Passive scroll events coalesce into one animation frame and unchanged progress does not write styles. No continuous timer or animation library is used.

Passed: syntax, generator checks for all four sections, balanced HTML, unique IDs, five stages and existing media. DOM doubles verified start/middle/end scroll positions, 1,000 events coalescing into one frame, active navigation, stage jumps, mobile/reduced-motion reset and tall-content fallback. Browser visual, keyboard, actual FPS and layout-shift measurements remain pending; this session has no available browser connection.
