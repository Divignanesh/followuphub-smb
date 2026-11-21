import { renderToString } from "react-dom/server";
import App, { type RoutePath } from "./App";
import { FAQS, PLAN, SITE, type Faq } from "./lib/content";
import { COMPARE_DATES, COMPARE_SLUGS, COMPETITORS, comparePath } from "./lib/competitors";
import { CRM_FAQS, GUIDE_DATES } from "./pages/BestCrmForSmallBusiness";

const TITLE = "FollowUpHub for Small Business | Calls, Bookings and Payments in One App";
const DESCRIPTION =
  "FollowUpHub texts back missed calls, books the work, sends reminders and invoices, and keeps every conversation in one inbox. The AI front desk for small businesses.";

const esc = (s: string) =>
  s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

/** The FAQ markup reads the same array as the visible accordion, so they match. */
const schema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "SoftwareApplication",
      name: "FollowUpHub",
      applicationCategory: "BusinessApplication",
      operatingSystem: "Web browser",
      url: SITE.url,
      description: DESCRIPTION,
      offers: [
        { name: PLAN.name, price: PLAN.price },
        { name: `${PLAN.name} founder’s plan`, price: PLAN.founderPrice },
      ].map((o) => ({
        "@type": "Offer",
        name: o.name,
        price: o.price,
        priceCurrency: "USD",
        priceSpecification: {
          "@type": "UnitPriceSpecification",
          price: o.price,
          priceCurrency: "USD",
          referenceQuantity: { "@type": "QuantitativeValue", value: 1, unitCode: "MON" },
        },
      })),
    },
    {
      "@type": "FAQPage",
      mainEntity: FAQS.map((f) => ({
        "@type": "Question",
        name: f.q,
        acceptedAnswer: { "@type": "Answer", text: f.a },
      })),
    },
  ],
};

const homeSchema = JSON.stringify(schema).replace(/</g, "\\u003c");
const legalSchema = (name: string, path: string) =>
  JSON.stringify({
    "@context": "https://schema.org",
    "@type": "WebPage",
    name,
    url: `${SITE.url}${path}`,
    isPartOf: { "@type": "WebSite", name: SITE.name, url: SITE.url },
  }).replace(/</g, "\\u003c");

const OG_IMAGE = `${SITE.main}/images/og-image.jpg`;
const ld = (nodes: object[]) =>
  JSON.stringify({ "@context": "https://schema.org", "@graph": nodes }).replace(/</g, "\\u003c");
const faqSchema = (faqs: readonly Faq[]) => ({
  "@type": "FAQPage",
  mainEntity: faqs.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
});
const breadcrumbSchema = (trail: { name: string; url: string }[]) => ({
  "@type": "BreadcrumbList",
  itemListElement: trail.map((t, i) => ({ "@type": "ListItem", position: i + 1, name: t.name, item: t.url })),
});
/** Dates are passed in, never taken from the build clock. */
const articleSchema = (a: { url: string; headline: string; description: string; published: string; modified: string }) => ({
  "@type": "Article",
  "@id": `${a.url}#article`,
  headline: a.headline,
  description: a.description,
  image: OG_IMAGE,
  url: a.url,
  mainEntityOfPage: a.url,
  inLanguage: "en",
  datePublished: a.published,
  dateModified: a.modified,
  author: { "@type": "Organization", name: SITE.name, url: SITE.main },
  publisher: { "@type": "Organization", name: SITE.name, url: SITE.main },
});
const HOME_CRUMB = { name: "Home", url: SITE.url };

export type RouteMeta = {
  path: RoutePath;
  /** Output file, relative to dist/ */
  out: string;
  title: string;
  description: string;
  canonical: string;
  schema: string;
  /** Sitemap hints. */
  priority: string;
  changefreq: string;
};

const GUIDE_URL = `${SITE.url}/best-crm-for-small-business`;
const GUIDE_DESCRIPTION = `The best CRM for small business answers missed calls and follows up for you. Compare features and 2026 pricing for trades, clinics, salons and local services.`;

export const ROUTES: RouteMeta[] = [
  { path: "/", out: "index.html", title: TITLE, description: DESCRIPTION, canonical: SITE.url, schema: homeSchema, priority: "1.0", changefreq: "weekly" },
  {
    path: "/best-crm-for-small-business",
    out: "best-crm-for-small-business/index.html",
    title: "Best CRM for Small Business in 2026 | FollowUpHub",
    description: GUIDE_DESCRIPTION,
    canonical: GUIDE_URL,
    priority: "0.9",
    changefreq: "weekly",
    schema: ld([
      articleSchema({ url: GUIDE_URL, headline: "The best CRM for small business in 2026", description: GUIDE_DESCRIPTION, ...GUIDE_DATES }),
      breadcrumbSchema([HOME_CRUMB, { name: "Best CRM for small business", url: GUIDE_URL }]),
      faqSchema(CRM_FAQS),
    ]),
  },
  ...COMPARE_SLUGS.map((slug): RouteMeta => {
    const c = COMPETITORS[slug];
    const path = comparePath(slug);
    const url = `${SITE.url}${path}`;
    const headline = `FollowUpHub vs ${c.name}`;
    return {
      path,
      out: `${path.slice(1)}/index.html`,
      title: `FollowUpHub vs ${c.name}: 2026 Comparison for Small Business`,
      description: c.summary,
      canonical: url,
      priority: "0.8",
      changefreq: "monthly",
      schema: ld([
        articleSchema({ url, headline, description: c.summary, ...COMPARE_DATES }),
        breadcrumbSchema([HOME_CRUMB, { name: headline, url }]),
        faqSchema(c.faqs),
      ]),
    };
  }),
  {
    path: "/privacy",
    out: "privacy/index.html",
    title: "Privacy policy | FollowUpHub",
    description:
      "What personal information FollowUpHub collects, why, who processes it and where, how long we keep it, and how to exercise your rights.",
    canonical: `${SITE.url}/privacy`,
    schema: legalSchema("Privacy policy", "/privacy"),
    priority: "0.3",
    changefreq: "yearly",
  },
  {
    path: "/terms",
    out: "terms/index.html",
    title: "Terms of service | FollowUpHub",
    description:
      "The terms that govern your FollowUpHub account: the free trial, fees and billing, acceptable use, consent obligations and data processing.",
    canonical: `${SITE.url}/terms`,
    schema: legalSchema("Terms of service", "/terms"),
    priority: "0.3",
    changefreq: "yearly",
  },
];

export function renderHead(r: RouteMeta = ROUTES[0]): string {
  return [
    `<title>${esc(r.title)}</title>`,
    `<meta name="description" content="${esc(r.description)}" />`,
    `<link rel="canonical" href="${r.canonical}" />`,
    `<meta property="og:type" content="website" />`,
    `<meta property="og:locale" content="en_US" />`,
    `<meta property="og:title" content="${esc(r.title)}" />`,
    `<meta property="og:description" content="${esc(r.description)}" />`,
    `<meta property="og:url" content="${r.canonical}" />`,
    `<meta property="og:image" content="${OG_IMAGE}" />`,
    `<meta name="twitter:card" content="summary_large_image" />`,
    `<script type="application/ld+json">${r.schema}</script>`,
  ].join("\n    ");
}

export function render(path: RoutePath = "/"): string {
  return renderToString(<App path={path} />);
}
