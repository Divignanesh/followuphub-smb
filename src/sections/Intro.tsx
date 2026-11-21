import { AnimatePresence, motion, useInView, useReducedMotion } from "framer-motion";
import { AnimatedBeam } from "../components/magic/animated-beam";
import { ArrowLeft, ArrowRight, CalendarCheck, CreditCard, MessageSquare, Phone, Star, Car, Dumbbell, PawPrint, Scissors, SprayCan, Stethoscope, Trees, Wrench, type LucideIcon } from "lucide-react";
import { useEffect, useRef, useState, type ReactNode, type RefObject } from "react";
import { Reveal, cx } from "../components/ui";
import { TRADES, type Trade } from "../lib/content";

/* ------------------------------- works with ------------------------------ */

const CHANNELS: { name: string; src?: string; icon?: LucideIcon }[] = [
  { name: "Calls", icon: Phone },
  { name: "Texts", icon: MessageSquare },
  { name: "WhatsApp", src: "/images/channels/whatsapp.svg" },
  { name: "Facebook", src: "/images/channels/facebook.svg" },
  { name: "Instagram", src: "/images/channels/instagram.svg" },
  { name: "Gmail", src: "/images/channels/gmail.svg" },
];
const OUTCOMES: { name: string; icon: LucideIcon; tone: string }[] = [
  { name: "Booked", icon: CalendarCheck, tone: "bg-green-tint text-green" },
  { name: "Paid", icon: CreditCard, tone: "bg-brand-tint text-brand" },
  { name: "Reviewed", icon: Star, tone: "bg-amber-tint text-amber-ink" },
];

function Node({ children, className, nodeRef }: { children: ReactNode; className?: string; nodeRef: RefObject<HTMLDivElement | null> }) {
  return <div ref={nodeRef} className={cx("relative z-10 grid place-items-center rounded-full bg-page shadow-card", className)}>{children}</div>;
}

/**
 * Every channel a customer uses, beaming into FollowUpHub, and out the other
 * side as the three things an owner wants. Built on Magic UI's Animated
 * Beam; the lights travel only while the section is on screen.
 */
