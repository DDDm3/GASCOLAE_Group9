# Performance, SEO and public-data safety

## Performance

- Hero artwork uses responsive 640 and 1024 pixel WebP sources with explicit dimensions. The full WebP is also the compressed poster when an optional video is configured.
- The workflow image is a 36 KB WebP with explicit dimensions, lazy loading and asynchronous decoding. Hero and brand media decode asynchronously.
- Optional video starts with `preload="none"`; its source is attached only above 800 CSS pixels when reduced motion and data saver are off.
- System font fallbacks avoid font downloads and font-driven layout shifts. Media dimensions and native closed `details` reserve predictable layout behavior.
- The preview server uses Brotli for text assets when accepted, ETags for revalidation, no-cache for HTML and a one-hour browser cache for versionable assets.
- Client JavaScript remains dependency-free and limited to navigation, FAQ state, optional video loading, local form validation and level selection.

## SEO

- The title and description come from the approved Asset 09 copy in `src/content.mjs`.
- A minimal Schema.org `Service` object contains only the approved name, service type and description. It intentionally omits ratings, reviews, prices, locations and unsupported organization claims.
- Production canonical and Open Graph URL are emitted only when `SITE_URL` is a valid final HTTPS URL without a query or fragment. Builds without it remain `noindex, nofollow` previews.

## Security and privacy integration boundary

The current form is a local preview and cannot transmit or retain data. It trims values, enforces required fields and length limits, validates email format, rejects control characters and HTML delimiters, and warns users not to enter coordinates, site plans, security details or restricted data. The browser-side checks are usability controls; a future backend must independently normalize, validate and encode every value.

Before enabling submission, the owning team must provide and review:

- an authenticated HTTPS endpoint and server-side authorization for staff access;
- per-IP and per-identity rate limiting, request-size limits, abuse detection and CSRF/origin controls appropriate to the chosen architecture;
- approved storage location, encryption, retention period, deletion process and access audit trail;
- a handoff route that sends only the minimum approved contact data to the responsible team;
- log redaction that excludes submitted names, email addresses, free text, coordinates and site data by default;
- incident handling and operational ownership for rejected, quarantined and failed requests.

The preview CSP keeps `connect-src` and `form-action` disabled. Those directives must be narrowed to the approved endpoint when the backend is introduced. Authentication, authorization, rate limiting and retention cannot be implemented safely in this static repository.

## Production build measurements

The build contains no third-party runtime packages or remote requests. The hero variants remain approximately 22 KB and 48 KB; the workflow illustration is about 36 KB. The replacement transparent logo derivative is about 20 KB. The three new responsive image pairs range from roughly 14 KB to 76 KB and lazy-load below the fold. The saved Gemini page under `assets/videos` contains no playable video and is never copied into the public build.
