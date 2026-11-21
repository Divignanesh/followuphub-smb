import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { cx } from "./ui";

/**
 * A rolling 48-hour offer window (client request, 2026-11). The first visit
 * stores a start time; the deadline is the next 48-hour mark after it, so
 * when a window ends a new one begins straight away. Before hydration it
 * shows 48:00:00 so the prerendered markup matches.
 */
const WINDOW = 48 * 60 * 60 * 1000;
const KEY = "fuh-offer-start";

function deadline(now: number) {
  let start = now;
  try {
    const saved = Number(localStorage.getItem(KEY));
    if (saved && saved <= now) start = saved;
    else localStorage.setItem(KEY, String(now));
  } catch { /* private mode: window starts now */ }
  return start + Math.ceil((now - start + 1) / WINDOW) * WINDOW;
}

export function useOfferCountdown() {
  const [left, setLeft] = useState(WINDOW);
  useEffect(() => {
    let end = deadline(Date.now());
    const tick = () => {
      const now = Date.now();
      if (now >= end) end = deadline(now);
      setLeft(end - now);
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);
  const s = Math.floor(left / 1000);
  return { h: Math.floor(s / 3600), m: Math.floor((s % 3600) / 60), s: s % 60 };
}

const pad = (n: number) => String(n).padStart(2, "0");

/** One digit that rolls up when it changes. */
function Digit({ d }: { d: string }) {
  return (
    <span className="relative inline-block h-[1.15em] w-[0.62em] overflow-hidden text-center">
      <AnimatePresence initial={false} mode="popLayout">
        <motion.span
          key={d}
          className="absolute inset-0"
          initial={{ y: "100%" }} animate={{ y: 0 }} exit={{ y: "-100%" }}
          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
        >
          {d}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}

function Unit({ v, label, tone }: { v: number; label: string; tone: "light" | "dark" }) {
  return (
    <span className="flex flex-col items-center">
      <span className={cx(
        "flex rounded-lg px-1.5 py-1 font-semibold tabular-nums leading-none",
        tone === "dark" ? "bg-white/12 text-white" : "bg-page text-ink shadow-card",
      )}>
        {pad(v).split("").map((d, i) => <Digit key={i} d={d} />)}
      </span>
      <span className={cx("mt-1 text-[10.5px] font-medium uppercase tracking-[0.08em]", tone === "dark" ? "text-white/70" : "text-ink-soft")}>{label}</span>
    </span>
  );
}

/** Hours, minutes and seconds in rolling tiles. */
export function Countdown({ tone = "light", className }: { tone?: "light" | "dark"; className?: string }) {
  const { h, m, s } = useOfferCountdown();
  return (
    <span
      role="timer"
      aria-label={`Offer ends in ${h} hours ${m} minutes`}
      className={cx("inline-flex items-start gap-1.5 text-[22px]", className)}
    >
      <Unit v={h} label="hrs" tone={tone} />
      <span aria-hidden="true" className={cx("pt-1 font-semibold", tone === "dark" ? "text-white/60" : "text-ink-soft")}>:</span>
      <Unit v={m} label="min" tone={tone} />
      <span aria-hidden="true" className={cx("pt-1 font-semibold", tone === "dark" ? "text-white/60" : "text-ink-soft")}>:</span>
      <Unit v={s} label="sec" tone={tone} />
    </span>
  );
}

/** The same countdown as plain text, for tight spots like the offer bar. */
export function CountdownText({ className }: { className?: string }) {
  const { h, m, s } = useOfferCountdown();
  return <span role="timer" aria-label={`Offer ends in ${h} hours ${m} minutes`} className={cx("tabular-nums", className)}>{pad(h)}:{pad(m)}:{pad(s)}</span>;
}
