import { renderToString } from "react-dom/server";
import App, { type RoutePath } from "./App";
import { FAQS, PLAN, SITE } from "./lib/content";

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

export type RouteMeta = {
  path: RoutePath;
  /** Output file, relative to dist/ */
  out: string;
  title: string;
  description: string;
  canonical: string;
  schema: string;
};

export const ROUTES: RouteMeta[] = [
  { path: "/", out: "index.html", title: TITLE, description: DESCRIPTION, canonical: SITE.url, schema: homeSchema },
  {
    path: "/privacy",
    out: "privacy/index.html",
    title: "Privacy policy | FollowUpHub",
    description:
      "What personal information FollowUpHub collects, why, who processes it and where, how long we keep it, and how to exercise your rights.",
    canonical: `${SITE.url}/privacy`,
    schema: legalSchema("Privacy policy", "/privacy"),
  },
  {
    path: "/terms",
    out: "terms/index.html",
    title: "Terms of service | FollowUpHub",
    description:
      "The terms that govern your FollowUpHub account: the free trial, fees and billing, acceptable use, consent obligations and data processing.",
    canonical: `${SITE.url}/terms`,
    schema: legalSchema("Terms of service", "/terms"),
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
    `<meta property="og:image" content="${SITE.main}/images/og-image.jpg" />`,
    `<meta name="twitter:card" content="summary_large_image" />`,
    `<script type="application/ld+json">${r.schema}</script>`,
  ].join("\n    ");
}

export function render(path: RoutePath = "/"): string {
  return renderToString(<App path={path} />);
}
