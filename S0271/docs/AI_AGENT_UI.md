# Step 15 — Consultation demo

The section presents the requested title, intro and four suggested questions. It explicitly says DEMO and that AI is not connected. Responses are prepared content derived from the existing overview, levels, deliverables, FAQ and quantification boundaries in `agentDemo`; they are not model-generated live responses.

Native details/summary opens each response near its question and works with keyboard or without JavaScript. Mobile stacks the intro and questions. There is no message input, submission, network request, fake typing animation or stored conversation. The expert CTA reserves `#contact` for the subsequent lead form.

`agent.endpoint` remains null and restrictions remain unchanged. Missing technical/HSE/legal/pricing/verification decisions require an expert. No internal pricing data, numerical results or new performance promises are added.

Generate with `node S0271/scripts/build-agent.mjs`; append `--check` to verify synchronization. Passed: generation/syntax checks, four demo responses, explicit demo label, absence of submission inputs, balanced HTML, unique IDs and valid ARIA references. Native browser behavior and visual responsive QA remain unverified because the session has no browser connection.
