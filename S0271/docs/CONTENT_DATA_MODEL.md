# S0271 content and media data

Step 03 adds browser ES modules only. No visual sections, animation, network submission or AI integration are implemented. Import the modules from future section code; the empty HTML shell is unchanged.

## Content

`src/js/data/content.js` exports named collections and an aggregate `content` object: service, boundaries, hero, problems, overview, technologyNodes, measurementJourney, operationalSteps, deliverables, serviceLevels, whyGascolae, faqs, agent, cta and seo.

The content authority is `asset/docs/07_S0271_09_Service_Landing_Page_Content.docx`. Its 284 nonempty body paragraphs were compared with `landing_page_content_extracted.txt`, with no differences. This is a text/content check, not a visual document audit or independent verification of Assets 01–08.

Each content item carries source section/asset references. SRC identifiers are retained for problems and FAQ. These are editorial metadata and should not be rendered as marketing copy. Technology nodes and journey labels follow prompts 08/09; their descriptions are adapted from Asset 09. `operationalSteps` preserves the separate five-step operational sequence.

Render `condition`, `qualification` and `limitation` alongside the associated description. They must not be dropped when building compact views. In particular:

- Level 1 excludes flux/tCO₂e; Levels 2–3 remain conditional and include uncertainty.
- Sensor model, thresholds and coefficients still require confirmation.
- ppm is not directly convertible to tCO₂e; the service does not replace Method 21, issue verification certificates or carbon credits.
- No numeric prices, ROI, performance percentages or promised timelines are added.

CTA targets reserve `contact` and `service-levels` for later section IDs. The form contains the eight source fields, with no upload field. `required: null` means unspecified, not a final optional-field policy. Email/phone remains a combined text field so either contact method can be supplied. Level options derive from `serviceLevels`.

Form and agent endpoints are `null`: future UI must not claim successful submission or a live AI response until integrations exist. Agent restrictions are editorial requirements, not server-side enforcement. The canonical URL is also `null`; only the source's suggested slug is supplied.

## Media

`src/js/data/media.js` exports `images`, `videos`, `sectionMedia` and aggregate `media`. Assets resolve relative to `import.meta.url` so URLs remain valid under a deployment subpath, provided the S0271 directory structure is preserved.

The mapping follows `asset/web_export/s0271_web_manifest.json`, adds existing responsive image variants, and uses the technology still from `asset/images/`. It does not copy or regenerate assets. Object keys for stages, deliverables and service levels match the content IDs. Text-only sections use `null`.

Videos without a dedicated mobile file have `mobile: null`; consumers should use the optimized source or poster. Poster fallback and reduced-motion intent are explicit. Playback defaults do not enable autoplay; later media code must handle visibility, user controls and reduced-motion changes.

Alt text is conservative editorial draft text, not a visual QA result. Media is marked as illustration and must not be presented as actual measured reduction evidence. No new technical measurements or intrinsic dimensions are inferred from filenames.
