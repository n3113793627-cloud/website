import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { useLanguage } from "../../context/LanguageContext";

export function Process() {
  const { t } = useLanguage();
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const lineWidth = useTransform(scrollYProgress, [0.1, 0.7], ["0%", "100%"]);

  const steps = t.process.steps;

  return (
    <section
      id="proceso"
      ref={ref}
      className="py-24 md:py-32 px-6 md:px-10 bg-[var(--cherry)] text-[var(--cream)] scroll-mt-28"
    >
      <div className="max-w-[1400px] mx-auto">
        {/* Header Section */}
        <div className="max-w-3xl mb-12">
          <p className="eyebrow text-[var(--cream)]/75 mb-3">{t.process.label}</p>
          <h2 className="display text-3xl md:text-5xl font-bold leading-tight text-white max-w-2xl">
            {t.process.title}
          </h2>
          <p className="text-[var(--cream)]/85 text-base md:text-lg max-w-3xl mt-4 leading-relaxed font-sans">
            {t.process.intro}
          </p>
        </div>

        {/* Timeline & Steps Grid */}
        <div className="relative">
          {/* Timeline track (only on desktop/large screens) */}
          <div className="absolute top-2 left-0 right-0 h-px bg-[var(--cream)]/15 hidden lg:block" />
          {/* Animated fill (only on desktop/large screens) */}
          <motion.div
            style={{ width: lineWidth }}
            className="absolute top-2 left-0 h-px bg-[var(--clay-light)] hidden lg:block"
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-10 pt-4 lg:pt-10">
            {steps.map((s, i) => (
              <motion.div
                key={s.n}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                className="relative pt-6 sm:pt-0 border-t border-[var(--cream)]/15 sm:border-t-0 first:border-t-0"
              >
                {/* dot (only on desktop/large screens) */}
                <motion.div
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, duration: 0.3, type: "spring" }}
                  className="absolute -top-[2.35rem] left-0 w-2 h-2 rounded-full bg-[var(--clay-light)] hidden lg:block"
                />

                <div className="flex flex-col gap-2">
                  {/* High contrast step numbers */}
                  <span className="display text-4xl lg:text-5xl text-[var(--cream)]/40 font-bold font-mono leading-none">
                    {s.n}
                  </span>
                  <h3 className="display text-xl lg:text-2xl text-white font-bold leading-tight mt-1">
                    {s.t}
                  </h3>
                  <p className="text-[var(--cream)]/80 leading-relaxed text-sm font-sans mt-1">
                    {s.d}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
