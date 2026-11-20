import { AnimatePresence, LayoutGroup, motion, useInView, useReducedMotion, useScroll, useTransform, type MotionValue } from "framer-motion";
import { Bell, Bot, CalendarCheck, Check, MessageSquareText, PhoneCall, PhoneMissed, Star, UserCheck } from "lucide-react";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { AnimatedList } from "../components/AnimatedList";
import { AppWindow, Avatar, ChannelIcon, Chip, type Channel } from "../components/Mock";
import { Reveal, cx } from "../components/ui";

/**
 * Flowa's feature rows: a white card split in two, words and checks on one
 * side, and on the other a soft well holding one module of the real app.
 * Sides alternate row to row. The modules are the app's own (Conversations,
 * Opportunities, Calendars, AI Agents), drawn with names and statuses only.
 */

/**
 * Sticky stack: each card pins under the nav, a little lower than the one
 * before, and the next card slides up over it while the one beneath eases
 * back. Driven by Motion's useScroll (no scroll listeners); under reduced
 * motion the cards simply stack without scaling.
 */
function StackCard({ i, n, progress, children }: { i: number; n: number; progress: MotionValue<number>; children: ReactNode }) {
  const reduce = useReducedMotion();
  const scale = useTransform(progress, [i / n, 1], [1, 1 - (n - 1 - i) * 0.03]);
  return (
    <div className="lg:sticky" style={{ top: `${96 + i * 64}px` }}>
      <motion.div style={reduce ? undefined : { scale, transformOrigin: "top center" }}>{children}</motion.div>
    </div>
  );
}

function Row({ title, body, points, visual, flip = false }: { title: string; body: string; points: string[]; visual: ReactNode; flip?: boolean }) {
  return (
    <div className={cx("grid items-stretch overflow-hidden rounded-[1.75rem] bg-page shadow-float", flip ? "lg:grid-cols-[1.15fr_0.85fr]" : "lg:grid-cols-[0.85fr_1.15fr]")}>
      <div className={cx("flex flex-col justify-center px-6 py-8 sm:px-10 sm:py-12", flip && "lg:order-2")}>
        <h3 className="text-[1.75rem] font-semibold leading-tight tracking-[-0.03em] sm:text-[2rem]">{title}</h3>
        <p className="t-lede mt-4 max-w-md text-ink-soft">{body}</p>
        <ul className="mt-7 grid gap-3">
          {points.map((p) => (
            <li key={p} className="flex items-center gap-3 text-[15.5px]">
              <span className="grid size-6 place-items-center rounded-full bg-brand text-white">
                <Check className="size-3.5" strokeWidth={3} />
              </span>
              {p}
            </li>
          ))}
        </ul>
      </div>
      <div aria-hidden="true" className={cx("flex items-center border-t border-line bg-soft p-4 sm:p-8 lg:border-t-0", flip ? "lg:order-1 lg:border-r" : "lg:border-l")}>
        {visual}
      </div>
    </div>
  );
}

/* ------------------------------ Conversations ---------------------------- */

type Msg = { from: "ai" | "them" | "event"; text: string };
type Thread = { name: string; c: Channel; channel: string; msgs: Msg[] };

const THREADS: Thread[] = [
  { name: "Priya Shah", c: "call", channel: "Missed call", msgs: [
    { from: "event", text: "Missed call" },
    { from: "ai", text: "Hi Priya, sorry we missed you! What can we help with?" },
    { from: "them", text: "Our water heater is leaking. Can someone come by?" },
    { from: "ai", text: "Of course. Thursday afternoon works. Shall I book it?" },
    { from: "them", text: "Yes please!" },
  ] },
  { name: "Marc Gagnon", c: "facebook", channel: "Facebook", msgs: [
    { from: "them", text: "Do you do drain cleaning?" },
    { from: "ai", text: "We do! A technician can come Tuesday morning. Want me to book it?" },
    { from: "them", text: "Tuesday works" },
    { from: "event", text: "Booked for Tuesday" },
  ] },
  { name: "Lea Martin", c: "whatsapp", channel: "WhatsApp", msgs: [
    { from: "ai", text: "Reminder: your visit is tomorrow afternoon. Reply YES to confirm." },
    { from: "them", text: "YES" },
    { from: "ai", text: "Confirmed. See you then!" },
    { from: "them", text: "Thanks, see you then" },
  ] },
  { name: "Dana White", c: "email", channel: "Email", msgs: [
    { from: "them", text: "Could I get a quote for a new faucet install?" },
    { from: "ai", text: "Happy to. Here’s your quote; you can accept it from the link." },
    { from: "event", text: "Quote sent" },
    { from: "them", text: "Accepted, thanks!" },
  ] },
];

function Typing() {
  return (
    <span className="flex max-w-max gap-1 self-end rounded-2xl rounded-br-md bg-brand px-3 py-2.5">
      {[0, 1, 2].map((k) => (
        <motion.span key={k} className="size-1.5 rounded-full bg-white/80" animate={{ y: [0, -3, 0] }} transition={{ duration: 0.6, repeat: Infinity, delay: k * 0.12 }} />
      ))}
    </span>
  );
}

