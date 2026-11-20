/**
 * Animated Beam, from Magic UI (dillionverma, MIT): a curved path between
 * two elements with a light travelling along it. Adapted: framer-motion
 * import, green gradient defaults, and under reduced motion the light rests
 * (the path still draws).
 */
import { motion, useReducedMotion } from "framer-motion";
import { useEffect, useId, useState, type RefObject } from "react";
import { cx } from "../ui";

export interface AnimatedBeamProps {
  className?: string;
  containerRef: RefObject<HTMLElement | null>;
  fromRef: RefObject<HTMLElement | null>;
  toRef: RefObject<HTMLElement | null>;
  curvature?: number;
  reverse?: boolean;
  pathColor?: string;
  pathWidth?: number;
  pathOpacity?: number;
  gradientStartColor?: string;
  gradientStopColor?: string;
  delay?: number;
  duration?: number;
  startXOffset?: number;
  startYOffset?: number;
  endXOffset?: number;
  endYOffset?: number;
}

export function AnimatedBeam({
  className, containerRef, fromRef, toRef, curvature = 0, reverse = false, duration = 4, delay = 0,
  pathColor = "var(--color-line-strong)", pathWidth = 2, pathOpacity = 1,
  gradientStartColor = "#5fbf98", gradientStopColor = "#1a6b5a",
  startXOffset = 0, startYOffset = 0, endXOffset = 0, endYOffset = 0,
}: AnimatedBeamProps) {
  const id = useId();
  const reduce = useReducedMotion();
  const [d, setD] = useState("");
  const [size, setSize] = useState({ width: 0, height: 0 });

  const g = reverse
    ? { x1: ["90%", "-10%"], x2: ["100%", "0%"], y1: ["0%", "0%"], y2: ["0%", "0%"] }
    : { x1: ["10%", "110%"], x2: ["0%", "100%"], y1: ["0%", "0%"], y2: ["0%", "0%"] };

  useEffect(() => {
    const update = () => {
      const c = containerRef.current, a = fromRef.current, b = toRef.current;
      if (!c || !a || !b) return;
      const cr = c.getBoundingClientRect(), ra = a.getBoundingClientRect(), rb = b.getBoundingClientRect();
      setSize({ width: cr.width, height: cr.height });
      const sx = ra.left - cr.left + ra.width / 2 + startXOffset;
      const sy = ra.top - cr.top + ra.height / 2 + startYOffset;
      const ex = rb.left - cr.left + rb.width / 2 + endXOffset;
      const ey = rb.top - cr.top + rb.height / 2 + endYOffset;
      setD(`M ${sx},${sy} Q ${(sx + ex) / 2},${sy - curvature} ${ex},${ey}`);
    };
    const ro = new ResizeObserver(update);
    if (containerRef.current) ro.observe(containerRef.current);
    update();
    return () => ro.disconnect();
  }, [containerRef, fromRef, toRef, curvature, startXOffset, startYOffset, endXOffset, endYOffset]);

  return (
    <svg
      fill="none"
      width={size.width}
      height={size.height}
      viewBox={`0 0 ${size.width} ${size.height}`}
      aria-hidden="true"
      className={cx("pointer-events-none absolute left-0 top-0 transform-gpu stroke-2", className)}
    >
      <path d={d} stroke={pathColor} strokeWidth={pathWidth} strokeOpacity={pathOpacity} strokeLinecap="round" />
      {!reduce && <path d={d} strokeWidth={pathWidth} stroke={`url(#${id})`} strokeOpacity="1" strokeLinecap="round" />}
      <defs>
        <motion.linearGradient
          id={id}
          gradientUnits="userSpaceOnUse"
          className="transform-gpu"
          initial={{ x1: "0%", x2: "0%", y1: "0%", y2: "0%" }}
          animate={{ x1: g.x1, x2: g.x2, y1: g.y1, y2: g.y2 }}
          transition={{ delay, duration, ease: [0.16, 1, 0.3, 1], repeat: Infinity, repeatDelay: 0 }}
        >
          <stop stopColor={gradientStartColor} stopOpacity="0" />
          <stop stopColor={gradientStartColor} />
          <stop offset="32.5%" stopColor={gradientStopColor} />
          <stop offset="100%" stopColor={gradientStopColor} stopOpacity="0" />
        </motion.linearGradient>
      </defs>
    </svg>
  );
}
