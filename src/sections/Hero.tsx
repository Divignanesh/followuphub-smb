import { AnimatePresence, motion } from "framer-motion";
import {
  BellRing, Bot, CalendarCheck, CalendarClock, Check, CreditCard, FileText, PhoneCall, PhoneMissed, Receipt, Star, TrendingUp, UserPlus, type LucideIcon,
} from "lucide-react";
import type { ReactNode } from "react";
import { Avatar } from "../components/Mock";
import { WordRotate } from "../components/magic/word-rotate";
import { TrialButton } from "../components/TrialButton";
import { EASE_OUT, cx, useCycle } from "../components/ui";

/**
 * After the Nitux hero: a pill label, a large centred promise on the washed
 * grid panel with soft lights at a few crossings, and live product cards at
 * the corners with a ring chart under the button. Each card cycles through
 * what the app does in that area (client feedback, 2026-11):
 *   invoices flip (paid, sent, quote, reminder), bookings slide (new,
 *   rescheduled, new customer), a missed call turns into the AI agent Vaani
 *   calling back, and reviews slide (new review, five stars, growth).
 * Below 1280px the cards stop floating and sit in a grid under the button,
 * so they can never cover the headline.
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

/** A card shrunk for phones: scale and tilt outside, entrance in the middle, bob inside. */
function MiniFloat({ className, origin, rot, delay, children }: { className: string; origin: string; rot: number; delay: number; children: ReactNode }) {
  return (
    <div className={cx("absolute", className)} style={{ transform: `scale(0.64) rotate(${rot}deg)`, transformOrigin: origin }}>
      <motion.div initial={{ opacity: 0, y: 20, scale: 0.9 }} animate={{ opacity: 1, y: 0, scale: 1 }} transition={{ duration: 0.7, ease: EASE_OUT, delay }}>
        <div className="breathe-card rounded-2xl bg-page p-4 shadow-float" style={{ animationDelay: `${-delay * 3}s` }}>{children}</div>
      </motion.div>
    </div>
  );
}

function Dots({ n, i }: { n: number; i: number }) {
  return (
    <span className="flex gap-1">
      {Array.from({ length: n }).map((_, k) => (
        <span key={k} className={cx("h-1.5 rounded-full transition-all duration-300", k === i ? "w-4 bg-brand" : "w-1.5 bg-line")} />
      ))}
    </span>
  );
}

/* ------------------------------ invoices: flip ---------------------------- */

const INVOICES: { icon: LucideIcon; title: string; sub: string; tone: string }[] = [
  { icon: CreditCard, title: "Invoice paid", sub: "Priya Shah, by card", tone: "bg-green-tint text-green" },
  { icon: FileText, title: "New invoice sent", sub: "Marc Gagnon, by text", tone: "bg-brand-tint text-brand" },
  { icon: Receipt, title: "Quote sent", sub: "Dana White, drain repair", tone: "bg-amber-tint text-amber-ink" },
  { icon: BellRing, title: "Invoice reminder", sub: "Sent to Lea Martin", tone: "bg-red-tint text-red" },
];

