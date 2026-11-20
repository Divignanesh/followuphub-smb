/**
 * Number Ticker, from Magic UI (dillionverma, MIT): a spring-driven count
 * written straight to the DOM (no React re-render per frame). Adapted to
 * follow `value` as it changes, so the price can roll down and back up,
 * and to jump straight to the value under reduced motion.
 */
import { useMotionValue, useReducedMotion, useSpring } from "framer-motion";
import { useEffect, useRef, type ComponentPropsWithoutRef } from "react";
import { cx } from "../ui";

interface NumberTickerProps extends ComponentPropsWithoutRef<"span"> {
  value: number;
  decimalPlaces?: number;
}

export function NumberTicker({ value, decimalPlaces = 0, className, ...props }: NumberTickerProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const reduce = useReducedMotion();
  const mv = useMotionValue(value);
  const spring = useSpring(mv, { damping: 40, stiffness: 140 });
  const fmt = (n: number) =>
    Intl.NumberFormat("en-US", { minimumFractionDigits: decimalPlaces, maximumFractionDigits: decimalPlaces }).format(Number(n.toFixed(decimalPlaces)));

  useEffect(() => {
    if (reduce) { spring.jump(value); if (ref.current) ref.current.textContent = fmt(value); }
    else mv.set(value);
  }, [value, reduce]);

  useEffect(() => spring.on("change", (v) => { if (ref.current) ref.current.textContent = fmt(v); }), [spring, decimalPlaces]);

  return (
    <span ref={ref} className={cx("inline-block tabular-nums", className)} {...props}>
      {fmt(value)}
    </span>
  );
}
