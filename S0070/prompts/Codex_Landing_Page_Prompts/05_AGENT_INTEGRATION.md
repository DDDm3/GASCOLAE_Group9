# S0070 Service Assistant

```text
Implement the public-facing S0070 Service Assistant block according to Assets 08, 09 and 10.

UI requirements:
- Display name: S0070 Service Assistant
- Show the approved welcome message.
- Provide four suggested questions covering overview, service levels, HSI and deployment conditions.
- Include a visible handoff action: Liên hệ chuyên gia / Trao đổi nhu cầu.
- Show a short notice that the assistant uses approved service information and does not replace expert review.

Behavior requirements:
- Ground answers only in the permitted S0070 sources.
- Preserve CẦN XÁC MINH and restricted classifications.
- Never invent pricing, discounts, KPI, SLA, legal advice or equipment specifications.
- Never expose Internal or Restricted information.
- Do not accept or encourage sensitive coordinates, site plans or security details in the public chat.
- Escalate commercial, legal, security, project-specific and out-of-source questions.
- Do not mix another service ID into S0070.

If no live agent endpoint is available, implement a clearly labeled non-deceptive UI shell with documented integration interfaces. Do not fake live AI responses.
```
