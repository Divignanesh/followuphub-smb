import { AnimatePresence, motion, useInView, useReducedMotion, useScroll, useTransform, type MotionValue } from "framer-motion";
import {
  CalendarCheck, Check, CreditCard, FileText, Funnel, MessagesSquare, Receipt, Star, type LucideIcon,
} from "lucide-react";
import { Children, useEffect, useRef, useState, type ReactNode } from "react";
import AnimatedTabs from "../components/magic/animated-tabs";
import { Avatar } from "../components/Mock";
import { TrialButton } from "../components/TrialButton";
import { EASE_OUT, Reveal, cx } from "../components/ui";
import { Agent } from "./FeatureRows";

/**
 * After HighLevel's "Your all-in-one solution" block: a row of stage tabs,
 * and under it one bordered panel per stage with an icon, a headline, a
 * two-column checklist of what the app does at that stage, the trial button
 * and a small product view. Replaces the old nine-tile module grid, so the
 * same content reads as a journey (capture, follow up, book, get paid, get
 * reviewed) instead of a wall of equal cards.
 */

type Stage = { id: string; tab: string; icon: LucideIcon; title: string; body: string; items: string[]; visual: ReactNode };

/** Rows arrive one after another, so each tab has a short animation to finish. */
function Mini({ children }: { children: ReactNode }) {
  const n = Children.count(children);
  const [lit, setLit] = useState(-1);
  useEffect(() => {
    let k = 0;
    let t = setTimeout(function step() { setLit(k++ % n); t = setTimeout(step, 1100); }, 0.45 * n * 1000 + 600);
    return () => clearTimeout(t);
  }, [n]);
  return (
    <motion.div className="grid gap-2.5" initial="hidden" whileInView="show" viewport={{ once: true, margin: "-10% 0px" }} variants={{ show: { transition: { staggerChildren: 0.45, delayChildren: 0.2 } } }}>
      {Children.map(children, (c, i) => (
        <motion.div className="grid" variants={{ hidden: { opacity: 0, y: 12 }, show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 26 } } }}>
          <motion.div className="grid" animate={lit === i ? { scale: 1.025, x: 4 } : { scale: 1, x: 0 }} transition={{ type: "spring", stiffness: 320, damping: 22 }}>{c}</motion.div>
        </motion.div>
      ))}
    </motion.div>
  );
}

/** How long each tab plays before the next one: its animation plus a moment to read. */
const DURATION: Record<string, number> = { capture: 9500, nurture: 5500, book: 5500, paid: 5500, reviews: 5500 };

function Row({ icon: Icon, tone, title, sub, tag }: { icon: LucideIcon; tone: string; title: string; sub: string; tag?: ReactNode }) {
  return (
    <div className="flex items-center gap-3 rounded-xl bg-page px-3.5 py-3 shadow-card">
      <span className={cx("grid size-9 shrink-0 place-items-center rounded-lg", tone)}><Icon className="size-4" /></span>
      <span className="min-w-0 flex-1">
        <span className="block truncate text-[13.5px] font-semibold">{title}</span>
        <span className="block truncate text-[12px] text-ink-soft">{sub}</span>
      </span>
      {tag}
    </div>
  );
}

const Tag = ({ tone, children }: { tone: string; children: ReactNode }) => (
  <span className={cx("shrink-0 rounded-md px-2 py-0.5 text-[11.5px] font-medium", tone)}>{children}</span>
);

