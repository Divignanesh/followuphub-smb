import { ArrowRight, Check } from "lucide-react";
import type { ReactNode } from "react";
import { FAQ, FinalCTA } from "../sections/Closing";
import { Heading, PillCta, Reveal, cx } from "../components/ui";
import { PLAN, TRIAL_DAYS } from "../lib/content";
import {
  CAPABILITIES,
  COMPARE_DATES,
  COMPARE_SLUGS,
  COMPETITORS,
  OUR_COLUMN,
  comparePath,
  type Competitor,
} from "../lib/competitors";

export const formatDate = (iso: string) =>
  new Date(`${iso}T12:00:00Z`).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "UTC",
  });

const highlights = [
  "Every missed call gets a text back within seconds",
  "Vaani, our AI agent, calls missed callers back",
  "Booking, reminders, quotes, invoices and card payments",
  "Review requests, pipeline, website and email campaigns",
];

/** Breadcrumb, kicker, dated byline, title and lede: the top of both page types. */
export function PageHeader({
  crumb,
  kicker,
  modified,
  title,
  titleId,
  children,
}: {
  crumb: string;
  kicker: string;
  modified: string;
  title: string;
  titleId: string;
  children: ReactNode;
}) {
  return (
    <header className="container-x pb-12 pt-10 sm:pb-16 sm:pt-16">
      <nav aria-label="Breadcrumb" className="mb-8">
        <ol className="flex flex-wrap items-center gap-2 text-[13px] text-ink-soft">
          <li>
            <a href="/" className="font-medium transition-colors hover:text-brand">Home</a>
          </li>
          <li aria-hidden="true">/</li>
          <li aria-current="page" className="font-medium text-ink">{crumb}</li>
        </ol>
      </nav>
      <div className="max-w-3xl">
        <p className="inline-flex rounded-full bg-brand-tint px-3 py-1 text-[12.5px] font-medium text-brand">{kicker}</p>
        <p className="t-meta mt-4 text-ink-soft">
          By FollowUpHub · Updated <time dateTime={modified}>{formatDate(modified)}</time>
        </p>
        <h1 id={titleId} className="t-display mt-4 text-ink">{title}</h1>
        {children}
      </div>
    </header>
  );
}

/** The two calls to action every comparison page ends its header with. */
export function HeaderCtas() {
  return (
    <div className="mt-8">
      <div className="flex flex-col gap-3 sm:flex-row">
        <PillCta href="/#pricing">
          Start {TRIAL_DAYS}-day free trial <ArrowRight aria-hidden="true" className="ml-2 size-4" />
        </PillCta>
        <PillCta href="/#all-in-one" tone="outline">See everything included</PillCta>
      </div>
      <p className="t-meta mt-3 text-ink-soft">${PLAN.price}/month, one plan. No contract, cancel any time.</p>
    </div>
  );
}

/** Links to every other head-to-head page, plus the buyer's guide. */
export function CompareLinks({ exclude }: { exclude?: Competitor["slug"] }) {
  const others = COMPARE_SLUGS.filter((s) => s !== exclude).map((s) => COMPETITORS[s]);
  return (
    <section aria-labelledby="compare-more" className="container-x section-y">
      <Heading
        id="compare-more"
        title={exclude ? "Compare FollowUpHub with other tools" : "FollowUpHub against the tools small businesses use"}
      />
      <ul className="mx-auto mt-10 grid max-w-5xl gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {others.map((c) => (
          <li key={c.slug}>
            <a
              href={comparePath(c.slug)}
              className="group flex h-full flex-col rounded-[1.25rem] bg-page p-5 shadow-card transition-colors hover:bg-soft"
            >
              <span className="text-[11px] font-semibold uppercase tracking-[0.14em] text-ink-soft">{c.category}</span>
              <span className="mt-2 flex items-center justify-between gap-2 text-[16px] font-semibold tracking-[-0.02em] text-ink group-hover:text-brand">
                FollowUpHub vs {c.name}
                <ArrowRight className="size-4 shrink-0 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
              </span>
            </a>
          </li>
        ))}
        {exclude && (
          <li>
            <a
              href="/best-crm-for-small-business"
              className="group flex h-full flex-col rounded-[1.25rem] bg-brand-tint p-5 transition-colors hover:bg-mint-soft"
            >
              <span className="text-[11px] font-semibold uppercase tracking-[0.14em] text-brand">Buyer’s guide</span>
              <span className="mt-2 flex items-center justify-between gap-2 text-[16px] font-semibold tracking-[-0.02em] text-ink group-hover:text-brand">
                Best CRM for small business
                <ArrowRight className="size-4 shrink-0 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
              </span>
            </a>
          </li>
        )}
      </ul>
    </section>
  );
}

