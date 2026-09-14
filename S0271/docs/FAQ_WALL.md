# Step 14 — Editorial question wall

Four existing FAQ questions and answers are pre-rendered unchanged from `faqs`. Desktop uses a staggered 12-column question wall; each answer opens in normal flow directly under its question. Below 1024px the same markup becomes a vertical accordion. Multiple answers may remain open for comparison; no animation or runtime script is required.

Native details/summary handles Enter, Space, focus and expanded/collapsed accessibility state without manually duplicating aria-expanded. Each summary controls a uniquely identified answer region; the region is labelled by its question. Plus/minus marks are decorative and follow the native open attribute. All items start closed and work without JavaScript.

Generate with `node S0271/scripts/build-faq.mjs`; append `--check` for synchronization. Passed: generator and syntax checks, four disclosures, correct summary nesting, unique IDs, valid ARIA references and the preceding section's generator check. Real browser keyboard, screen-reader and responsive visual QA remain pending because the session has no browser connection.