/**
 * The inbox plays itself like the pipeline does: a thread opens, the
 * conversation types out, then the next thread takes over. Clicking a
 * thread opens it and replays it. Plays only on screen; under reduced
 * motion it shows the first thread complete.
 */
function Inbox() {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { margin: "-15% 0px" });
  const [t, setT] = useState(0);
  const [k, setK] = useState(reduce ? THREADS[0].msgs.length : 0);
  const msgs = THREADS[t].msgs;

  useEffect(() => {
    if (reduce || !inView) return;
    const done = k >= msgs.length;
    const timer = setTimeout(() => {
      if (done) { setT((t + 1) % THREADS.length); setK(0); }
      else setK(k + 1);
    }, done ? 2600 : k === 0 ? 500 : msgs[k].from === "ai" ? 1400 : 1000);
    return () => clearTimeout(timer);
  }, [t, k, inView, reduce, msgs]);

  const pick = (i: number) => { setT(i); setK(reduce ? THREADS[i].msgs.length : 0); };
  const typing = !reduce && k < msgs.length && msgs[k].from === "ai";
  const preview = (th: Thread) => th.msgs.filter((m) => m.from !== "event").at(-1)?.text;

  return (
    <div ref={ref} className="w-full">
      <AppWindow active="Conversations" title="Conversations" className="w-full">
        <div className="grid gap-3 md:grid-cols-[0.85fr_1.15fr]">
          <ul className="hidden content-start gap-1 md:grid">
            {THREADS.map((th, i) => (
              <li key={th.name}>
                <button
                  type="button"
                  tabIndex={-1}
                  onClick={() => pick(i)}
                  className={cx("flex w-full items-center gap-2.5 rounded-lg px-2 py-2 text-left transition-colors", i === t ? "bg-brand-tint" : "hover:bg-soft")}
                >
                  <Avatar name={th.name} i={i} size="size-7" />
                  <span className="min-w-0 flex-1">
                    <span className="flex items-center gap-1.5 text-[12.5px] font-medium">{th.name}<ChannelIcon c={th.c} className="size-3" /></span>
                    <span className="block truncate text-[11.5px] text-ink-soft">{preview(th)}</span>
                  </span>
                  {i === t && k < msgs.length && <span className="size-2 shrink-0 rounded-full bg-brand" />}
                </button>
              </li>
            ))}
          </ul>
          <div className="flex h-[300px] flex-col rounded-xl bg-soft p-3 ring-1 ring-inset ring-line">
            <p className="mb-2 flex items-center gap-1.5 border-b border-line pb-2 text-[12px] font-medium">
              <ChannelIcon c={THREADS[t].c} className="size-3" /> {THREADS[t].name}
              <span className="ml-auto text-[11px] font-normal text-ink-soft">{THREADS[t].channel}</span>
            </p>
            <div className="flex flex-1 flex-col justify-end gap-2 overflow-hidden">
              <AnimatePresence initial={false} mode="popLayout">
                {msgs.slice(0, k).map((m, i) => (
                  <motion.p
                    key={`${t}-${i}`}
                    layout
                    initial={{ opacity: 0, y: 10, scale: 0.96 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    className={cx(
                      "max-w-[85%] text-[12.5px]",
                      m.from === "ai" && "self-end rounded-2xl rounded-br-md bg-brand px-3 py-2 text-white",
                      m.from === "them" && "rounded-2xl rounded-bl-md bg-page px-3 py-2 shadow-card",
                      m.from === "event" && "flex items-center gap-1.5 self-center rounded-full px-2.5 py-1 text-[11px] font-medium " + (m.text === "Missed call" ? "bg-red-tint text-red" : "bg-green-tint text-green"),
                    )}
                  >
                    {m.from === "event" && (m.text === "Missed call" ? <PhoneMissed className="size-3" /> : <Check className="size-3" strokeWidth={3} />)}
                    {m.text}
                  </motion.p>
                ))}
              </AnimatePresence>
              {typing && <Typing />}
            </div>
            <p className="mt-2 self-end text-[10.5px] text-ink-soft">Replies sent by AI Agent</p>
          </div>
        </div>
      </AppWindow>
    </div>
  );
}

/* ------------------------------ Opportunities ---------------------------- */

const STAGES = [
  { name: "New lead", tone: "red" },
  { name: "Replied", tone: "brand" },
  { name: "Booked", tone: "amber" },
  { name: "Won", tone: "green" },
] as const;
const JOBS: { id: string; who: string; job: string; c: Channel }[] = [
  { id: "priya", who: "Priya S.", job: "Water heater", c: "call" },
  { id: "marc", who: "Marc G.", job: "Drain cleaning", c: "facebook" },
  { id: "dana", who: "Dana W.", job: "Furnace tune-up", c: "web" },
];
const LAST = STAGES.length - 1;

/** The job board that moves itself; plays only on screen, rests under reduced motion. */
function Pipeline() {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { margin: "-15% 0px" });
  const [stage, setStage] = useState<number[]>(reduce ? [3, 2, 1] : [0, 0, 0]);
  const [turn, setTurn] = useState(0);

  useEffect(() => {
    if (reduce || !inView) return;
    const done = stage.every((s) => s === LAST);
    const t = setTimeout(() => {
      if (done) { setStage([0, 0, 0]); setTurn(0); return; }
      let i = turn % JOBS.length;
      while (stage[i] === LAST) i = (i + 1) % JOBS.length;
      setStage((s) => s.map((v, k) => (k === i ? v + 1 : v)));
      setTurn(i + 1);
    }, done ? 2600 : 900);
    return () => clearTimeout(t);
  }, [stage, turn, inView, reduce]);

  return (
    <div ref={ref} className="w-full">
      <AppWindow active="Opportunities" title="Opportunities" className="w-full">
        <LayoutGroup>
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
            {STAGES.map((st, col) => (
              <div key={st.name} className="flex min-h-[230px] flex-col gap-2 rounded-xl bg-soft p-2 ring-1 ring-inset ring-line">
                <Chip tone={st.tone}>{st.name}</Chip>
                {JOBS.map((j, k) =>
                  stage[k] === col ? (
                    <motion.div key={j.id} layoutId={`opp-${j.id}`} transition={{ type: "spring", stiffness: 260, damping: 30 }} className="rounded-lg bg-page p-2.5 shadow-card">
                      <p className="text-[12px] font-semibold">{j.job}</p>
                      <p className="mt-0.5 flex items-center gap-1.5 text-[11px] text-ink-soft">
                        <ChannelIcon c={j.c} className="size-3" /> {j.who}
                      </p>
                    </motion.div>
                  ) : null,
                )}
              </div>
            ))}
          </div>
        </LayoutGroup>
      </AppWindow>
    </div>
  );
}

