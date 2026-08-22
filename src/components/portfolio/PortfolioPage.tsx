import { useState, lazy, Suspense } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import { Nav } from "./Nav";
import { Hero } from "./Hero";
import { Marquee } from "./Marquee";
import { About } from "./About";
import { Process } from "./Process";
import { Footer } from "./Footer";

// Lazy-loaded components below the fold
const DesignPhilosophy = lazy(() =>
  import("./DesignPhilosophy").then((m) => ({ default: m.DesignPhilosophy })),
);
const FeaturedProject = lazy(() =>
  import("./FeaturedProject").then((m) => ({ default: m.FeaturedProject })),
);
const BeforeAfter = lazy(() => import("./BeforeAfter").then((m) => ({ default: m.BeforeAfter })));
const TechnicalDrawings = lazy(() =>
  import("./TechnicalDrawings").then((m) => ({
    default: m.TechnicalDrawings,
  })),
);
const Contact = lazy(() => import("./Contact").then((m) => ({ default: m.Contact })));

function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 200, damping: 40 });
  return (
    <motion.div
      style={{ scaleX }}
      className="fixed top-0 left-0 right-0 z-[60] h-[2px] bg-[var(--clay)] origin-left"
    />
  );
}

export function PortfolioPage() {
  const [prefilledMessage, setPrefilledMessage] = useState("");

  const handlePrefillMessage = (message: string) => {
    setPrefilledMessage(message);
    const contactSection = document.getElementById("contacto");
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="bg-background text-foreground overflow-x-hidden animate-in fade-in duration-300"
    >
      <ScrollProgress />
      <Nav />
      <Hero />
      <Marquee />
      <About />

      <Suspense fallback={<div className="h-[600px] bg-[var(--ink)] animate-pulse" />}>
        <DesignPhilosophy />
      </Suspense>

      <Suspense fallback={<div className="h-[1200px] bg-[var(--ink)] animate-pulse" />}>
        <FeaturedProject onInquire={handlePrefillMessage} />
      </Suspense>

      <Suspense fallback={<div className="h-[500px] bg-background animate-pulse" />}>
        <BeforeAfter />
      </Suspense>

      <Process />

      <Suspense fallback={<div className="h-[700px] bg-[var(--ink)] animate-pulse" />}>
        <TechnicalDrawings />
      </Suspense>

      <Suspense fallback={<div className="h-[600px] bg-background animate-pulse" />}>
        <Contact prefilledMessage={prefilledMessage} />
      </Suspense>

      <Footer />
    </motion.main>
  );
}
