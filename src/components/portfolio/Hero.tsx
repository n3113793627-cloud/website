import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import { useRef } from "react";
import heroVideo from "@/assets/mp_.mp4";

export function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", shouldReduceMotion ? "0%" : "30%"]);
  const scale = useTransform(scrollYProgress, [0, 1], [1.02, shouldReduceMotion ? 1.02 : 1.1]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <section ref={ref} id="top" className="hero overflow-hidden">
      <motion.div style={{ y, scale }} className="absolute inset-0">
        <video
          src={heroVideo}
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover scale-[1.15] origin-top-left"
          preload="metadata"
        />
        {/* Horizontal editorial gradient for desktop */}
        <div
          className="absolute inset-0 hidden md:block"
          style={{
            background:
              "linear-gradient(90deg, rgba(23,12,8,0.90) 0%, rgba(23,12,8,0.78) 48%, rgba(23,12,8,0.55) 72%, rgba(23,12,8,0.30) 100%)",
          }}
        />
        {/* Subtle top vertical gradient to protect navbar readability */}
        <div
          className="absolute top-0 inset-x-0 h-32 pointer-events-none"
          style={{
            background: "linear-gradient(180deg, rgba(23,12,8,0.65) 0%, rgba(23,12,8,0) 100%)",
          }}
        />
        {/* Uniform darker overlay for mobile reading safety */}
        <div
          className="absolute inset-0 block md:hidden"
          style={{
            background: "linear-gradient(180deg, rgba(23,12,8,0.92) 0%, rgba(23,12,8,0.75) 100%)",
          }}
        />
      </motion.div>

      <div className="hero-content mx-auto max-w-[1400px]">
        <motion.div
          initial={shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          style={{ opacity }}
          className="w-full flex flex-col items-start px-6 md:px-10"
        >
          <div className="flex items-center gap-3 mb-6">
            <span className="h-px w-12 bg-[var(--cream)]/70" />
            <span className="eyebrow text-[var(--cream)]/90">PORTAFOLIO · 2026</span>
          </div>
          <h1 className="hero-title display text-[var(--cream)]">
            Arquitectura que{" "}
            <span className="hero-accent italic text-[var(--accent-on-dark)]">cuida,</span>{" "}
            <br className="hero-desktop-break" />
            diseño que conecta.
          </h1>
          <p className="hero-paragraph text-[var(--cream)]/90">
            Arquitecta y diseñadora de interiores con experiencia en documentación técnica, modelado
            3D y coordinación interdisciplinaria. Trabajo con AutoCAD, Revit y SketchUp, con
            especial interés en cómo el espacio influye en el bienestar.
          </p>
          <div className="hero-buttons">
            <a
              href="#proyectos"
              onClick={(e) => {
                e.preventDefault();
                const el = document.getElementById("proyectos");
                if (el) el.scrollIntoView({ behavior: "smooth" });
              }}
              className="inline-flex items-center justify-center text-[0.7rem] tracking-[0.2em] font-semibold uppercase px-8 py-4 bg-[var(--cream)] text-[var(--ink)] hover:bg-[#EFA07F] hover:text-[var(--ink)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#EFA07F] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--ink)] transition-all duration-300 rounded-full min-h-[44px] min-w-[150px] cursor-pointer"
            >
              VER PROYECTOS
            </a>
            <a
              href="/documents/CV_Natalia_Ramirez_Diaz_ES.pdf"
              download="CV_Natalia_Ramirez_Diaz_ES.pdf"
              aria-label="Descargar currículum de Natalia Ramírez Díaz en PDF"
              className="inline-flex items-center justify-center text-[0.7rem] tracking-[0.2em] font-semibold uppercase px-8 py-4 border border-[var(--cream)]/40 text-[var(--cream)] hover:bg-[var(--cream)] hover:text-[var(--ink)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#EFA07F] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--ink)] transition-all duration-300 rounded-full min-h-[44px] min-w-[150px] cursor-pointer"
            >
              DESCARGAR CV
            </a>
          </div>
        </motion.div>
      </div>

      <motion.a
        href="#proyectos"
        onClick={(e) => {
          e.preventDefault();
          const el = document.getElementById("proyectos");
          if (el) el.scrollIntoView({ behavior: "smooth" });
        }}
        className="hero-indicator absolute bottom-8 left-1/2 -translate-x-1/2 z-10 text-[var(--cream)]/80 hover:text-[#EFA07F] focus-visible:text-[#EFA07F] focus-visible:outline-none text-xs tracking-[0.3em] uppercase whitespace-nowrap transition-colors duration-300 font-semibold cursor-pointer"
        initial={shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8, duration: 0.6, ease: "easeOut" }}
      >
        ↓ EXPLORAR PROYECTOS
      </motion.a>
    </section>
  );
}