/* -------------------------------- AI Agents ------------------------------ */

const ACTIONS = [
  { icon: MessageSquareText, text: "Texted back a missed call", who: "Priya Shah" },
  { icon: PhoneCall, text: "Called back a missed caller", who: "Tom Becker" },
  { icon: CalendarCheck, text: "Booked a visit for Thursday", who: "Priya Shah" },
  { icon: UserCheck, text: "Handed a quote request to you", who: "Dana White" },
  { icon: Bell, text: "Sent tomorrow’s reminders", who: "Calendars" },
  { icon: Star, text: "Asked for a Google review", who: "Lea Martin" },
];

export function Agent() {
  return (
    <AppWindow active="AI Agents" title="AI Agents" className="w-full">
      <div className="flex items-center justify-between rounded-xl bg-soft px-3 py-2.5 ring-1 ring-inset ring-line">
        <span className="flex items-center gap-2 text-[12.5px] font-semibold">
          <span className="grid size-7 place-items-center rounded-lg bg-brand text-white"><Bot className="size-4" /></span>
          Vaani, front desk agent
        </span>
        <Chip tone="green"><span className="size-1.5 animate-pulse rounded-full bg-green" /> Working</Chip>
      </div>
      <div className="mt-3 h-[220px] overflow-hidden [mask-image:linear-gradient(to_bottom,black_75%,transparent)]">
        <AnimatedList delay={1600} hold={3000}>
          {ACTIONS.map(({ icon: Icon, text, who }) => (
            <div key={text} className="flex items-center gap-3 rounded-xl border border-line bg-page px-3 py-2.5">
              <span className="grid size-8 place-items-center rounded-lg bg-brand-tint text-brand"><Icon className="size-4" /></span>
              <span>
                <span className="block text-[12.5px] font-medium">{text}</span>
                <span className="block text-[11.5px] text-ink-soft">{who}</span>
              </span>
            </div>
          ))}
        </AnimatedList>
      </div>
    </AppWindow>
  );
}

function Stack({ rows }: { rows: ReactNode[] }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  return (
    <div ref={ref} className="mt-10 grid gap-6 lg:pb-6">
      {rows.map((r, i) => <StackCard key={i} i={i} n={rows.length} progress={scrollYProgress}>{r}</StackCard>)}
    </div>
  );
}

export function FeatureRows() {
  return (
    <section id="features" aria-labelledby="features-title" className="border-y border-line bg-soft py-16 sm:py-20">
      <div className="container-x">
        <Reveal className="mx-auto max-w-2xl text-center">
          <p className="eyebrow">Features</p>
          <h2 id="features-title" className="t-h2 mt-4">Everything your front desk does, done for you</h2>
          <p className="t-lede mx-auto mt-4 max-w-xl text-ink-soft">
            Answer, book, remind and follow up from one app, while you stay on the job.
          </p>
        </Reveal>

        <Stack
          rows={[
            <Row
              key="inbox"
              title="Every message, one inbox"
              body="Calls, texts, email and social land in one thread per customer."
              points={["Missed-call text-back", "One thread per customer", "Shared with your team"]}
              visual={<Inbox />}
            />,
            <Row
              key="pipeline"
              flip
              title="A pipeline that moves itself"
              body="Every lead becomes a job card that moves as the AI books and gets paid."
              points={["Your own stages", "Full history on every job", "See what’s stuck at a glance"]}
              visual={<Pipeline />}
            />,
          ]}
        />
      </div>
    </section>
  );
}
