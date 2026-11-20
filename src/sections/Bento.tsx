import { motion } from "framer-motion";
import { Bell, CalendarCheck, CalendarClock, Check, CreditCard, FileText, MessageSquareText, PhoneCall, Star, UserPlus } from "lucide-react";
import { useState } from "react";
import { AnimatedList } from "../components/AnimatedList";
import { AppWindow, Avatar, Chip } from "../components/Mock";
import { Reveal, cx } from "../components/ui";

/**
 * After the Nitux bento: one wide card holding the app's Dashboard, then two
 * cards side by side for reminders and availability, each with its title
 * and line centred over the visual. Number-free by rule: the pipeline bars
 * show shape, not counts, and hours are named, not timed.
 */

const STAGES = [
  { name: "New lead", w: "100%" },
  { name: "Contacted", w: "78%" },
  { name: "Booked", w: "56%" },
  { name: "Completed", w: "40%" },
  { name: "Paid", w: "30%" },
];

const ACTIVITY = [
  { icon: MessageSquareText, text: "Texted back Priya Shah", tone: "bg-brand-tint text-brand" },
  { icon: PhoneCall, text: "Vaani called back Tom Becker", tone: "bg-brand-tint text-brand" },
  { icon: CalendarCheck, text: "Booked Marc Gagnon for Tuesday", tone: "bg-green-tint text-green" },
  { icon: FileText, text: "Sent a quote to Dana White", tone: "bg-amber-tint text-amber-ink" },
  { icon: CreditCard, text: "Invoice paid by Lea Martin", tone: "bg-green-tint text-green" },
  { icon: Bell, text: "Reminded Sofia Rossi about tomorrow", tone: "bg-amber-tint text-amber-ink" },
  { icon: CalendarClock, text: "Moved Ryan Murphy to Friday", tone: "bg-[#e6f0fa] text-[#1f5c94]" },
  { icon: UserPlus, text: "New customer: Grace Kim", tone: "bg-brand-tint text-brand" },
  { icon: Star, text: "Review request sent to Ben Carter", tone: "bg-[#fff8e1] text-[#8a5a00]" },
];

