import { Plus } from "lucide-react";
import { Logo, PillCta, Reveal, external } from "../components/ui";
import { FAQS, SITE } from "../lib/content";

/** Native <details>, so the answers work and are indexable without JS. */
export function FAQ() {
  return (
    <section id="faq" aria-labelledby="faq-title" className="container-x section-y">
      <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
        <Reveal>
          <p className="eyebrow">FAQ</p>
          <h2 id="faq-title" className="t-h2 mt-4">Questions, answered</h2>
          <p className="t-lede mt-4 text-ink-soft">
            Something else?{" "}
            <a href={`mailto:${SITE.email}`} className="font-medium text-brand underline-offset-4 hover:underline">{SITE.email}</a>
          </p>
        </Reveal>
        <div className="grid gap-3">
          {FAQS.map((f) => (
            <details key={f.q} className="group rounded-2xl bg-soft px-6 open:bg-page open:shadow-card">
              <summary className="flex min-h-16 list-none items-center justify-between gap-4 py-4 text-[16px] font-medium [&::-webkit-details-marker]:hidden">
                {f.q}
                <Plus aria-hidden="true" className="size-5 shrink-0 text-brand transition-transform duration-300 group-open:rotate-45" />
              </summary>
              <p className="t-body max-w-[62ch] pb-5 text-ink-soft">{f.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

export function FinalCTA() {
  return (
    <section aria-labelledby="final-title" className="container-x pb-20 sm:pb-28">
      <Reveal>
        <div className="hero-wash relative overflow-hidden rounded-[2rem] px-6 py-20 text-center sm:py-24">
          <div aria-hidden="true" className="grid-lines pointer-events-none absolute inset-0" />
          <div className="relative">
            <p className="eyebrow">Ready when you are</p>
            <h2 id="final-title" className="t-h2 mx-auto mt-4 max-w-[20ch]">Let the next call find someone who answers</h2>
            <p className="t-lede mx-auto mt-4 max-w-md text-ink-soft">Try it free, or see it working on a short call with our team.</p>
            <div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row">
              <PillCta href="#pricing">Start free trial</PillCta>
              <PillCta href={SITE.demo} tone="outline">Book a demo</PillCta>
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
}

/** Flowa's footer: link columns over a giant, barely-there wordmark. */
export function Footer() {
  const cols = [
    { h: "Product", links: [["Who it’s for", "#trades"], ["Features", "#features"], ["What’s included", "#included"], ["Pricing", "#pricing"]] },
    { h: "Company", links: [["FollowUpHub for real estate", SITE.main], ["Book a demo", SITE.demo], ["Contact", `mailto:${SITE.email}`]] },
    { h: "Legal", links: [["Privacy", SITE.privacy], ["Terms", SITE.terms], ["Log in", SITE.app]] },
  ];
  return (
    <footer className="relative overflow-hidden rounded-t-[2.5rem] bg-soft">
      <div className="container-x relative pb-10 pt-16">
        <div className="grid gap-12 border-b border-dashed border-line pb-12 md:grid-cols-[1.2fr_2fr]">
          <div>
            <Logo />
            <p className="t-body mt-4 max-w-xs text-ink-soft">The front desk for Canadian small businesses: answers, bookings, reminders and payments in one app.</p>
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
        <p className="t-meta mt-6 text-ink-soft">Built in Canada. © {new Date().getFullYear()} FollowUpHub.</p>
      </div>
      {/* Inline styles, because a Tailwind background shorthand would reset
          the text clip and paint a solid block. */}
      <p
        aria-hidden="true"
        className="pointer-events-none -mb-[0.18em] select-none whitespace-nowrap text-center text-[16.5vw] font-semibold leading-none tracking-[-0.06em]"
        style={{
          backgroundImage: "linear-gradient(180deg, rgb(87 85 221 / 0.14), rgb(87 85 221 / 0.02))",
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