function CompareTable({ c }: { c: Competitor }) {
  return (
    <section id="comparison" aria-labelledby="table-title" className="border-y border-line bg-soft py-16 sm:py-20">
      <div className="container-x">
        <Heading
          id="table-title"
          title={`${c.name} vs FollowUpHub`}
          sub={`From each company’s public pricing and feature pages, checked ${formatDate(COMPARE_DATES.modified)}. “Not listed” means the page doesn’t say. Features change, so check both before you decide.`}
        />
        <Reveal className="mx-auto mt-10 max-w-5xl overflow-hidden rounded-[1.75rem] bg-page shadow-card">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[640px] border-collapse text-left">
              <caption className="sr-only">Feature-by-feature comparison of {c.name} and FollowUpHub</caption>
              <thead>
                <tr className="border-b border-line">
                  <th scope="col" className="w-[30%] px-5 py-5 text-[13px] font-semibold text-ink-soft sm:px-7">Feature</th>
                  <th scope="col" className="w-[35%] px-5 py-5 text-[14px] font-semibold text-ink">{c.name}</th>
                  <th scope="col" className="w-[35%] bg-brand-tint px-5 py-5 text-[14px] font-semibold text-brand">FollowUpHub</th>
                </tr>
              </thead>
              <tbody>
                {CAPABILITIES.map(([key, label]) => (
                  <tr key={key} className="border-b border-line last:border-0">
                    <th scope="row" className="px-5 py-4 align-top text-[14px] font-medium text-ink sm:px-7">{label}</th>
                    <td className={cx("px-5 py-4 align-top text-[14px] leading-[1.5]", c.theirs[key] === "Not listed" ? "text-ink-soft/80" : "text-ink-soft")}>
                      {c.theirs[key]}
                    </td>
                    <td className="bg-brand-tint/50 px-5 py-4 align-top text-[14px] leading-[1.5] text-ink">
                      <span className="flex items-start gap-2">
                        <Check aria-hidden="true" className="mt-0.5 size-4 shrink-0 text-brand" strokeWidth={3} />
                        {OUR_COLUMN[key]}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

export function CompareCrm({ competitor: c }: { competitor: Competitor }) {
  return (
    <article>
      <PageHeader crumb={`FollowUpHub vs ${c.name}`} kicker={c.category} modified={COMPARE_DATES.modified} title={`FollowUpHub vs ${c.name}`} titleId="compare-title">
        <p className="t-lede mt-6 text-ink-soft">{c.intro}</p>
        <ul className="mt-7 grid gap-2.5 sm:grid-cols-2">
          {highlights.map((h) => (
            <li key={h} className="flex items-start gap-2.5 text-[14.5px] font-medium text-ink">
              <Check className="mt-0.5 size-4 shrink-0 text-brand" strokeWidth={3} aria-hidden="true" />
              {h}
            </li>
          ))}
        </ul>
        <HeaderCtas />
      </PageHeader>

      <section aria-labelledby="reasons-title" className="container-x pb-16 sm:pb-20">
        <Heading id="reasons-title" title={`Why owners look beyond ${c.name}`} sub={`Where ${c.name} fits, where it stops, and what FollowUpHub does instead.`} />
        <ul className={cx("mx-auto mt-10 grid max-w-5xl gap-4 md:grid-cols-2", c.reasons.length === 3 && "lg:grid-cols-3")}>
          {c.reasons.map(({ title, body }, i) => (
            <Reveal as="li" key={title} delay={i * 0.05} className="rounded-[1.25rem] bg-page p-6 shadow-card sm:p-7">
              <span className="font-mono text-[12px] font-semibold text-ink-soft">{String(i + 1).padStart(2, "0")}</span>
              <h3 className="t-h3 mt-3 text-ink">{title}</h3>
              <p className="t-body mt-2 text-ink-soft">{body}</p>
            </Reveal>
          ))}
        </ul>
      </section>

      <CompareTable c={c} />
      <FAQ faqs={c.faqs} heading={`FollowUpHub vs ${c.name}: common questions`} />
      <CompareLinks exclude={c.slug} />
      <FinalCTA href="/#pricing" />
    </article>
  );
}