const STAGES: Stage[] = [
  {
    id: "capture", tab: "Capture", icon: Funnel,
    title: "Get more leads in the door",
    body: "Every call, text, form and message gets an answer, so new customers never slip to the next business on the list.",
    items: ["Missed-call text-back", "AI voice callbacks", "Website and funnel builder", "Lead forms and surveys", "Website chat widget", "Call tracking", "Inbound SMS and social DMs", "Google Business messages"],
    visual: <Agent />,
  },
  {
    id: "nurture", tab: "Follow up", icon: MessagesSquare,
    title: "Follow up without lifting a finger",
    body: "The AI keeps the conversation going by text and email until the customer is ready, and wins back the quiet ones.",
    items: ["Conversational SMS and email AI", "One inbox for every channel", "Email campaigns", "Social planner", "Long-term nurture", "Past-customer reactivation", "Visual workflow builder", "Ready-made workflows"],
    visual: (
      <Mini>
        <p className="max-w-[85%] rounded-2xl rounded-bl-md bg-page px-3.5 py-2.5 text-[13px] shadow-card">Still thinking about the deck repair?</p>
        <p className="max-w-[85%] self-end justify-self-end rounded-2xl rounded-br-md bg-brand px-3.5 py-2.5 text-[13px] text-white">Hi Ryan! We have openings next week. Want me to pencil you in?</p>
        <p className="max-w-[85%] rounded-2xl rounded-bl-md bg-page px-3.5 py-2.5 text-[13px] shadow-card">Yes, Tuesday would be great</p>
        <p className="justify-self-end text-[11.5px] text-ink-soft">Follow-up sent by AI Agent</p>
      </Mini>
    ),
  },
  {
    id: "book", tab: "Book", icon: CalendarCheck,
    title: "Fill your calendar on its own",
    body: "Customers pick a time that suits you, get reminded before the visit, and reschedule by text instead of calling.",
    items: ["Online booking links", "Reminders before every visit", "Team availability", "Reschedule by text", "No-show follow-up", "Calendar sync"],
    visual: (
      <Mini>
        <Row icon={CalendarCheck} tone="bg-green-tint text-green" title="Water heater install" sub="Thursday afternoon, Priya Shah" tag={<Tag tone="bg-green-tint text-green">Booked</Tag>} />
        <Row icon={CalendarCheck} tone="bg-brand-tint text-brand" title="Furnace tune-up" sub="Moved to Friday morning" tag={<Tag tone="bg-brand-tint text-brand">Rescheduled</Tag>} />
        <Row icon={CalendarCheck} tone="bg-amber-tint text-amber-ink" title="Drain cleaning" sub="Reminder sent for tomorrow" tag={<Tag tone="bg-amber-tint text-amber-ink">Reminded</Tag>} />
      </Mini>
    ),
  },
  {
    id: "paid", tab: "Get paid", icon: CreditCard,
    title: "Get paid before you leave the driveway",
    body: "Send quotes and invoices by text, take card payments online, and let reminders do the chasing.",
    items: ["Quotes customers accept online", "Invoices by text or email", "Card payments", "Text-to-pay links", "Payment reminders", "Payment history per customer"],
    visual: (
      <Mini>
        <Row icon={Receipt} tone="bg-amber-tint text-amber-ink" title="Quote: drain repair" sub="Dana White" tag={<Tag tone="bg-green-tint text-green">Accepted</Tag>} />
        <Row icon={FileText} tone="bg-brand-tint text-brand" title="Invoice sent by text" sub="Marc Gagnon" tag={<Tag tone="bg-brand-tint text-brand">Sent</Tag>} />
        <Row icon={CreditCard} tone="bg-green-tint text-green" title="Invoice paid by card" sub="Priya Shah" tag={<Tag tone="bg-green-tint text-green">Paid</Tag>} />
      </Mini>
    ),
  },
  {
    id: "reviews", tab: "Get reviews", icon: Star,
    title: "Turn happy customers into reviews",
    body: "A review request goes out after every finished job, so your Google profile keeps growing while you work.",
    items: ["Review requests after every job", "Google review replies", "Reviews in one place", "Website review widget"],
    visual: (
      <Mini>
        {[["Lea Martin", "On time, tidy and easy to book."], ["John Davis", "Booked by text in two minutes."], ["Sofia Rossi", "Reminders made it effortless."]].map(([n, q], i) => (
          <div key={n} className="flex items-start gap-3 rounded-xl bg-page px-3.5 py-3 shadow-card">
            <Avatar name={n} i={i + 2} size="size-8" />
            <span className="min-w-0">
              <span className="flex items-center gap-2 text-[13px] font-semibold">{n}
                <span className="flex gap-0.5" aria-hidden="true">{Array.from({ length: 5 }).map((_, k) => <Star key={k} className="size-3 fill-gold text-gold" />)}</span>
              </span>
              <span className="block text-[12.5px] text-ink-soft">“{q}”</span>
            </span>
          </div>
        ))}
      </Mini>
    ),
  },
];

/**
 * Phones: the five stages as same-height cards. Each sticks a little lower
 * than the one before, and the ones underneath shrink back as the stack
 * grows, so it always reads as a deck, scrolling down or up.
 */
