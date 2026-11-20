/**
 * Word Rotate, from Magic UI (dillionverma, MIT): one word or phrase at a
 * time, sliding in from above. Adapted: renders a span (it sits inside the
 * page's h1), pauses off screen, and under reduced motion shows the first
 * phrase only. The box animates its width between phrases (Motion layout),
 * so the line re-centres smoothly instead of jumping or leaving a gap.
 * The full list is read to screen readers once.
 */
import { AnimatePresence, motion, useInView, useReducedMotion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { cx } from "../ui";

export function WordRotate({ words, duration = 2600, className }: { words: string[]; duration?: number; className?: string }) {
  const [i, setI] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref);
  const reduce = useReducedMotion();

  useEffect(() => {
    if (reduce || !inView) return;
    const t = setInterval(() => setI((v) => (v + 1) % words.length), duration);
    return () => clearInterval(t);
  }, [words.length, duration, inView, reduce]);

  return (
    <motion.span ref={ref} layout transition={{ layout: { duration: 0.35, ease: [0.16, 1, 0.3, 1] } }} className={cx("relative inline-block overflow-hidden whitespace-nowrap pb-[0.12em] align-bottom", className)}>
      <span className="sr-only">{words.join(", ")}</span>
      <AnimatePresence mode="popLayout" initial={false}>
        <motion.span
          key={words[i]}
          aria-hidden="true"
          className="inline-block"
          initial={{ opacity: 0, y: "-60%" }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: "60%" }}
          transition={{ duration: 0.3, ease: "easeOut" }}
        >
          {words[i]}
        </motion.span>
      </AnimatePresence>
    </motion.span>
  );
}
