import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const testimonials = [
  {
    quote:
      "El biombo-biblioteca a medida que diseñó Natalia transformó completamente nuestra sala. Logró darle orden, funcionalidad y calidez a un espacio de apenas 60m². Su atención al detalle en la carpintería es insuperable.",
    author: "Juan Felipe Ortiz",
    project: "Cliente de Apto Cerezo",
    role: "Bogotá, Colombia",
  },
  {
    quote:
      "Recomiendo a Natalia 100% por su honestidad con los materiales y su profesionalismo. La asesoría inicial y el desglose de presupuesto nos ayudaron a definir el alcance del proyecto sin sorpresas durante la ejecución.",
    author: "María Camila Restrepo",
    project: "Cliente de Casa Terracota",
    role: "Bogotá, Colombia",
  },
  {
    quote:
      "Natalia nos acompañó en cada etapa: desde el render inicial en 3D hasta el último remate de carpintería e iluminación en nuestra habitación. El resultado tiene la calidez perfecta y aprovecha cada metro cuadrado.",
    author: "Andrés & Sofía",
    project: "Clientes de Dormitorio Sereno",
    role: "Medellín, Colombia",
  },
];

export function Testimonials() {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(1); // 1 = right, -1 = left

  const slideVariants = {
    enter: (dir: number) => ({
      x: dir > 0 ? 100 : -100,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (dir: number) => ({
      x: dir > 0 ? -100 : 100,
      opacity: 0,
    }),
  };

  const next = () => {
    setDirection(1);
    setIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prev = () => {
    setDirection(-1);
    setIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <section
      id="testimonios"
      className="py-32 md:py-40 px-6 md:px-10 bg-background overflow-hidden border-t border-foreground/5"
    >
      <div className="max-w-[1400px] mx-auto grid md:grid-cols-12 gap-12 items-center">
        {/* Left column: Section label and header */}
        <div className="md:col-span-5 space-y-6">
          <p className="eyebrow">— Opiniones</p>
          <h2 className="display text-5xl md:text-7xl leading-tight">
            La voz de <em className="italic text-[var(--clay)]">quienes habitan</em> sus espacios.
          </h2>
          <p className="text-muted-foreground text-sm md:text-base max-w-sm leading-relaxed">
            La mejor prueba del diseño es la vida diaria de quienes confían en el estudio.
            Testimonios reales de proyectos terminados.
          </p>

          {/* Navigation buttons */}
          <div className="flex gap-4 pt-4">
            <button
              onClick={prev}
              className="w-12 h-12 rounded-full border border-foreground/15 flex items-center justify-center hover:bg-foreground hover:text-background transition-all duration-300 group"
              aria-label="Testimonio anterior"
            >
              <span className="transition-transform duration-300 group-hover:-translate-x-1 font-semibold text-lg">
                ←
              </span>
            </button>
            <button
              onClick={next}
              className="w-12 h-12 rounded-full border border-foreground/15 flex items-center justify-center hover:bg-foreground hover:text-background transition-all duration-300 group"
              aria-label="Testimonio siguiente"
            >
              <span className="transition-transform duration-300 group-hover:translate-x-1 font-semibold text-lg">
                →
              </span>
            </button>
          </div>
        </div>

        {/* Right column: Testimonial content (carousel) */}
        <div className="md:col-span-7 bg-[var(--cream)] border border-foreground/15 p-8 sm:p-12 rounded-lg relative min-h-[350px] sm:min-h-[300px] flex flex-col justify-between shadow-lg">
          {/* Background pattern quotation mark */}
          <span className="absolute top-2 right-6 display text-[14rem] text-[var(--clay)]/5 pointer-events-none select-none">
            “
          </span>

          <div className="relative overflow-hidden flex-1 flex items-center">
            <AnimatePresence initial={false} custom={direction} mode="wait">
              <motion.div
                key={index}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                className="space-y-6"
              >
                <p className="display text-xl sm:text-2xl md:text-3xl leading-relaxed text-foreground font-light italic">
                  "{testimonials[index].quote}"
                </p>
                <div className="pt-4 border-t border-foreground/10 flex justify-between items-center flex-wrap gap-4">
                  <div>
                    <h4 className="font-semibold text-base tracking-tight text-foreground">
                      {testimonials[index].author}
                    </h4>
                    <p className="text-xs text-muted-foreground mt-0.5">
                      {testimonials[index].project}
                    </p>
                  </div>
                  <span className="text-xs font-mono text-[var(--clay)] tracking-widest uppercase">
                    {testimonials[index].role}
                  </span>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Bullet Indicators */}
          <div className="flex gap-2 mt-8 justify-start">
            {testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => {
                  setDirection(i > index ? 1 : -1);
                  setIndex(i);
                }}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  i === index ? "w-8 bg-[var(--clay)]" : "w-1.5 bg-foreground/15"
                }`}
                aria-label={`Ir al testimonio ${i + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
