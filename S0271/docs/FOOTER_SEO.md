# Step 17 — Footer and SEO

The page title and meta description are generated verbatim from the `seo` data object. Open Graph title/description, Vietnamese locale, website type, a summary-large-image card declaration, robots index/follow and the existing PNG logo favicon are included. No keywords meta tag or repeated keyword block is added.

Canonical markup remains omitted because `seo.canonicalUrl` is null and the deployment URL is not confirmed. Add a canonical only after the production origin and route are known. Social image metadata is also omitted because no public absolute image URL exists yet.

The minimal semantic footer shows the GASCOLAE logo, Service ID S0271, navigation to existing page sections and a short service descriptor. It introduces no unverified company address, legal links, certification or contact details.

Generate with `node S0271/scripts/build-footer-seo.mjs`; append `--check` to validate synchronization. Checks passed for generator consistency, JavaScript syntax, exact SEO copy, one semantic footer, unique IDs and valid footer anchor destinations. Search-engine preview and real browser layout remain unverified because the production URL and browser connection are unavailable.