export function WorksWith() {
  const box = useRef<HTMLDivElement>(null);
  const hub = useRef<HTMLDivElement>(null);
  const ins = [useRef<HTMLDivElement>(null), useRef<HTMLDivElement>(null), useRef<HTMLDivElement>(null), useRef<HTMLDivElement>(null), useRef<HTMLDivElement>(null), useRef<HTMLDivElement>(null)];
  const outs = [useRef<HTMLDivElement>(null), useRef<HTMLDivElement>(null), useRef<HTMLDivElement>(null)];
  const live = useInView(box, { margin: "-10% 0px" });

  return (
    <section aria-labelledby="works-title" className="mt-10 border-y border-line bg-soft/60 sm:mt-12">
      <div className="container-x py-14 sm:py-16">
        <Reveal className="mx-auto max-w-xl text-center">
          <h2 id="works-title" className="text-[1.6rem] font-semibold leading-tight tracking-[-0.03em] sm:text-[2rem]">Answers customers wherever they reach you</h2>
          <p className="t-body mt-3 text-ink-soft">Calls, texts and messages from every channel land in one place, and turn into booked, paid and reviewed jobs.</p>
        </Reveal>

        <div ref={box} className="relative mx-auto mt-10 flex max-w-3xl items-center justify-between gap-4 sm:mt-12">
          <ul className="grid gap-3 sm:gap-4">
            {CHANNELS.map((c, i) => (
              <li key={c.name} className="flex items-center justify-end gap-3">
                <span className="hidden text-[14px] font-medium text-ink-soft sm:inline">{c.name}</span>
                <Node nodeRef={ins[i]} className="size-11 sm:size-12">
                  {c.src ? <img src={c.src} alt="" className="size-5" /> : c.icon && <c.icon aria-hidden="true" className="size-5 text-ink-soft" />}
                </Node>
              </li>
            ))}
          </ul>

          <Node nodeRef={hub} className="size-20 sm:size-24">
            {[0, 1].map((k) => <span key={k} aria-hidden="true" className="ripple absolute inset-0 rounded-full border-2 border-brand/40" style={{ animationDelay: `${k * 1.4}s` }} />)}
            <img src="/images/brand/mark-brand.svg" alt="FollowUpHub" className="size-10 sm:size-12" />
          </Node>

          <ul className="grid gap-4 sm:gap-6">
            {OUTCOMES.map((o, i) => (
              <li key={o.name} className="flex items-center gap-3">
                <Node nodeRef={outs[i]} className={cx("size-11 sm:size-12", o.tone)}>
                  <o.icon aria-hidden="true" className="size-5" />
                </Node>
                <span className="hidden text-[14px] font-semibold sm:inline">{o.name}</span>
              </li>
            ))}
          </ul>

          {live && ins.map((r, i) => (
            <AnimatedBeam key={`in-${i}`} containerRef={box} fromRef={r} toRef={hub} curvature={(2.5 - i) * 18} duration={3.6} delay={i * 0.35} />
          ))}
          {live && outs.map((r, i) => (
            <AnimatedBeam key={`out-${i}`} containerRef={box} fromRef={hub} toRef={r} curvature={(1 - i) * 24} duration={3.6} delay={1.2 + i * 0.4} />
          ))}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------ who it's for ----------------------------- */

const ICONS: Record<string, LucideIcon> = {
  trades: Wrench, clinics: Stethoscope, salons: Scissors, auto: Car,
  cleaning: SprayCan, fitness: Dumbbell, landscaping: Trees, pets: PawPrint,
};

/**
 * A phone running the conversation for one trade: the customer's message
 * arrives, the AI types, replies in the business's name, and the visit is
 * booked. Plays while its slide is the active one; calls onDone at the end.
 */
function PhoneChat({ t, play, onDone }: { t: Trade; play: boolean; onDone: () => void }) {
  const reduce = useReducedMotion();
  const [step, setStep] = useState(reduce ? 4 : 0);
  useEffect(() => {
    if (reduce) return;
    if (!play) { setStep(0); return; }
    if (step >= 4) { const t2 = setTimeout(onDone, 2200); return () => clearTimeout(t2); }
    const t1 = setTimeout(() => setStep(step + 1), [600, 900, 1500, 1100][step]);
    return () => clearTimeout(t1);
  }, [play, step, reduce]);

  const bubble = { initial: { opacity: 0, y: 8 }, animate: { opacity: 1, y: 0 }, transition: { type: "spring" as const, stiffness: 380, damping: 30 } };
  return (
    <div className="relative h-[456px] w-[210px] rounded-[2.6rem] bg-ink p-[7px] [-webkit-font-smoothing:antialiased] shadow-[0_30px_60px_-20px_rgb(18_32_27/0.55)] ring-1 ring-white/10 sm:h-[543px] sm:w-[250px]">
      <div className="flex h-full flex-col overflow-hidden rounded-[2.2rem] bg-page">
        <div className="flex flex-col items-center gap-1 border-b border-line bg-page/95 px-3 pb-2 pt-9">
          <span className="grid size-8 place-items-center rounded-full bg-brand-tint text-[10.5px] font-semibold text-brand">{t.business.split(" ").map((w) => w[0]).join("").slice(0, 2)}</span>
          <span className="min-w-0 text-center">
            <span className="block truncate text-[11px] font-semibold">{t.business}</span>
            <span className="block text-[9.5px] text-green">AI front desk, online</span>
          </span>
        </div>
        <div className="flex flex-1 flex-col justify-end gap-1.5 bg-page px-2.5 pb-4 pt-3">
          <AnimatePresence initial={false}>
            {step >= 1 && <motion.p key="ask" {...bubble} className="max-w-[78%] rounded-[1.1rem] rounded-bl-[0.35rem] bg-[#e9ecea] px-2.5 py-1.5 text-[11px] leading-[1.35] text-ink sm:text-[11.5px]">{t.ask}</motion.p>}
            {step === 2 && (
              <motion.span key="typing" {...bubble} exit={{ opacity: 0 }} className="flex gap-1 self-end rounded-[1.1rem] rounded-br-[0.35rem] bg-brand px-3 py-2.5">
                {[0, 1, 2].map((k) => <motion.span key={k} className="size-1.5 rounded-full bg-white/80" animate={{ y: [0, -3, 0] }} transition={{ duration: 0.6, repeat: Infinity, delay: k * 0.12 }} />)}
              </motion.span>
            )}
            {step >= 3 && <motion.p key="reply" {...bubble} className="max-w-[78%] self-end rounded-[1.1rem] rounded-br-[0.35rem] bg-brand px-2.5 py-1.5 text-[11px] leading-[1.35] text-white sm:text-[11.5px]">{t.reply}</motion.p>}
            {step >= 4 && (
              <motion.p key="done" {...bubble} className="flex items-center gap-1 mt-1 self-center rounded-full bg-green-tint px-2.5 py-1 text-[10px] font-medium text-green">
                <CalendarCheck className="size-3" /> Booked
              </motion.p>
            )}
          </AnimatePresence>
        </div>
      </div>
      <span className="absolute left-1/2 top-[15px] h-[20px] w-[70px] -translate-x-1/2 rounded-full bg-ink sm:w-[80px]" />
    </div>
  );
}

/**
 * Wide slides, one per kind of business: the trade's photo fills the card,
 * its name sits on a dark fade at the left, and a phone on the right shows
 * FollowUpHub answering that trade's customer. Each slide moves on once its
 * conversation is booked. Native scroll with snap, so it swipes on phones.
 */
export function Trades() {
  const track = useRef<HTMLDivElement>(null);
  const inView = useInView(track, { margin: "-20% 0px" });
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);

  const cards = () => Array.from(track.current?.children ?? []) as HTMLElement[];
  const go = (i: number) => {
    const el = track.current, list = cards();
    if (!el || !list.length) return;
    const k = (i + list.length) % list.length;
    el.scrollTo({ left: list[k].offsetLeft - list[0].offsetLeft, behavior: "smooth" });
  };

  useEffect(() => {
    const el = track.current;
    if (!el) return;
    const onScroll = () => {
      const list = cards();
      const x = el.scrollLeft + list[0].offsetLeft;
      let best = 0;
      list.forEach((c, k) => { if (Math.abs(c.offsetLeft - x) < Math.abs(list[best].offsetLeft - x)) best = k; });
      setActive(best);
    };
    el.addEventListener("scroll", onScroll, { passive: true });
    return () => el.removeEventListener("scroll", onScroll);
  }, []);

  const next = () => { if (!paused) go(active + 1); };
  const stop = () => setPaused(true);

  return (
    <section id="trades" aria-labelledby="trades-title" className="overflow-hidden pb-6 pt-16 sm:pb-8 sm:pt-20">
      <div className="container-x">
        <Reveal className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div className="max-w-2xl">
            <h2 id="trades-title" className="t-h2">Made for businesses that live on the phone</h2>
            <p className="t-lede mt-4 max-w-xl text-ink-soft">It answers in your business’s name, then books the visit.</p>
          </div>
          <div className="flex shrink-0 gap-2">
            <button type="button" aria-label="Previous business" onClick={() => { stop(); go(active - 1); }} className="grid size-11 place-items-center rounded-full bg-page text-ink ring-1 ring-inset ring-line-strong transition-colors hover:bg-soft">
              <ArrowLeft className="size-5" />
            </button>
            <button type="button" aria-label="Next business" onClick={() => { stop(); go(active + 1); }} className="grid size-11 place-items-center rounded-full bg-brand text-white transition-colors hover:bg-brand-deep">
              <ArrowRight className="size-5" />
            </button>
          </div>
        </Reveal>

        <div
          ref={track}
          onTouchStart={stop}
          onWheel={(e) => Math.abs(e.deltaX) > Math.abs(e.deltaY) && stop()}
          className="no-scrollbar -mx-4 mt-10 flex snap-x snap-mandatory scroll-px-4 gap-4 overflow-x-auto px-4 pb-8 pt-2 sm:-mx-8 sm:scroll-px-8 sm:px-8"
        >
          {TRADES.map((t, i) => {
            const Icon = ICONS[t.id] ?? Wrench;
            return (
              <article key={t.id} aria-label={t.label} className="relative h-[680px] w-[86vw] max-w-[60rem] shrink-0 snap-start overflow-hidden rounded-[1.75rem] bg-ink shadow-card sm:h-[620px] sm:w-[80vw]">
                <img src={`/images/trades/${t.id}.jpg`} alt="" loading={i < 2 ? "eager" : "lazy"} decoding="async" className="kenburns absolute inset-0 size-full object-cover" style={{ animationDelay: `${-i * 3}s` }} />
                <div aria-hidden="true" className="absolute inset-0 bg-[linear-gradient(180deg,rgb(18_32_27/0.75)_0%,rgb(18_32_27/0.15)_45%,rgb(18_32_27/0.55)_100%)] sm:bg-[linear-gradient(90deg,rgb(18_32_27/0.82)_0%,rgb(18_32_27/0.35)_50%,rgb(18_32_27/0.1)_100%)]" />
                <div className="relative flex h-full flex-col justify-between gap-6 p-6 sm:flex-row sm:items-center sm:p-10">
                  <div className="max-w-xs text-white">
                    <span className="grid size-11 place-items-center rounded-xl bg-white/15 ring-1 ring-inset ring-white/25 backdrop-blur-sm"><Icon aria-hidden="true" className="size-5" /></span>
                    <h3 className="mt-4 text-[1.6rem] font-semibold leading-tight tracking-[-0.02em] sm:text-[2rem]">{t.label}</h3>
                    <p className="mt-2 text-[15px] text-white/80">Answered and booked while you’re on the job.</p>
                  </div>
                  <div aria-hidden="true" className="self-center sm:mr-6">
                    <PhoneChat t={t} play={inView && i === active} onDone={next} />
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
