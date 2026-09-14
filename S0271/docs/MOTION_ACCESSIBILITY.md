# Step 18 — Motion and accessibility audit

The content architecture remains unchanged. The audit covers document landmarks and headings, focus visibility, navigation, native disclosures, radial controls, forms, media and reduced-motion behavior.

## Fixes

- Global scroll padding now clears the fixed header for focus and anchor navigation. A `:focus` fallback supports browsers without `:focus-visible`.
- The light contact form resets its focus color to forest green instead of inheriting the portal's sand focus color.
- The selected technology node now has a check shape as well as inverted color and `aria-pressed`. Hidden technology panels again use the native `hidden` behavior; CSS no longer overrides it. A reserved detail height limits layout movement.
- Journey stage navigation retains its underline plus color state, and its programmatic scroll explicitly falls back to `auto` under reduced motion.
- The redundant attempt to programmatically focus the live form status was removed. Its `role=status` continues to announce the message without unexpectedly moving focus.

No decorative bounce, infinite floating animation, custom cursor or glitch effect exists. The only entrance motion is the one-time Deliverables opacity/12px transform; its script skips and cancels it under reduced motion. Horizontal Journey motion is enabled only under `prefers-reduced-motion: no-preference`. Decorative CTA video pauses under reduced motion; user-controlled Hero and comparison videos retain explicit controls.

Automated checks cover the single H1 plus section H2 hierarchy, landmarks, named controls, all eight form labels, nonempty image alternatives, muted/inline/no-autoplay video markup, reduced-motion rules, focus indicators, non-color state cues, valid generation output and five core color pairs at WCAG AA contrast. Native details/summary supplies FAQ and demo disclosure state. Real browser, screen-reader, zoom/reflow, focus-obscuring and rendered-image contrast checks remain pending because no browser connection is available.
