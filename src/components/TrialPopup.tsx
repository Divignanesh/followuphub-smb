import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft, Flame, X } from "lucide-react";
import { useEffect, useRef, useState, type FormEvent, type ReactNode } from "react";
import { PLAN, SITE, TRADES, TRIAL_DAYS } from "../lib/content";
import { EASE_OUT, OPEN_TRIAL, cx } from "./ui";

/**
 * The two-step trial form, after the GoHighLevel popup the client sent.
 * Every "Start free trial" button opens it. It also opens on its own, once,
 * on the triggers below, which follow common practice for lead popups:
 *
 *   - after the visitor has been on the page a while AND gone quiet (no
 *     scroll, pointer or key) for a few seconds: a natural pause, not an
 *     interruption mid-read;
 *   - on exit intent on desktop (pointer leaves through the top);
 *   - as a fallback, after a longer time on the page.
 *
 * Never more than once a session, never again for a few days after it is
 * closed, and never after the form is sent. Google penalises popups that
 * cover content as soon as a mobile visitor lands, which the minimum time
 * on page avoids.
 */
const TIMING = {
  minOnPageMs: 8_000,   // nothing opens on its own before this
  idleMs: 6_000,        // quiet time that counts as a pause (client asked for 5 to 7 s)
  fallbackMs: 45_000,   // open anyway after this long on the page
  exitIntent: true,     // desktop only
  snoozeDays: 3,        // after closing it
};

const KEY = "fuh-trial";
const store = {
  get: (k: string) => { try { return localStorage.getItem(k); } catch { return null; } },
  set: (k: string, v: string) => { try { localStorage.setItem(k, v); } catch { /* private mode */ } },
  sget: (k: string) => { try { return sessionStorage.getItem(k); } catch { return null; } },
  sset: (k: string, v: string) => { try { sessionStorage.setItem(k, v); } catch { /* private mode */ } },
};

function mayAutoOpen() {
  if (store.get(`${KEY}-done`)) return false;
  if (store.sget(`${KEY}-shown`)) return false;
  const snooze = Number(store.get(`${KEY}-snooze`) ?? 0);
  return Date.now() > snooze;
}

const COUNTRIES = [
  { code: "US", dial: "+1", flag: "🇺🇸" },
  { code: "CA", dial: "+1", flag: "🇨🇦" },
  { code: "GB", dial: "+44", flag: "🇬🇧" },
  { code: "AU", dial: "+61", flag: "🇦🇺" },
  { code: "IN", dial: "+91", flag: "🇮🇳" },
];

type Data = { company: string; name: string; email: string; country: string; phone: string; business: string; founder: boolean; updates: boolean };

const input = "h-12 min-w-0 rounded-lg border border-line bg-page px-3.5 text-[15px] placeholder:text-ink-soft/70 focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/20";

function Field({ label, error, children }: { label: string; error?: string; children: ReactNode }) {
  return (
    <label className="block">
      <span className="sr-only">{label}</span>
      {children}
      {error && <span className="mt-1 block text-[12.5px] text-red">{error}</span>}
    </label>
  );
}

