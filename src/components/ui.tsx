import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";

export const EASE_OUT: [number, number, number, number] = [0.16, 1, 0.3, 1];

export function cx(...parts: Array<string | false | null | undefined>) {
  return parts.filter(Boolean).join(" ");
}

/** Off-site links open in a new tab; anchors and mailto: are left alone. */
export function external(href?: string) {
  return href && /^https?:\/\//.test(href)
    ? ({ target: "_blank", rel: "noopener noreferrer" } as const)
    : {};
}

export function Logo({ tone = "ink", eager = false }: { tone?: "ink" | "cream"; eager?: boolean }) {
  return (
    <img
      src={tone === "cream" ? "/images/brand/followuphub-logo-light.png" : "/images/brand/followuphub-logo.png"}
      alt="FollowUpHub"
      width={701}
      height={153}
      loading={eager ? "eager" : "lazy"}
      decoding="async"
      className="h-8 w-auto shrink-0"
    />
  );
}

/**
 * The two calls to action, and only these two labels on the page:
 * "Start free trial" (sign up) and "Book a demo" (talk to us). Square-ish
 * 12px corners, as on the reference, not pills.
 */
export function PillCta({
  href,
  tone = "primary",
  size = "lg",
  className,
  children,
}: {
  href: string;
  tone?: "primary" | "outline" | "light";
  size?: "md" | "lg";
  className?: string;
  children: ReactNode;
}) {
  const skin = {
    primary: "bg-brand text-white hover:bg-brand-deep shadow-[0_8px_20px_-10px_rgb(87_85_221/0.8)]",
    outline: "border border-ink/80 bg-white/60 text-ink hover:bg-white",
    light: "bg-white text-ink hover:bg-brand-tint shadow-card",
  }[tone];
  return (
    <motion.a
      href={href}
      {...external(href)}
      whileTap={{ scale: 0.98 }}
      className={cx(
        "inline-flex items-center justify-center whitespace-nowrap rounded-xl font-medium tracking-[-0.01em] transition-colors duration-200",
        size === "lg" ? "h-[52px] px-7 text-[16px]" : "h-11 px-5 text-[15px]",
        skin,
        className,
      )}
    >
      {children}
    </motion.a>
  );
}

/** Section heading, centred as on the reference: title and one line under it. */
export function Heading({ id, title, sub, className }: { id?: string; title: ReactNode; sub?: ReactNode; className?: string }) {
  return (
    <Reveal className={cx("mx-auto max-w-2xl text-center", className)}>
      <h2 id={id} className="t-h2">{title}</h2>
      {sub && <p className="t-lede mx-auto mt-4 max-w-xl text-ink-soft">{sub}</p>}
    </Reveal>
  );
}

/**
 * The one scroll entrance on the page: 24px up on an expo-out curve. Under
 * reduced motion it renders the resting state, because MotionConfig keeps the
 * opacity half of an entrance and would leave content invisible.
 */
export function Reveal({
  children,
  className,
  delay = 0,
  as = "div",
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  as?: "div" | "li";
}) {
  const reduce = useReducedMotion();
  const Tag = as;
  if (reduce) return <Tag className={className}>{children}</Tag>;
  const M = as === "li" ? motion.li : motion.div;
  return (
    <M
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px 0px -10% 0px" }}
      transition={{ duration: 0.7, ease: EASE_OUT, delay }}
      className={className}
    >
      {children}
    </M>
  );
}
