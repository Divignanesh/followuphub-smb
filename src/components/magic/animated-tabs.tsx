/**
 * Animated Tabs, from educalvolpz via 21st.dev. A sliding indicator moves
 * between tabs (shared layoutId), with arrow-key, Home and End navigation.
 * Adapted: project tokens (green indicator, white label when active),
 * framer-motion import, and aria-controls so each tab names its panel.
 */
import { motion, useReducedMotion } from "framer-motion";
import { useCallback, useId, type KeyboardEvent, type ReactNode } from "react";
import { cx } from "../ui";

export interface AnimatedTabsProps {
  tabs: { id: string; label: string; icon?: ReactNode }[];
  activeTab: string;
  onChange: (id: string) => void;
  label: string;
  className?: string;
  /** id prefix shared with the panels: tab `${idPrefix}-tab-${id}`, panel `${idPrefix}-panel-${id}` */
  idPrefix: string;
}

const SPRING = { type: "spring" as const, bounce: 0.12, duration: 0.4 };

export default function AnimatedTabs({ tabs, activeTab, onChange, label, className, idPrefix }: AnimatedTabsProps) {
  const reduce = useReducedMotion();
  const layoutId = `tabs-${useId()}`;

  const onKey = useCallback(
    (e: KeyboardEvent, i: number) => {
      const map: Record<string, number> = { ArrowRight: (i + 1) % tabs.length, ArrowLeft: (i - 1 + tabs.length) % tabs.length, Home: 0, End: tabs.length - 1 };
      if (!(e.key in map)) return;
      e.preventDefault();
      const next = tabs[map[e.key]];
      onChange(next.id);
      document.getElementById(`${idPrefix}-tab-${next.id}`)?.focus();
    },
    [tabs, onChange, idPrefix],
  );

  return (
    <div role="tablist" aria-label={label} className={cx("relative inline-flex gap-1 rounded-2xl bg-soft p-1.5 ring-1 ring-inset ring-line", className)}>
      {tabs.map((t, i) => {
        const on = activeTab === t.id;
        return (
          <button
            key={t.id}
            id={`${idPrefix}-tab-${t.id}`}
            role="tab"
            type="button"
            aria-selected={on}
            aria-controls={`${idPrefix}-panel-${t.id}`}
            tabIndex={on ? 0 : -1}
            onClick={() => onChange(t.id)}
            onKeyDown={(e) => onKey(e, i)}
            className={cx(
              "relative flex h-11 shrink-0 items-center justify-center gap-2 rounded-xl px-4 text-[14.5px] font-medium transition-colors",
              on ? "text-white" : "text-ink-soft hover:text-ink",
            )}
          >
            {on && (
              <motion.span
                layoutId={layoutId}
                transition={reduce ? { duration: 0 } : SPRING}
                className="absolute inset-0 rounded-xl bg-brand shadow-[0_8px_20px_-10px_rgb(26_107_90/0.8)]"
              />
            )}
            {t.icon && <span className="relative z-10">{t.icon}</span>}
            <span className="relative z-10">{t.label}</span>
          </button>
        );
      })}
    </div>
  );
}
