import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import aptoCerezo from "@/assets/apto-cerezo.png";
import detailImg from "@/assets/project-detail-1.jpg";

export function FeaturedProject() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y1 = useTransform(scrollYProgress, [0, 1], ["0%", "-25%"]);
  const y2 = useTransform(scrollYProgress, [0, 1], ["10%", "-15%"]);

  return (
    <section ref={ref} className="relative py-32 md:py-40 px-6 md:px-10 bg-[var(--ink)] text-[var(--cream)] overflow-hidden">
      <div className="max-w-[1400px] mx-auto">
        <div className="flex items-baseline justify-between flex-wrap gap-6 mb-16">
          <div>
            <p className="eyebrow text-[var(--clay)] mb-4">Proyecto destacado · 01</p>
            <h2 className="display text-6xl md:text-8xl leading-[0.9]">
              Apto <em className="italic text-[var(--clay)]">Cerezo</em>
            </h2>
          </div>
          <div className="text-sm text-[var(--cream)]/70 max-w-xs">
            <p>Diseño interior integral · Mobiliario personalizado</p>
            <p className="mt-2">Bogotá · 2025</p>
          </div>
        </div>

        <div className="grid md:grid-cols-12 gap-6 md:gap-10">
          <motion.div style={{ y: y1 }} className="md:col-span-8 aspect-[4/5] overflow-hidden bg-[var(--cherry)]">
            <img
              src={aptoCerezo}
              alt="Apto Cerezo - diseño interior completo"
              className="w-full h-full object-cover object-top"
              loading="lazy"
            />
          </motion.div>

          <motion.div style={{ y: y2 }} className="md:col-span-4 flex flex-col gap-6 md:pt-32">
            <p className="text-[var(--cream)]/85 leading-relaxed">
              "Apto Cerezo" nace de la necesidad de optimizar un espacio reducido sin
              sacrificar funcionalidad ni estética. Una propuesta integral que incluye
              cocina, closets, mobiliario de baño, puertas y un elemento central
              multifuncional: un centro de entretenimiento que también actúa como
              biombo divisorio y biblioteca.
            </p>
            <div className="aspect-square overflow-hidden">
              <img src={detailImg} alt="Detalle de carpintería" className="w-full h-full object-cover" loading="lazy" />
            </div>
          </motion.div>
        </div>

        <div className="mt-20 grid md:grid-cols-4 gap-8 border-t border-[var(--cream)]/15 pt-12">
          {[
            { k: "Material", v: "Melamina RH cerezo claro" },
            { k: "Concepto", v: "Multifuncionalidad y calidez" },
            { k: "Pieza clave", v: "Biombo-biblioteca-TV" },
            { k: "Áreas", v: "Cocina · Sala · Oficina · Baño" },
          ].map((d) => (
            <div key={d.k}>
              <p className="eyebrow text-[var(--clay)] mb-2">{d.k}</p>
              <p className="text-[var(--cream)]/90">{d.v}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}