# Header / Hero redesign

The approved redesign replaces the Step 04?06 composition. The Hero now uses full-width imagery with a forest gradient and left-aligned sand text. Its desktop minimum height is the greater of 760px and the small viewport height; content can grow it. Desktop heading size is 56?80px, supporting text 18?20px, and the content width is capped at 760px. CTA links sit beside one another when space permits. The caption and video action occupy their own footer row.

Below 1024px the headline becomes 36?52px. Below 768px CTA links stack and height follows content. The existing mobile image variant is used. The page is static without JavaScript, including all Hero copy and its image.

Content/media remain the authority. Run `node S0271/scripts/build-hero.mjs` after changing Hero data, and `node S0271/scripts/build-hero.mjs --check` to detect stale HTML.

Video loads only on request, muted and inline, with poster and native controls. Its dark player occupies the Hero background, below the fixed header and above the footer. During playback the copy is invisible and inert but retains its layout footprint. The return control and Escape restore image mode and focus. Playback errors restore the image and announce status. Reduced-motion changes also restore the still image. Backgrounding the page pauses playback.

## Verification

Passed: generated HTML consistency, JavaScript syntax, balanced HTML, unique IDs, one H1 and one play control, asset paths, CSS token references and removal of crop rules. DOM test doubles covered deferred loading, inert content, focus, Escape/close, playback errors and reduced motion. A conservative contrast calculation for sand text over a white image at the desktop gradient's 56% stop yielded 6.07:1. This is not a rendered-pixel contrast audit.

Browser discovery returned no available connection. Actual 320/390/768/1024/1440px layouts, 1440?900 first-screen composition, 200% zoom, native playback, real keyboard navigation, frame rate and CLS remain unverified in a browser. No claim is made that simulated DOM checks replace these checks.
