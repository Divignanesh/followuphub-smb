import { motion, useReducedMotion } from "framer-motion";
import { Car, Scissors, Stethoscope, Wrench, type LucideIcon } from "lucide-react";
import { useState } from "react";
import { Reveal, cx } from "../components/ui";
import { TRADES } from "../lib/content";

/* ------------------------------- works with ------------------------------ */

const CHANNELS = [
  { name: "Google", src: "/images/channels/google.svg" },
  { name: "Facebook", src: "/images/channels/facebook.svg" },
  { name: "Instagram", src: "/images/channels/instagram.svg" },
  { name: "WhatsApp", src: "/images/channels/whatsapp.svg" },
  { name: "Gmail", src: "/images/channels/gmail.svg" },
];

/** Flowa's logo row, quiet and greyed, with the edges faded out. */
export function WorksWith() {
  return (
    <section aria-labelledby="works-title" className="container-x pb-4 pt-16 sm:pt-20">
      <Reveal className="text-center">
        <h2 id="works-title" className="text-[15px] text-ink-soft">Answers customers wherever they reach you</h2>
        <ul className="mx-auto mt-8 flex max-w-4xl flex-wrap items-center justify-center gap-x-12 gap-y-6 [mask-image:linear-gradient(to_right,transparent,black_12%,black_88%,transparent)] sm:gap-x-16">
          {CHANNELS.map((c) => (
            <li key={c.name} className="flex items-center gap-2.5 opacity-60 grayscale">
              <img src={c.src} alt="" className="size-7" />
              <span className="text-[19px] font-semibold tracking-[-0.02em] text-ink">{c.name}</span>
            </li>
          ))}
        </ul>
      </Reveal>
    </section>
  );
}

/* ------------------------------ who it's for ----------------------------- */

const ICONS: Record<string, LucideIcon> = { trades: Wrench, clinics: Stethoscope, salons: Scissors, auto: Car };

/**
 * Flowa's "why choose" row: four cards, one open. Opening is by hover, focus
 * or tap, and the open card shows the reply a customer in that line of work
 * gets back. Closed cards show only a large embossed icon and their name
 * (the reference numbers them; this page carries no numbers). Below 1024px
 * the row becomes a stack with every card open.
 */
export function Trades() {
  const [open, setOpen] = useState(0);
  const reduce = useReducedMotion();
  return (
    <section id="trades" aria-labelledby="trades-title" className="container-x section-y">
      <Reveal className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <p className="eyebrow">Who it’s for</p>
          <h2 id="trades-title" className="t-h2 mt-4 max-w-[16ch]">Made for businesses that live on the phone</h2>
        </div>
        <p className="t-lede max-w-md text-ink-soft lg:text-right">
          It answers the way you would, in your business’s name, then books the visit.
        </p>
      </Reveal>

      <div className="mt-12 grid gap-3 lg:flex lg:h-[460px]">
        {TRADES.map((t, i) => {
          const Icon = ICONS[t.id];
          const isOpen = open === i;
          return (
            <motion.div
              key={t.id}
              role="button"
              tabIndex={0}
              layout={!reduce}
              transition={{ type: "spring", stiffness: 220, damping: 30 }}
              onMouseEnter={() => setOpen(i)}
              onFocus={() => setOpen(i)}
              onClick={() => setOpen(i)}
              onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && (e.preventDefault(), setOpen(i))}
              aria-expanded={isOpen}
              className={cx(
                "group relative flex flex-col overflow-hidden rounded-[1.5rem] bg-page p-3 text-left shadow-card transition-shadow",
                isOpen ? "lg:flex-[2.3] shadow-float" : "lg:flex-1",
              )}
            >
              {/* Open view: the reply, in a soft well. Always shown below lg. */}
              <div className={cx("well flex-1 flex-col justify-center gap-3 p-5", isOpen ? "flex" : "flex lg:hidden")}>
                <p className="max-w-[85%] rounded-2xl rounded-bl-md bg-page px-4 py-3 text-[14px] shadow-card">{t.ask}</p>
                <div className="max-w-[88%] self-end">
                  <p className="mb-1.5 text-right text-[11.5px] text-ink-soft">{t.business}</p>
                  <p className="rounded-2xl rounded-br-md bg-brand px-4 py-3 text-[14px] text-white">{t.reply}</p>
                </div>
              </div>

              {/* Closed view: an embossed icon, as on the reference. */}
              <div className={cx("hidden flex-1 place-items-center", !isOpen && "lg:grid")}>
                <Icon aria-hidden="true" strokeWidth={1.2} className="size-28 text-soft-2 drop-shadow-[0_2px_0_rgb(255_255_255)] [filter:drop-shadow(0_1px_1px_rgb(23_20_43/0.12))]" />
              </div>

              <div className="px-3 pb-3 pt-5">
                <h3 className={cx("t-h3", !isOpen && "lg:text-ink-soft")}>{t.label}</h3>
                <p className={cx("t-body mt-1 hidden text-ink-soft", isOpen && "lg:block")}>
                  Every call, text and form gets an answer in your name, and the visit lands in your calendar.
                </p>
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
