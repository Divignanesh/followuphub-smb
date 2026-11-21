import { AnimatePresence, motion } from "framer-motion";
import { Flame, ShoppingBag, X, type LucideIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { ACTIVITY, type Activity } from "../lib/content";
import { cx } from "./ui";

/**
 * Bottom-left activity pop-ups (client request, 2026-11): one at a time,
 * "Manish signed up 5 min ago" and the like, sliding in from the corner.
 * Starts after a short delay, shows each for a few seconds, and can be
 * closed for the session. Sits above the offer bar on smaller screens.
 */
const START_MS = 9000;
const SHOW_MS = 5500;
const GAP_MS = 6500;

const KIND: Record<Activity["kind"], { icon: LucideIcon; tone: string; text: string }> = {
  bought: { icon: ShoppingBag, tone: "bg-brand-tint text-brand", text: "bought FollowUpHub" },
  founder: { icon: Flame, tone: "bg-red-tint text-red", text: "claimed the founder’s offer" },
};

export function SocialProof() {
  const [i, setI] = useState(-1);
  const [visible, setVisible] = useState(false);
  const [closed, setClosed] = useState(false);

  useEffect(() => {
    try { if (sessionStorage.getItem("fuh-proof-closed")) { setClosed(true); return; } } catch { /* private mode */ }
    let t: ReturnType<typeof setTimeout>;
    const show = (n: number) => {
      setI(n % ACTIVITY.length);
      setVisible(true);
      t = setTimeout(() => {
        setVisible(false);
        t = setTimeout(() => show(n + 1), GAP_MS);
      }, SHOW_MS);
    };
    t = setTimeout(() => show(0), START_MS);
    return () => clearTimeout(t);
  }, []);

  if (closed || i < 0) return null;
  const a = ACTIVITY[i];
  const k = KIND[a.kind];

  return (
    <div aria-live="polite" className="pointer-events-none fixed bottom-[5.5rem] left-3 z-30 sm:bottom-24 sm:left-5 xl:bottom-5">
      <AnimatePresence>
        {visible && (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: -40, scale: 0.95 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.97 }}
            transition={{ type: "spring", stiffness: 320, damping: 28 }}
            className="pointer-events-auto relative flex w-[19rem] max-w-[calc(100vw-1.5rem)] items-center gap-3 overflow-hidden rounded-2xl bg-page py-3 pl-3 pr-9 shadow-float"
          >
            <span className={cx("relative grid size-10 shrink-0 place-items-center rounded-xl", k.tone)}>
              <k.icon className="size-[18px]" aria-hidden="true" />
              <motion.span
                aria-hidden="true"
                className="absolute inset-0 rounded-xl ring-2 ring-current"
                initial={{ opacity: 0.6, scale: 1 }} animate={{ opacity: 0, scale: 1.5 }}
                transition={{ duration: 1.2, ease: "easeOut" }}
              />
            </span>
            <span className="min-w-0 text-[13px] leading-snug">
              <span className="block"><span className="font-semibold">{a.name}</span> <span className="text-ink-soft">from {a.place}</span></span>
              <span className="block">{k.text}</span>
              <span className="mt-0.5 flex items-center gap-1.5 text-[11.5px] text-ink-soft">
                <span className="size-1.5 rounded-full bg-green" aria-hidden="true" /> {a.ago}
              </span>
            </span>
            <button
              type="button"
              aria-label="Hide activity"
              onClick={() => { setClosed(true); try { sessionStorage.setItem("fuh-proof-closed", "1"); } catch { /* private mode */ } }}
              className="absolute right-1 top-1 grid size-8 place-items-center rounded-lg text-ink-soft hover:bg-soft"
            >
              <X className="size-3.5" />
            </button>
            <motion.span
              aria-hidden="true"
              className="absolute inset-x-0 bottom-0 h-[2px] origin-left bg-brand/60"
              initial={{ scaleX: 0 }} animate={{ scaleX: 1 }}
              transition={{ duration: SHOW_MS / 1000, ease: "linear" }}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
