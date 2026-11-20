import { AnimatePresence, motion, useInView, useReducedMotion } from "framer-motion";
import { Check, Flame, Wrench, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { NumberTicker } from "../components/magic/number-ticker";
import { TrialButton } from "../components/TrialButton";
import { EASE_OUT, PillCta, Reveal, cx } from "../components/ui";
import { PLAN, TRIAL_DAYS } from "../lib/content";

/**
 * Comparison matrix: products across the top, FollowUpHub first and
 * highlighted, features down the side, a tick or a cross in each cell.
 * The other products are single-purpose tools a small business often pays
 * for separately. Marks reflect each product's publicly listed core
 * features; recheck them before each launch (client to confirm).
 */
const TOOLS = ["FollowUpHub", "HubSpot", "Calendly", "Mailchimp", "Square Invoices", "NiceJob"] as const;
const MATRIX: { feature: string; has: (typeof TOOLS)[number][] }[] = [
  { feature: "CRM and pipeline", has: ["FollowUpHub", "HubSpot"] },
  { feature: "Missed-call text-back", has: ["FollowUpHub"] },
  { feature: "AI voice callbacks", has: ["FollowUpHub"] },
  { feature: "Online booking and reminders", has: ["FollowUpHub", "HubSpot", "Calendly"] },
  { feature: "Quotes and invoices", has: ["FollowUpHub", "HubSpot", "Square Invoices"] },
  { feature: "Review requests", has: ["FollowUpHub", "NiceJob"] },
  { feature: "Email campaigns", has: ["FollowUpHub", "HubSpot", "Mailchimp"] },
];

function Mark({ yes, brand }: { yes: boolean; brand?: boolean }) {
  return yes ? (
    <span className={cx("mx-auto grid size-7 place-items-center rounded-full", brand ? "bg-brand text-white" : "bg-green-tint text-green")}>
      <Check aria-hidden="true" className="size-4" strokeWidth={3} />
      <span className="sr-only">Yes</span>
    </span>
  ) : (
    <span className="mx-auto grid size-7 place-items-center rounded-full bg-soft-2 text-ink-soft/70">
      <X aria-hidden="true" className="size-3.5" strokeWidth={2.5} />
      <span className="sr-only">No</span>
    </span>
  );
}

export function Included() {
  return (
    <section id="included" aria-labelledby="inc-title" className="container-x pb-16 sm:pb-20">
      <Reveal className="mx-auto max-w-2xl text-center">
        <h2 id="inc-title" className="t-h2">One app instead of a drawer full of them</h2>
        <p className="t-lede mx-auto mt-4 max-w-xl text-ink-soft">What you’d otherwise pay for one tool at a time.</p>
      </Reveal>

      <Reveal className="mx-auto mt-10 max-w-5xl overflow-hidden rounded-[1.75rem] bg-page shadow-card">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[720px] border-collapse text-center">
            <thead>
              <tr className="border-b border-line">
                <th scope="col" className="sticky left-0 z-10 bg-page px-5 py-5 text-left text-[13px] font-semibold text-ink-soft sm:px-7">Feature</th>
                {TOOLS.map((t, i) => (
                  <th key={t} scope="col" className={cx("px-3 py-5 text-[14px] font-semibold", i === 0 ? "bg-brand-tint" : "text-ink-soft")}>
                    {i === 0 ? <img src="/images/brand/followuphub-logo.png" alt="FollowUpHub" className="mx-auto h-5 w-auto" /> : t}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-line">
              {MATRIX.map((r) => (
                <tr key={r.feature}>
                  <th scope="row" className="sticky left-0 z-10 bg-page px-5 py-4 text-left text-[14.5px] font-medium sm:px-7">{r.feature}</th>
                  {TOOLS.map((t, i) => (
                    <td key={t} className={cx("px-3 py-4", i === 0 && "bg-brand-tint")}>
                      <Mark yes={r.has.includes(t)} brand={i === 0} />
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="flex flex-col items-start justify-between gap-4 border-t border-line bg-soft px-5 py-5 sm:flex-row sm:items-center sm:px-7">
          <p className="text-[15px]">
            <span className="font-semibold">All of it, one app.</span>{" "}
            <span className="text-ink-soft">From ${PLAN.founderPrice}/month on the founder’s plan.</span>
          </p>
          <PillCta trial size="md">Start free trial</PillCta>
        </div>
      </Reveal>
      <p className="mx-auto mt-3 max-w-5xl px-2 text-[12px] text-ink-soft">Based on each product’s publicly listed core features, November 2026.</p>
    </section>
  );
}

/** The founder's checkbox: a real checkbox, drawn as a tick box. */
function FounderToggle({ on, onChange }: { on: boolean; onChange: (v: boolean) => void }) {
  return (
    <label className={cx(
      "relative flex cursor-pointer items-start gap-3 overflow-hidden rounded-2xl border-2 p-4 text-left transition-colors",
      on ? "border-brand bg-brand-tint" : "border-dashed border-brand/50 bg-page hover:bg-brand-tint/50",
    )}>
      <span aria-hidden="true" className="border-beam" />
      {/* A light sweep across the box while unclaimed, to draw the eye. */}
      {!on && <span aria-hidden="true" className="shine pointer-events-none absolute inset-0" />}
      <input type="checkbox" checked={on} onChange={(e) => onChange(e.target.checked)} className="peer sr-only" />
      <span aria-hidden="true" className={cx("mt-0.5 grid size-6 shrink-0 place-items-center rounded-md border-2 transition-colors peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-brand", on ? "border-brand bg-brand text-white" : "border-brand/60 bg-page")}>
        <AnimatePresence>
          {on && (
            <motion.svg viewBox="0 0 24 24" className="size-4" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}>
              <motion.path d="M5 12.5l4.5 4.5L19 7.5" fill="none" stroke="currentColor" strokeWidth="3.2" strokeLinecap="round" strokeLinejoin="round" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.35 }} />
            </motion.svg>
          )}
        </AnimatePresence>
      </span>
      <span className="relative">
        <span className="flex flex-wrap items-center gap-2">
          <span className="text-[16px] font-semibold">Founder’s plan</span>
          <span className="inline-flex items-center gap-1 rounded-full bg-brand px-2 py-0.5 text-[11.5px] font-semibold text-white">
            <Flame aria-hidden="true" className="size-3" /> {PLAN.founderOff} off
          </span>
          <span className="rounded-full bg-red-tint px-2 py-0.5 text-[11.5px] font-semibold text-red">Limited time</span>
        </span>
        <span className="mt-1 block text-[13.5px] text-ink-soft">
          Our launch price for early customers, locked in for as long as you stay subscribed.
        </span>
      </span>
    </label>
  );
}

/** Sparks that burst from the price when the founder's plan is claimed. */
function Burst({ k }: { k: number }) {
  if (!k) return null;
  return (
    <span key={k} aria-hidden="true" className="pointer-events-none absolute left-1/2 top-1/2">
      {Array.from({ length: 12 }).map((_, i) => {
        const a = (i / 12) * Math.PI * 2;
        return (
          <motion.span
            key={i}
            className={cx("absolute size-2 rounded-full", i % 3 === 0 ? "bg-gold" : i % 3 === 1 ? "bg-brand" : "bg-mint")}
            initial={{ x: 0, y: 0, opacity: 1, scale: 1 }}
            animate={{ x: Math.cos(a) * 90, y: Math.sin(a) * 60, opacity: 0, scale: 0.4 }}
            transition={{ duration: 0.9, ease: EASE_OUT }}
          />
        );
      })}
    </span>
  );
}

/**
 * One plan on one card (client feedback, 2026-11). The regular price is
 * $39.99; the founder's plan takes 25% off. When the card scrolls into view
 * the founder's box ticks itself and the price drops, so the offer is seen
 * being applied; visitors can untick it. A banner above states the one-time
 * setup fee. Prices in USD.
 */
export function Pricing() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-25% 0px" });
  const reduce = useReducedMotion();
  const [founder, setFounder] = useState(false);
  const [touched, setTouched] = useState(false);
  const [burst, setBurst] = useState(0);

  const claim = (v: boolean) => { setFounder(v); if (v) setBurst((b) => b + 1); };

  useEffect(() => {
    if (!inView || touched) return;
    if (reduce) { setFounder(true); return; }
    const t = setTimeout(() => claim(true), 1100);
    return () => clearTimeout(t);
  }, [inView, touched, reduce]);

  const price = founder ? PLAN.founderPrice : PLAN.price;
  const save = (Number(PLAN.price) - Number(PLAN.founderPrice)).toFixed(2);

  return (
    <section id="pricing" aria-labelledby="price-title" className="border-y border-line bg-soft py-16 sm:py-20">
      <div className="container-x">
        <Reveal className="mx-auto max-w-2xl text-center">
          <p className="eyebrow">Pricing</p>
          <h2 id="price-title" className="t-h2 mt-4">One plan with everything in it</h2>
          <p className="t-lede mx-auto mt-4 max-w-xl text-ink-soft">Month to month in US dollars, with a {TRIAL_DAYS}-day free trial. No contract.</p>
        </Reveal>

        <Reveal className="mx-auto mt-10 max-w-4xl">
          <div ref={ref} className="relative grid overflow-hidden rounded-[1.75rem] bg-page shadow-float md:grid-cols-[1fr_1fr]">
            <div className="flex flex-col px-5 pt-6 sm:px-7">
              <h3 className="text-[18px] font-semibold">{PLAN.name}</h3>
              <p className="text-[14px] text-ink-soft">Your AI front desk, all modules included</p>

              <div className="relative mt-6 flex min-h-[92px] flex-col items-start justify-center">
                <Burst k={burst} />
                <AnimatePresence>
                  {founder && (
                    <motion.span initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="text-[17px] font-medium text-ink-soft line-through decoration-red decoration-2">
                      ${PLAN.price}
                    </motion.span>
                  )}
                </AnimatePresence>
                <p className="flex items-baseline gap-1.5">
                  <span className={cx("text-[3.25rem] font-semibold leading-none tracking-[-0.04em] transition-colors duration-500", founder && "text-brand")}>
                    $<NumberTicker value={Number(price)} decimalPlaces={2} />
                  </span>
                  <span className="text-[14px] text-ink-soft">USD / month</span>
                </p>
                <AnimatePresence>
                  {founder && (
                    <motion.span initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} className="mt-2 rounded-md bg-green-tint px-2 py-0.5 text-[12.5px] font-semibold text-green">
                      You save ${save} every month
                    </motion.span>
                  )}
                </AnimatePresence>
              </div>

              <div className="mt-6">
                <FounderToggle on={founder} onChange={(v) => { setTouched(true); claim(v); }} />
              </div>

              <TrialButton founder={founder} className="mt-6 w-full">
                {founder ? "Claim founder’s plan" : "Start free trial"}
              </TrialButton>
              <p className="mt-3 text-center text-[13px] text-ink-soft">{TRIAL_DAYS} days free, then ${price}/month. Cancel any time.</p>

              <div className="-mx-5 mt-6 flex items-start gap-3 border-t border-line bg-soft px-5 py-4 sm:-mx-7 sm:px-7">
                <span className="grid size-9 shrink-0 place-items-center rounded-lg bg-page text-brand ring-1 ring-inset ring-line"><Wrench aria-hidden="true" className="size-4" /></span>
                <p className="text-[13.5px] leading-snug">
                  <span className="font-semibold">One-time setup fee: ${PLAN.setupFee}</span>
                  <span className="block text-ink-soft">We connect your number, register you for business texting, import your contacts and set up your AI agent with you.</span>
                </p>
              </div>
            </div>

            <ul className="divide-y divide-line border-t border-line bg-soft px-6 py-3 sm:px-7 md:border-l md:border-t-0">
              <li className="py-3 text-[14px] font-semibold">Everything included</li>
              {PLAN.features.map((f) => (
                <li key={f} className="flex items-start gap-2.5 py-3 text-[14.5px]">
                  <Check aria-hidden="true" className="mt-0.5 size-[17px] shrink-0 text-brand" strokeWidth={2.5} />
                  {f}
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
