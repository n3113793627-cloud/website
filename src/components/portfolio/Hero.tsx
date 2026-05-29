import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import heroImg from "@/assets/hero-interior.jpg";

export function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "40%"]);
  const scale = useTransform(scrollYProgress, [0, 1], [1.05, 1.2]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "-30%"]);

  return (
    <section ref={ref} id="top" className="relative h-[110vh] overflow-hidden">
      <motion.div style={{ y, scale }} className="absolute inset-0">
        <img
          src={heroImg}
          alt="Interior diseñado por Natalia Ramírez"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[rgba(30,15,8,0.15)] via-transparent to-[rgba(30,15,8,0.55)]" />
      </motion.div>

      <motion.div
        style={{ y: textY, opacity }}
        className="relative z-10 h-full flex flex-col justify-end pb-20 md:pb-28 px-6 md:px-10 max-w-[1400px] mx-auto"
      >
        <div className="flex items-center gap-3 mb-6">
          <span className="h-px w-12 bg-[var(--cream)]/70" />
          <span className="eyebrow text-[var(--cream)]/90">Portfolio · 2026</span>
        </div>
        <h1 className="display text-[var(--cream)] text-[clamp(3rem,9vw,9rem)] leading-[0.9] max-w-5xl">
          Espacios que <em className="italic text-[var(--clay)]">respiran</em>,
          <br /> materia que <em className="italic">cuenta historias.</em>
        </h1>
        <p className="mt-8 max-w-xl text-[var(--cream)]/85 text-lg leading-relaxed">
          Arquitecta y diseñadora de interiores. Cada metro cuadrado, una decisión
          deliberada entre funcionalidad, calidez y carácter.
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.2, duration: 0.8 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 text-[var(--cream)]/70 text-xs tracking-[0.3em] uppercase"
      >
        ↓ Desplaza
      </motion.div>
    </section>
  );
}