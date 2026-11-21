import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import { useEffect, useState } from "react";
import { PLAN, TRIAL_DAYS } from "../lib/content";
import { CountdownText } from "./Countdown";
import { EASE_OUT, PillCta } from "./ui";

/**
 * After HighLevel's sticky trial bar: once the hero is off screen, a slim
 * bar slides up from the bottom with the offer and the trial button. It
 * steps aside while the pricing section or the footer is on screen (they
 * carry their own button) and can be closed for the session.
 */
export function TrialBar() {
  const [pastHero, setPastHero] = useState(false);
  const [covered, setCovered] = useState(false);
  const [closed, setClosed] = useState(false);

  useEffect(() => {
    try { if (sessionStorage.getItem("fuh-bar-closed")) setClosed(true); } catch { /* private mode */ }
    const hero = document.getElementById("top");
    const blockers = ["pricing", "site-footer"].map((id) => document.getElementById(id)).filter((e): e is HTMLElement => !!e);
    const seen = new Set<Element>();
    const io1 = new IntersectionObserver(([e]) => setPastHero(!e.isIntersecting));
    const io2 = new IntersectionObserver((entries) => {
      entries.forEach((e) => (e.isIntersecting ? seen.add(e.target) : seen.delete(e.target)));
      setCovered(seen.size > 0);
    });
    if (hero) io1.observe(hero);
    blockers.forEach((b) => io2.observe(b));
    return () => { io1.disconnect(); io2.disconnect(); };
  }, []);

  const show = pastHero && !covered && !closed;
  const close = () => { setClosed(true); try { sessionStorage.setItem("fuh-bar-closed", "1"); } catch { /* private mode */ } };

  return (
    <AnimatePresence>
      {show && (
        <motion.aside
          aria-label="Free trial offer"
          initial={{ y: 80, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 80, opacity: 0 }}
          transition={{ duration: 0.4, ease: EASE_OUT }}
          className="fixed inset-x-3 bottom-3 z-40 mx-auto flex max-w-3xl items-center gap-3 rounded-2xl bg-page py-2.5 pl-5 pr-2.5 shadow-float sm:bottom-5"
        >
          <p className="min-w-0 flex-1 text-[14px] leading-snug">
            <span className="font-semibold">Founder’s plan: ${PLAN.founderPrice}/month</span>
            <span className="text-ink-soft"> · ends in <CountdownText className="font-semibold text-red" /></span>
            <span className="hidden text-ink-soft md:inline"> · {TRIAL_DAYS}-day free trial</span>
          </p>
          <PillCta trial size="md">Start free trial</PillCta>
          <button type="button" onClick={close} aria-label="Close offer" className="grid size-11 shrink-0 place-items-center rounded-xl text-ink-soft hover:bg-soft">
            <X className="size-4" />
          </button>
        </motion.aside>
      )}
    </AnimatePresence>
  );
}
