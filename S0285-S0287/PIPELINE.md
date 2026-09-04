# Antigravity Skill Pipeline — Forest Carbon Landing Page

## 0. Objective
Create a production-oriented landing page for GASCOLAE service S0285-S0287
using HTML/CSS/Vanilla JS + Three.js in VS Code with Antigravity.

## 1. Install the selected skills

Run these from the project root:

```bash
npx skills add https://github.com/anthropics/skills --skill frontend-design
npx skills add https://github.com/vercel-labs/agent-skills --skill web-design-guidelines
npx skills add https://github.com/connorads/dotfiles --skill web-animation-design
npx skills add https://github.com/chongdashu/cc-skills-nanobananapro --skill threejs-builder
npx skills add https://github.com/smithery.ai/webapp-testing --skill webapp-testing
```

Optional:
```bash
npx skills add https://github.com/anthropics/skills --skill frontend-design
```

Do NOT install React-specific best-practice skills unless the stack changes
to React/Next.js.

## 2. Execution order

01 — Source & content contract
02 — Information architecture
03 — Brand / visual direction
04 — Frontend design system
05 — 3D specification
06 — Three.js prototype
07 — Landing-page implementation
08 — Animation / interaction
09 — Performance
10 — Web design guidelines audit
11 — Functional QA / final release gate

## 3. Required artifacts

docs/
  00-project-brief.md
  01-content-contract.md
  02-information-architecture.md
  03-visual-direction.md
  04-design-system.md
  05-3d-spec.md
  06-implementation-notes.md
  07-performance-spec.md
  08-qa-report.md
  09-final-release-report.md

## 4. Hard gates

G1 Content:
No unsupported claim may enter the implementation.

G2 Visual:
Typography, palette, composition, spacing and 3D role are defined.

G3 3D:
A working prototype exists with fallback/reduced-motion/performance controls.

G4 Implementation:
All primary sections work on desktop and mobile.

G5 Accessibility:
No P0/P1 accessibility issue remains.

G6 QA:
No blocking functional defect remains.

## 5. Stop conditions

STOP and ask for user input when:
- source content conflicts materially;
- a legal/regulatory claim cannot be verified;
- pricing is requested but not supplied;
- an implementation requires credentials/API keys;
- a visual asset is required but unavailable;
- a 3D asset would create an unacceptable performance risk.

## 6. Phase report format

At the end of every phase output:

STATUS: PASS | PASS WITH WARNINGS | BLOCKED

COMPLETED:
- ...

ARTIFACTS:
- ...

RISKS:
- ...

NEEDS USER DECISION:
- ...

NEXT PHASE:
- ...

Do not execute the next phase automatically.
