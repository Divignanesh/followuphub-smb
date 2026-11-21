import { PLAN, TRIAL_DAYS, type Faq } from "./content";

/**
 * Head-to-head comparison pages, one per tool small businesses most often
 * weigh FollowUpHub against. Each entry feeds its page, its route meta, its
 * FAQPage schema and the cross-links between pages, so adding a competitor
 * here is the whole job.
 *
 * Competitor columns come only from each vendor's own public pricing and
 * feature pages, checked on the date in COMPARE_DATES.modified. The source
 * URLs sit in a comment above each entry. Anything we could not confirm on an
 * official page reads "Not listed": that means the vendor's page does not say
 * so, not that the product lacks it. Re-check before bumping the date.
 *
 * FollowUpHub's column is shared (see OUR_COLUMN) and reads its price from
 * content.ts, so its claims cannot drift between pages.
 */

export const COMPARE_SLUGS = [
  "jobber",
  "housecall-pro",
  "podium",
  "hubspot",
  "thryv",
  "birdeye",
  "square-appointments",
  "servicetitan",
] as const;

export type CompareSlug = (typeof COMPARE_SLUGS)[number];
export type ComparePath = `/followuphub-vs-${CompareSlug}`;

export const comparePath = (slug: CompareSlug): ComparePath => `/followuphub-vs-${slug}`;
export const COMPARE_PATHS = COMPARE_SLUGS.map(comparePath);

/** Bump `modified` by hand when a comparison's content actually changes. */
export const COMPARE_DATES = { published: "2026-11-21", modified: "2026-11-21" } as const;

/** Row order is fixed; each competitor supplies a value for every key. */
export const CAPABILITIES = [
  ["textback", "Missed-call text-back"],
  ["voice", "AI voice callbacks and call answering"],
  ["inbox", "One inbox for calls, texts, email and social"],
  ["booking", "Online booking and reminders"],
  ["payments", "Quotes, invoices and card payments"],
  ["reviews", "Review requests"],
  ["pipeline", "Visual pipeline"],
  ["websites", "Website and funnels"],
  ["campaigns", "Email and SMS campaigns"],
  ["pricing", "Starting price"],
] as const;

export type CapabilityKey = (typeof CAPABILITIES)[number][0];

export const OUR_COLUMN: Record<CapabilityKey, string> = {
  textback: "Included: every missed caller gets a text back",
  voice: "Included: our AI agent Vaani calls missed callers back",
  inbox: "Calls, texts, email, WhatsApp and social in one thread",
  booking: "Booking links, team calendars and reminders",
  payments: "Quotes, invoices and card payments included",
  reviews: "Review requests sent automatically after each job",
  pipeline: "Included, with your own stages",
  websites: "Website, landing pages and funnels included",
  campaigns: "Email campaigns and automated text workflows",
  pricing: `$${PLAN.price}/mo flat, ${TRIAL_DAYS}-day free trial`,
};

export type Competitor = {
  slug: CompareSlug;
  name: string;
  /** What kind of product it is, shown as the page kicker. */
  category: string;
  /** Meta description, and the card blurb on other pages. */
  summary: string;
  /** Hero paragraph: what the product is and who it suits. */
  intro: string;
  reasons: { title: string; body: string }[];
  theirs: Record<CapabilityKey, string>;
  faqs: Faq[];
};

const pricingFaq = (name: string, theirs: string): Faq => ({
  q: `How does FollowUpHub pricing compare to ${name}?`,
  a: `FollowUpHub is one plan at $${PLAN.price} per month with every feature switched on, and a ${TRIAL_DAYS}-day free trial. There is no contract. Setup is free if you do it yourself, or our team can do it for you for a one-time $${PLAN.setupFee}. ${theirs}`,
});

const summaryTail = `from $${PLAN.price}/month.`;

