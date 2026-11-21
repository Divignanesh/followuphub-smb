import { MotionConfig } from "framer-motion";
import { BackToTop } from "./components/BackToTop";
import { Nav } from "./components/Nav";
import { SocialProof } from "./components/SocialProof";
import { TrialBar } from "./components/TrialBar";
import { TrialPopup } from "./components/TrialPopup";
import { BestCrmForSmallBusiness } from "./pages/BestCrmForSmallBusiness";
import { CompareCrm } from "./pages/CompareCrm";
import { Privacy } from "./pages/Privacy";
import { Terms } from "./pages/Terms";
import { FAQ, FinalCTA, Footer } from "./sections/Closing";
import { FeatureRows } from "./sections/FeatureRows";
import { AllInOne } from "./sections/AllInOne";
import { Bento } from "./sections/Bento";
import { Hero } from "./sections/Hero";
import { Included, Pricing } from "./sections/Included";
import { Trades, WorksWith } from "./sections/Intro";
import { Testimonials } from "./sections/Testimonials";
import { COMPARE_PATHS, competitorForPath } from "./lib/competitors";

export const ROUTE_PATHS = ["/", "/best-crm-for-small-business", ...COMPARE_PATHS, "/privacy", "/terms"] as const;
export type RoutePath = (typeof ROUTE_PATHS)[number];

/** Trailing slashes are dropped; anything unknown renders the home page. */
export function normalisePath(pathname: string): RoutePath {
  const clean = pathname.replace(/\/+$/, "") || "/";
  return (ROUTE_PATHS as readonly string[]).includes(clean) ? (clean as RoutePath) : "/";
}

/** White base, no frame: colour lives only inside panels. */
export default function App({ path = "/" }: { path?: RoutePath }) {
  const home = path === "/";
  const competitor = competitorForPath(path);
  return (
    <MotionConfig reducedMotion="user">
      <a href="#main" className="skip-link fixed left-4 top-4 z-[60] rounded-lg bg-brand px-4 py-2 text-sm font-medium text-white">
        Skip to content
      </a>
      <Nav home={home} />
      <main id="main">
        {path === "/privacy" ? (
          <Privacy />
        ) : path === "/terms" ? (
          <Terms />
        ) : path === "/best-crm-for-small-business" ? (
          <BestCrmForSmallBusiness />
        ) : competitor ? (
          <CompareCrm competitor={competitor} />
        ) : (
          <>
            <Hero />
            <WorksWith />
            <Trades />
            <Bento />
            <FeatureRows />
            <AllInOne />
            <Included />
            <Pricing />
            <Testimonials />
            <FAQ />
            <FinalCTA />
          </>
        )}
      </main>
      <Footer />
      <BackToTop />
      {home && (
        <>
          <TrialBar />
          <SocialProof />
          <TrialPopup />
        </>
      )}
    </MotionConfig>
  );
}
