# Performance SEO and public-data safety

```text
Optimize the completed S0070 landing page without changing approved meaning or visual direction.

Performance:
- Use responsive AVIF or WebP images with explicit dimensions.
- Lazy-load below-the-fold media.
- Provide a compressed poster for the hero video.
- Avoid autoplay video on mobile and reduced-motion configurations.
- Prevent layout shifts caused by fonts, media and accordions.
- Remove unused client-side JavaScript where possible.

SEO:
- Page title: S0070 | UAV cảm biến đa phổ & AI phát hiện bất thường, phân tích vật liệu
- Use the approved meta description from Asset 09.
- Add canonical handling through the project's standard configuration.
- Add valid service-oriented structured data only when every property is supported.
- Do not add ratings, reviews, prices or organization claims without sources.

Security and privacy:
- Validate and sanitize form inputs.
- Add rate-limit and abuse-control integration points if the backend supports them.
- Do not log sensitive free-text content by default.
- Add a warning not to submit coordinates, site plans or restricted information.
- Document where authentication, authorization, retention and handoff must be implemented by the owning team.

Run the production build and report measurable bundle or asset issues that remain.
```
