# Step 08 — Technology radial

The `overview` section makes the existing Giải pháp navigation link usable. Six nodes come directly from `technologyNodes`: CH₄, WIND, GNSS/RTK, GIS, QA/QC and FLUX. The central still comes from `sectionMedia.technology.image`. Sensor-model qualifications and the full conditional FLUX wording are preserved. No dashboard or rotating animation is added.

Desktop presents the nodes around the UAV image with detail text alongside. Below 1024px the visual appears above a clear node grid and description. Hover with a mouse, focus and click/tap select nodes. Tab reaches all selectors; arrow keys wrap, Home/End select endpoints, and Space activates the focused button. A polite live region announces the selected description. Panels reserve their shared height; hidden panels use visibility:hidden and remain unavailable to assistive technology.

Without JavaScript, selectors are ordinary anchors and all descriptions remain visible. The generator reads the existing content/media modules. Run `node S0271/scripts/build-technology.mjs` after source changes, or add `--check` to verify synchronization.

Passed: generation checks for Hero, Problems and Technology; JavaScript syntax; balanced HTML; unique IDs; six matching nodes/panels; DOM-double tests for initial selection, hover, click, keyboard wrapping and End. Actual browser layout, focus and screen-reader behavior remain unverified because a browser connection was unavailable in this session.
