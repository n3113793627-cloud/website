import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import heroVideo from "@/assets/mp_.mp4";

export function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "40%"]);
  const scale = useTransform(scrollYProgress, [0, 1], [1.05, 1.2]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "-30%"]);

  return (
    <section ref={ref} id="top" className="relative h-[85vh] overflow-hidden pt-20">
      <motion.div style={{ y, scale }} className="absolute inset-0">
        <video
          src={heroVideo}
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover scale-[1.15] origin-top-left"
        />
        {/* Multi-directional overlay to guarantee text readability (top, bottom, and left sides) */}
        <div className="absolute inset-0 bg-[rgba(18,10,6,0.25)]" />
        <div className="absolute inset-0 bg-gradient-to-r from-[rgba(18,10,6,0.85)] via-[rgba(18,10,6,0.35)] to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-b from-[rgba(18,10,6,0.5)] via-transparent to-[rgba(18,10,6,0.65)]" />
      </motion.div>

      <motion.div
        style={{ y: textY, opacity }}
        className="relative z-10 h-full flex flex-col justify-end pb-16 md:pb-20 px-6 md:px-10 max-w-[1400px] mx-auto"
      >
        <div className="flex items-center gap-3 mb-6">
          <span className="h-px w-12 bg-[var(--cream)]/70" />
          <span className="eyebrow text-[var(--cream)]/90">PORTAFOLIO · 2026</span>
        </div>
        <h1 className="display text-[var(--cream)] text-[clamp(2.8rem,6.5vw,6.5rem)] leading-[0.92] max-w-5xl">
          Arquitectura que <em className="italic text-[var(--clay)]">cuida</em>,
          <br /> diseño que conecta.
        </h1>
        <p className="mt-8 max-w-xl text-[var(--cream)]/85 text-lg leading-relaxed">
          Arquitecta y diseñadora de interiores especializada en <strong>neuroarquitectura</strong>.
          Combino diseño interior, documentación técnica y BIM para crear espacios humanos,
          funcionales y sensibles.
        </p>
        <div className="mt-10 flex flex-wrap gap-4 z-20">
          <a
            href="#proyectos"
            className="inline-flex items-center justify-center text-[0.65rem] tracking-[0.2em] font-medium uppercase px-7 py-3 bg-[var(--cream)] text-[var(--ink)] hover:bg-[var(--clay)] hover:text-[var(--cream)] transition-all duration-300 rounded-full"
          >
            VER PROYECTOS
          </a>
          <a
            href="/cv.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center text-[0.65rem] tracking-[0.2em] font-medium uppercase px-7 py-3 border border-[var(--cream)]/40 text-[var(--cream)] hover:bg-[var(--cream)] hover:text-[var(--ink)] transition-all duration-300 rounded-full"
          >
            DESCARGAR CV
          </a>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.2, duration: 0.8 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 text-[var(--cream)]/70 text-xs tracking-[0.3em] uppercase whitespace-nowrap"
      >
        ↓ EXPLORAR PROYECTOS
      </motion.div>
    </section>
  );
}