function InvoiceCard() {
  const { ref, i } = useCycle(INVOICES.length, 2600);
  const s = INVOICES[i];
  return (
    <div ref={ref} className="w-[230px] [perspective:600px]">
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={s.title}
          initial={{ rotateX: -90, opacity: 0 }}
          animate={{ rotateX: 0, opacity: 1 }}
          exit={{ rotateX: 90, opacity: 0 }}
          transition={{ duration: 0.35, ease: EASE_OUT }}
          className="flex items-center gap-3"
        >
          <span className={cx("grid size-11 shrink-0 place-items-center rounded-xl", s.tone)}><s.icon className="size-5" /></span>
          <div>
            <p className="text-[17px] font-semibold tracking-[-0.02em]">{s.title}</p>
            <p className="text-[13px] text-ink-soft">{s.sub}</p>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

/* ---------------------------- bookings: carousel -------------------------- */

const BOOKINGS: { icon: LucideIcon; label: string; title: string; sub: string }[] = [
  { icon: CalendarCheck, label: "New booking", title: "Water heater, Thursday afternoon", sub: "Booked by your AI agent" },
  { icon: CalendarClock, label: "Booking rescheduled", title: "Furnace tune-up, moved to Friday", sub: "Customer rescheduled by text" },
  { icon: UserPlus, label: "New customer", title: "Dana White", sub: "Added from a missed call" },
];

function BookingCard() {
  const { ref, i } = useCycle(BOOKINGS.length, 3000, 700);
  const s = BOOKINGS[i];
  return (
    <div ref={ref} className="w-[230px] overflow-hidden">
      <AnimatePresence mode="wait" initial={false}>
        <motion.div key={s.label} initial={{ x: 40, opacity: 0 }} animate={{ x: 0, opacity: 1 }} exit={{ x: -40, opacity: 0 }} transition={{ duration: 0.3, ease: EASE_OUT }} className="min-h-[96px]">
          <p className="flex items-center gap-2 text-[13px] font-medium text-brand"><s.icon className="size-4" /> {s.label}</p>
          <p className="mt-2 text-[19px] font-semibold leading-tight tracking-[-0.02em]">{s.title}</p>
          <p className="mt-1.5 text-[13px] text-ink-soft">{s.sub}</p>
        </motion.div>
      </AnimatePresence>
      <div className="mt-3"><Dots n={BOOKINGS.length} i={i} /></div>
    </div>
  );
}

/* ------------------------ missed call, Vaani calls back ------------------- */

function Rings() {
  return (
    <>
      {[0, 0.6].map((d) => (
        <motion.span
          key={d}
          className="absolute inset-0 rounded-full border-2 border-brand"
          initial={{ scale: 1, opacity: 0.6 }}
          animate={{ scale: 1.9, opacity: 0 }}
          transition={{ duration: 1.2, repeat: Infinity, delay: d, ease: "easeOut" }}
        />
      ))}
    </>
  );
}

function Wave() {
  return (
    <span className="flex h-5 items-center gap-[3px]">
      {[0.5, 1, 0.7, 0.9, 0.4, 0.8, 0.6].map((h, k) => (
        <motion.span
          key={k}
          className="w-[3px] rounded-full bg-brand"
          animate={{ height: ["30%", `${h * 100}%`, "30%"] }}
          transition={{ duration: 0.8, repeat: Infinity, delay: k * 0.09 }}
        />
      ))}
    </span>
  );
}

/** Four beats: the call is missed, Vaani rings back, they talk, it's booked. */
function VaaniCard() {
  const { ref, i: beat } = useCycle(4, 2200, 300);
  return (
    <div ref={ref} className="w-[270px]">
      <div className="flex items-center gap-2.5">
        <span className={cx("grid size-8 place-items-center rounded-lg transition-colors", beat === 0 ? "bg-red-tint text-red" : "bg-brand-tint text-brand")}>
          {beat === 0 ? <PhoneMissed className="size-4" /> : <PhoneCall className="size-4" />}
        </span>
        <p className="text-[14px] font-semibold">{beat === 0 ? "Missed call" : "AI callback"}</p>
        <span className="ml-auto text-[12px] text-ink-soft">{beat === 0 ? "just now" : "Priya Shah"}</span>
      </div>

      <div className="mt-3 flex h-[64px] items-center gap-3 rounded-xl bg-soft px-3 ring-1 ring-inset ring-line">
        <span className="relative grid size-10 shrink-0 place-items-center rounded-full bg-brand text-white">
          {beat === 1 && <Rings />}
          <Bot className="relative size-5" />
        </span>
        <AnimatePresence mode="wait" initial={false}>
          <motion.div key={beat} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }} transition={{ duration: 0.25 }} className="min-w-0">
            <p className="text-[13px] font-semibold">Vaani, AI agent</p>
            {beat === 0 && <p className="text-[12px] text-ink-soft">Getting ready to call back</p>}
            {beat === 1 && <p className="text-[12px] text-brand">Calling Priya back…</p>}
            {beat === 2 && <span className="mt-0.5 flex items-center gap-2 text-[12px] text-ink-soft"><Wave /> On the call</span>}
            {beat === 3 && <p className="flex items-center gap-1 text-[12px] font-medium text-green"><Check className="size-3.5" strokeWidth={3} /> Booked Thursday afternoon</p>}
          </motion.div>
        </AnimatePresence>
      </div>
      <p className="mt-1.5 flex items-center justify-end gap-1 text-[11.5px] text-ink-soft"><Check className="size-3" /> Called back automatically</p>
    </div>
  );
}

