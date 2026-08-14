import { motion } from "framer-motion";

const credentials = [
  { year: "2023", label: "Arquitecta · Universidad de América" },
  { year: "2024", label: "Matrícula profesional · CPNAA Colombia" },
];

export function About() {
  return (
    <section id="about" className="relative py-32 md:py-40 px-6 md:px-10 bg-background">
      <div className="max-w-[1400px] mx-auto grid md:grid-cols-12 gap-10 md:gap-16">
        <div className="md:col-span-5 md:sticky md:top-32 self-start">
          <p className="eyebrow mb-6">— Sobre mí</p>
          <h2 className="display text-5xl md:text-7xl leading-[1] mb-10">
            <em className="italic text-[var(--clay)]">Sensibilidad</em> para diseñar,
            <br /> precisión para construir.
          </h2>
        </div>

        <div className="md:col-span-7 md:pt-4">
          <div className="space-y-6 text-lg leading-relaxed text-foreground/85 max-w-xl">
            <p>
              Soy <strong>Natalia Ramírez Díaz</strong>, arquitecta colombiana radicada en Brasil,
              con experiencia en diseño arquitectónico, interiores y documentación técnica para
              proyectos residenciales, comerciales e institucionales.
            </p>
            <p>
              Mi trabajo combina sensibilidad espacial y rigor técnico. Desarrollo planos, detalles
              constructivos, modelos 3D y propuestas de diseño con AutoCAD, Revit y SketchUp. Me
              interesa especialmente comprender cómo los espacios influyen en el bienestar y en la
              experiencia cotidiana de las personas.
            </p>
            <p className="text-muted-foreground text-base">
              Brasil · Disponible para oportunidades presenciales o remotas
            </p>
          </div>

          <div className="mt-14 grid grid-cols-2 gap-6 max-w-xl">
            {credentials.map((c) => (
              <motion.div
                key={c.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.6 }}
                className="border-t border-foreground/20 pt-4"
              >
                <div className="display text-4xl text-[var(--clay)]">
                  {c.year}
                </div>
                <div className="text-xs text-muted-foreground mt-2 leading-tight">{c.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
