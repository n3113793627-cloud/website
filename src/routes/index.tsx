import { useState, lazy, Suspense } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { motion, useScroll, useSpring } from "framer-motion";
import { Nav } from "@/components/portfolio/Nav";
import { Hero } from "@/components/portfolio/Hero";
import { Marquee } from "@/components/portfolio/Marquee";
import { About } from "@/components/portfolio/About";
import { Process } from "@/components/portfolio/Process";
import { Footer } from "@/components/portfolio/Footer";

// Lazy-loaded components below the fold
const DesignPhilosophy = lazy(() =>
  import("@/components/portfolio/DesignPhilosophy").then((m) => ({ default: m.DesignPhilosophy }))
);
const FeaturedProject = lazy(() =>
  import("@/components/portfolio/FeaturedProject").then((m) => ({ default: m.FeaturedProject }))
);
const BeforeAfter = lazy(() =>
  import("@/components/portfolio/BeforeAfter").then((m) => ({ default: m.BeforeAfter }))
);
const TechnicalDrawings = lazy(() =>
  import("@/components/portfolio/TechnicalDrawings").then((m) => ({ default: m.TechnicalDrawings }))
);
const Contact = lazy(() =>
  import("@/components/portfolio/Contact").then((m) => ({ default: m.Contact }))
);

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Natalia Ramírez — Especialista en Neuroarquitectura y Diseño Interior" },
      { name: "description", content: "Especialista en neuroarquitectura y diseño interior terapéutico desde Bogotá, Colombia. Espacios diseñados para potenciar el bienestar emocional, mental y físico." },
      { property: "og:title", content: "Natalia Ramírez — Especialista en Neuroarquitectura & Diseño Interior" },
      { property: "og:description", content: "Espacios que sanan, diseño que conecta. Especialización en neuroarquitectura como herramienta terapéutica y de bienestar." },
    ],
  }),
  component: Index,
});

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

function Index() {
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
      className="bg-background text-foreground overflow-x-hidden"
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