/* ---------------------------- reviews: carousel --------------------------- */

function Stars({ size = "size-3.5" }: { size?: string }) {
  return (
    <span className="flex gap-0.5" role="img" aria-label="Five stars">
      {Array.from({ length: 5 }).map((_, k) => <Star key={k} className={cx(size, "fill-gold text-gold")} />)}
    </span>
  );
}

function ReviewCard() {
  const { ref, i } = useCycle(3, 3200, 1400);
  return (
    <div ref={ref} className="w-[240px] overflow-hidden">
      <AnimatePresence mode="wait" initial={false}>
        <motion.div key={i} initial={{ x: 40, opacity: 0 }} animate={{ x: 0, opacity: 1 }} exit={{ x: -40, opacity: 0 }} transition={{ duration: 0.3, ease: EASE_OUT }} className="min-h-[84px]">
          {i === 0 && (
            <>
              <div className="flex items-center gap-2.5">
                <Avatar name="Lea Martin" i={2} />
                <div>
                  <p className="text-[14px] font-semibold">New Google review</p>
                  <Stars />
                </div>
              </div>
              <p className="mt-2.5 text-[13px] text-ink-soft">“On time, tidy and easy to book.”</p>
            </>
          )}
          {i === 1 && (
            <>
              <div className="flex items-center gap-2.5">
                <Avatar name="John Davis" i={3} />
                <div>
                  <p className="text-[14px] font-semibold">John posted 5 stars</p>
                  <p className="text-[12px] text-ink-soft">on Google, just now</p>
                </div>
              </div>
              <div className="mt-2.5"><Stars size="size-5" /></div>
            </>
          )}
          {i === 2 && (
            <>
              <p className="flex items-center gap-2 text-[13px] font-medium text-ink-soft"><img src="/images/channels/google.svg" alt="" className="size-4" /> Google reviews</p>
              <p className="mt-1.5 flex items-center gap-2">
                <span className="text-[30px] font-semibold leading-none tracking-[-0.03em] text-green">+160%</span>
                <span className="grid size-7 place-items-center rounded-full bg-green-tint text-green"><TrendingUp className="size-4" /></span>
              </p>
              <p className="mt-1.5 text-[12.5px] text-ink-soft">since review requests went on</p>
            </>
          )}
        </motion.div>
      </AnimatePresence>
      <div className="mt-3"><Dots n={3} i={i} /></div>
    </div>
  );
}

