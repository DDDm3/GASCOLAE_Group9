# AGENTS.md — Antigravity Project Rules

## Project
Project: S0285-S0287 — Đánh giá & lập bản đồ carbon sinh khối rừng bằng UAV LiDAR.
Stack: HTML + CSS + Vanilla JavaScript + Three.js.
IDE/Agent: Visual Studio Code + Antigravity.

## Mission
Build a technically credible, visually distinctive landing page that explains:
forest → measurement → biomass → carbon → spatial mapping → decision support.

The 3D layer is a storytelling/data-visualization layer, not decoration.

## Source-of-truth rules
1. Ground service claims in the supplied GASCOLAE assets.
2. Never invent prices, ROI, customer counts, project counts, certifications,
   accuracy guarantees, legal conclusions, or unsupported technical specifications.
3. If a fact is unavailable or uncertain, write `[NEEDS VERIFICATION]`.
4. Do not claim the service replaces independent MRV validation/reporting.
5. Do not merge facts from unrelated services.
6. Preserve the service terminology used in the source assets.

## Known content anchors
- Service ID: S0285-S0287.
- Service concerns forest biomass/carbon assessment and mapping.
- Technologies/capabilities appearing in the supplied service material include
  UAV LiDAR, RGB/multispectral sensing, ground plots, D1.3, Hvn, CHM, DTM,
  DSM, allometric equations, ML biomass modelling and GIS outputs.
- Deliverables include DTM/DSM/CHM and AGB/carbon maps by plot plus methodology
  and error reporting, subject to source verification.
- The landing-page content explicitly positions the output as technical
  measurement data and standardized spatial outputs supporting MRV workflows,
  not as a replacement for independent MRV validation/reporting.

## Design direction
Prefer:
- scientific visualization
- remote sensing / LiDAR / GIS visual language
- terrain contours, point clouds, canopy structure, spatial heatmaps
- restrained environmental palette
- strong typography and hierarchy
- editorial composition
- data-driven motion

Avoid:
- generic eco/green landing-page clichés
- excessive gradients
- excessive glassmorphism
- decorative leaf icons as the main visual language
- stock-photo-first design
- fake dashboards
- fake statistics
- unnecessary UI chrome

## 3D rules
Use Three.js only where it communicates:
- terrain
- canopy structure
- LiDAR/point-cloud concepts
- biomass/carbon density
- spatial mapping

Prefer InstancedMesh, lightweight geometry/materials, LOD where useful,
lazy loading, frustum culling, constrained device pixel ratio, and proper
resource disposal.

Always provide:
- loading state
- WebGL fallback
- reduced-motion behavior
- mobile degradation/fallback

Never make the 3D scene a blocker for reading the page.

## Accessibility / UX
- semantic HTML
- keyboard-accessible interactions
- visible focus states
- sufficient contrast
- real buttons/links instead of clickable divs
- touch-friendly targets
- reduced motion support
- meaningful loading/error states

## Architecture
Keep content, UI, animation, and 3D logic modular.
Do not put the whole application in one JS file.

Suggested structure:
src/
  index.html
  css/
  js/
  3d/
assets/
docs/
tests/

## Phase discipline
The Agent must not silently skip a phase.
Each phase:
1. reads the required inputs;
2. performs the requested work;
3. writes the required artifact;
4. runs its gate checklist;
5. reports PASS / PASS WITH WARNINGS / BLOCKED;
6. stops unless the user explicitly asks to continue.

Never replace a failed gate with an assumption.

## Encoding Rules

- All project files must use UTF-8 encoding.
- All Markdown, HTML, CSS, JS and JSON files must be saved as UTF-8.
- Preserve Vietnamese Unicode characters exactly.
- Never convert UTF-8 text to Windows-1252, ISO-8859-1 or another legacy encoding.
- Before completing a phase, verify that Vietnamese characters such as:
  Đ ă â ê ô ơ ư đ á à ả ã ạ
  render correctly in generated artifacts.

## Encoding Gate — Mandatory

All generated project files must be UTF-8 encoded.

Before completing every phase:
1. Verify all Markdown files are UTF-8.
2. Verify Vietnamese characters render correctly.
3. Verify symbols such as →, –, ≥, ✅, ° and × are preserved.
4. Never emit mojibake such as:
   - Ã
   - Ä
   - Å
   - â€
   - â†
   - âœ
5. If encoding corruption is detected:
   - do not mark the phase PASS;
   - repair the file;
   - re-read the repaired file;
   - verify again before continuing.

## Final quality bar
The page must feel like a credible scientific/technical service,
not a generic AI-generated environmental template.
