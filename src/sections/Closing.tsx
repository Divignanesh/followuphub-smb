import { ArrowRight, CreditCard, Mail, Plus, Target } from "lucide-react";
import { Avatar } from "../components/Mock";
import { Logo, PillCta, Reveal, external } from "../components/ui";
import { COMPARE_SLUGS, COMPETITORS, comparePath } from "../lib/competitors";
import { FAQS, SITE, SOCIAL, TRIAL_DAYS, type Faq } from "../lib/content";

/** Native <details>, so the answers work and are indexable without JS. */
export function FAQ({ faqs = FAQS, heading = "Questions, answered" }: { faqs?: readonly Faq[]; heading?: string }) {
  return (
    <section id="faq" aria-labelledby="faq-title" className="container-x section-y">
      <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
        <Reveal>
          <h2 id="faq-title" className="t-h2">{heading}</h2>
          <p className="t-lede mt-4 text-ink-soft">
            Something else?{" "}
            <a href={`mailto:${SITE.email}`} className="font-medium text-brand underline-offset-4 hover:underline">{SITE.email}</a>
          </p>
        </Reveal>
        <div>
        <div className="divide-y divide-line overflow-hidden rounded-[1.25rem] bg-page shadow-card">
          {faqs.map((f) => (
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

/** On the home page the button opens the trial form; elsewhere pass `href`. */
export function FinalCTA({ href }: { href?: string } = {}) {
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
              <PillCta trial={!href} href={href} tone="light">Start free trial <ArrowRight aria-hidden="true" className="ml-2 size-4" /></PillCta>
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

const footerCols = [
  {
    h: "Platform",
    links: [
      { label: "Missed-call text-back", href: "/#features" },
      { label: "AI calling and texting", href: "/#features" },
      { label: "Booking and reminders", href: "/#all-in-one" },
      { label: "Invoices and payments", href: "/#all-in-one" },
      { label: "Pricing", href: "/#pricing" },
    ],
  },
  {
    h: "Compare",
    links: [
      { label: "Best CRM for small business", href: "/best-crm-for-small-business" },
      { label: "vs. other tools", href: "/#included" },
      { label: "What’s included", href: "/#all-in-one" },
      { label: "Setup and onboarding", href: "/#faq" },
    ],
  },
  {
    h: "vs FollowUpHub",
    links: COMPARE_SLUGS.map((s) => ({ label: COMPETITORS[s].name, href: comparePath(s) })),
  },
  {
    h: "Company",
    links: [
      { label: "Questions", href: "/#faq" },
      { label: "For Real Estate", href: SITE.realEstate },
      { label: "Log in", href: SITE.app },
      { label: "Support", href: `mailto:${SITE.email}` },
    ],
  },
  {
    h: "Legal",
    links: [
      { label: "Privacy policy", href: SITE.privacy },
      { label: "Terms of service", href: SITE.terms },
    ],
  },
];

/** Same structure as the real estate site's footer, over the green wordmark. */
export function Footer() {
  return (
    <footer id="site-footer" className="relative overflow-hidden border-t border-line bg-soft">
      <div className="container-x relative pb-10 pt-16">
        <div className="grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-3 lg:grid-cols-[1.4fr_repeat(5,1fr)]">
          <div className="col-span-2 sm:col-span-3 lg:col-span-1">
            <Logo />
            <p className="mt-4 max-w-xs text-[14px] leading-[1.7] text-ink-soft">
              The AI front desk for small businesses.
            </p>
            <a
              href={`mailto:${SITE.email}`}
              className="mt-5 inline-flex items-center gap-2 text-[14px] font-semibold text-ink transition-colors hover:text-brand"
            >
              <Mail className="size-4 text-brand" aria-hidden="true" />
              {SITE.email}
            </a>
          </div>

          {footerCols.map((c) => (
            <nav key={c.h} aria-label={c.h}>
              <h2 className="text-[12px] font-bold uppercase tracking-[0.14em] text-ink">{c.h}</h2>
              <ul className="mt-4 space-y-2.5">
                {c.links.map((l) => (
                  <li key={l.label}>
                    <a
                      href={l.href}
                      {...external(l.href)}
                      className="-my-1 inline-block py-1.5 text-[14px] text-ink-soft transition-colors hover:text-brand"
                    >
                      {l.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        <div className="mt-12 flex flex-col gap-4 border-t border-line pt-8 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-[13px] text-ink-soft">
            © {new Date().getFullYear()} {SITE.name}. All rights reserved.
          </p>
          <ul className="flex flex-wrap gap-x-4 gap-y-2">
            {SOCIAL.map((s) => (
              <li key={s.href}>
                <a
                  href={s.href}
                  {...external(s.href)}
                  className="-my-1 inline-block py-1.5 text-[13px] font-semibold text-ink-soft transition-colors hover:text-brand"
                >
                  {s.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
      {/* Inline styles, because a Tailwind background shorthand would reset
          the text clip and paint a solid block. */}
      <p
        aria-hidden="true"
        className="pointer-events-none -mb-[0.18em] select-none whitespace-nowrap text-center text-[16.5vw] font-semibold leading-none tracking-[-0.06em]"
        style={{
          backgroundImage: "linear-gradient(180deg, rgb(26 107 90 / 0.30), rgb(26 107 90 / 0.08))",
          WebkitBackgroundClip: "text",
          backgroundClip: "text",
          color: "transparent",
        }}
      >
        FollowUpHub
      </p>
    </footer>
  );
}
