# Step 07 — Problems

The section follows the Hero and uses exactly the three problems from `src/js/data/content.js`, with descriptions unchanged. The heading and image caption are editorial labels, not additional pain points.

Desktop uses a 12-column asymmetric layout: 01 at left beside a tall image crop, 02 offset right with a vertical rule, and 03 below toward the left with a horizontal rule and oversized number alongside the text. There are no repeated card containers. Below 768px, the ordered list becomes a vertical sequence. No animation or dependency is added.

The single responsive image comes from `sectionMedia.problems.image`, reserves its aspect ratio, loads lazily and is identified as illustration. Hero, header and video behavior are unchanged.

Regenerate only this section with `node S0271/scripts/build-problems.mjs`; verify it with `node S0271/scripts/build-problems.mjs --check`. This keeps the content available without browser JavaScript. Hero generation has its own unchanged markers.

Checks passed: generator consistency for both sections, JavaScript syntax, balanced HTML, unique IDs, exactly three problem entries and existence of responsive image files. Real browser visual/responsive QA remains pending; no available browser connection was established in this session.
