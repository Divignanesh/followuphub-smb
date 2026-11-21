import { CalendarCheck, Check, CreditCard, Inbox, PhoneMissed } from "lucide-react";
import { FAQ, FinalCTA } from "../sections/Closing";
import { Heading, Reveal } from "../components/ui";
import { PLAN, TRIAL_DAYS, type Faq } from "../lib/content";
import { COMPARE_DATES, COMPARE_SLUGS, COMPETITORS, OUR_COLUMN, comparePath } from "../lib/competitors";
import { CompareLinks, HeaderCtas, PageHeader, formatDate } from "./CompareCrm";

/**
 * Feeds both the visible "Updated" line and the Article schema, so the two
 * always agree. Bump `modified` when the guide's content changes.
 */
export const GUIDE_DATES = { published: "2026-11-21", modified: "2026-11-21" } as const;

/** Page-specific FAQ, mirrored exactly into this route's FAQPage schema. */
export const CRM_FAQS: readonly Faq[] = [
  {
    q: "What is the best CRM for a small business in 2026?",
    a: `For a business that gets its work by phone and text, the best CRM is one that answers and follows up for you. FollowUpHub texts back every missed call, has an AI agent call people back, keeps calls, texts, email and social messages in one inbox, and handles booking, reminders, quotes, invoices, card payments and review requests. It is one plan at $${PLAN.price} per month with a ${TRIAL_DAYS}-day free trial.`,
  },
  {
    q: "What should a small business look for in a CRM?",
    a: "Start with four things: it should answer missed calls and new messages quickly, keep every channel in one conversation per customer, let people book and get reminders without phone tag, and send quotes and invoices from the same record so you get paid sooner.",
  },
  {
    q: "Which businesses is FollowUpHub built for?",
    a: "Owner-operated businesses that live on the phone: plumbers, electricians, HVAC and other trades, cleaning companies, clinics, dental and physio offices, salons and spas, auto shops, gyms and studios, landscapers and pet groomers.",
  },
  {
    q: "How much does a small business CRM cost?",
    a: `Published prices range from free starter tiers to a few hundred dollars a month, and many tools charge per user or sell AI answering, websites and marketing as add-ons. FollowUpHub is $${PLAN.price} per month with everything included. Setup is free if you do it yourself, or our team can do it for a one-time $${PLAN.setupFee}.`,
  },
  {
    q: "Can I bring my customer list from another tool?",
    a: "Yes. Export your contacts from your current tool or spreadsheet and we move them over for you during onboarding.",
  },
  {
    q: "Do I need to be technical to set it up?",
    a: "No. Our team sets it up with you, connects your phone number, registers your business for texting and walks you through your AI agent.",
  },
];

const criteria = [
  {
    icon: PhoneMissed,
    title: "It answers when you can’t",
    body: "Most small businesses miss calls while they are on a job or with a client, and many of those callers simply ring the next business on the list. A good CRM texts them back right away and gets the conversation going for you.",
  },
  {
    icon: Inbox,
    title: "One conversation per customer",
    body: "Customers call, text, email and message you on Facebook or Instagram. When all of it lands in one thread, anyone on your team can pick up where the last person left off.",
  },
  {
    icon: CalendarCheck,
    title: "Booking without phone tag",
    body: "Booking links, team calendars and reminders before every visit cut back-and-forth and no-shows. Customers should be able to confirm or reschedule by replying to a text.",
  },
  {
    icon: CreditCard,
    title: "Quotes and payments in the same place",
    body: "When the quote, invoice and card payment sit on the same customer record as the first message, you get paid faster and nothing slips between apps.",
  },
];

const whoFor = [
  ["Trades and home services", "Plumbing, HVAC, electrical, roofing and handyman work, where calls come in while your hands are full."],
  ["Clinics and offices", "Dental, physio, chiropractic and optometry, where reminders and quick replies keep the schedule full."],
  ["Salons, spas and studios", "Hair, nails, lashes, gyms and yoga, where clients want to book by text at any hour."],
  ["Local services", "Cleaning, auto repair, landscaping and pet care, where a fast reply often decides who gets the job."],
];

