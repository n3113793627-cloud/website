import { motion, useInView, useMotionValue, useSpring, animate } from "framer-motion";
import { useRef, useEffect } from "react";

const stats = [
  { n: 20, suffix: "+", l: "Proyectos entregados" },
  { n: 5, suffix: "", l: "Años de práctica" },
  { n: 100, suffix: "%", l: "Diseño a medida" },
];

function AnimatedNumber({ target, suffix }: { target: number; suffix: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const mv = useMotionValue(0);
  const spring = useSpring(mv, { stiffness: 80, damping: 20 });

  useEffect(() => {
    if (!inView) return;
    const controls = animate(mv, target, { duration: 1.4, ease: "easeOut" });
    return controls.stop;
  }, [inView, mv, target]);

  useEffect(() => {
    return spring.on("change", (v) => {
      if (ref.current) ref.current.textContent = Math.round(v) + suffix;
    });
  }, [spring, suffix]);

  return <span ref={ref}>0{suffix}</span>;
}

export function About() {
  return (
    <section id="about" className="relative py-32 md:py-40 px-6 md:px-10 bg-background">
      <div className="max-w-[1400px] mx-auto grid md:grid-cols-12 gap-10 md:gap-16">
        <div className="md:col-span-5 md:sticky md:top-32 self-start">
          <p className="eyebrow mb-6">— Sobre mí</p>
          <h2 className="display text-5xl md:text-7xl leading-[1] mb-10">
            Diseño con <em className="italic text-[var(--clay)]">propósito</em>,
            construyo con <em className="italic">consciencia</em>.
          </h2>
        </div>

        <div className="md:col-span-7 md:pt-4">
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
            <p className="text-muted-foreground text-base">
              Bogotá, Colombia · Disponible para proyectos en LATAM
            </p>
          </div>

          <div className="mt-14 grid grid-cols-3 gap-6 max-w-xl">
            {stats.map((s) => (
              <motion.div
                key={s.l}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.6 }}
                className="border-t border-foreground/20 pt-4"
              >
                <div className="display text-4xl text-[var(--clay)]">
                  <AnimatedNumber target={s.n} suffix={s.suffix} />
                </div>
                <div className="text-xs text-muted-foreground mt-2 leading-tight">{s.l}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
