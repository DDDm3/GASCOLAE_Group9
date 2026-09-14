# Final QA and Production Build

QA completed on 14 September 2026. The production artifact is `dist/`: 94 files, 65 referenced media assets and approximately 19.37 MB.

## Validation result

- All 12 HTML/data generator checks pass.
- All JavaScript and MJS files pass `node --check`. The project has no TypeScript or configured external lint/typecheck toolchain.
- All 23 automated tests pass, covering semantics, accessibility names, contrast pairs, content boundaries, SEO, responsive breakpoint continuity, fragment links, local assets, video loading and Journey reachability.
- The built manifest contains 65 assets and every file exists in `dist/asset`.
- One medium-severity defect was fixed: the contained Hero width used undefined `--gutter`; it now uses the declared `--page-gutter` token.
- Browser console, playback, focus order and overflow could not be observed because no browser is connected to this session. Static checks are not recorded as visual verification.

## Files changed in the final QA pass

- `src/css/sections/hero.css`: corrected the responsive gutter variable.
- `scripts/final-qa.test.mjs`: added asset, fragment, CSS import, breakpoint, fallback and form checks.
- `scripts/build-production.mjs`: added the deterministic static production build.
- `dist/`: generated deployable HTML, CSS, JavaScript and only the media referenced by the rendered page.
- `docs/FINAL_QA_BUILD.md`: this handoff report.

## Component tree

```text
Page
├─ Header / primary navigation
├─ Main
│  ├─ Hero / image and on-demand video
│  ├─ Problems / broken editorial grid
│  ├─ Technology / radial selector and detail panels
│  ├─ Journey / five measurement stages
│  ├─ Before–After / native video comparison
│  ├─ Deliverables / stacked sheets
│  ├─ Service Levels / three landscape panels
│  ├─ Why GASCOLAE / typography and principles
│  ├─ FAQ / native details disclosures
│  ├─ Agent consultation / pre-rendered demo answers
│  └─ Contact portal / scope form and background media
└─ Footer / navigation and service identity
```

JavaScript progressively enhances Navigation, Hero, Technology, Journey, Deliverables, Contact and media loading. Core copy, links, FAQ answers, images and form fields remain available without JavaScript.

## Animation strategy

- Journey uses horizontal scroll only above 1024px, with at least 800px viewport height and no reduced-motion preference.
- Deliverable sheets use a short IntersectionObserver reveal; their content is visible before enhancement.
- Video files attach near the viewport or after direct interaction. Hero playback starts only after the viewer selects it.
- `prefers-reduced-motion: reduce` removes transitions and scroll animation globally, disables Journey transformation and suppresses decorative Contact playback.

## Responsive strategy

- Above 1024px: floating desktop Header, full-bleed Hero, radial Technology layout and eligible horizontal Journey.
- At and below 1024px: compact menu, contained wide Hero media, Technology visual with node list and vertical Journey.
- At and below 768px: single-column broken grid, stacked comparison and deliverables, simplified service landscapes, FAQ accordion flow and compact Footer.
- At and below 560px: single-column form fields and full-width submit control.
- Fluid type, page gutters and intrinsic media ratios cover 1440, 1280, 1024, 768, 430, 390 and 360px without breakpoint gaps.

## Accessibility measures

- Semantic landmarks and sequential heading hierarchy.
- Skip link and fixed-header scroll offset.
- Visible `:focus-visible` treatment and minimum interactive heights.
- Keyboard/Escape behavior and focus restoration for menu and Hero video.
- Native video controls, `details/summary` FAQ fallbacks and content available without JavaScript.
- Unique IDs, valid fragment targets, labels for all form controls and live status text.
- Tested core color pairs meet WCAG AA contrast; state is not communicated by color alone.

## Performance strategy

- Hero image is eager and high priority; content images are lazy-loaded with fixed dimensions.
- AVIF/WebP responsive sources reduce image transfer while JPEG fallbacks remain available.
- Video sources and posters are deferred; non-Hero videos load near the viewport.
- The production build copies only assets referenced by rendered HTML and records them in `build-manifest.json`.
- No runtime dependency, framework, web font request or third-party script is included.

## TODO requiring backend or business confirmation

- Configure the lead-form submission endpoint, ownership, required-field policy, validation and privacy handling.
- Configure and approve the AI Agent endpoint, runtime policy, logging and escalation route.
- Confirm production canonical URL, hosting path and analytics/consent requirements.
- Obtain Sales/Finance approval for any future numeric pricing.
- Confirm sensor model, technical thresholds, coefficient set and whether a site satisfies flux/tCO₂e quantification conditions.
- Confirm flight schedule only after technical, HSE, legal, weather and data review.
- Complete real-browser QA for console errors, playback, keyboard focus and visual overflow at the requested viewport widths when a browser connection is available.
