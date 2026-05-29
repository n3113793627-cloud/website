import { motion } from "framer-motion";
import kitchen from "@/assets/project-kitchen.jpg";
import bedroom from "@/assets/project-bedroom.jpg";
import floorplan from "@/assets/floorplan-texture.jpg";

const projects = [
  {
    n: "02",
    title: "Casa Terracota",
    type: "Cocina abierta · Residencial",
    year: "2025",
    img: kitchen,
    desc: "Una cocina que es corazón de hogar: maderas cálidas, mármol blanco y muros en terracota artesanal.",
    span: "md:col-span-8 aspect-[16/10]",
  },
  {
    n: "03",
    title: "Dormitorio Sereno",
    type: "Interiorismo · Privado",
    year: "2024",
    img: bedroom,
    desc: "Refugio íntimo con paneles de cerezo y lino natural. Influencia japonesa, materialidad colombiana.",
    span: "md:col-span-4 aspect-[3/5]",
  },
  {
    n: "04",
    title: "Estudio Borrador",
    type: "Planimetría · Conceptual",
    year: "En proceso",
    img: floorplan,
    desc: "Reinterpretación de planos a mano alzada como ejercicio de pensamiento espacial.",
    span: "md:col-span-12 aspect-[16/8]",
  },
];

export function ProjectsGrid() {
  return (
    <section id="proyectos" className="py-32 md:py-40 px-6 md:px-10 bg-background">
      <div className="max-w-[1400px] mx-auto">
        <div className="flex items-end justify-between mb-16 flex-wrap gap-4">
          <div>
            <p className="eyebrow mb-4">— Selección de obra</p>
            <h2 className="display text-5xl md:text-7xl">Otros <em className="italic text-[var(--clay)]">proyectos</em></h2>
          </div>
          <p className="text-sm text-muted-foreground max-w-sm">
            Una selección curada de trabajos recientes en diseño interior, mobiliario y
            planimetría.
          </p>
        </div>

        <div className="grid md:grid-cols-12 gap-6">
          {projects.map((p, i) => (
            <motion.article
              key={p.n}
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
              className={`group relative overflow-hidden bg-muted ${p.span}`}
            >
              <img
                src={p.img}
                alt={p.title}
                loading="lazy"
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-[1.4s] group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[rgba(20,10,5,0.8)] via-transparent to-transparent opacity-90" />
              <div className="relative h-full flex flex-col justify-between p-6 md:p-8 text-[var(--cream)]">
                <div className="flex justify-between items-start">
                  <span className="eyebrow text-[var(--cream)]/80">№ {p.n}</span>
                  <span className="text-xs text-[var(--cream)]/70">{p.year}</span>
                </div>
                <div>
                  <p className="text-xs uppercase tracking-[0.2em] text-[var(--cream)]/70 mb-2">{p.type}</p>
                  <h3 className="display text-3xl md:text-5xl mb-3">{p.title}</h3>
                  <p className="text-sm text-[var(--cream)]/85 max-w-md">{p.desc}</p>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}