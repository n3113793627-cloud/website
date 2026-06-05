import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { motion, useScroll, useSpring } from "framer-motion";
import { Nav } from "@/components/portfolio/Nav";
import { Hero } from "@/components/portfolio/Hero";
import { Marquee } from "@/components/portfolio/Marquee";
import { About } from "@/components/portfolio/About";
import { DesignPhilosophy } from "@/components/portfolio/DesignPhilosophy";
import { FeaturedProject } from "@/components/portfolio/FeaturedProject";
import { BeforeAfter } from "@/components/portfolio/BeforeAfter";
import { Process } from "@/components/portfolio/Process";
import { Contact } from "@/components/portfolio/Contact";
import { Footer } from "@/components/portfolio/Footer";

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
      <DesignPhilosophy />
      <FeaturedProject onInquire={handlePrefillMessage} />
      <BeforeAfter />
      <Process />
      <Contact prefilledMessage={prefilledMessage} />
      <Footer />
    </motion.main>
  );
}

