import { motion } from "framer-motion";
import { CalendarCheck, Check, CreditCard, PhoneMissed, Star } from "lucide-react";
import type { ReactNode } from "react";
import { Avatar } from "../components/Mock";
import { EASE_OUT, PillCta, cx } from "../components/ui";
import { SITE } from "../lib/content";

/**
 * After the Nitux hero: a pill label, a large centred promise on the washed
 * grid panel with soft lights at a few crossings, and product cards floating
 * at the corners with a ring chart under the buttons. The reference's cards
 * are figures; the client's rule is no numbers on the page, so these carry
 * statuses instead (paid, booked, reviewed, texted back) and the ring shows
 * channels, not shares. Below 1280px the cards stop floating and sit in a
 * row under the buttons, so they can never cover the headline.
 */

const rise = {
  hidden: { opacity: 0, y: 18 },
  show: (i: number) => ({ opacity: 1, y: 0, transition: { duration: 0.75, ease: EASE_OUT, delay: 0.08 * i } }),
};

function Float({ className, delay, children }: { className: string; delay: number; children: ReactNode }) {
  return (
    // Position, entrance and bob each on their own element, so no transform
    // overwrites another.
    <div className={cx("absolute hidden xl:block", className)}>
      <motion.div initial={{ opacity: 0, y: 16, scale: 0.96 }} animate={{ opacity: 1, y: 0, scale: 1 }} transition={{ duration: 0.8, ease: EASE_OUT, delay }}>
        <div className="float-slow rounded-2xl bg-page p-4 shadow-float" style={{ animationDelay: `${delay}s` }}>
          {children}
        </div>
      </motion.div>
    </div>
  );
}

function PaidCard() {
  return (
    <div className="flex items-center gap-3">
      <span className="grid size-11 place-items-center rounded-xl bg-green-tint text-green"><CreditCard className="size-5" /></span>
      <div>
        <p className="text-[17px] font-semibold tracking-[-0.02em]">Invoice paid</p>
        <p className="text-[13px] text-ink-soft">Priya Shah, by card</p>
      </div>
    </div>
  );
}

function BookedCard() {
  return (
    <div className="w-[220px]">
      <p className="flex items-center gap-2 text-[13px] font-medium text-brand"><CalendarCheck className="size-4" /> New booking</p>
      <p className="mt-2 text-[19px] font-semibold leading-tight tracking-[-0.02em]">Water heater, Thursday afternoon</p>
      <p className="mt-1.5 text-[13px] text-ink-soft">Booked by your AI agent</p>
    </div>
  );
}

function TextedCard() {
  return (
    <div className="w-[270px]">
      <div className="flex items-center gap-2.5">
        <span className="grid size-8 place-items-center rounded-lg bg-red-tint text-red"><PhoneMissed className="size-4" /></span>
        <p className="text-[14px] font-semibold">Missed call</p>
        <span className="ml-auto text-[12px] text-ink-soft">just now</span>
      </div>
      <p className="mt-3 rounded-xl rounded-br-sm bg-brand px-3 py-2 text-[13px] text-white">Sorry we missed you! What can we help with?</p>
      <p className="mt-1.5 flex items-center justify-end gap-1 text-[11.5px] text-ink-soft"><Check className="size-3" /> Texted back automatically</p>
    </div>
  );
}

function ReviewCard() {
  return (
    <div className="w-[240px]">
      <div className="flex items-center gap-2.5">
        <Avatar name="Lea Martin" i={2} />
        <div>
          <p className="text-[14px] font-semibold">New Google review</p>
          <div className="flex gap-0.5" role="img" aria-label="Five stars">
            {Array.from({ length: 5 }).map((_, i) => <Star key={i} className="size-3.5 fill-gold text-gold" />)}
          </div>
        </div>
      </div>
      <p className="mt-2.5 text-[13px] text-ink-soft">“On time, tidy and easy to book.”</p>
    </div>
  );
}

