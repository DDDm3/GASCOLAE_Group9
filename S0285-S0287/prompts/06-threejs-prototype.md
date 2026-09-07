# PHASE 06 — THREE.JS PROTOTYPE

Read docs/05-3d-spec.md and AGENTS.md.

Use the threejs-builder skill.

Implement ONLY the 3D prototype first.

Suggested modules:
src/3d/scene.js
src/3d/terrain.js
src/3d/forest.js
src/3d/carbon-layer.js
src/3d/camera.js

Requirements:
- ES modules
- responsive resize
- constrained pixel ratio
- InstancedMesh where appropriate
- no unnecessary heavy models
- disposal of geometry/materials/textures
- loading state
- WebGL fallback
- reduced-motion fallback
- no blocking page render

Create a minimal demo route/section if needed.

Run a smoke test.

GATE:
- scene loads;
- resize works;
- no obvious console errors;
- fallback works;
- reduced motion works;
- no uncontrolled animation loop;
- no obvious memory leak from repeated initialization.

STOP.