function PhoneCard({ st, i, n, progress }: { st: Stage; i: number; n: number; progress: MotionValue<number> }) {
  const reduce = useReducedMotion();
  const scale = useTransform(progress, [i / n, 1], [1, 1 - (n - 1 - i) * 0.04]);
  const shade = useTransform(progress, [i / n, 1], [0, (n - 1 - i) * 0.05]);
  return (
    <div className="sticky" style={{ top: `${86 + i * 12}px` }}>
      <motion.article
        aria-labelledby={`aio-m-${st.id}`}
        style={reduce ? undefined : { scale, transformOrigin: "top center" }}
        className="relative flex h-[34rem] flex-col overflow-hidden rounded-[1.5rem] bg-soft p-5 shadow-float"
      >
        <div className="flex items-center gap-3">
          <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-brand text-white"><st.icon className="size-5" aria-hidden="true" /></span>
          <span className="text-[12px] font-semibold uppercase tracking-[0.08em] text-brand">{String(i + 1).padStart(2, "0")} · {st.tab}</span>
        </div>
        <h3 id={`aio-m-${st.id}`} className="mt-4 text-[1.4rem] font-semibold leading-tight tracking-[-0.025em]">{st.title}</h3>
        <ul className="mt-3 grid grid-cols-2 gap-x-3 gap-y-1.5">
          {st.items.slice(0, 6).map((it) => (
            <li key={it} className="flex items-start gap-1.5 text-[13px] leading-snug">
              <Check aria-hidden="true" className="mt-0.5 size-3.5 shrink-0 text-brand" strokeWidth={2.75} />
              {it}
            </li>
          ))}
        </ul>
        <div aria-hidden="true" className="-mx-2 mt-5 min-h-0 flex-1 overflow-hidden px-2 pt-1 [mask-image:linear-gradient(to_bottom,black_80%,transparent)]">{st.visual}</div>
        {!reduce && <motion.span aria-hidden="true" style={{ opacity: shade }} className="pointer-events-none absolute inset-0 bg-ink" />}
      </motion.article>
    </div>
  );
}

function PhoneStack() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  return (
    <div ref={ref} className="mt-8 grid gap-5 md:hidden">
      {STAGES.map((st, i) => <PhoneCard key={st.id} st={st} i={i} n={STAGES.length} progress={scrollYProgress} />)}
    </div>
  );
}

export function AllInOne() {
  const [at, setAt] = useState(0);
  const [auto, setAuto] = useState(true);
  const box = useRef<HTMLDivElement>(null);
  const inView = useInView(box, { margin: "-20% 0px" });
  const reduce = useReducedMotion();
  const s = STAGES[at];
  const playing = auto && inView && !reduce;

  // Once a tab's animation has played, move to the next tab.
  useEffect(() => {
    if (!playing) return;
    const t = setTimeout(() => setAt((v) => (v + 1) % STAGES.length), DURATION[s.id] ?? 5500);
    return () => clearTimeout(t);
  }, [at, playing, s.id]);
  return (
    <section id="all-in-one" aria-labelledby="aio-title" className="container-x section-y">
      <Reveal className="mx-auto max-w-2xl text-center">
        <h2 id="aio-title" className="t-h2">Your whole front desk in one app</h2>
        <p className="t-lede mx-auto mt-4 max-w-xl text-ink-soft">From the first call to the five-star review, every step runs from the same place.</p>
      </Reveal>

      <div className="no-scrollbar mt-8 hidden overflow-x-auto px-1 py-1 sm:justify-center md:flex">
        <AnimatedTabs
          label="What it does"
          idPrefix="aio"
          activeTab={STAGES[at].id}
          onChange={(id) => { setAuto(false); setAt(STAGES.findIndex((x) => x.id === id)); }}
          tabs={STAGES.map((st) => ({ id: st.id, label: st.tab, icon: <st.icon className="size-4" aria-hidden="true" /> }))}
        />
      </div>

      <div ref={box} className="relative mt-6 hidden overflow-hidden rounded-[1.75rem] bg-soft ring-1 ring-inset ring-line md:block">
        {playing && (
          <motion.span
            key={at}
            aria-hidden="true"
            className="absolute inset-x-0 top-0 h-[3px] origin-left bg-brand"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: (DURATION[s.id] ?? 5500) / 1000, ease: "linear" }}
          />
        )}
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={s.id}
            role="tabpanel"
            id={`aio-panel-${s.id}`}
            aria-labelledby={`aio-tab-${s.id}`}
            initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.3, ease: EASE_OUT }}
            className="grid gap-8 p-6 sm:p-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:gap-12"
          >
            <div>
              <span className="grid size-11 place-items-center rounded-xl bg-brand text-white"><s.icon className="size-5" aria-hidden="true" /></span>
              <h3 className="mt-5 text-[1.75rem] font-semibold leading-tight tracking-[-0.03em] sm:text-[2rem]">{s.title}</h3>
              <p className="t-lede mt-3 max-w-lg text-ink-soft">{s.body}</p>
              <ul className="mt-6 grid gap-x-6 gap-y-2.5 sm:grid-cols-2">
                {s.items.map((it) => (
                  <li key={it} className="flex items-start gap-2.5 text-[14.5px]">
                    <Check aria-hidden="true" className="mt-0.5 size-4 shrink-0 text-brand" strokeWidth={2.75} />
                    {it}
                  </li>
                ))}
              </ul>
              <div className="mt-8"><TrialButton /></div>
            </div>
            <div aria-hidden="true">{s.visual}</div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Phones: each stage is a card that sticks and stacks on the last. */}
      <PhoneStack />
    </section>
  );
}
