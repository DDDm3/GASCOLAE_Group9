# Step 16 — CTA portal and lead form

The contact section uses the existing CTA video inside a contained media portal, with the form on an opaque sand surface. The video is decorative, muted, inline and pauses outside the viewport. Reduced motion shows its poster instead.

Five source fields appear initially: name, organization, email/phone, site location/area and measurement goal. Level, expected timing and available-data notes use progressive disclosure. All eight controls have visible labels. There is no upload field, so the public form does not request Internal/Restricted files.

Because `cta.endpoint` remains null, the form has no action or submit control. The exact button label is retained as a non-submitting button; activating it announces that online submission is unavailable. The interface states this before data entry and does not claim success, store values or make a network request. Required-field rules remain unset because the source does not define them.

Generate with `node S0271/scripts/build-contact.mjs`; append `--check` to validate synchronization. Checks passed for generator consistency, JavaScript syntax, one form, eight labelled fields, unique IDs, valid ARIA references, no upload/action/submit, media paths, and Journey regressions. Real browser layout, video playback and keyboard/screen-reader QA remain pending because no browser connection is available.