export const COMPETITORS: Record<CompareSlug, Competitor> = {
  /*
   * Sources, checked 2026-11-21:
   * - https://www.getjobber.com/pricing/ (plans, add-ons, card rates, 14-day trial)
   * - https://help.getjobber.com/en/articles/receptionistpowered-by-jobber-ai/
   *   (Receptionist can text callers who hang up; search-result excerpt)
   * Unified inbox and marketing channels could not be confirmed.
   */
  jobber: {
    slug: "jobber",
    name: "Jobber",
    category: "Field service software",
    summary: `FollowUpHub vs Jobber: missed-call text-back, AI callbacks, one inbox, booking, invoices and reviews in one plan ${summaryTail}`,
    intro:
      "Jobber is a solid tool for running jobs once they are booked: scheduling crews, quoting, invoicing and getting paid. The front desk work around it, like answering calls and following up, comes as paid add-ons. FollowUpHub puts that front desk at the center and includes it in the plan.",
    reasons: [
      {
        title: "The AI receptionist costs extra",
        body: "Jobber lists its AI Receptionist as a $99 a month add-on on most plans. In FollowUpHub, missed-call text-back and AI callbacks are part of the one plan.",
      },
      {
        title: "Growth tools are sold one by one",
        body: "Jobber prices its pipeline and marketing suite as separate add-ons. FollowUpHub includes the pipeline, email campaigns, review requests and workflows from the start.",
      },
      {
        title: "Price rises with each user",
        body: "Jobber's entry plan covers one user, with extra users billed monthly. FollowUpHub is one flat monthly price.",
      },
      {
        title: "Jobber is stronger on crew scheduling",
        body: "If you dispatch several crews and need route planning and job costing, Jobber goes deeper there. FollowUpHub is built for winning and booking the work.",
      },
    ],
    theirs: {
      textback: "Through the Receptionist add-on",
      voice: "AI Receptionist add-on, $99/mo (included in Plus)",
      inbox: "Two-way texting; other channels not listed",
      booking: "Online booking; automated reminders from the Connect plan",
      payments: "Quotes, invoices and card payments",
      reviews: "Reviews add-on (price not listed)",
      pipeline: "Pipeline add-on, $49/mo",
      websites: "Website included",
      campaigns: "Marketing Suite add-on, $99/mo",
      pricing: "From $49/mo for 1 user ($29/mo billed annually)",
    },
    faqs: [
      {
        q: "What is a good Jobber alternative for a small business?",
        a: "If your biggest problem is missed calls and slow follow-up, FollowUpHub fits well. It texts back every missed call, has an AI agent call people back, keeps every conversation in one inbox, and handles booking, reminders, quotes, invoices and review requests in one plan.",
      },
      {
        q: "Does FollowUpHub handle quotes and invoices like Jobber?",
        a: "Yes. You can send quotes and invoices by text or email and take card payments online. Teams that need detailed crew dispatch and job costing may still prefer a field service tool alongside it.",
      },
      pricingFaq(
        "Jobber",
        "Jobber's public pricing starts at $49 per month for one user on monthly billing, with extra users and add-ons like the AI Receptionist priced on top.",
      ),
    ],
  },

  /*
   * Sources, checked 2026-11-21:
   * - https://www.housecallpro.com/pricing/ (plans, add-ons, card rates, 14-day trial)
   * - https://www.housecallpro.com/features/ai-team/ (CSR AI answers calls, sold separately)
   * Missed-call text-back and a unified inbox are not described on these pages.
   */
  "housecall-pro": {
    slug: "housecall-pro",
    name: "Housecall Pro",
    category: "Field service software",
    summary: `FollowUpHub vs Housecall Pro: missed-call text-back, AI callbacks, one inbox, booking, invoices and reviews in one plan ${summaryTail}`,
    intro:
      "Housecall Pro is built for home service companies that run trucks and technicians. It covers scheduling, dispatch, estimates and invoicing well. Its AI call answering, websites and marketing campaigns are sold separately. FollowUpHub bundles the front desk into a single, lower monthly price.",
    reasons: [
      {
        title: "AI call answering is sold separately",
        body: "Housecall Pro lists CSR AI as an extra, with no public price. FollowUpHub includes missed-call text-back and AI callbacks in the plan.",
      },
      {
        title: "A lower starting price",
        body: `Housecall Pro's entry plan is listed at $79 a month on monthly billing. FollowUpHub is $${PLAN.price} a month with everything switched on.`,
      },
      {
        title: "Websites and campaigns are add-ons",
        body: "Housecall Pro offers websites, pipeline and campaigns as add-ons. FollowUpHub includes a website, funnels, a pipeline and email campaigns.",
      },
      {
        title: "Housecall Pro goes deeper on dispatch",
        body: "Larger crews that need GPS tracking and detailed dispatch boards may get more from Housecall Pro. FollowUpHub focuses on answering, booking and getting paid.",
      },
    ],
    theirs: {
      textback: "Not listed",
      voice: "CSR AI call answering, sold separately (price not listed)",
      inbox: "Not listed",
      booking: "Online booking and reminders",
      payments: "Estimates, invoices and card payments",
      reviews: "Review management",
      pipeline: "Pipeline add-on (price not listed)",
      websites: "Websites add-on (price not listed)",
      campaigns: "Campaigns add-on (price not listed)",
      pricing: "From $79/mo, or $59/mo billed annually",
    },
    faqs: [
      {
        q: "What is a good Housecall Pro alternative?",
        a: "For owner-operators who mostly need the phones covered and the work booked, FollowUpHub is a lighter fit. It texts back missed calls, calls people back with an AI agent, books jobs, sends reminders, invoices and asks for reviews, all in one plan.",
      },
      {
        q: "Can FollowUpHub answer calls when I am on a job?",
        a: "When you miss a call, FollowUpHub texts the caller right away and its AI agent, Vaani, can call them back to find out what they need and book a time. Every conversation lands in one inbox so you can pick it up later.",
      },
      pricingFaq(
        "Housecall Pro",
        "Housecall Pro lists its Basic plan at $79 per month billed monthly, or $59 per month billed annually, with several tools sold as add-ons.",
      ),
    ],
  },

  /*
   * Sources, checked 2026-11-21:
   * - https://www.podium.com/pricing/ (no public price; inbox channels; review requests by text)
   * - https://www.podium.com/ai-employee/ (AI Employee add-on, books and sends reminders)
   * - https://www.podium.com/product/phones (missed-call auto text; search-result excerpt)
   * Pipeline, website builder, quotes/invoices and email marketing could not be confirmed.
   */
  podium: {
    slug: "podium",
    name: "Podium",
    category: "Customer messaging platform",
    summary: `FollowUpHub vs Podium: missed-call text-back, AI callbacks, one inbox, booking, invoices and reviews at a published price ${summaryTail}`,
    intro:
      "Podium made its name on business texting and review requests, and it does both well, including texting back missed calls. Pricing is quoted by its sales team and the AI Employee is an add-on. FollowUpHub covers the same front desk work at a published price, and adds booking, quotes, invoices and a pipeline.",
    reasons: [
      {
        title: "You can see the price before you talk to anyone",
        body: `Podium's pricing page asks you to talk to sales. FollowUpHub is $${PLAN.price} a month, listed on the page, with a ${TRIAL_DAYS}-day free trial.`,
      },
      {
        title: "The AI Employee is an add-on",
        body: "Podium sells its AI Employee on top of a plan. FollowUpHub's AI agent replies to messages and calls missed callers back as part of the one plan.",
      },
      {
        title: "More of the job lives in one place",
        body: "FollowUpHub adds quotes, invoices, a visual pipeline, a website and email campaigns, so the conversation, the booking and the payment share one record.",
      },
    ],
    theirs: {
      textback: "Missed calls get an automatic text",
      voice: "AI Employee add-on (price not listed)",
      inbox: "Texts, calls, email and social in one inbox",
      booking: "Booking and reminders through the AI Employee",
      payments: "Card payments; quotes and invoices not listed",
      reviews: "Review requests by text",
      pipeline: "Not listed",
      websites: "Not listed",
      campaigns: "Text marketing; email not listed",
      pricing: "Not listed; quoted by sales",
    },
    faqs: [
      {
        q: "Is FollowUpHub a good Podium alternative?",
        a: "Yes, for small businesses that want texting, missed-call text-back and review requests plus booking, invoices and a pipeline in one app at a published monthly price.",
      },
      {
        q: "Does FollowUpHub send review requests like Podium?",
        a: "Yes. FollowUpHub can send a review request automatically after each job or visit, by text or email, so asking for reviews stops depending on someone remembering.",
      },
      pricingFaq("Podium", "Podium does not publish its prices; its pricing page asks you to speak with sales."),
    ],
  },

  /*
   * Sources, checked 2026-11-21:
   * - https://www.hubspot.com/pricing/crm (free CRM up to 2 users; Starter
   *   Customer Platform normally $20/seat/mo, includes payments, AI agents via credits)
   * - https://www.hubspot.com/pricing/sales/starter (pipelines, meeting scheduling)
   * Missed-call text-back, voice answering, review requests and SMS campaigns
   * are not listed on these pricing pages.
   */
  hubspot: {
    slug: "hubspot",
    name: "HubSpot",
    category: "CRM and marketing platform",
    summary: `FollowUpHub vs HubSpot: a small business front desk with missed-call text-back, AI callbacks, booking, invoices and reviews ${summaryTail}`,
    intro:
      "HubSpot is a capable CRM with a generous free tier, and it shines for teams that sell over email and run content marketing. Most local businesses live on the phone instead. FollowUpHub is built around calls, texts and bookings, with the CRM underneath.",
    reasons: [
      {
        title: "Built for phone-first businesses",
        body: "HubSpot's pricing pages do not list missed-call text-back or AI call answering. FollowUpHub texts back every missed call and its AI agent calls people back to book them in.",
      },
      {
        title: "Booking, reminders and reviews in one place",
        body: "FollowUpHub sends appointment reminders and review requests on its own, from the same inbox where the customer first got in touch.",
      },
      {
        title: "One price, whatever the team size",
        body: "HubSpot's paid tiers are priced per seat. FollowUpHub is one flat monthly price.",
      },
      {
        title: "HubSpot is stronger for content and B2B sales",
        body: "If you run a blog, long email nurture programs or a B2B sales team, HubSpot's marketing and sales tools go further.",
      },
    ],
    theirs: {
      textback: "Not listed",
      voice: "AI agents via credits on Starter; call answering not listed",
      inbox: "Not listed on pricing pages",
      booking: "Meeting scheduling links",
      payments: "Payments on the Starter Customer Platform",
      reviews: "Not listed",
      pipeline: "Included (up to 15 pipelines on Starter)",
      websites: "Landing pages on Starter",
      campaigns: "Email marketing; SMS not listed",
      pricing: "Free CRM for 2 users; Starter normally $20/seat/mo",
    },
    faqs: [
      {
        q: "Is HubSpot or FollowUpHub better for a local service business?",
        a: "For a business that gets most of its work by phone and text, FollowUpHub is the closer fit: it texts back missed calls, calls people back with AI, books appointments, sends reminders and invoices. HubSpot suits teams that sell mostly through email and content.",
      },
      {
        q: "Can I move my HubSpot contacts to FollowUpHub?",
        a: "Yes. Export your contacts from HubSpot and we move them over for you during onboarding.",
      },
      pricingFaq(
        "HubSpot",
        "HubSpot offers a free CRM for up to two users, and its Starter Customer Platform is normally $20 per seat per month, with introductory discounts at times.",
      ),
    ],
  },

  /*
   * Sources, checked 2026-11-21:
   * - https://www.thryv.com/pricing/ (Starter $99/mo 1 user, Signature $399/mo;
   *   AI website builder, automated reviews; footer lists scheduling, estimates
   *   and invoices, payments)
   * Missed-call text-back, AI call answering, unified inbox, pipeline and campaign
   * channels are not listed. Trial length differs across Thryv pages, so it is omitted.
   */
  thryv: {
    slug: "thryv",
    name: "Thryv",
    category: "Small business software",
    summary: `FollowUpHub vs Thryv: missed-call text-back, AI callbacks, one inbox, booking, invoices and reviews in one plan ${summaryTail}`,
    intro:
      "Thryv is an all-in-one platform for small businesses, with scheduling, invoicing, reviews and an AI website builder. FollowUpHub covers similar ground at a lower monthly price, and puts more weight on answering missed calls and following up fast.",
    reasons: [
      {
        title: "A lower monthly price",
        body: `Thryv's Starter plan is listed at $99 a month for one user. FollowUpHub is $${PLAN.price} a month with every feature included.`,
      },
      {
        title: "Missed calls get answered",
        body: "Thryv's pricing page does not list missed-call text-back or AI call answering. FollowUpHub texts back every missed caller and its AI agent calls them back.",
      },
      {
        title: "Follow-up runs on its own",
        body: "FollowUpHub's visual workflow builder handles reminders, no-show follow-ups and review requests without anyone on your team lifting a finger.",
      },
    ],
    theirs: {
      textback: "Not listed",
      voice: "Not listed",
      inbox: "Not listed",
      booking: "Scheduling and appointments",
      payments: "Estimates, invoices and payments",
      reviews: "Automated review requests",
      pipeline: "CRM included; pipeline not listed",
      websites: "AI website builder",
      campaigns: "Not listed",
      pricing: "From $99/mo for 1 user",
    },
    faqs: [
      {
        q: "What is a cheaper alternative to Thryv?",
        a: `FollowUpHub is $${PLAN.price} per month and includes missed-call text-back, AI callbacks, one inbox, booking and reminders, quotes and invoices, review requests, a pipeline, a website and email campaigns.`,
      },
      {
        q: "Does FollowUpHub include a website like Thryv?",
        a: "Yes. A website, landing pages, lead forms and a booking widget are all part of the plan, and leads from them land in the same inbox and pipeline.",
      },
      pricingFaq("Thryv", "Thryv lists its Starter plan at $99 per month for one user, and Signature at $399 per month for five users."),
    ],
  },

  /*
   * Sources, checked 2026-11-21:
   * - https://birdeye.com/pricing/ (no public price; Myna AI front desk, appointments,
   *   reminders, reviews, marketing automation)
   * - https://support.birdeye.com/en/articles/12653071-how-to-set-up-birdeye-receptionist
   *   (missed calls get a text; search-result excerpt)
   * Pipeline, website builder and quotes/invoices could not be confirmed.
   */
  birdeye: {
    slug: "birdeye",
    name: "Birdeye",
    category: "Reputation and messaging platform",
    summary: `FollowUpHub vs Birdeye: reviews, missed-call text-back, AI callbacks, booking and invoices at a published price ${summaryTail}`,
    intro:
      "Birdeye is a reputation and customer experience platform used widely by multi-location brands, with reviews at its core and an AI front desk on top. Pricing comes from a quote form. FollowUpHub is priced for a single small business, published on the page, with booking, invoices and a pipeline included.",
    reasons: [
      {
        title: "A published price",
        body: `Birdeye asks you to fill in a form to get pricing. FollowUpHub is $${PLAN.price} a month with a ${TRIAL_DAYS}-day free trial.`,
      },
      {
        title: "Made for one location",
        body: "Birdeye's strengths show at multi-location scale. FollowUpHub is set up for an owner-run business and can be running the same day.",
      },
      {
        title: "Quotes, invoices and a pipeline included",
        body: "FollowUpHub keeps the job moving after the first reply, with quotes, invoices, card payments and a visual pipeline in the same app.",
      },
    ],
    theirs: {
      textback: "Through Birdeye Receptionist",
      voice: "AI front desk (cost not listed)",
      inbox: "Birdeye Inbox",
      booking: "Appointments and reminders",
      payments: "Payment links; quotes and invoices not listed",
      reviews: "Review requests and management",
      pipeline: "Not listed",
      websites: "Not listed",
      campaigns: "Marketing automation (channels not listed)",
      pricing: "Not listed; quote on request",
    },
    faqs: [
      {
        q: "Is FollowUpHub a Birdeye alternative for a single location?",
        a: "Yes. FollowUpHub sends review requests automatically and also texts back missed calls, calls people back with AI, books appointments and handles invoices, at one published monthly price.",
      },
      {
        q: "Will FollowUpHub help me get more Google reviews?",
        a: "FollowUpHub sends a review request after each job or visit, so every happy customer is asked at the right moment.",
      },
      pricingFaq("Birdeye", "Birdeye does not publish prices; you request a quote through a form."),
    ],
  },

  /*
   * Sources, checked 2026-11-21:
   * - https://squareup.com/us/en/appointments/pricing (Free, Plus $49/mo per location,
   *   Premium $149/mo; booking and reminders on Free; card rates)
   * - https://squareup.com/us/en/messages/pricing (texts and email in Messages;
   *   Square Assistant works over text)
   * Missed-call text-back and review requests are not listed on these pages.
   */
  "square-appointments": {
    slug: "square-appointments",
    name: "Square Appointments",
    category: "Booking and payments software",
    summary: `FollowUpHub vs Square Appointments: booking and payments plus missed-call text-back, AI callbacks, one inbox and reviews ${summaryTail}`,
    intro:
      "Square Appointments is a great booking and point-of-sale tool for salons, spas and studios, with a free plan to start. It handles the calendar and the checkout. FollowUpHub adds the part before the booking: answering missed calls, replying to messages and following up until the customer books.",
    reasons: [
      {
        title: "Missed calls turn into bookings",
        body: "Square's appointments pages do not list missed-call text-back or AI call answering. FollowUpHub texts back missed callers and its AI agent calls them back.",
      },
      {
        title: "Marketing is built in",
        body: "Square sells marketing and websites as separate products. FollowUpHub includes a website, funnels, email campaigns and review requests in the plan.",
      },
      {
        title: "Square is better at the counter",
        body: "If you sell products over the counter and want card readers and inventory, Square's point of sale is hard to beat. Many businesses keep it for checkout.",
      },
    ],
    theirs: {
      textback: "Not listed",
      voice: "Not built in; Square Assistant replies by text",
      inbox: "Texts and email in Square Messages",
      booking: "Online booking and reminders, even on the free plan",
      payments: "Card payments; invoices are a separate Square product",
      reviews: "Not listed",
      pipeline: "Not listed",
      websites: "Separate Square product",
      campaigns: "Separate Square Marketing product",
      pricing: "Free plan; Plus $49/mo per location",
    },
    faqs: [
      {
        q: "Can I use FollowUpHub with Square Appointments?",
        a: "Many businesses keep Square for in-person checkout. FollowUpHub has its own booking calendar and card payments, so you can also run bookings, reminders, invoices and follow-up from FollowUpHub alone.",
      },
      {
        q: "Does FollowUpHub send appointment reminders?",
        a: "Yes. Reminders go out by text and email before every visit, and customers can confirm or reschedule by replying.",
      },
      pricingFaq(
        "Square Appointments",
        "Square Appointments has a free plan, and lists Plus at $49 per month and Premium at $149 per month, per location.",
      ),
    ],
  },

  /*
   * Sources, checked 2026-11-21:
   * - https://www.servicetitan.com/pricing (no public price; voice + SMS agents and
   *   online scheduling in Demand AI and MAX; estimates and invoicing in Core)
   * - https://www.servicetitan.com/features/pro/marketing/reputation (automatic
   *   review requests; search-result excerpt)
   * - https://help.servicetitan.com/docs/marketing-pro (email and SMS campaigns;
   *   search-result excerpt)
   * Missed-call text-back, unified inbox, pipeline and website could not be confirmed.
   */
  servicetitan: {
    slug: "servicetitan",
    name: "ServiceTitan",
    category: "Field service software for larger contractors",
    summary: `FollowUpHub vs ServiceTitan: a front desk for smaller teams, with missed-call text-back, AI callbacks, booking and invoices ${summaryTail}`,
    intro:
      "ServiceTitan is a powerful platform for established trades contractors with dispatchers, call centers and big fleets. Pricing is quoted by sales and its AI agents come in the higher packages. For a smaller shop, FollowUpHub covers answering, booking, invoicing and follow-up at a published monthly price.",
    reasons: [
      {
        title: "Sized for a smaller team",
        body: "ServiceTitan is built for contractors with office staff and many technicians. FollowUpHub suits an owner-operator or a small crew and can be running the same day.",
      },
      {
        title: "AI follow-up on the base plan",
        body: "ServiceTitan includes its voice and SMS agents in the Demand AI and MAX packages. FollowUpHub's missed-call text-back and AI callbacks come with the one plan.",
      },
      {
        title: "A price you can see",
        body: `ServiceTitan's pricing page asks you to request a quote. FollowUpHub is $${PLAN.price} a month with a ${TRIAL_DAYS}-day free trial.`,
      },
    ],
    theirs: {
      textback: "Not listed",
      voice: "Voice and SMS agents in Demand AI and MAX packages",
      inbox: "Not listed",
      booking: "Online scheduling in Demand AI and MAX",
      payments: "Estimates, invoicing and payments",
      reviews: "Automatic review requests (Marketing Pro)",
      pipeline: "Not listed",
      websites: "Not listed",
      campaigns: "Email and SMS campaigns (Marketing Pro)",
      pricing: "Not listed; quoted by sales",
    },
    faqs: [
      {
        q: "What is a ServiceTitan alternative for a small contractor?",
        a: "FollowUpHub suits owner-operators and small crews who need the phones covered, jobs booked and invoices paid without an enterprise rollout. It texts back missed calls, calls people back with AI, and keeps every job in one pipeline.",
      },
      {
        q: "Does FollowUpHub do dispatch like ServiceTitan?",
        a: "FollowUpHub has booking calendars with team availability, but it is not a full dispatch board. Larger contractors that dispatch many technicians a day may still want a dedicated field service platform.",
      },
      pricingFaq("ServiceTitan", "ServiceTitan does not publish prices; its pricing page asks you to request a quote."),
    ],
  },
};

/** Resolves a route back to its competitor, or null for any other path. */
export function competitorForPath(path: string): Competitor | null {
  const slug = COMPARE_SLUGS.find((s) => comparePath(s) === path);
  return slug ? COMPETITORS[slug] : null;
}
