# Responsive and accessibility pass

## Coverage

The page is designed for the requested 360, 390, 768, 1024, 1440 and 1920 CSS-pixel widths. Layout breakpoints at 600, 800, 1050, 1200 and 1700 pixels cover those viewports. Containers, grid children, media and form controls use bounded or fluid widths, and the document clips non-layout visual overflow at the viewport edge.

## Accessibility changes

- The native FAQ disclosure exposes and synchronizes `aria-expanded`, with each question controlling a named answer region.
- Each required field references its own polite, atomic live error message. Invalid fields also expose `aria-invalid`, and focus moves to the first invalid field.
- An optional hero video uses its poster by default. The MP4 is fetched only above 800 pixels when reduced motion and data saver are both off.
- Long headings and labels can wrap, while the compact RGB/GIS/review visualization uses shrink-safe columns.
- Navigation, buttons, links, summaries and form controls retain visible focus and practical 44-pixel targets.
- Decorative charts and markers remain hidden from assistive technology. Their adjacent headings, descriptions, legends and captions provide the text equivalent without relying on color alone.

## Remaining limitation

Automated source and behavior checks pass, but no controllable browser session was available for screenshot-based layout verification. To reproduce the outstanding visual check, run `npm run dev`, open `http://127.0.0.1:4170`, and inspect widths 360, 390, 768, 1024, 1440 and 1920 pixels at 100% zoom. Check horizontal scrolling, heading clipping and media overlap at each width.