function Dashboard() {
  return (
    <AppWindow active="Dashboard" title="Dashboard" className="mx-auto w-full max-w-4xl">
      <div className="grid gap-3 md:grid-cols-[1.2fr_1fr]">
        <div className="rounded-xl bg-soft p-4 ring-1 ring-inset ring-line">
          <p className="flex items-center justify-between text-[13px] font-semibold">
            Pipeline <Chip tone="brand">This month</Chip>
          </p>
          <ul className="mt-4 grid gap-2.5">
            {STAGES.map((s, i) => (
              <li key={s.name} className="relative h-9 overflow-hidden rounded-lg bg-page ring-1 ring-inset ring-line">
                <motion.span
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.9, delay: 0.1 * i, ease: [0.16, 1, 0.3, 1] }}
                  style={{ width: s.w }}
                  className="absolute inset-y-0 left-0 origin-left rounded-lg bg-[linear-gradient(90deg,var(--color-brand-tint),var(--color-mint-soft))]"
                />
                <span className="relative flex h-full items-center px-3 text-[12.5px] font-medium">{s.name}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="rounded-xl bg-soft p-4 ring-1 ring-inset ring-line">
          <p className="flex items-center justify-between text-[13px] font-semibold">
            Recent activity
            <Chip tone="green"><span className="size-1.5 animate-pulse rounded-full bg-green" /> Live</Chip>
          </p>
          {/* A live feed: newest arrives on top and pushes the rest down. */}
          <div className="mt-4 h-[236px] overflow-hidden [mask-image:linear-gradient(to_bottom,black_70%,transparent)]">
            <AnimatedList delay={1500} hold={2600} className="!gap-2">
              {ACTIVITY.map(({ icon: Icon, text, tone }) => (
                <div key={text} className="flex items-center gap-2.5 rounded-lg bg-page px-3 py-2.5 ring-1 ring-inset ring-line">
                  <span className={cx("grid size-7 shrink-0 place-items-center rounded-md", tone)}><Icon className="size-3.5" /></span>
                  <span className="min-w-0 flex-1 truncate text-[12.5px]">{text}</span>
                </div>
              ))}
            </AnimatedList>
          </div>
        </div>
      </div>
    </AppWindow>
  );
}

/** Reminder cards fanned like the reference's stack. */
function Reminders() {
  const cards = [
    { who: "Priya Shah", text: "Your plumbing visit is tomorrow afternoon.", rot: -5, x: -18 },
    { who: "Marc Gagnon", text: "Reply YES to confirm your estimate visit.", rot: 3, x: 22 },
    { who: "Dana White", text: "Your tune-up is today. We’ll text on our way.", rot: -1.5, x: 0 },
  ];
  return (
    <div className="relative mx-auto h-[270px] w-full max-w-[22rem]">
      {cards.map((c, i) => (
        <div
          key={c.who}
          style={{ top: `${12 + i * 84}px`, left: `calc(50% - 150px + ${c.x}px)`, transform: `rotate(${c.rot}deg)` }}
          className="absolute w-[300px] rounded-xl bg-page p-3 text-ink shadow-float"
        >
          <div className="flex items-center gap-2.5">
            <Avatar name={c.who} i={i} size="size-7" />
            <p className="text-[12.5px] font-semibold">Reminder</p>
            {i === 2 && <span className="ml-auto grid size-5 place-items-center rounded-full bg-green text-white"><Check className="size-3" strokeWidth={3} /></span>}
          </div>
          <p className="mt-1.5 text-[12.5px] text-ink-soft">{c.text}</p>
        </div>
      ))}
    </div>
  );
}

/** Real switches; the AI only offers times inside open hours. */
const HOURS = [
  { day: "Weekdays", open: "All day" },
  { day: "Saturday", open: "Mornings" },
  { day: "Sunday", open: "Closed", off: true },
  { day: "Holidays", open: "Closed", off: true },
];
function Availability() {
  const [on, setOn] = useState(HOURS.map((h) => !h.off));
  return (
    <div className="mx-auto grid w-full max-w-[22rem] gap-2.5">
      {HOURS.map((h, i) => (
        <div key={h.day} className="flex items-center gap-3 rounded-xl bg-page px-4 py-3 shadow-card">
          <button
            type="button"
            role="switch"
            aria-checked={on[i]}
            aria-label={`Open on ${h.day}`}
            onClick={() => setOn((v) => v.map((x, k) => (k === i ? !x : x)))}
            className={cx("relative h-6 w-10 shrink-0 rounded-full transition-colors", on[i] ? "bg-green" : "bg-line")}
          >
            <span className={cx("absolute top-0.5 size-5 rounded-full bg-white shadow transition-[left] duration-200", on[i] ? "left-[18px]" : "left-0.5")} />
          </button>
          <span className="text-[14px] font-medium">{h.day}</span>
          <span className={cx("ml-auto rounded-md px-2 py-1 text-[12.5px]", on[i] ? "bg-brand-tint text-brand" : "text-ink-soft")}>{on[i] ? (h.off ? "Open" : h.open) : "Closed"}</span>
        </div>
      ))}
    </div>
  );
}

function Card({ title, body, children, className, dark = false }: { title: string; body: string; children: React.ReactNode; className?: string; dark?: boolean }) {
  return (
    <Reveal className={cx(
      "overflow-hidden rounded-[1.75rem] px-5 pb-7 pt-7 sm:px-8",
      dark ? "bg-brand-deep text-white" : "bg-soft ring-1 ring-inset ring-line",
      className,
    )}>
      <div className="mx-auto max-w-md text-center">
        <h3 className="text-[20px] font-semibold tracking-[-0.025em]">{title}</h3>
        <p className={cx("mt-1 text-[15px]", dark ? "text-white/75" : "text-ink-soft")}>{body}</p>
      </div>
      <div className="mt-6">{children}</div>
    </Reveal>
  );
}

export function Bento() {
  return (
    <section id="overview" aria-labelledby="bento-title" className="container-x pb-16 pt-8 sm:pb-20 sm:pt-10">
      <Reveal className="mx-auto max-w-2xl text-center">
        <h2 id="bento-title" className="t-h2">Your whole business at a glance</h2>
        <p className="t-lede mx-auto mt-4 max-w-xl text-ink-soft">Every lead, job and conversation in one place.</p>
      </Reveal>

      <div className="mt-8 grid gap-4 md:grid-cols-2">
        <Card className="md:col-span-2" title="Pipeline and activity" body="Every job from first call to paid.">
          <div aria-hidden="true"><Dashboard /></div>
        </Card>
        <Card dark title="Smart reminders" body="A text before every visit.">
          <div aria-hidden="true"><Reminders /></div>
        </Card>
        <Card title="Set your availability" body="The AI only offers times you’re open.">
          <Availability />
        </Card>
      </div>
    </section>
  );
}
