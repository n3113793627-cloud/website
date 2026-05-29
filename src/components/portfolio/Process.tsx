import { motion } from "framer-motion";

const steps = [
  { n: "01", t: "Escuchar", d: "Toda obra empieza por entender al habitante: rutina, deseos, restricciones, sueños." },
  { n: "02", t: "Conceptualizar", d: "Bocetos, paletas, muestras de material. Definimos juntos el alma del proyecto." },
  { n: "03", t: "Diseñar", d: "Planimetría detallada, renders 3D y especificaciones técnicas listas para construir." },
  { n: "04", t: "Acompañar", d: "Coordinación con maestros y proveedores hasta el último remate. Cada detalle importa." },
];

export function Process() {
  return (
    <section id="proceso" className="py-32 md:py-40 px-6 md:px-10 bg-[var(--cherry)] text-[var(--cream)]">
      <div className="max-w-[1400px] mx-auto">
        <div className="max-w-3xl mb-20">
          <p className="eyebrow text-[var(--cream)]/80 mb-4">— Proceso</p>
          <h2 className="display text-5xl md:text-7xl leading-[0.95]">
            Del <em className="italic">primer trazo</em> a la <em className="italic text-[var(--cream)]">última junta</em>.
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-x-16 gap-y-14">
          {steps.map((s, i) => (
            <motion.div
              key={s.n}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: i * 0.08 }}
              className="border-t border-[var(--cream)]/25 pt-6 flex gap-6"
            >
              <span className="display text-5xl text-[var(--cream)]/40">{s.n}</span>
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