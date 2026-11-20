import { ArrowRight, CreditCard, Plus, Target } from "lucide-react";
import { Avatar } from "../components/Mock";
import { Logo, PillCta, Reveal, external } from "../components/ui";
import { FAQS, SITE, TRIAL_DAYS } from "../lib/content";

/** Native <details>, so the answers work and are indexable without JS. */
export function FAQ() {
  return (
    <section id="faq" aria-labelledby="faq-title" className="container-x section-y">
      <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
        <Reveal>
          <h2 id="faq-title" className="t-h2">Questions, answered</h2>
          <p className="t-lede mt-4 text-ink-soft">
            Something else?{" "}
            <a href={`mailto:${SITE.email}`} className="font-medium text-brand underline-offset-4 hover:underline">{SITE.email}</a>
          </p>
        </Reveal>
        <div className="divide-y divide-line overflow-hidden rounded-[1.25rem] bg-page shadow-card">
          {FAQS.map((f) => (
            <details key={f.q} className="group px-6 transition-colors open:bg-soft">
              <summary className="flex min-h-16 list-none items-center justify-between gap-4 py-5 text-[16px] font-medium [&::-webkit-details-marker]:hidden">
                {f.q}
                <span className="grid size-8 shrink-0 place-items-center rounded-full bg-page ring-1 ring-inset ring-line-strong"><Plus aria-hidden="true" className="size-4 text-brand transition-transform duration-300 group-open:rotate-45" /></span>
              </summary>
              <p className="t-body max-w-[62ch] pb-5 text-ink-soft">{f.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

/**
 * The closing band, after the GoHighLevel "Built to make things easier"
 * section the client pointed to: copy and the trial button on the left of a
 * bright green panel, product cards floating on the right where the
 * reference has a photo. Drop a photo in at PHOTO to match it exactly.
 */
const PHOTO = "";

export function FinalCTA() {
  return (
    <section aria-labelledby="final-title" className="container-x pb-16 sm:pb-20">
      <Reveal>
        <div className="relative grid overflow-hidden rounded-[1.75rem] bg-brand-deep text-white lg:grid-cols-[1fr_1fr]">
          <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-[radial-gradient(60%_80%_at_85%_30%,rgb(95_191_152/0.35),transparent_70%)]" />
          <div className="relative px-6 py-14 sm:px-12 sm:py-20">
            <h2 id="final-title" className="t-h2 max-w-[14ch]">Built to make your day easier</h2>
            <p className="t-lede mt-4 max-w-md text-white/75">
              FollowUpHub answers, books, reminds and gets you paid. Fewer missed calls, less chasing, more jobs on the calendar.
            </p>
            <div className="mt-9">
              <PillCta trial tone="light">Start free trial <ArrowRight aria-hidden="true" className="ml-2 size-4" /></PillCta>
              <p className="mt-3 text-[13px] text-white/65">{TRIAL_DAYS} days free. No contract.</p>
            </div>
          </div>

          <div aria-hidden="true" className="relative hidden min-h-[360px] lg:block">
            {PHOTO && <img src={PHOTO} alt="" className="absolute bottom-0 right-10 h-[95%] w-auto object-contain" />}
            <div className="float-slow absolute left-[6%] top-[22%] w-[290px] rounded-2xl bg-page p-4 text-ink shadow-float">
              <div className="flex items-center gap-2.5">
                <Avatar name="Priya Shah" i={0} size="size-8" />
                <div className="min-w-0 flex-1">
                  <p className="flex items-center justify-between text-[13px] font-semibold">Priya Shah <span className="text-[11px] font-normal text-brand">now</span></p>
                  <p className="truncate text-[12.5px] text-ink-soft">Hi! Can someone come by Thursday?</p>
                </div>
              </div>
              <p className="mt-3 rounded-xl rounded-br-sm bg-brand px-3 py-2 text-[12.5px] text-white">Yes, Thursday afternoon is open. Booked!</p>
            </div>
            <div className="float-slow absolute bottom-[12%] right-[6%] w-[250px] rounded-2xl bg-page p-4 text-ink shadow-float" style={{ animationDelay: "1.4s" }}>
              <p className="flex items-center gap-2 text-[13px] font-semibold"><Target className="size-4 text-brand" /> Opportunities</p>
              <ul className="mt-3 grid gap-2">
                {[["Water heater", "Booked", "bg-amber-tint text-amber-ink"], ["Drain cleaning", "Won", "bg-green-tint text-green"], ["Furnace tune-up", "Replied", "bg-brand-tint text-brand"]].map(([job, st, tone]) => (
                  <li key={job} className="flex items-center justify-between rounded-lg bg-soft px-2.5 py-2 text-[12.5px]">
                    {job}<span className={`rounded-md px-1.5 py-0.5 text-[11px] font-medium ${tone}`}>{st}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="float-slow absolute right-[12%] top-[10%] flex items-center gap-2 rounded-xl bg-page px-3 py-2 text-ink shadow-float" style={{ animationDelay: "0.7s" }}>
              <span className="grid size-7 place-items-center rounded-lg bg-green-tint text-green"><CreditCard className="size-3.5" /></span>
              <span className="text-[12.5px] font-semibold">Invoice paid</span>
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
}

/** Flowa's footer: logo, a line about the product and three link columns. */
export function Footer() {
  const cols = [
    { h: "Product", links: [["Who it’s for", "#trades"], ["Features", "#features"], ["What’s included", "#included"], ["Pricing", "#pricing"]] },
    { h: "Company", links: [["For Real Estate", SITE.realEstate], ["Contact", `mailto:${SITE.email}`]] },
    { h: "Legal", links: [["Privacy", SITE.privacy], ["Terms", SITE.terms], ["Log in", SITE.app]] },
  ];
  return (
    <footer id="site-footer" className="relative overflow-hidden border-t border-line bg-soft">
      <div className="container-x relative pb-10 pt-16">
        <div className="grid gap-12 border-b border-line pb-12 md:grid-cols-[1.2fr_2fr]">
          <div>
            <Logo />
            <p className="t-body mt-4 max-w-xs text-ink-soft">The AI front desk for small businesses: answers, bookings, reminders and payments in one app.</p>
          </div>
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3">
            {cols.map((c) => (
              <div key={c.h}>
                <h2 className="text-[15px] font-semibold">{c.h}</h2>
                <ul className="mt-4 grid gap-3">
                  {c.links.map(([label, href]) => (
                    <li key={label}>
                      <a href={href} {...external(href)} className="text-[14.5px] text-ink-soft hover:text-brand">{label}</a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
        <p className="t-meta mt-6 text-ink-soft">© {new Date().getFullYear()} FollowUpHub.</p>
      </div>
    </footer>
  );
}
