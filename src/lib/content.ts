/**
 * Every word the page shows.
 *
 * House rule from the client: no numbers and no claims. No statistics,
 * percentages, results or example dollar amounts; the page describes what
 * the product does and nothing more. Plan prices appear in the pricing
 * section only, as terms of sale.
 *
 * Module names follow the product's own sidebar (Conversations, Calendars,
 * Opportunities, Payments, AI Agents, Marketing, Automation, Sites,
 * Reporting), so the page and the app use the same words.
 */

export const SITE = {
  name: "FollowUpHub",
  main: "https://www.followuphub.ai",
  // Where this page is expected to live. Change it if it is published elsewhere.
  url: "https://www.followuphub.ai/small-business",
  email: "support@followuphub.ai",
  app: "https://app.followuphub.ai",
  demo: "https://api.followuphub.ai/widget/bookings/discuss-crm-solution",
  privacy: "https://www.followuphub.ai/privacy",
  terms: "https://www.followuphub.ai/terms",
} as const;

/** Prices and checkout links are the main site's (src/lib/seo.ts). Change both together. */
export const PLANS = [
  {
    id: "basic",
    name: "Basic",
    subtitle: "You set it up",
    price: "49.99",
    setup: "No setup fee",
    checkout: "https://api.followuphub.ai/payment-link/6a50ecd6a655fa0b802a3a0b",
    features: [
      "Missed-call text-back",
      "Conversational SMS and email AI",
      "Booking calendars and reminders",
      "One inbox for every channel",
      "Visual pipeline",
      "Website and funnel builder",
      "Email campaigns and social planner",
    ],
  },
  {
    id: "advanced",
    name: "Advanced",
    subtitle: "We set it up with you",
    price: "49.99",
    setup: "Plus a one-time setup fee",
    checkout: "https://api.followuphub.ai/payment-link/6a50b8cdc981f3feae6e866c",
    recommended: true,
    features: [
      "Everything in Basic",
      "Voice AI that calls new leads back",
      "Long-term nurture for quiet leads",
      "Visual workflow builder",
      "Build your own AI agents",
      "Review requests on autopilot",
      "Setup and text registration done for you",
    ],
  },
] as const;

export type Trade = { id: string; label: string; business: string; ask: string; reply: string };

/** One example reply per kind of business. No prices, no figures. */
export const TRADES: Trade[] = [
  { id: "trades", label: "Trades and home services", business: "Northside Plumbing", ask: "Our furnace just stopped. Can someone come today?", reply: "Sorry to hear that. A technician can come this afternoon. Want me to book it?" },
  { id: "clinics", label: "Clinics", business: "Lakeshore Dental", ask: "I chipped a tooth. Are you taking new patients?", reply: "We are. There’s an opening tomorrow morning. Shall I hold it for you?" },
  { id: "salons", label: "Salons and spas", business: "Maple & Mane", ask: "Anything Saturday for a cut and colour?", reply: "Saturday late morning is open with Jess. Want me to book you in?" },
  { id: "auto", label: "Auto and repair", business: "Ridgeway Auto", ask: "Can you swap my tires to winters this week?", reply: "Yes. Tuesday morning is open. I’ll send a reminder the day before." },
];

/** "Everything included", grouped the way the app's sidebar groups it. */
export const MODULES = [
  { name: "Conversations", items: ["Calls, texts, email, WhatsApp and social in one thread", "Missed-call text-back", "Shared team inbox"] },
  { name: "AI Agents", items: ["Replies to new leads by text and email", "Voice AI callbacks", "Hands off to you when it should"] },
  { name: "Calendars", items: ["Online booking links", "Reminders before every visit", "Team availability"] },
  { name: "Opportunities", items: ["Visual pipeline with your own stages", "Every job’s full history", "See where work stalls"] },
  { name: "Payments", items: ["Invoices sent by text or email", "Card payments online", "Payment reminders"] },
  { name: "Marketing", items: ["Email campaigns", "Social planner", "Review requests"] },
  { name: "Automation", items: ["Triggers for calls, forms and no-shows", "Visual workflow builder", "Ready-made workflows"] },
  { name: "Sites", items: ["Website and landing pages", "Lead forms and funnels", "Booking widget"] },
  { name: "Reporting", items: ["Pipeline and team views", "Lead sources", "Ask AI about your business"] },
];

export type Faq = { q: string; a: string };

export const FAQS: Faq[] = [
  { q: "Who is FollowUpHub for?", a: "Owner-operated businesses that live on the phone: trades and home services, clinics, salons, auto shops, studios and local services." },
  { q: "Is it billed in Canadian dollars?", a: "Yes. Both plans are priced and billed in Canadian dollars." },
  { q: "Is there a contract?", a: "No. You pay month to month and can cancel from your billing settings." },
  { q: "I’m not a tech person. Can I set this up?", a: "Yes. Every account gets a walkthrough with our team, and on Advanced we set everything up with you." },
  { q: "Can I bring my customer list?", a: "Yes. We move your contacts over for you during onboarding." },
  { q: "Is texting customers allowed under CASL?", a: "Replying to someone who contacted you generally is. Marketing messages need consent, and anyone who replies STOP is unsubscribed automatically." },
  { q: "Where is my data stored?", a: "With our platform partners, mainly in the United States. Our privacy policy lists each one, and you can export your data at any time." },
];

/**
 * PLACEHOLDER testimonials, added at the client's request "for now".
 * These are not real customers. While TESTIMONIALS_ARE_SAMPLES is true every
 * card shows a "Sample" tag, so nothing on the page passes as a real review.
 * Replace with real, permissioned quotes and set the flag to false.
 */
export const TESTIMONIALS_ARE_SAMPLES = true;

export const TESTIMONIALS = [
  { name: "Jordan Reyes", role: "Owner, plumbing and heating", quote: "Calls I used to miss on a job now get a text back right away, and they’re often booked before I’m back in the truck." },
  { name: "Amelia Chen", role: "Clinic manager, physiotherapy", quote: "Reminders go out on their own, and patients reply right in the same thread. Our front desk finally has room to breathe." },
  { name: "Sam Okafor", role: "Owner, auto repair shop", quote: "Everything is in one place now: texts, Facebook messages, bookings and invoices. I stopped juggling apps." },
  { name: "Nadia Haddad", role: "Owner, hair studio", quote: "Clients book themselves while I’m with someone in the chair. It sounds like us, not a robot." },
  { name: "Ethan Clarke", role: "Owner, landscaping and snow", quote: "Setup was handled for us, and the AI asks for a review after every job without me thinking about it." },
];
