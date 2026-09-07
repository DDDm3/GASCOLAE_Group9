# PHASE 09 — PERFORMANCE

Audit the complete page.

Focus on:
- Three.js draw calls
- instance count
- geometry complexity
- texture sizes
- model loading
- animation loops
- memory disposal
- DPR
- lazy loading
- code splitting where useful
- font loading
- layout shift
- mobile GPU/CPU load
- initial render blocking

Create:
docs/07-performance-spec.md

Classify issues:
P0 blocking
P1 important
P2 optimization

Fix P0/P1 issues where possible.

Do not optimize by destroying the visual concept.

GATE:
The page remains visually coherent while heavy work is deferred or degraded
on constrained devices.

STOP.
