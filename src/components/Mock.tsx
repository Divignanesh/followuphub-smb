import {
  BarChart3, CalendarDays, Contact, CreditCard, Globe, LayoutGrid, Megaphone, MessageSquare, Phone, Rocket, Sparkles, Target, Workflow, Bot, Wand2, type LucideIcon,
} from "lucide-react";
import type { ReactNode } from "react";
import { cx } from "./ui";

/**
 * Product illustration kit. Everything here draws the real app's structure:
 * the sidebar below is the app's own module list, in the app's order. These
 * are illustrations, so they carry names, channels and statuses only, never
 * figures (client rule: no numbers on the page). All of it is aria-hidden at
 * the point of use; the surrounding copy says what it shows.
 */

export const MODULES_NAV: { icon: LucideIcon; label: string }[] = [
  { icon: Sparkles, label: "Ask AI" },
  { icon: Rocket, label: "Launchpad" },
  { icon: LayoutGrid, label: "Dashboard" },
  { icon: MessageSquare, label: "Conversations" },
  { icon: CalendarDays, label: "Calendars" },
  { icon: Contact, label: "Contacts" },
  { icon: Target, label: "Opportunities" },
  { icon: CreditCard, label: "Payments" },
  { icon: Wand2, label: "AI Studio" },
  { icon: Bot, label: "AI Agents" },
  { icon: Megaphone, label: "Marketing" },
  { icon: Workflow, label: "Automation" },
  { icon: Globe, label: "Sites" },
  { icon: BarChart3, label: "Reporting" },
];

/**
 * A slice of the app: the sidebar collapsed to its icon rail, as the app
 * shows it on a narrow window, with the given module active, and that
 * module's view beside it. Collapsed so the view gets the room.
 */
export function AppWindow({ active, title, children, className, rows = 9 }: { active: string; title: string; children: ReactNode; className?: string; rows?: number }) {
  const at = MODULES_NAV.findIndex((m) => m.label === active);
  const start = Math.max(0, Math.min(at - 3, MODULES_NAV.length - rows));
  const nav = MODULES_NAV.slice(start, start + rows);
  return (
    <div className={cx("flex overflow-hidden rounded-2xl border border-line bg-page shadow-float", className)}>
      <aside className="hidden w-14 shrink-0 flex-col items-center gap-1 border-r border-line bg-soft/60 py-3 sm:flex">
        <img src="/images/brand/mark-brand.svg" alt="" className="mb-3 size-7" />
        {nav.map(({ icon: Icon, label }) => (
          <span key={label} className={cx("grid size-9 place-items-center rounded-lg", label === active ? "bg-page text-brand shadow-card" : "text-ink-soft/70")}>
            <Icon className="size-4" />
          </span>
        ))}
      </aside>
      <div className="min-w-0 flex-1">
        <div className="flex items-center justify-between border-b border-line px-4 py-3">
          <p className="text-[13.5px] font-semibold">{title}</p>
          <span className="flex gap-1">
            <span className="size-2 rounded-full bg-line" />
            <span className="size-2 rounded-full bg-line" />
            <span className="size-2 rounded-full bg-line" />
          </span>
        </div>
        <div className="p-4">{children}</div>
      </div>
    </div>
  );
}

const AVATAR_TONES = ["bg-brand-tint text-brand", "bg-red-tint text-red", "bg-green-tint text-green", "bg-[#fff3dc] text-[#8a5a00]", "bg-[#f1e9ff] text-[#6b3fc4]"];

export function Avatar({ name, i = 0, size = "size-8" }: { name: string; i?: number; size?: string }) {
  const initials = name.split(" ").map((w) => w[0]).join("").slice(0, 2);
  return <span className={cx("grid shrink-0 place-items-center rounded-full text-[11px] font-semibold", size, AVATAR_TONES[i % AVATAR_TONES.length])}>{initials}</span>;
}

export type Channel = "call" | "sms" | "whatsapp" | "facebook" | "instagram" | "email" | "web";

const CHANNEL_IMG: Partial<Record<Channel, string>> = {
  whatsapp: "/images/channels/whatsapp.svg",
  facebook: "/images/channels/facebook.svg",
  instagram: "/images/channels/instagram.svg",
  email: "/images/channels/gmail.svg",
};

export function ChannelIcon({ c, className = "size-3.5" }: { c: Channel; className?: string }) {
  if (CHANNEL_IMG[c]) return <img src={CHANNEL_IMG[c]} alt="" className={className} />;
  if (c === "call") return <Phone className={cx(className, "text-ink-soft")} />;
  if (c === "web") return <Globe className={cx(className, "text-ink-soft")} />;
  return <MessageSquare className={cx(className, "text-ink-soft")} />;
}

const CHIP = {
  brand: "bg-brand-tint text-brand",
  green: "bg-green-tint text-green",
  red: "bg-red-tint text-red",
  amber: "bg-[#fff3dc] text-[#8a5a00]",
  grey: "bg-soft-2 text-ink-soft",
} as const;

export function Chip({ tone = "grey", children }: { tone?: keyof typeof CHIP; children: ReactNode }) {
  return <span className={cx("inline-flex items-center gap-1 rounded-md px-2 py-0.5 text-[11.5px] font-medium", CHIP[tone])}>{children}</span>;
}
