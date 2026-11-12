import { LayoutGroup, motion, useInView, useReducedMotion } from "framer-motion";
import { Bell, Bot, CalendarCheck, Check, MessageSquareText, PhoneMissed, Star, UserCheck } from "lucide-react";
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

function Row({ title, body, points, visual, flip = false }: { title: string; body: string; points: string[]; visual: ReactNode; flip?: boolean }) {
  return (
    <Reveal className={cx("grid items-stretch gap-2 rounded-[2rem] bg-page p-2 shadow-card", flip ? "lg:grid-cols-[1.15fr_0.85fr]" : "lg:grid-cols-[0.85fr_1.15fr]")}>
      <div className={cx("flex flex-col justify-center px-6 py-8 sm:px-10 sm:py-12", flip && "lg:order-2")}>
        <h3 className="text-[1.75rem] font-semibold leading-tight tracking-[-0.03em] sm:text-[2rem]">{title}</h3>
        <p className="t-lede mt-4 max-w-md text-ink-soft">{body}</p>
        <ul className="mt-7 grid gap-3">
          {points.map((p) => (
            <li key={p} className="flex items-center gap-3 text-[15.5px]">
              <span className="grid size-6 place-items-center rounded-full bg-brand-tint text-brand">
                <Check className="size-3.5" strokeWidth={3} />
              </span>
              {p}
            </li>
          ))}
        </ul>
      </div>
      <div aria-hidden="true" className={cx("well flex items-center overflow-hidden p-4 sm:p-8", flip && "lg:order-1")}>
        {visual}
      </div>
    </Reveal>
  );
}

/* ------------------------------ Conversations ---------------------------- */

const LIST: { name: string; c: Channel; text: string }[] = [
  { name: "Priya Shah", c: "call", text: "Missed call, texted back" },
  { name: "Marc Gagnon", c: "facebook", text: "Do you do drain cleaning?" },
  { name: "Lea Martin", c: "whatsapp", text: "Thanks, see you then" },
  { name: "Dana White", c: "email", text: "Quote request" },
];

function Inbox() {
  return (
    <AppWindow active="Conversations" title="Conversations" className="w-full">
      <div className="grid gap-3 md:grid-cols-[0.85fr_1.15fr]">
        <ul className="hidden content-start gap-1 md:grid">
          {LIST.map((t, i) => (
            <li key={t.name} className={cx("flex items-center gap-2.5 rounded-lg px-2 py-2", i === 0 && "bg-brand-tint")}>
              <Avatar name={t.name} i={i} size="size-7" />
              <span className="min-w-0 flex-1">
                <span className="flex items-center gap-1.5 text-[12.5px] font-medium">{t.name}<ChannelIcon c={t.c} className="size-3" /></span>
                <span className="block truncate text-[11.5px] text-ink-soft">{t.text}</span>
              </span>
            </li>
          ))}
        </ul>
        <div className="flex flex-col gap-2.5 rounded-xl bg-soft p-3">
          <p className="flex items-center gap-1.5 self-center rounded-full bg-red-tint px-2.5 py-1 text-[11px] font-medium text-red">
            <PhoneMissed className="size-3" /> Missed call
          </p>
          <p className="max-w-[85%] self-end rounded-2xl rounded-br-md bg-brand px-3 py-2 text-[12.5px] text-white">
            Hi Priya, sorry we missed you! What can we help with?
          </p>
          <p className="max-w-[85%] rounded-2xl rounded-bl-md bg-page px-3 py-2 text-[12.5px] shadow-card">
            Our water heater is leaking. Can someone come by?
          </p>
          <p className="max-w-[85%] self-end rounded-2xl rounded-br-md bg-brand px-3 py-2 text-[12.5px] text-white">
            Of course. Thursday afternoon works. Shall I book it?
          </p>
          <p className="self-end text-[10.5px] text-ink-soft">Sent by AI Agent</p>
        </div>
      </div>
    </AppWindow>
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
              <div key={st.name} className="flex min-h-[230px] flex-col gap-2 rounded-xl bg-soft p-2">
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
  { icon: CalendarCheck, text: "Booked a visit for Thursday", who: "Priya Shah" },
  { icon: UserCheck, text: "Handed a quote request to you", who: "Dana White" },
  { icon: Bell, text: "Sent tomorrow’s reminders", who: "Calendars" },
  { icon: Star, text: "Asked for a Google review", who: "Lea Martin" },
];

function Agent() {
  return (
    <AppWindow active="AI Agents" title="AI Agents" className="w-full">
      <div className="flex items-center justify-between rounded-xl bg-soft px-3 py-2.5">
        <span className="flex items-center gap-2 text-[12.5px] font-semibold">
          <span className="grid size-7 place-items-center rounded-lg bg-brand text-white"><Bot className="size-4" /></span>
          Front desk agent
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

export function FeatureRows() {
  return (
    <section id="features" aria-labelledby="features-title" className="bg-soft py-20 sm:py-28">
      <div className="container-x">
        <Reveal className="mx-auto max-w-2xl text-center">
          <p className="eyebrow">Features</p>
          <h2 id="features-title" className="t-h2 mt-4">Everything your front desk does, done for you</h2>
          <p className="t-lede mx-auto mt-4 max-w-xl text-ink-soft">
            Answer, book, remind and follow up from one app, while you stay on the job.
          </p>
        </Reveal>

        <div className="mt-14 grid gap-5">
          <Row
            title="Every message, one inbox"
            body="Calls, texts, email, WhatsApp, Facebook and Instagram land in one thread per customer. Missed calls get a text back on their own."
            points={["Missed-call text-back", "One thread per customer", "Shared with your team"]}
            visual={<Inbox />}
          />
          <Row
            flip
            title="A pipeline that moves itself"
            body="Every lead becomes a job card. As the AI replies, books and gets paid, the card moves along, so you always know what’s next."
            points={["Your own stages", "Full history on every job", "See what’s stuck at a glance"]}
            visual={<Pipeline />}
          />
          <Row
            title="An AI agent at the front desk"
            body="It replies in your business’s name, answers the usual questions and books the work. When something needs you, it hands over."
            points={["Replies by text, email and voice", "Answers in your words", "Hands off to a person when needed"]}
            visual={<Agent />}
          />
        </div>
      </div>
    </section>
  );
}
