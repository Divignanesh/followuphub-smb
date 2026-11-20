# FollowUpHub for small business: layout (v6)

Same product as the real estate site, for owner-operators anywhere: trades,
clinics, salons, auto shops, studios. Priced in USD. No country references.

## Sources

- **Colours: the real estate site.** Teal-green `#1a6b5a` for actions, mist
  `#eaf5f0` into mint inside panels. No purple (client, 2026-11).
- **Layout and components: Flowa** (Vektora, dribbble.com/shots/27690000).
- **Closing band and trial popup: GoHighLevel** (gohighlevel.com/7658a9).
- **Base: white.** Colour lives inside panels only.

## Sections

| # | Section | Pattern |
|---|---------|---------|
| 1 | Nav | segmented track, active pill follows scroll; "For Real Estate" links to followuphub.ai |
| 2 | Hero | pill "The AI front desk for small businesses"; one CTA (trial). Live cards: invoices flip, bookings slide, missed call → Vaani calls back, reviews slide (incl. +160% card) |
| 3 | Works with | quiet greyed logo row |
| 4 | Who it's for | auto-advancing carousel; list in content.ts TRADES (client to send final list) |
| 5 | Overview bento | Dashboard (pipeline + live activity feed), reminders, availability |
| 6 | Feature rows | Conversations (self-playing, clickable), Opportunities (self-moving), AI Agents |
| 7 | Everything included | the app's nine modules |
| 8 | Pricing | one card, $39.99; founder's plan auto-ticks to $29.99 (25% off); $99.99 setup banner |
| 9 | Testimonials | ~45 short cards, two drifting rows. PLACEHOLDERS (TESTIMONIALS_ARE_SAMPLES) |
| 10 | FAQ, closing band, footer | |

## Trial popup (components/TrialPopup.tsx)

Two steps. Opened by every "Start free trial" and automatically once per
session: 8 s on page + 6 s idle, or desktop exit intent, or 45 s fallback.
Snoozed 3 days after closing; never after submitting. Submits to
SITE.leadWebhook (optional) and redirects to checkout with prefill.

## Rules

- One CTA: "Start free trial". No "Book a demo".
- Testimonials stay labelled as samples until real, permissioned quotes exist.
- Prerendered to static HTML.

## Third-party components (src/components/magic/)

Vendored, adapted to the page's tokens and to framer-motion; each keeps a
source note at the top of its file.

| Component | Source | Used in |
|---|---|---|
| Shimmer Button | Magic UI (MIT), via 21st.dev | TrialButton: hero, tabs, pricing |
| Animated Tabs | educalvolpz, via 21st.dev | "Your whole front desk" tabs |
| Animated Beam | Magic UI registry (MIT) | channels → FollowUpHub → outcomes |
| Number Ticker | Magic UI registry (MIT) | pricing, $39.99 → $29.99 |
| Word Rotate | Magic UI registry (MIT) | hero headline outcome |
