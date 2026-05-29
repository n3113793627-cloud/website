import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import portrait from "@/assets/natalia-portrait.jpeg";

export function About() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const imgY = useTransform(scrollYProgress, [0, 1], ["-10%", "15%"]);

  return (
    <section id="about" ref={ref} className="relative py-32 md:py-40 px-6 md:px-10 bg-background">
      <div className="max-w-[1400px] mx-auto grid md:grid-cols-12 gap-10 md:gap-16">
        <div className="md:col-span-5 md:sticky md:top-32 self-start">
          <div className="relative aspect-[3/4] overflow-hidden bg-muted">
            <motion.img
              style={{ y: imgY, scale: 1.15 }}
              src={portrait}
              alt="Natalia Ramírez, arquitecta"
              className="w-full h-full object-cover"
            />
          </div>
          <p className="eyebrow mt-6">Bogotá · Colombia</p>
        </div>

        <div className="md:col-span-7 md:pt-12">
          <p className="eyebrow mb-6">— Sobre mí</p>
          <h2 className="display text-5xl md:text-7xl leading-[1] mb-10">
            Diseño con <em className="italic text-[var(--clay)]">propósito</em>,
            construyo con <em className="italic">consciencia</em>.
          </h2>
          <div className="space-y-6 text-lg leading-relaxed text-foreground/85 max-w-xl">
            <p>
              Soy <strong>Natalia Ramírez</strong>, arquitecta colombiana especializada en
              diseño de interiores y mobiliario a medida. Mi trabajo nace de una obsesión:
              que cada espacio responda con precisión a la vida de quien lo habita.
            </p>
            <p>
              Creo en la calidez de los materiales nobles, en la honestidad de las líneas
              limpias y en el poder transformador de un detalle bien resuelto. Trabajo con
              maderas locales, paletas terrosas y soluciones multifuncionales que
              aprovechan al máximo cada metro cuadrado.
            </p>
          </div>

          <div className="mt-14 grid grid-cols-3 gap-6 max-w-xl">
            {[
              { n: "20+", l: "Proyectos entregados" },
              { n: "5", l: "Años de práctica" },
              { n: "100%", l: "Diseño a medida" },
            ].map((s) => (
              <div key={s.l} className="border-t border-foreground/20 pt-4">
                <div className="display text-4xl text-[var(--clay)]">{s.n}</div>
                <div className="text-xs text-muted-foreground mt-2 leading-tight">{s.l}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}