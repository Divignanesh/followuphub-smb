/**
 * Every word the page shows.
 *
 * House rule from the client: keep claims light. Prices live in the pricing
 * section, and the one figure elsewhere is the review-growth card in the
 * hero, which the client asked for (feedback, 2026-11). No mention of any
 * country: the page is for small businesses anywhere, priced in USD.
 *
 * Module names follow the product's own sidebar (Conversations, Calendars,
 * Opportunities, Payments, AI Agents, Marketing, Automation, Sites,
 * Reporting), so the page and the app use the same words.
 */

export const SITE = {
  name: "FollowUpHub",
  main: "https://www.followuphub.ai",
  // The real estate product lives on the main site.
  realEstate: "https://www.followuphub.ai",
  // Where this page is expected to live. Change it if it is published elsewhere.
  url: "https://www.followuphub.ai/small-business",
  email: "support@followuphub.ai",
  app: "https://app.followuphub.ai",
  privacy: "https://www.followuphub.ai/privacy",
  terms: "https://www.followuphub.ai/terms",
  /**
   * Where the trial form sends people once they finish step 2. The form adds
   * name, email and phone as query parameters so checkout is prefilled.
   * TODO(client): replace with payment links for $39.99 and the $29.99
   * founder's plan; these two still point at the old plans.
   */
  checkout: "https://api.followuphub.ai/payment-link/6a50ecd6a655fa0b802a3a0b",
  checkoutFounder: "https://api.followuphub.ai/payment-link/6a50ecd6a655fa0b802a3a0b",
  /** Optional: a webhook (e.g. a FollowUpHub inbound workflow) that receives each trial lead as JSON. */
  leadWebhook: "",
} as const;

export const TRIAL_DAYS = 14;

/** One plan. The founder's plan is the same plan at 25% off. Prices in USD. */
export const PLAN = {
  name: "FollowUpHub",
  price: "39.99",
  founderPrice: "29.99",
  founderOff: "25%",
  setupFee: "99.99",
  features: [
    "Missed-call text-back",
    "AI agent that calls missed callers back",
    "Conversational SMS and email AI",
    "One inbox for every channel",
    "Booking calendars and reminders",
    "Visual pipeline",
    "Invoices, quotes and card payments",
    "Review requests on autopilot",
    "Website, funnels and email campaigns",
    "Visual workflow builder",
  ],
} as const;

export type Trade = { id: string; label: string; business: string; ask: string; reply: string };

/**
 * One example reply per kind of business. The client will send the final
 * list; add or remove entries here and the carousel follows.
 */
export const TRADES: Trade[] = [
  { id: "trades", label: "Trades and home services", business: "Northside Plumbing", ask: "Our furnace just stopped. Can someone come today?", reply: "Sorry to hear that. A technician can come this afternoon. Want me to book it?" },
  { id: "clinics", label: "Clinics", business: "Lakeshore Dental", ask: "I chipped a tooth. Are you taking new patients?", reply: "We are. There’s an opening tomorrow morning. Shall I hold it for you?" },
  { id: "salons", label: "Salons and spas", business: "Maple & Mane", ask: "Anything Saturday for a cut and color?", reply: "Saturday late morning is open with Jess. Want me to book you in?" },
  { id: "auto", label: "Auto and repair", business: "Ridgeway Auto", ask: "Can you swap my tires this week?", reply: "Yes. Tuesday morning is open. I’ll send a reminder the day before." },
  { id: "cleaning", label: "Cleaning services", business: "Brightside Cleaning", ask: "Do you do move-out cleans? We leave on the 30th.", reply: "We do. I can book a crew for the 29th. Morning or afternoon?" },
  { id: "fitness", label: "Gyms and studios", business: "Core Studio", ask: "Is there a beginner class this week?", reply: "Yes, Wednesday evening. Want me to save you a spot?" },
  { id: "landscaping", label: "Landscaping and lawn", business: "Greenway Lawn Care", ask: "Can I get a quote for weekly mowing?", reply: "Happy to. Someone can stop by Friday to take a look. Does that work?" },
  { id: "pets", label: "Pet care and grooming", business: "Happy Paws", ask: "Can you fit in a groom for my doodle?", reply: "Thursday afternoon is open. I’ll book it and text you a reminder." },
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
  { q: "How does the free trial work?", a: `You get ${TRIAL_DAYS} days with everything switched on. Cancel before it ends and you won’t be charged.` },
  { q: "What is the founder’s plan?", a: "Our launch price for early customers: the full product at 25% off the regular monthly price, for as long as you stay subscribed." },
  { q: "What is the setup fee for?", a: "A one-time fee. Our team connects your phone number, registers your business for texting, imports your contacts and sets up your AI agent with you." },
  { q: "Is there a contract?", a: "No. You pay month to month and can cancel from your billing settings." },
  { q: "I’m not a tech person. Can I set this up?", a: "Yes. Our team sets everything up with you and walks you through it." },
  { q: "Can I bring my customer list?", a: "Yes. We move your contacts over for you during onboarding." },
  { q: "Is texting customers allowed?", a: "Replying to someone who contacted you generally is. Marketing messages need consent, and anyone who replies STOP is unsubscribed automatically." },
  { q: "Where is my data stored?", a: "With our platform partners, mainly in the United States. Our privacy policy lists each one, and you can export your data at any time." },
];

