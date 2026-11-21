import { MotionConfig } from "framer-motion";
import { Nav } from "./components/Nav";
import { SocialProof } from "./components/SocialProof";
import { TrialBar } from "./components/TrialBar";
import { TrialPopup } from "./components/TrialPopup";
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

export const ROUTE_PATHS = ["/", "/privacy", "/terms"] as const;
export type RoutePath = (typeof ROUTE_PATHS)[number];

/** Trailing slashes are dropped; anything unknown renders the home page. */
export function normalisePath(pathname: string): RoutePath {
  const clean = pathname.replace(/\/+$/, "") || "/";
  return (ROUTE_PATHS as readonly string[]).includes(clean) ? (clean as RoutePath) : "/";
}

/** White base, no frame: colour lives only inside panels. */
export default function App({ path = "/" }: { path?: RoutePath }) {
  const home = path === "/";
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
