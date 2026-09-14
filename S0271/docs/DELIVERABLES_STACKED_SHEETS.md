# Step 11 — Stacked technical sheets

Four presentation sheets derive from the three existing deliverable groups. Traceability and QA/QC are split for display without changing the service scope. The final sheet explicitly retains Level 2 eligibility and the complete quantification conditions. The original `deliverables` export is preserved; `deliverableSheets` supplies the presentation mapping.

The composition uses static overlapping sheets with sufficient bottom padding to keep the next sheet from covering content. Desktop offsets alternate; mobile reduces overlap to 8px and removes horizontal offsets. Existing media is identified as illustration, not actual client reports; no report body or numerical result is fabricated.

IntersectionObserver triggers a single subtle 12px/380ms reveal. Content stays visible without JS. Reduced motion skips or cancels animation and retains the static stack. No new library or video is introduced.

Generate via `node S0271/scripts/build-deliverables.mjs`; append `--check` for synchronization. Passed: generator checks, JavaScript syntax, balanced HTML, unique IDs, exactly four sheets and responsive image existence. Browser layout, actual overlap and reduced-motion interaction remain unverified because this session has no browser connection.
