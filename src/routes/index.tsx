import { createFileRoute } from "@tanstack/react-router";
import { motion, useScroll, useSpring } from "framer-motion";
import { Nav } from "@/components/portfolio/Nav";
import { Hero } from "@/components/portfolio/Hero";
import { Marquee } from "@/components/portfolio/Marquee";
import { About } from "@/components/portfolio/About";
import { FeaturedProject } from "@/components/portfolio/FeaturedProject";
import { ProjectsGrid } from "@/components/portfolio/ProjectsGrid";
import { Process } from "@/components/portfolio/Process";
import { Contact } from "@/components/portfolio/Contact";
import { Footer } from "@/components/portfolio/Footer";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Natalia Ramírez — Arquitecta & Diseñadora de Interiores" },
      { name: "description", content: "Portfolio de Natalia Ramírez. Arquitectura y diseño interior con calidez, propósito y mobiliario a medida desde Bogotá, Colombia." },
      { property: "og:title", content: "Natalia Ramírez — Arquitecta & Diseñadora de Interiores" },
      { property: "og:description", content: "Espacios que respiran, materia que cuenta historias. Diseño interior y mobiliario personalizado." },
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
      <FeaturedProject />
      <ProjectsGrid />
      <Process />
      <Contact />
      <Footer />
    </motion.main>
  );
}
