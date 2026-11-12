import { renderToString } from "react-dom/server";
import App from "./App";
import { FAQS, PLANS, SITE } from "./lib/content";

const TITLE = "FollowUpHub for Small Business | Calls, Bookings and Payments in One App";
const DESCRIPTION =
  "FollowUpHub texts back missed calls, books the work, sends reminders and invoices, and keeps every conversation in one inbox. Built in Canada for small businesses.";

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
      offers: PLANS.map((p) => ({
        "@type": "Offer",
        name: p.name,
        price: p.price,
        priceCurrency: "CAD",
        priceSpecification: {
          "@type": "UnitPriceSpecification",
          price: p.price,
          priceCurrency: "CAD",
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

export function renderHead(): string {
  return [
    `<title>${esc(TITLE)}</title>`,
    `<meta name="description" content="${esc(DESCRIPTION)}" />`,
    `<link rel="canonical" href="${SITE.url}" />`,
    `<meta property="og:type" content="website" />`,
    `<meta property="og:locale" content="en_CA" />`,
    `<meta property="og:title" content="${esc(TITLE)}" />`,
    `<meta property="og:description" content="${esc(DESCRIPTION)}" />`,
    `<meta property="og:url" content="${SITE.url}" />`,
    `<meta property="og:image" content="${SITE.main}/images/og-image.jpg" />`,
    `<meta name="twitter:card" content="summary_large_image" />`,
    `<script type="application/ld+json">${JSON.stringify(schema).replace(/</g, "\\u003c")}</script>`,
  ].join("\n    ");
}

export function render(): string {
  return renderToString(<App />);
}