/** A ring of the channels customers use, with the inbox at its centre. */
function ChannelRing() {
  const r = 58, c = 2 * Math.PI * r;
  const parts = [
    { v: 0.4, color: "var(--color-brand)", label: "Calls" },
    { v: 0.33, color: "var(--color-pink)", label: "Texts" },
    { v: 0.27, color: "var(--color-violet)", label: "Web and social" },
  ];
  let off = 0;
  return (
    <div className="flex items-center gap-6">
      <div className="relative">
        <svg viewBox="0 0 140 140" className="size-[132px] -rotate-90" aria-hidden="true">
          {parts.map((p) => {
            const len = p.v * c - 6;
            const el = <circle key={p.label} cx="70" cy="70" r={r} fill="none" stroke={p.color} strokeWidth="16" strokeLinecap="round" strokeDasharray={`${len} ${c - len}`} strokeDashoffset={-off} />;
            off += p.v * c;
            return el;
          })}
        </svg>
        <span className="absolute inset-0 grid place-items-center text-center text-[13px] font-semibold leading-tight">One<br />inbox</span>
      </div>
      <ul className="grid gap-2 text-[13.5px]">
        {parts.map((p) => (
          <li key={p.label} className="flex items-center gap-2 text-ink-soft">
            <span className="size-2.5 rounded-full" style={{ background: p.color }} />
            {p.label}
          </li>
        ))}
      </ul>
    </div>
  );
}

const LIGHTS = ["left-[22%] top-[9%]", "left-[63%] top-[24%]", "left-[83%] top-[52%]", "left-[34%] top-[86%]", "left-[11%] top-[56%]", "left-[71%] top-[90%]"];

export function Hero() {
  // The panel runs at 90% of the window on desktop, wider than the content
  // column, so the hero reads as the page's stage; phones keep a 16px gutter.
  return (
    <section id="top" aria-labelledby="hero-title" className="mx-auto w-full px-4 pt-2 sm:w-[94%] sm:px-0 xl:w-[90%]">
      <div className="hero-wash relative overflow-hidden rounded-[2rem]">
        <div aria-hidden="true" className="grid-lines pointer-events-none absolute inset-0" />
        {LIGHTS.map((pos) => (
          <span key={pos} aria-hidden="true" className={cx("pointer-events-none absolute size-4 rounded-full bg-white shadow-[0_0_22px_10px_rgb(255_255_255/0.85)]", pos)} />
        ))}

        <div className="relative px-5 pb-14 pt-16 text-center sm:px-10 sm:pt-24 xl:min-h-[820px] xl:pb-[17rem] xl:pt-28">
          <motion.div initial="hidden" animate="show" className="mx-auto max-w-[54rem]">
            <motion.p custom={0} variants={rise} className="inline-flex rounded-xl border border-brand/15 bg-page/85 px-4 py-2 text-[12px] font-medium uppercase tracking-[0.06em] text-brand shadow-card sm:text-[13px]">
              <span className="sm:hidden">For Canadian small businesses</span>
              <span className="hidden sm:inline">The front desk for Canadian small businesses</span>
            </motion.p>
            <motion.h1 id="hero-title" custom={1} variants={rise} className="t-display mx-auto mt-7 max-w-[17ch] xl:text-[4.5rem]">
              Turn every missed call into a booked job
            </motion.h1>
            <motion.p custom={2} variants={rise} className="t-lede mx-auto mt-6 max-w-[38rem] text-ink-soft sm:text-[18px]">
              FollowUpHub texts back, answers questions, books the work and sends the invoice, while you stay on the job.
            </motion.p>
            <motion.div custom={3} variants={rise} className="mt-10 flex flex-col justify-center gap-3 sm:flex-row">
              <PillCta href="#pricing">Start free trial</PillCta>
              <PillCta href={SITE.demo} tone="outline">Book a demo</PillCta>
            </motion.div>
          </motion.div>

          {/* Under 1280px: the cards in a row, never over the headline. */}
          <div aria-hidden="true" className="mx-auto mt-12 grid max-w-2xl gap-3 text-left sm:grid-cols-2 xl:hidden">
            <div className="rounded-2xl bg-page p-4 shadow-float"><TextedCard /></div>
            <div className="rounded-2xl bg-page p-4 shadow-float"><BookedCard /></div>
          </div>
        </div>

        <div aria-hidden="true">
          <Float className="left-[4.5%] top-[11%]" delay={0.5}><PaidCard /></Float>
          <Float className="right-[4.5%] top-[7%]" delay={0.6}><BookedCard /></Float>
          <Float className="bottom-[9%] left-[4.5%]" delay={0.7}><TextedCard /></Float>
          <Float className="bottom-[5%] left-1/2 -translate-x-1/2" delay={0.8}><ChannelRing /></Float>
          <Float className="bottom-[12%] right-[4.5%]" delay={0.9}><ReviewCard /></Float>
        </div>
      </div>
    </section>
  );
}

