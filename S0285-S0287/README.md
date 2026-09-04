# Antigravity Skill Pipeline — S0285-S0287

Copy this folder into the root of your VS Code project.

## How to use

1. Open the project in VS Code.
2. Ensure Antigravity is operating on the project root.
3. Read `AGENTS.md`.
4. Install the skills listed in `PIPELINE.md`.
5. Give Antigravity the corresponding prompt from `prompts/01...` onward.
6. Do not ask it to execute all phases in one shot.
7. After each phase, verify the gate before moving to the next.

## Recommended working rhythm

Phase 01 → review content
Phase 02 → review structure
Phase 03 → review visual direction
Phase 04 → approve design system
Phase 05 → approve 3D concept
Phase 06 → test 3D
Phase 07 → review full page
Phase 08 → tune motion
Phase 09 → optimize
Phase 10 → accessibility/UX audit
Phase 11 → release QA

## Source principle

The supplied GASCOLAE content remains the source of truth.
Do not replace source-backed content with generic marketing copy.

## Important MRV boundary

The landing page must not imply that the service replaces independent
MRV validation/reporting. The supplied content explicitly preserves that
boundary.

## Stack

HTML + CSS + Vanilla JS + Three.js.
React/Next.js is intentionally not required for this landing page.
