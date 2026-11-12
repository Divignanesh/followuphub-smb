import { Check } from "lucide-react";
import { MODULES_NAV } from "../components/Mock";
import { PillCta, Reveal, cx } from "../components/ui";
import { MODULES, PLANS } from "../lib/content";

/**
 * Everything the app does, one tile per module, named as the app's sidebar
 * names them. This is the informative core of the page: what it can do,
 * plainly, with no claims about what it will achieve.
 */
export function Included() {
  const iconFor = (name: string) => MODULES_NAV.find((m) => m.label === name)?.icon;
  return (
    <section id="included" aria-labelledby="inc-title" className="container-x section-y">
      <Reveal className="mx-auto max-w-2xl text-center">
        <p className="eyebrow">Everything included</p>
        <h2 id="inc-title" className="t-h2 mt-4">One app instead of a drawer full of them</h2>
        <p className="t-lede mx-auto mt-4 max-w-xl text-ink-soft">The same modules you’ll find in the app, ready from day one.</p>
      </Reveal>

      <ul className="mt-14 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {MODULES.map((m, i) => {
          const Icon = iconFor(m.name);
          return (
            <Reveal as="li" key={m.name} delay={(i % 3) * 0.05} className="rounded-[1.5rem] border border-line bg-page p-6 transition-shadow hover:shadow-float">
              <div className="flex items-center gap-3">
                <span className="grid size-10 place-items-center rounded-xl bg-[linear-gradient(145deg,var(--color-brand-tint),#fbeef4)] text-brand">
                  {Icon && <Icon className="size-5" />}
                </span>
                <h3 className="t-h3">{m.name}</h3>
              </div>
              <ul className="mt-5 grid gap-2">
                {m.items.map((it) => (
                  <li key={it} className="flex items-start gap-2.5 text-[14.5px] text-ink-soft">
                    <Check aria-hidden="true" className="mt-0.5 size-4 shrink-0 text-brand" strokeWidth={2.5} />
                    {it}
                  </li>
                ))}
              </ul>
            </Reveal>
          );
        })}
      </ul>
    </section>
  );
}

/**
 * Flowa's pricing: plain cards, the featured one on the brand gradient with
 * its features in a white inner box. Prices are terms of sale, the only
 * figures on the page.
 */
export function Pricing() {
  return (
    <section id="pricing" aria-labelledby="price-title" className="bg-soft py-20 sm:py-28">
      <div className="container-x">
        <Reveal className="mx-auto max-w-2xl text-center">
          <p className="eyebrow">Pricing</p>
          <h2 id="price-title" className="t-h2 mt-4">Pick how much help you want</h2>
          <p className="t-lede mx-auto mt-4 max-w-xl text-ink-soft">Billed in Canadian dollars, month to month, with a free trial on both plans.</p>
        </Reveal>

        <div className="mx-auto mt-14 grid max-w-4xl gap-5 md:grid-cols-2">
          {PLANS.map((p, i) => {
            const rec = "recommended" in p && p.recommended;
            return (
              <Reveal
                key={p.id}
                delay={i * 0.06}
                className={cx(
                  "relative flex flex-col rounded-[1.75rem] p-2",
                  rec ? "bg-[linear-gradient(160deg,#6d6bf0,var(--color-brand)_45%,#c97ab0)] text-white shadow-float" : "bg-page shadow-card",
                )}
              >
                {rec && <span aria-hidden="true" className="border-beam" />}
                <div className="px-5 pb-6 pt-5">
                  <div className="flex items-center justify-between">
                    <h3 className="text-[18px] font-semibold">{p.name}</h3>
                    {rec && <span className="rounded-full border border-white/40 bg-white/15 px-3 py-1 text-[12px] font-medium">Recommended</span>}
                  </div>
                  <p className={cx("text-[14px]", rec ? "text-white/80" : "text-ink-soft")}>{p.subtitle}</p>
                  <p className="mt-6 flex items-baseline justify-center gap-1.5">
                    <span className="text-[3rem] font-semibold leading-none tracking-[-0.04em]">${p.price}</span>
                    <span className={cx("text-[14px]", rec ? "text-white/80" : "text-ink-soft")}>CAD / month</span>
                  </p>
                  <p className={cx("mt-2 text-center text-[13.5px]", rec ? "text-white/85" : "text-ink-soft")}>{p.setup}</p>
                  <PillCta href={p.checkout} tone={rec ? "light" : "outline"} className="mt-6 w-full">
                    Start free trial
                  </PillCta>
                </div>
                <ul className={cx("grid flex-1 gap-3 rounded-[1.4rem] p-6", rec ? "bg-page text-ink" : "bg-soft")}>
                  {p.features.map((f) => (
                    <li key={f} className="flex items-start gap-2.5 text-[14.5px]">
                      <Check aria-hidden="true" className="mt-0.5 size-[17px] shrink-0 text-brand" strokeWidth={2.5} />
                      {f}
                    </li>
                  ))}
                </ul>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