/**
 * PLACEHOLDER testimonials. These are not real customers. While
 * TESTIMONIALS_ARE_SAMPLES is true the section says so, so nothing on the
 * page passes as a real review (fake reviews are illegal to publish as real
 * in the US under the FTC's 2024 rule). Replace with real, permissioned
 * quotes and set the flag to false.
 */
export const TESTIMONIALS_ARE_SAMPLES = true;

export type Testimonial = { name: string; role: string; quote: string };

export const TESTIMONIALS: Testimonial[] = [
  { name: "Jordan Reyes", role: "Plumbing and heating", quote: "Missed calls get a text back before I’m off the ladder." },
  { name: "Amelia Chen", role: "Physiotherapy clinic", quote: "Reminders go out on their own. Our front desk can breathe." },
  { name: "Sam Okafor", role: "Auto repair", quote: "Texts, Facebook, bookings and invoices, all in one place." },
  { name: "Nadia Haddad", role: "Hair studio", quote: "Clients book themselves while I’m with someone in the chair." },
  { name: "Ethan Clarke", role: "Landscaping", quote: "It asks for a review after every job. I never think about it." },
  { name: "Maria Lopez", role: "House cleaning", quote: "I stopped losing weekend inquiries. They just get booked." },
  { name: "Derek Walsh", role: "Electrician", quote: "The callback agent is the best hire I never made." },
  { name: "Priya Nair", role: "Dental office", quote: "No-shows dropped once reminders started going out." },
  { name: "Tom Becker", role: "HVAC", quote: "Customers think we have a full-time receptionist." },
  { name: "Lucia Ferreira", role: "Nail salon", quote: "Setup took one call. It was running that afternoon." },
  { name: "Kevin Park", role: "Mobile detailing", quote: "Quotes go out by text and people pay from their phone." },
  { name: "Hannah Moore", role: "Yoga studio", quote: "New students get answered at 11pm without me." },
  { name: "Omar Siddiqui", role: "Roofing", quote: "Every lead lands on the board. Nothing slips anymore." },
  { name: "Grace Kim", role: "Med spa", quote: "One inbox for Instagram and texts saved my sanity." },
  { name: "Luke Brennan", role: "Pest control", quote: "Invoice reminders mean I chase payments way less." },
  { name: "Sofia Rossi", role: "Pet grooming", quote: "It books around my real hours. No double bookings." },
  { name: "Marcus Hill", role: "Garage doors", quote: "Calls I miss on a job now turn into booked visits." },
  { name: "Elena Petrova", role: "Massage therapy", quote: "Clients love rescheduling by text instead of calling." },
  { name: "Ryan Murphy", role: "Painting", quote: "Simple enough that my whole crew uses it." },
  { name: "Aisha Bello", role: "Braiding salon", quote: "The AI sounds like us, not a robot." },
  { name: "Chris Turner", role: "Handyman", quote: "I finally know which jobs are waiting on a quote." },
  { name: "Julia Novak", role: "Chiropractor", quote: "Review requests went out and Google reviews followed." },
  { name: "Ben Carter", role: "Tree service", quote: "Storm week was chaos. The agent handled the phones." },
  { name: "Mei Lin", role: "Tutoring center", quote: "Parents get answers fast, and trial lessons get booked." },
  { name: "Dylan Foster", role: "Pool service", quote: "Weekly reminders run themselves. Customers notice." },
  { name: "Rachel Green", role: "Bakery and catering", quote: "Catering inquiries no longer sit in my DMs for days." },
  { name: "Andre Silva", role: "Moving company", quote: "Every quote request gets a reply in minutes." },
  { name: "Fatima Khan", role: "Optometry clinic", quote: "Our phones are calmer and the calendar is fuller." },
  { name: "Jake Morrison", role: "Fencing", quote: "Worth it for missed-call text-back alone." },
  { name: "Isabel Cruz", role: "Esthetician", quote: "I spend my evenings off now, not answering texts." },
  { name: "Nate Coleman", role: "Appliance repair", quote: "The pipeline view shows me exactly what’s next." },
  { name: "Olivia Bennett", role: "Dog training", quote: "Booking links in every reply made it so easy." },
  { name: "Victor Huang", role: "Flooring", quote: "Leads from the website get followed up automatically." },
  { name: "Chloe Adams", role: "Pilates studio", quote: "Waitlist texts fill cancelled spots for us." },
  { name: "Sean O’Brien", role: "Plumbing", quote: "Paid invoices show up while I’m still on site." },
  { name: "Leila Ahmadi", role: "Physio and rehab", quote: "Our team shares one inbox and nothing gets missed." },
  { name: "Tyler Brooks", role: "Window cleaning", quote: "Repeat customers rebook from a reminder text." },
  { name: "Anna Kowalski", role: "Barbershop", quote: "Walk-ins and bookings, finally in one calendar." },
  { name: "Marco Bianchi", role: "Auto body", quote: "Customers get updates without me picking up the phone." },
  { name: "Zoe Mitchell", role: "Photography", quote: "Inquiries get a reply and a booking link instantly." },
  { name: "Daniel Ortiz", role: "Junk removal", quote: "Same-day jobs get booked while I’m driving." },
  { name: "Emily Watson", role: "Speech therapy", quote: "Parents confirm appointments with one reply." },
  { name: "Hassan Ali", role: "Locksmith", quote: "Late-night calls get answered. That’s real money." },
  { name: "Megan Price", role: "Lash studio", quote: "My Instagram DMs turn into bookings now." },
  { name: "Paul Dubois", role: "Carpentry", quote: "Quote sent, quote accepted, invoice paid. All in one app." },
];