/** A ring of the channels customers use, with the inbox at its centre. */
function ChannelRing() {
  const r = 58, c = 2 * Math.PI * r;
  const parts = [
    { v: 0.4, color: "var(--color-brand)", label: "Calls" },
    { v: 0.33, color: "var(--color-mint)", label: "Texts" },
    { v: 0.27, color: "var(--color-sage)", label: "Web and social" },
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

export function Hero() {
  // The panel runs at 90% of the window on desktop, wider than the content
  // column, so the hero reads as the page's stage; phones keep a 16px gutter.
  return (
    <section id="top" aria-labelledby="hero-title" className="mx-auto w-full px-4 pt-2 sm:w-[94%] sm:px-0 xl:w-[90%]">
      <div className="hero-wash relative overflow-hidden rounded-[1.75rem] ring-1 ring-inset ring-brand/15">
        <div aria-hidden="true" className="grid-lines pointer-events-none absolute inset-0 opacity-40" />

        <div className="relative flex min-h-[calc(100svh-5.5rem)] flex-col justify-evenly px-4 pb-6 pt-6 text-center sm:block sm:min-h-0 sm:px-10 sm:pb-14 sm:pt-24 xl:min-h-[820px] xl:pb-[17rem] xl:pt-28">
          <motion.div initial="hidden" animate="show" className="mx-auto max-w-[54rem]">
            <motion.p custom={0} variants={rise} className="inline-flex whitespace-nowrap rounded-xl border border-brand/15 bg-page/85 px-3 py-1.5 text-[10.5px] font-medium uppercase tracking-[0.05em] text-brand shadow-card sm:px-4 sm:py-2 sm:text-[13px] sm:tracking-[0.06em]">
              The AI front desk for small businesses
            </motion.p>
            <motion.h1 id="hero-title" custom={1} variants={rise} className="t-display mx-auto mt-6 max-sm:text-[clamp(1.85rem,8.6vw,2.2rem)] max-sm:[text-wrap:wrap] sm:mt-7 lg:text-[4rem] xl:text-[4.25rem]">
              <span className="lg:block">Turn every missed call</span>{" "}
              <span className="lg:block">
                into{"\u00a0"}a <WordRotate className="text-brand max-lg:block" words={["booked job", "paid invoice", "five-star review"]} />
              </span>
            </motion.h1>
            <motion.p custom={2} variants={rise} className="t-lede mx-auto mt-5 max-w-[38rem] text-ink-soft max-sm:text-[15.5px] sm:mt-6 sm:text-[18px]">
              FollowUpHub texts back, calls back, answers questions, books the work and sends the invoice, while you stay on the job.
            </motion.p>
            <motion.div custom={3} variants={rise} className="mt-8 flex justify-center sm:mt-10">
              <TrialButton />
            </motion.div>
          </motion.div>

          {/* Under 1280px: the cards in a grid, never over the headline. */}
          {/* Phones: a swipeable row. Tablets: a 2x2 grid. Desktop: floating. */}
          <div aria-hidden="true" className="mx-auto mt-12 hidden max-w-2xl grid-cols-2 gap-3 text-left sm:grid xl:hidden">
            {[<VaaniCard key="v" />, <BookingCard key="b" />, <InvoiceCard key="i" />, <ReviewCard key="r" />].map((c) => (
              <div key={c.key} className="rounded-2xl bg-page p-4 shadow-float">{c}</div>
            ))}
          </div>

          {/* Phones: the same cards, shrunk and floating as a loose stack. */}
          <div aria-hidden="true" className="pt-6 sm:hidden"><div className="relative mx-auto h-[250px] w-full max-w-[24rem] text-left">
            <MiniFloat className="left-0 top-2" origin="top left" rot={-3} delay={0.5}><VaaniCard /></MiniFloat>
            <MiniFloat className="right-0 top-9" origin="top right" rot={3} delay={0.6}><BookingCard /></MiniFloat>
            <MiniFloat className="bottom-3 left-1" origin="bottom left" rot={2} delay={0.7}><ReviewCard /></MiniFloat>
            <MiniFloat className="bottom-12 right-1" origin="bottom right" rot={-2} delay={0.8}><InvoiceCard /></MiniFloat>
          </div></div>
        </div>

        <div aria-hidden="true">
          <Float className="left-[4.5%] top-[11%]" delay={0.5}><InvoiceCard /></Float>
          <Float className="right-[4.5%] top-[7%]" delay={0.6}><BookingCard /></Float>
          <Float className="bottom-[9%] left-[4.5%]" delay={0.7}><VaaniCard /></Float>
          <Float className="bottom-[5%] left-1/2 -translate-x-1/2" delay={0.8}><ChannelRing /></Float>
          <Float className="bottom-[12%] right-[4.5%]" delay={0.9}><ReviewCard /></Float>
        </div>
      </div>
    </section>
  );
}
