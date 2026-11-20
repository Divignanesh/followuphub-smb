import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { SITE } from "../lib/content";
import { EASE_OUT, Logo, PillCta, cx, external } from "./ui";

const links = [
  { label: "Home", id: "top" },
  { label: "Who it’s for", id: "trades" },
  { label: "Features", id: "features" },
  { label: "Pricing", id: "pricing" },
  { label: "FAQ", id: "faq" },
];

/**
 * Flowa's segmented nav: the links sit in a soft track and the current
 * section's link is a white pill that slides between them (one shared
 * layoutId). The current section comes from an IntersectionObserver, never
 * a scroll listener.
 */
export function Nav() {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("top");
  const [scrolled, setScrolled] = useState(false);

  // A hairline under the bar once the page has moved (sentinel, not a scroll listener).
  useEffect(() => {
    const sentinel = document.getElementById("nav-sentinel");
    if (!sentinel) return;
    const io = new IntersectionObserver(([e]) => setScrolled(!e.isIntersecting));
    io.observe(sentinel);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    const els = links.map((l) => document.getElementById(l.id)).filter((e): e is HTMLElement => !!e);
    const io = new IntersectionObserver(
      (entries) => {
        const hit = entries.filter((e) => e.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (hit) setActive(hit.target.id);
      },
      { rootMargin: "-35% 0px -55% 0px", threshold: [0, 0.25, 0.5, 1] },
    );
    els.forEach((e) => io.observe(e));
    return () => io.disconnect();
  }, []);

  return (
    <>
    <span id="nav-sentinel" aria-hidden="true" className="absolute top-0 h-px w-px" />
    <header className={cx("sticky top-0 z-50 border-b bg-page/85 backdrop-blur-md transition-colors", scrolled ? "border-line" : "border-transparent")}>
      <div className="container-x">
        <nav aria-label="Primary" className="flex h-[76px] items-center justify-between gap-6">
          <a href="#top" aria-label="FollowUpHub home" className="rounded-lg">
            <Logo eager />
          </a>

          <ul className="hidden items-center rounded-xl bg-soft p-1 ring-1 ring-inset ring-line lg:flex">
            {links.map((l) => (
              <li key={l.id} className="relative">
                {active === l.id && (
                  <motion.span layoutId="nav-pill" transition={{ type: "spring", stiffness: 380, damping: 32 }} className="absolute inset-0 rounded-lg bg-page shadow-card" />
                )}
                <a
                  href={`#${l.id}`}
                  aria-current={active === l.id ? "location" : undefined}
                  className={cx("relative block rounded-lg px-4 py-2 text-[14.5px] transition-colors", active === l.id ? "text-ink" : "text-ink-soft hover:text-ink")}
                >
                  {l.label}
                </a>
              </li>
            ))}
            <li>
              <a href={SITE.realEstate} {...external(SITE.realEstate)} className="block rounded-lg px-4 py-2 text-[14.5px] text-ink-soft transition-colors hover:text-ink">
                For Real Estate
              </a>
            </li>
          </ul>

          <div className="hidden items-center gap-3 lg:flex">
            <a href={SITE.app} {...external(SITE.app)} className="rounded-xl px-4 py-2.5 text-[14.5px] font-medium text-ink ring-1 ring-inset ring-line-strong transition-colors hover:bg-soft">
              Log in
            </a>
            <PillCta trial size="md">Start free trial</PillCta>
          </div>

          <button
            type="button"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            aria-controls="mobile-menu"
            onClick={() => setOpen((v) => !v)}
            className="flex size-11 items-center justify-center rounded-xl text-ink hover:bg-soft lg:hidden"
          >
            {open ? <X className="size-5" aria-hidden="true" /> : <Menu className="size-5" aria-hidden="true" />}
          </button>
        </nav>

        <AnimatePresence>
          {open && (
            <motion.div
              id="mobile-menu"
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.22, ease: EASE_OUT }}
              className="mb-3 rounded-2xl bg-page p-3 shadow-float lg:hidden"
            >
              <ul>
                {links.map((l) => (
                  <li key={l.id}>
                    <a href={`#${l.id}`} onClick={() => setOpen(false)} className="block rounded-xl px-4 py-3 text-[16px] hover:bg-soft">
                      {l.label}
                    </a>
                  </li>
                ))}
                <li>
                  <a href={SITE.realEstate} {...external(SITE.realEstate)} className="block rounded-xl px-4 py-3 text-[16px] hover:bg-soft">
                    For Real Estate
                  </a>
                </li>
              </ul>
              <div className="mt-3 grid grid-cols-2 gap-2 border-t border-line pt-3">
                <PillCta href={SITE.app} tone="outline" size="md">Log in</PillCta>
                <PillCta trial size="md">Start free trial</PillCta>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
    </>
  );
}
