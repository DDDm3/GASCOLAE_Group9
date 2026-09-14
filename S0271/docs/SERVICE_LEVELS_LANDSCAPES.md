# Step 12 — Three service landscapes

Three full-width landscapes replace pricing-card presentation. Level 1 uses left-aligned text, Level 2 right-aligned text, and Level 3 a wider lower composition. Each uses its existing responsive image from the media manifest and an explicit illustration caption. Mobile content remains in normal flow with no fixed height or animation.

`serviceLandscapes` derives from the existing `serviceLevels`, adding prompt 12's landscape labels and the “Liên hệ tư vấn” CTA. Original service data and form options remain compatible. Level 1 excludes flux/tCO₂e; Levels 2–3 retain quantification conditions and uncertainty. Level 3 retains service-boundary limitations. No numeric prices or invented measurements are shown. CTA destinations remain `#contact`, pending the form section.

Generate with `node S0271/scripts/build-service-levels.mjs`; append `--check` for synchronization. Passed: generation and syntax checks, balanced HTML, unique IDs, three landscapes and responsive asset existence. Existing Hero and Deliverables generation checks also pass. Actual browser layout, responsive crops and pixel contrast remain unverified because this session has no browser connection.
