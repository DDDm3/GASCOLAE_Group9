# HEADER + BUTTON + HERO REFINEMENT
# DO NOT START PROMPT 08 ANIMATION PIPELINE

We need to refine the current landing page before continuing to the animation phase.

There are THREE priorities:

1. Header scroll behavior
2. Button hover contrast bug
3. Hero visual differentiation

Do not redesign the entire website.

==================================================
1. HEADER SCROLL BEHAVIOR
==================================================

Current header:

<header class="navbar" role="banner">

Implement this behavior:

SCROLL DOWN:
- hide the header smoothly

SCROLL UP:
- show the header smoothly

At the top of the page:
- header must remain visible

Do not hide immediately for tiny scroll movements.
Use a small threshold to prevent jitter.

Recommended behavior:

scroll position < 12px:
header visible

meaningful scroll DOWN:
header hidden

meaningful scroll UP:
header visible

IMPORTANT:

If mobile navigation drawer is open:
- header MUST remain visible
- hamburger/close control must remain accessible
- scroll direction must NOT hide the header

Do NOT push the page horizontally.

Do NOT change page layout when header hides.

Preferred implementation:
- sticky header
- transform-based hide/show
- one clear JS scroll-direction state
- requestAnimationFrame or equivalent efficient scroll handling

Avoid:
- continuously changing top/height
- layout reflow on every scroll event
- body transforms
- margin manipulation

==================================================
2. BUTTON HOVER BUG
==================================================

There is currently a visual bug:

The following buttons lose text visibility on hover:

- "Đăng ký tư vấn"
- "Đăng ký tư vấn kỹ thuật"

Before changing CSS, inspect computed styles.

Audit:

.btn
.btn:hover
.btn--primary
.btn--primary:hover
.btn--ghost
.btn--ghost:hover
a:hover

Inspect:
- color
- background-color
- border-color
- box-shadow

Find the exact selector causing the text/background contrast failure.

Do NOT solve with random !important rules.

Do NOT globally change anchor hover behavior.

Button requirements:

PRIMARY BUTTON:
- text remains clearly readable at all states
- hover must preserve strong contrast
- focus-visible must be clearly visible
- active state must be distinguishable

GHOST BUTTON:
- text remains readable
- hover must not produce low contrast
- border remains visually identifiable

Test:
- normal
- hover
- focus
- keyboard focus
- active

==================================================
3. HERO — KEEP CONTENT, CHANGE VISUAL LANGUAGE
==================================================

The current hero content is structurally good.

DO NOT rewrite the main H1 unless necessary.

Current concept:

text on left
+
generic 3D forest visualization on right

This feels too similar to common:
- SaaS landing pages
- AI landing pages
- generic technology websites

We need a stronger GASCOLAE-specific visual identity.

CORE CONCEPT:

"FOREST → MEASUREMENT → DATA → BIOMASS → CARBON MAP"

The hero 3D visualization should communicate that a physical forest is being transformed into spatial carbon data.

The visual sequence should conceptually be:

FOREST
↓
UAV LiDAR SCAN
↓
POINT CLOUD
↓
CANOPY STRUCTURE / CHM
↓
BIOMASS / AGB
↓
CARBON DENSITY

Do NOT make the hero look like a generic decorative 3D forest.

The 3D should feel like:
- scientific visualization
- geospatial data
- remote sensing
- forest measurement
- carbon mapping

NOT:
- generic sci-fi
- neon cyberpunk
- generic AI visualization
- decorative 3D object

==================================================
4. HERO VISUAL DIRECTION
==================================================

Prefer:

- terrain surface
- sparse forest canopy
- LiDAR point cloud
- measurement lines / scan pulses
- subtle spatial grid
- data density
- carbon heatmap transition

Avoid:
- giant glowing sphere
- generic hologram
- excessive neon
- floating random particles
- decorative glassmorphism cards
- generic 3D trees without data meaning

The hero visual should integrate with the dark background rather than appearing as a rectangular "3D card".

Prefer:
- edge-to-edge / atmospheric visualization
- subtle depth
- terrain extending beyond the visual container
- restrained cyan/teal accents

==================================================
5. HERO INTERACTION
==================================================

Do NOT add complex animation yet.

For now define the visual states:

STATE 1:
Forest / terrain

STATE 2:
LiDAR scan

STATE 3:
Point cloud / canopy structure

STATE 4:
Biomass density

STATE 5:
Carbon spatial map

The implementation can initially use a lightweight state machine.

Animation refinement belongs to Prompt 08 later.

==================================================
6. RESPONSIVE HERO
==================================================

Desktop:
- two-column composition
- text approximately 50–55%
- visualization approximately 45–50%
- no excessive empty right space

Tablet:
- stack intelligently
- reduce 3D complexity

Mobile:
ORDER:

1. eyebrow
2. H1
3. description
4. primary CTA
5. secondary CTA
6. compact 3D visualization

Do NOT let the visualization squeeze the text.

Do NOT use hardcoded <br> for H1 wrapping.

Use:
clamp()
minmax()
fluid spacing
responsive grid

==================================================
7. HEADER + HERO RELATIONSHIP
==================================================

The header and hero should feel like one visual system.

Header:
technical / restrained

Hero:
scientific / spatial / data-driven

Avoid generic SaaS patterns.

The visual hierarchy should communicate:

GASCOLAE
↓
FOREST CARBON
↓
MEASUREMENT
↓
SPATIAL DATA
↓
CARBON MAP

==================================================
8. DO NOT MODIFY
==================================================

Do not modify:
- service claims
- regulatory statements
- MRV boundary
- service levels
- pricing
- technical source content
- FAQ content
- AI agent content

Do not invent:
- accuracy percentages
- customer numbers
- project numbers
- certifications
- ROI
- unsupported technical specifications

==================================================
9. VALIDATION
==================================================

Test:

375×812
390×844
430×932
768×1024
1024×768
1280×800
1440×900

Verify:

HEADER
- scroll down hides
- scroll up reveals
- top remains visible
- mobile drawer keeps header accessible

BUTTONS
- primary hover text readable
- ghost hover text readable
- focus visible
- active visible

HERO
- no horizontal overflow
- no clipping
- no excessive empty space
- H1 remains readable
- CTA remains readable
- 3D does not squeeze text

==================================================
10. OUTPUT
==================================================

Before editing:
report:

A. exact cause of button hover bug
B. current header implementation
C. proposed header implementation
D. current hero weaknesses
E. proposed hero visual direction

Then implement ONLY the required changes.

After implementation:
report:
- files modified
- selectors modified
- JS behavior
- responsive test results
- remaining issues

Do NOT start Prompt 08.
STOP.