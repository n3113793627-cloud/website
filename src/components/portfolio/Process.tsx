import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

const steps = [
  { n: "01", t: "Escuchar", d: "Toda obra empieza por entender al habitante: rutina, deseos, restricciones, sueños." },
  { n: "02", t: "Conceptualizar", d: "Bocetos, paletas, muestras de material. Definimos juntos el alma del proyecto." },
  { n: "03", t: "Diseñar", d: "Planimetría detallada, renders 3D y especificaciones técnicas listas para construir." },
  { n: "04", t: "Acompañar", d: "Coordinación con maestros y proveedores hasta el último remate. Cada detalle importa." },
];

export function Process() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const lineWidth = useTransform(scrollYProgress, [0.1, 0.7], ["0%", "100%"]);

  return (
    <section id="proceso" ref={ref} className="py-32 md:py-40 px-6 md:px-10 bg-[var(--cherry)] text-[var(--cream)]">
      <div className="max-w-[1400px] mx-auto">
        <div className="max-w-3xl mb-20">
          <p className="eyebrow text-[var(--cream)]/80 mb-4">— Proceso</p>
          <h2 className="display text-5xl md:text-7xl leading-[0.95]">
            Del <em className="italic">primer trazo</em> a la{" "}
            <em className="italic text-[var(--cream)]">última junta</em>.
          </h2>
        </div>

        {/* Desktop: horizontal timeline */}
        <div className="hidden md:block">
          <div className="relative mb-0">
            {/* track */}
            <div className="absolute top-2 left-0 right-0 h-px bg-[var(--cream)]/20" />
            {/* animated fill */}
            <motion.div
              style={{ width: lineWidth }}
              className="absolute top-2 left-0 h-px bg-[var(--clay)]"
            />
            <div className="grid grid-cols-4 gap-10 pt-10">
              {steps.map((s, i) => (
                <motion.div
                  key={s.n}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: i * 0.12 }}
                  className="relative"
                >
                  {/* dot */}
                  <motion.div
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.12, duration: 0.3, type: "spring" }}
                    className="absolute -top-[2.35rem] left-0 w-2 h-2 rounded-full bg-[var(--clay)]"
                  />
                  <span className="display text-6xl text-[var(--cream)]/25 block mb-4">{s.n}</span>
                  <h3 className="display text-3xl mb-3">{s.t}</h3>
                  <p className="text-[var(--cream)]/75 leading-relaxed text-sm">{s.d}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* Mobile: vertical list */}
        <div className="md:hidden flex flex-col gap-14">
          {steps.map((s, i) => (
            <motion.div
              key={s.n}
              initial={{ opacity: 0, x: -24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.08 }}
              className="border-t border-[var(--cream)]/25 pt-6 flex gap-6"
            >
              <span className="display text-5xl text-[var(--cream)]/30">{s.n}</span>
              <div>
                <h3 className="display text-3xl mb-3">{s.t}</h3>
                <p className="text-[var(--cream)]/80 leading-relaxed max-w-md">{s.d}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
