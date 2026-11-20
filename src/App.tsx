import { MotionConfig } from "framer-motion";
import { Nav } from "./components/Nav";
import { TrialBar } from "./components/TrialBar";
import { TrialPopup } from "./components/TrialPopup";
import { FAQ, FinalCTA, Footer } from "./sections/Closing";
import { FeatureRows } from "./sections/FeatureRows";
import { AllInOne } from "./sections/AllInOne";
import { Bento } from "./sections/Bento";
import { Hero } from "./sections/Hero";
import { Included, Pricing } from "./sections/Included";
import { Trades, WorksWith } from "./sections/Intro";
import { Testimonials } from "./sections/Testimonials";

/** White base, no frame: colour lives only inside panels. */
export default function App() {
  return (
    <MotionConfig reducedMotion="user">
      <a href="#main" className="skip-link fixed left-4 top-4 z-[60] rounded-lg bg-brand px-4 py-2 text-sm font-medium text-white">
        Skip to content
      </a>
      <Nav />
      <main id="main">
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
      </main>
      <Footer />
      <TrialBar />
      <TrialPopup />
    </MotionConfig>
  );
}
