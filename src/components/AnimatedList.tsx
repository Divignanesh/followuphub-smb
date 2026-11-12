import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Children, useEffect, useState, type ReactElement, type ReactNode } from "react";

/**
 * Magic UI's Animated List (dillionverma, MIT, via 21st.dev): items arrive
 * one at a time on top of the list with a spring, pushing the older ones
 * down. Two changes: it holds on the finished list before looping instead of
 * snapping straight back to one item, and under reduced motion it renders
 * the whole list, still.
 */
export function AnimatedList({
  children,
  delay = 1800,
  hold = 3600,
  className,
}: {
  children: ReactNode;
  delay?: number;
  hold?: number;
  className?: string;
}) {
  const reduce = useReducedMotion();
  const items = Children.toArray(children) as ReactElement[];
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (reduce) return;
    const last = index >= items.length - 1;
    const t = setTimeout(() => setIndex(last ? 0 : index + 1), last ? hold : delay);
    return () => clearTimeout(t);
  }, [index, items.length, delay, hold, reduce]);

  const shown = (reduce ? items : items.slice(0, index + 1)).slice().reverse();

  return (
    <div className={`flex flex-col gap-2.5 ${className ?? ""}`}>
      <AnimatePresence initial={false}>
        {shown.map((item) => (
          <motion.div
            key={item.key}
            layout
            initial={{ scale: 0.6, opacity: 0 }}
            animate={{ scale: 1, opacity: 1, originY: 0 }}
            exit={{ scale: 0.6, opacity: 0, transition: { duration: 0.2 } }}
            transition={{ type: "spring", stiffness: 350, damping: 40 }}
            className="w-full"
          >
            {item}
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