export function TrialPopup() {
  const [open, setOpen] = useState(false);
  const [step, setStep] = useState<1 | 2>(1);
  const [errors, setErrors] = useState<Partial<Record<keyof Data, string>>>({});
  const [data, setData] = useState<Data>({ company: "", name: "", email: "", country: "US", phone: "", business: "", founder: true, updates: false });
  const dialog = useRef<HTMLDivElement>(null);
  const opener = useRef<Element | null>(null);

  const show = (founder?: boolean) => {
    opener.current = document.activeElement;
    if (founder !== undefined) setData((d) => ({ ...d, founder }));
    store.sset(`${KEY}-shown`, "1");
    setOpen(true);
  };

  // Opened by any trial button.
  useEffect(() => {
    const on = (e: Event) => show((e as CustomEvent<{ founder?: boolean }>).detail?.founder);
    window.addEventListener(OPEN_TRIAL, on);
    return () => window.removeEventListener(OPEN_TRIAL, on);
  }, []);

  // Opens on its own: a pause after the minimum time, exit intent, or the fallback.
  useEffect(() => {
    if (!mayAutoOpen()) return;
    const start = Date.now();
    let idle: ReturnType<typeof setTimeout>;
    let fired = false;
    const fire = () => { if (fired || !mayAutoOpen()) return; fired = true; cleanup(); show(); };
    const arm = () => {
      clearTimeout(idle);
      const wait = Math.max(TIMING.idleMs, TIMING.minOnPageMs - (Date.now() - start));
      idle = setTimeout(fire, wait);
    };
    const exit = (e: MouseEvent) => {
      if (TIMING.exitIntent && e.clientY <= 0 && Date.now() - start > 5_000) fire();
    };
    const fallback = setTimeout(fire, TIMING.fallbackMs);
    const events = ["scroll", "pointermove", "keydown", "touchstart"] as const;
    events.forEach((ev) => window.addEventListener(ev, arm, { passive: true }));
    document.documentElement.addEventListener("mouseleave", exit);
    arm();
    function cleanup() {
      clearTimeout(idle); clearTimeout(fallback);
      events.forEach((ev) => window.removeEventListener(ev, arm));
      document.documentElement.removeEventListener("mouseleave", exit);
    }
    return cleanup;
  }, []);

  // While open: lock the page, Escape closes, focus moves in and stays in.
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const t = setTimeout(() => dialog.current?.querySelector<HTMLElement>("input, select, button")?.focus(), 50);
    const key = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key !== "Tab" || !dialog.current) return;
      const f = Array.from(dialog.current.querySelectorAll<HTMLElement>("input, select, button, a[href]")).filter((el) => !el.hasAttribute("disabled"));
      if (!f.length) return;
      if (e.shiftKey && document.activeElement === f[0]) { e.preventDefault(); f.at(-1)!.focus(); }
      else if (!e.shiftKey && document.activeElement === f.at(-1)) { e.preventDefault(); f[0].focus(); }
    };
    window.addEventListener("keydown", key);
    return () => { document.body.style.overflow = prev; clearTimeout(t); window.removeEventListener("keydown", key); };
  }, [open]);

  function close() {
    setOpen(false);
    store.set(`${KEY}-snooze`, String(Date.now() + TIMING.snoozeDays * 86_400_000));
    (opener.current as HTMLElement | null)?.focus?.();
  }

  const set = <K extends keyof Data>(k: K, v: Data[K]) => { setData((d) => ({ ...d, [k]: v })); setErrors((e) => ({ ...e, [k]: undefined })); };

  function next(e: FormEvent) {
    e.preventDefault();
    const err: typeof errors = {};
    if (!data.company.trim()) err.company = "Enter your company name.";
    if (!data.name.trim()) err.name = "Enter your name.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) err.email = "Enter a valid email address.";
    if (data.phone.replace(/\D/g, "").length < 7) err.phone = "Enter a valid phone number.";
    setErrors(err);
    if (Object.keys(err).length === 0) setStep(2);
  }

  function submit(e: FormEvent) {
    e.preventDefault();
    if (!data.business) { setErrors({ business: "Choose your type of business." }); return; }
    const dial = COUNTRIES.find((c) => c.code === data.country)?.dial ?? "+1";
    const phone = `${dial}${data.phone.replace(/\D/g, "")}`;
    if (SITE.leadWebhook) {
      fetch(SITE.leadWebhook, {
        method: "POST",
        keepalive: true,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, phone, source: "smb-trial-popup" }),
      }).catch(() => {});
    }
    store.set(`${KEY}-done`, "1");
    const url = new URL(data.founder ? SITE.checkoutFounder : SITE.checkout);
    const [first, ...rest] = data.name.trim().split(/\s+/);
    url.searchParams.set("first_name", first);
    if (rest.length) url.searchParams.set("last_name", rest.join(" "));
    url.searchParams.set("email", data.email);
    url.searchParams.set("phone", phone);
    url.searchParams.set("company_name", data.company);
    window.location.href = url.toString();
  }

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[70] grid place-items-center overflow-y-auto bg-ink/55 p-4 backdrop-blur-sm"
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          onMouseDown={(e) => e.target === e.currentTarget && close()}
        >
          <motion.div
            ref={dialog}
            role="dialog"
            aria-modal="true"
            aria-labelledby="trial-title"
            initial={{ opacity: 0, y: 24, scale: 0.97 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 12, scale: 0.98 }}
            transition={{ duration: 0.35, ease: EASE_OUT }}
            className="relative w-full max-w-[34rem] rounded-2xl bg-page p-5 shadow-float sm:p-7"
          >
            <button type="button" onClick={close} aria-label="Close" className="absolute -right-2 -top-2 grid size-9 place-items-center rounded-full bg-ink text-white shadow-float hover:bg-brand-deep">
              <X className="size-4" />
            </button>

            <h2 id="trial-title" className="text-center text-[1.5rem] font-semibold tracking-[-0.03em] sm:text-[1.7rem]">
              Start your {TRIAL_DAYS}-day free trial today!
            </h2>

            <ol className="mt-5 grid grid-cols-2 text-center">
              {["Tell us about your business", "Trial details"].map((label, i) => (
                <li key={label} className={cx("pb-3 text-[12px]", step === i + 1 ? "text-ink" : "text-ink-soft")}>
                  <span className={cx("block text-[13.5px] font-semibold", step === i + 1 ? "text-brand" : "")}>Step {i + 1}</span>
                  {label}
                </li>
              ))}
            </ol>
            <div className="relative h-1 rounded-full bg-soft-2">
              <motion.span className="absolute inset-y-0 left-0 rounded-full bg-brand" animate={{ width: step === 1 ? "50%" : "100%" }} transition={{ duration: 0.4, ease: EASE_OUT }} />
            </div>

            <AnimatePresence mode="wait" initial={false}>
              {step === 1 ? (
                <motion.form key="s1" onSubmit={next} noValidate initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.25 }} className="mt-5 grid gap-3">
                  <Field label="Company name" error={errors.company}>
                    <input className={cx(input, "w-full")} placeholder="Company name" autoComplete="organization" value={data.company} onChange={(e) => set("company", e.target.value)} aria-invalid={!!errors.company} />
                  </Field>
                  <Field label="Full name" error={errors.name}>
                    <input className={cx(input, "w-full")} placeholder="Full name" autoComplete="name" value={data.name} onChange={(e) => set("name", e.target.value)} aria-invalid={!!errors.name} />
                  </Field>
                  <Field label="Email address" error={errors.email}>
                    <input className={cx(input, "w-full")} type="email" placeholder="Email address" autoComplete="email" value={data.email} onChange={(e) => set("email", e.target.value)} aria-invalid={!!errors.email} />
                  </Field>
                  <Field label="Phone number" error={errors.phone}>
                    <span className="flex gap-2">
                      <select aria-label="Country code" className={cx(input, "w-[6.5rem] shrink-0 px-2")} value={data.country} onChange={(e) => set("country", e.target.value)}>
                        {COUNTRIES.map((c) => <option key={c.code} value={c.code}>{c.flag} {c.dial}</option>)}
                      </select>
                      <input className={cx(input, "flex-1")} type="tel" placeholder="Phone number" autoComplete="tel-national" value={data.phone} onChange={(e) => set("phone", e.target.value)} aria-invalid={!!errors.phone} />
                    </span>
                  </Field>
                  <button type="submit" className="mt-1 h-[52px] rounded-xl bg-brand text-[16px] font-semibold text-white transition-colors hover:bg-brand-deep">
                    Go to step 2
                  </button>
                  <p className="text-center text-[12px] text-ink-soft">No card needed for this step. Takes under a minute.</p>
                </motion.form>
              ) : (
                <motion.form key="s2" onSubmit={submit} noValidate initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }} transition={{ duration: 0.25 }} className="mt-5 grid gap-3">
                  <Field label="Type of business" error={errors.business}>
                    <select className={cx(input, "w-full")} value={data.business} onChange={(e) => set("business", e.target.value)} aria-invalid={!!errors.business}>
                      <option value="" disabled>Type of business</option>
                      {TRADES.map((t) => <option key={t.id} value={t.label}>{t.label}</option>)}
                      <option value="Other">Other</option>
                    </select>
                  </Field>

                  <label className={cx("flex cursor-pointer items-start gap-3 rounded-xl border-2 p-3.5 transition-colors", data.founder ? "border-brand bg-brand-tint" : "border-dashed border-brand/50")}>
                    <input type="checkbox" checked={data.founder} onChange={(e) => set("founder", e.target.checked)} className="mt-0.5 size-5 shrink-0 accent-[var(--color-brand)]" />
                    <span>
                      <span className="flex items-center gap-2 text-[15px] font-semibold">
                        Founder’s plan <span className="inline-flex items-center gap-1 rounded-full bg-brand px-2 py-0.5 text-[11px] text-white"><Flame className="size-3" aria-hidden="true" /> {PLAN.founderOff} off</span>
                      </span>
                      <span className="mt-0.5 block text-[13px] text-ink-soft">
                        {data.founder ? <><s>${PLAN.price}</s> <b className="text-ink">${PLAN.founderPrice}/month</b> after your trial, locked in.</> : <>${PLAN.price}/month after your trial.</>}
                      </span>
                    </span>
                  </label>
                  <p className="rounded-lg bg-soft px-3.5 py-2.5 text-[13px] text-ink-soft">
                    {TRIAL_DAYS} days free. One-time setup fee of ${PLAN.setupFee}. Cancel any time.
                  </p>

                  <label className="flex items-start gap-2.5 text-[12.5px] text-ink-soft">
                    <input type="checkbox" checked={data.updates} onChange={(e) => set("updates", e.target.checked)} className="mt-0.5 size-4 shrink-0 accent-[var(--color-brand)]" />
                    Send me updates, news and offers by email and text. Reply STOP to opt out.
                  </label>

                  <div className="mt-1 flex gap-2">
                    <button type="button" onClick={() => setStep(1)} aria-label="Back to step 1" className="grid h-[52px] w-14 shrink-0 place-items-center rounded-xl border border-line hover:bg-soft">
                      <ArrowLeft className="size-5" />
                    </button>
                    <button type="submit" className="h-[52px] flex-1 rounded-xl bg-brand text-[16px] font-semibold text-white transition-colors hover:bg-brand-deep">
                      Start my free trial
                    </button>
                  </div>
                  <p className="text-center text-[12px] text-ink-soft">
                    By continuing you agree to our <a href={SITE.terms} target="_blank" rel="noopener noreferrer" className="underline">Terms</a> and <a href={SITE.privacy} target="_blank" rel="noopener noreferrer" className="underline">Privacy Policy</a>.
                  </p>
                </motion.form>
              )}
            </AnimatePresence>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
