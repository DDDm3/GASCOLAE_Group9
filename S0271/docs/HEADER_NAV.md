# Header redesign

Supersedes the Step 04 layout. The sand header floats 16px from the top and 24px from the sides on desktop, with an approximately 76px minimum height, 8px corners, logo left, navigation centered in the remaining area, and CTA right. It stays fixed and adds a subtle border/shadow on scroll.

Below 1024px the existing accessible disclosure is retained, with a scrollable menu in short viewports. Without JavaScript the mobile header stays in document flow with visible links. Focus, Escape, outside-click closing and breakpoint handling remain in navigation.js. Anchor offset and skip link account for the fixed header.

Navigation destinations are reserved for later sections. Browser visual/keyboard QA remains pending because no browser connection was available during implementation.
