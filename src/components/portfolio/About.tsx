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
            Diseño para la <em className="italic text-[var(--clay)]">mente</em>, construyo para el{" "}
            <em className="italic">bienestar</em>.
          </h2>
        </div>

        <div className="md:col-span-7 md:pt-4">
          <div className="space-y-6 text-lg leading-relaxed text-foreground/85 max-w-xl">
            <p>
              Soy <strong>Natalia Ramírez</strong>, arquitecta colombiana especializada en
              <strong> neuroarquitectura</strong> y diseño interior. Mi práctica combina los
              principios de la neurociencia aplicada con el arte del diseño espacial, transformando
              los ambientes físicos en herramientas terapéuticas activas para mejorar el ánimo, la
              cognición y la calma.
            </p>
            <p>
              Creo en el poder de la luz natural, la biofilia (conexión con la naturaleza), texturas
              orgánicas y maderas locales para influir de forma positiva en el sistema nervioso.
              Cada decisión sobre paletas de colores, distribución de mobiliario y materialidad se
              toma con rigor científico y delicadeza estética para favorecer la regulación emocional
              cotidiana.
            </p>
            <p className="text-muted-foreground text-base">
              Bogotá, Colombia · Consultorías y proyectos internacionales a distancia
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