const pricingFactors = [
  {
    term: "Per user or flat rate",
    body: "Many tools charge for each person who logs in, so the bill grows when you hire. A flat monthly rate keeps the cost predictable.",
  },
  {
    term: "Add-ons you will actually need",
    body: "AI call answering, websites, pipelines and marketing are often priced separately. Add up the plan with everything you plan to use switched on.",
  },
  {
    term: "Setup and onboarding",
    body: "Some tools charge for setup or onboarding. Ask whether moving your contacts and connecting your phone number is included.",
  },
  {
    term: "Contract length",
    body: "Annual billing is usually cheaper per month but locks you in. Month-to-month lets you leave if the tool doesn’t stick with your team.",
  },
];

/** Starting price and the two front-desk rows, drawn from the comparison data. */
function SummaryTable() {
  const rows = [
    { name: "FollowUpHub", href: undefined, price: OUR_COLUMN.pricing, textback: OUR_COLUMN.textback, voice: OUR_COLUMN.voice },
    ...COMPARE_SLUGS.map((s) => {
      const c = COMPETITORS[s];
      return { name: c.name, href: comparePath(s), price: c.theirs.pricing, textback: c.theirs.textback, voice: c.theirs.voice };
    }),
  ];
  return (
    <section aria-labelledby="summary-title" className="border-y border-line bg-soft py-16 sm:py-20">
      <div className="container-x">
        <Heading
          id="summary-title"
          title="How popular small business tools compare"
          sub={`Starting prices and front desk features from each company’s public pages, checked ${formatDate(COMPARE_DATES.modified)}. “Not listed” means the page doesn’t say.`}
        />
        <Reveal className="mx-auto mt-10 max-w-5xl overflow-hidden rounded-[1.75rem] bg-page shadow-card">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[760px] border-collapse text-left">
              <caption className="sr-only">Starting price, missed-call text-back and AI call answering for FollowUpHub and other small business tools</caption>
              <thead>
                <tr className="border-b border-line">
                  {["Tool", "Starting price", "Missed-call text-back", "AI voice callbacks and answering"].map((h) => (
                    <th key={h} scope="col" className="px-5 py-5 text-[13px] font-semibold text-ink-soft first:sm:px-7">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {rows.map((r, i) => (
                  <tr key={r.name} className={i === 0 ? "border-b border-line bg-brand-tint/60" : "border-b border-line last:border-0"}>
                    <th scope="row" className="px-5 py-4 align-top text-[14px] font-semibold text-ink sm:px-7">
                      {r.href ? <a href={r.href} className="underline decoration-line-strong underline-offset-4 hover:text-brand hover:decoration-brand">{r.name}</a> : r.name}
                    </th>
                    <td className="px-5 py-4 align-top text-[14px] leading-[1.5] text-ink-soft">{r.price}</td>
                    <td className="px-5 py-4 align-top text-[14px] leading-[1.5] text-ink-soft">{r.textback}</td>
                    <td className="px-5 py-4 align-top text-[14px] leading-[1.5] text-ink-soft">{r.voice}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

export function BestCrmForSmallBusiness() {
  return (
    <article>
      <PageHeader crumb="Best CRM for small business" kicker="Buyer’s guide · 2026" modified={GUIDE_DATES.modified} title="The best CRM for small business in 2026" titleId="crm-title">
        {/* Direct-answer block: written to be quotable by AI answer engines. */}
        <p className="t-lede mt-6 text-ink-soft">
          <strong className="font-semibold text-ink">Short answer:</strong> for a business that runs on
          phone calls and texts, the best CRM is the one that answers and follows up while you work.{" "}
          <strong className="font-semibold text-ink">FollowUpHub</strong> texts back every missed call,
          has an AI agent call people back, and keeps every conversation in one inbox. Booking,
          reminders, quotes, invoices, card payments and review requests are all in one plan at $
          {PLAN.price} per month, with a {TRIAL_DAYS}-day free trial.
        </p>
        <HeaderCtas />
      </PageHeader>

      <section aria-labelledby="criteria-title" className="container-x pb-16 sm:pb-20">
        <Heading id="criteria-title" title="What to look for in a small business CRM" sub="Four things decide whether a CRM wins you more work or just stores names." />
        <ul className="mx-auto mt-10 grid max-w-5xl gap-4 md:grid-cols-2">
          {criteria.map(({ icon: Icon, title, body }, i) => (
            <Reveal as="li" key={title} delay={i * 0.05} className="rounded-[1.25rem] bg-page p-6 shadow-card sm:p-7">
              <span className="grid size-10 place-items-center rounded-xl bg-brand-tint text-brand">
                <Icon className="size-5" aria-hidden="true" />
              </span>
              <h3 className="t-h3 mt-5 text-ink">{title}</h3>
              <p className="t-body mt-2 text-ink-soft">{body}</p>
            </Reveal>
          ))}
        </ul>
      </section>

      <section aria-labelledby="who-title" className="container-x pb-16 sm:pb-20">
        <Heading id="who-title" title="Built for businesses that live on the phone" />
        <ul className="mx-auto mt-10 grid max-w-5xl gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {whoFor.map(([title, body]) => (
            <li key={title} className="rounded-[1.25rem] bg-soft p-6">
              <h3 className="t-h3 text-ink">{title}</h3>
              <p className="t-body mt-2 text-ink-soft">{body}</p>
            </li>
          ))}
        </ul>
      </section>

      <SummaryTable />

      <section aria-labelledby="included-title" className="container-x section-y">
        <Heading id="included-title" title="Everything in one FollowUpHub plan" sub={`$${PLAN.price} a month. Every feature switched on from day one.`} />
        <ul className="mx-auto mt-10 grid max-w-4xl gap-3 sm:grid-cols-2">
          {PLAN.features.map((f) => (
            <li key={f} className="flex items-start gap-2.5 rounded-xl bg-page px-4 py-3.5 text-[14.5px] font-medium text-ink shadow-card">
              <Check className="mt-0.5 size-4 shrink-0 text-brand" strokeWidth={3} aria-hidden="true" />
              {f}
            </li>
          ))}
        </ul>
      </section>

      <section aria-labelledby="cost-title" className="border-y border-line bg-soft py-16 sm:py-20">
        <div className="container-x">
          <Heading id="cost-title" title="How small business CRM pricing works" sub="The advertised price is rarely the whole bill. These four things move the real number." />
          <ol className="mx-auto mt-10 grid max-w-5xl gap-4 md:grid-cols-2">
            {pricingFactors.map(({ term, body }, i) => (
              <li key={term} className="rounded-[1.25rem] bg-page p-6 shadow-card sm:p-7">
                <span className="font-mono text-[12px] font-semibold text-ink-soft">{String(i + 1).padStart(2, "0")}</span>
                <h3 className="t-h3 mt-3 text-ink">{term}</h3>
                <p className="t-body mt-2 text-ink-soft">{body}</p>
              </li>
            ))}
          </ol>
          <p className="t-body mx-auto mt-8 max-w-2xl text-center text-ink-soft">
            Add up the whole stack before you compare: the phone answering, the texting tool, the
            booking app, the invoicing tool, the website and any setup fee. A tool that looks pricier
            per month can come out cheaper once those bills fold into one.
          </p>
        </div>
      </section>

      <CompareLinks />
      <FAQ faqs={CRM_FAQS} heading="Common questions about small business CRMs" />
      <FinalCTA href="/#pricing" />
    </article>
  );
}
