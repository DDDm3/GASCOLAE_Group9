# S0271 foundation

Step 02 adds only the static entry point and shared CSS. Page sections and content follow in later steps.

- `src/css/tokens.css`: palette, semantic colors, typography, spacing, containers, radii, restrained shadows, z-index, motion.
- `src/css/base.css`: base element styles, keyboard focus, containers, flow spacing and visually hidden utility.
- `src/css/main.css`: stylesheet entry point; add future section imports after the foundation imports.
- `src/index.html`: Vietnamese document shell with an empty main element.

Use semantic color tokens for foreground/background roles. Teal and amber are accents; do not assume they provide sufficient contrast for small text on light backgrounds. Override `--color-focus` with a contrasting palette color on dark surfaces.

Manrope is first in the font stack, followed by Inter and system fonts. No font files or external font service are loaded in this step; Manrope/Inter render only if installed. Add a licensed webfont with Vietnamese coverage and `font-display: swap` when font assets are supplied.

Use `.container` with optional `.container--narrow` or `.container--wide`. `.flow` spaces adjacent children; override `--flow-space` locally. Layout utilities do not create page sections.

## Reduced motion contract

CSS motion durations, stagger delays and travel distance resolve to zero under `prefers-reduced-motion: reduce`. A global override also minimizes animations/transitions that do not use tokens and disables smooth scrolling. The tiny fallback duration allows existing completion events to fire; do not depend on those events to reveal essential content.

Future JavaScript motion must check `matchMedia('(prefers-reduced-motion: reduce)')` and respond to its `change` event. Disable scroll pinning, parallax and horizontal transforms; render the journey in ordinary vertical document flow. Pause decorative videos and show their posters. CSS alone cannot stop video playback or JavaScript animations. Content must remain visible when scripts fail or motion is disabled.

## Local preview

From the repository root:

```powershell
python -m http.server 5271 --bind 127.0.0.1 --directory S0271
```

Open `http://127.0.0.1:5271/src/`. The page is intentionally empty at this stage; its background uses the sand token.

There is no package manager, build step, lint or typecheck configuration for S0271. No dependencies were added.
