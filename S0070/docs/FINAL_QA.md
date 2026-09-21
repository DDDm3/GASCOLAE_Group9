# S0070 final QA and handoff

Date: 2026-09-21. Scope: public static landing page only. No publication or access change was performed.

## Content review

Every public section remains mapped to Assets 00–10 in `LANDING_PAGE_HANDOFF.md`, with Asset 09 controlling landing-page copy. The final distribution contains no testimonial, customer logo, certification, unsupported performance number, equipment model, public price or invented organization claim.

Material analysis is consistently conditional on suitable HSI and reference data. AI is described as screening and decision support with expert review and authorized field verification. Pricing, schedule and SLA remain contact-based and require GASCOLAE confirmation for each project.

## Media review

The five published illustrations were inspected at original resolution:

- `spectral-cube.webp` contains conceptual terrain, spectral layers and unlabeled curves. It contains no real coordinates, sensitive facility, weapon, crosshair or generated text.
- `service-workflow.webp` contains a conceptual UAV-to-data-to-review workflow. The UAV is visually coherent at its displayed scale, and the image contains no weapon, real coordinate, sensitive facility or generated text.
- `uav-sensor.webp` contains a coherent conceptual UAV and a spectral-light treatment without labels or coordinates.
- `spectral-site-overview.webp` contains an unlabeled conceptual landscape and analysis grid without identifiable facilities or coordinates.
- `uav-monitoring.webp` contains a coherent UAV over a conceptual landscape with unlabeled analysis regions.

Both images are labeled as illustrations in the page. GASCOLAE must still confirm usage rights before public release.

## Functional and automated QA

The production build and all available project checks pass:

- Node syntax check for client, build, SEO configuration and preview server;
- 17 automated tests covering anchors, unique IDs, local media, semantic HTML, public-data exclusions, content guardrails, HTTP restrictions, content types, SEO schema, CSP/security headers, Brotli, ETag/cache behavior, responsive media, form validation/reset, navigation state, level selection, FAQ state, reduced motion, contrast, section order and agent-preview guardrails;
- canonical production build using a temporary HTTPS `SITE_URL`, followed by restoration of the default noindex preview build;
- `git diff --check` whitespace validation;
- manual source scan for restricted pricing, unsupported claims, testimonials, customer logos, certifications and named equipment models;
- manual original-resolution inspection of both published illustrations.

There is no separate lint or type-check command because the implementation is dependency-free JavaScript without TypeScript. `npm run check` performs the available syntax checks.

## Preview

Run from the `S0070` directory:

```powershell
npm.cmd run dev
```

Open `http://127.0.0.1:4170`. The build defaults to `noindex, nofollow`. Do not set `SITE_URL` until GASCOLAE approves the final production HTTPS URL.

## Remaining QA limitation

The in-app Browser runtime reported no available browser, so desktop/mobile screenshots, native keyboard behavior, 200% zoom, reduced-motion rendering and screen-reader output could not be directly inspected. Reproduce the outstanding visual pass at 100% and 200% zoom at widths 360, 390, 768, 1024, 1440 and 1920 pixels. Verify menu open/close/Escape, sequential Tab focus, CTA level selection, FAQ Enter/Space, empty/invalid/valid/reset form states, media crops, line length, spacing, alignment and horizontal overflow.

## Approvals required before release

GASCOLAE or Team Dev must approve:

- final public copy and the technical/service claims;
- rights to publish the logo and the two selected illustrations;
- production HTTPS URL and canonical value;
- a real contact channel, privacy notice and the owning team for enquiries;
- backend authentication, authorization, validation, rate limiting, retention, audit logging and handoff before enabling form submission;
- the agent endpoint, public-only retrieval corpus and Asset 10 guardrail test results before enabling live AI;
- browser and assistive-technology QA described above.

The page must remain an unconnected preview until these approvals are complete.
