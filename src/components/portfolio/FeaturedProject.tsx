import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import aptoCerezo from "@/assets/apto-cerezo.png";
import detailImg from "@/assets/project-detail-1.jpg";
import kitchenImg from "@/assets/project-kitchen.jpg";
import bedroomImg from "@/assets/project-bedroom.jpg";
import floorplanImg from "@/assets/floorplan-texture.jpg";
import heroImg from "@/assets/hero-interior.jpg";

function ParallaxImage({
  src,
  alt,
  speed = 20,
  className = "",
}: {
  src: string;
  alt: string;
  speed?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [`-${speed}%`, `${speed}%`]);

  return (
    <div ref={ref} className={`overflow-hidden ${className}`}>
      <motion.img
        src={src}
        alt={alt}
        loading="lazy"
        style={{ y, scale: 1.3 }}
        className="w-full h-full object-cover"
      />
    </div>
  );
}

export function FeaturedProject() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y1 = useTransform(scrollYProgress, [0, 1], ["0%", "-20%"]);
  const y2 = useTransform(scrollYProgress, [0, 1], ["8%", "-12%"]);

  return (
    <section ref={ref} className="relative py-32 md:py-40 px-6 md:px-10 bg-[var(--ink)] text-[var(--cream)] overflow-hidden">
      <div className="max-w-[1400px] mx-auto">

        {/* Header */}
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

        {/* Main grid */}
        <div className="grid md:grid-cols-12 gap-6 md:gap-10">
          <motion.div style={{ y: y1 }} className="md:col-span-8 overflow-hidden bg-[var(--cherry)]">
            <img
              src={aptoCerezo}
              alt="Apto Cerezo - diseño interior completo"
              className="w-full h-auto object-contain"
              loading="lazy"
            />
          </motion.div>

          <motion.div style={{ y: y2 }} className="md:col-span-4 flex flex-col gap-8 md:pt-32">
            <p className="text-[var(--cream)]/85 leading-relaxed">
              "Apto Cerezo" nace de la necesidad de optimizar un espacio reducido sin
              sacrificar funcionalidad ni estética. Una propuesta integral que incluye
              cocina, closets, mobiliario de baño, puertas y un elemento central
              multifuncional: un centro de entretenimiento que también actúa como
              biombo divisorio y biblioteca.
            </p>

            <p className="text-[var(--cream)]/70 leading-relaxed text-sm">
              El reto principal fue lograr que cada mueble cumpliera más de una función
              sin que el resultado se sintiera recargado. La elección de la melamina
              cerezo claro fue clave: un tono cálido que unifica todos los ambientes y
              dialoga con la luz natural del apartamento.
            </p>

            <div className="border-t border-[var(--cream)]/15 pt-6 space-y-4">
              {[
                { label: "Área intervenida", value: "68 m²" },
                { label: "Duración", value: "4 meses" },
                { label: "Piezas únicas", value: "11 módulos a medida" },
              ].map((item) => (
                <div key={item.label} className="flex justify-between items-baseline gap-4">
                  <span className="text-xs text-[var(--cream)]/50 uppercase tracking-widest">{item.label}</span>
                  <span className="text-[var(--cream)]/90 text-sm shrink-0">{item.value}</span>
                </div>
              ))}
            </div>

            {/* Side image grid with parallax */}
            <div className="grid grid-cols-2 gap-3">
              <ParallaxImage src={detailImg} alt="Detalle de carpintería" speed={12} className="col-span-2 aspect-[4/3]" />
              <ParallaxImage src={kitchenImg} alt="Cocina" speed={10} className="aspect-square" />
              <ParallaxImage src={bedroomImg} alt="Zona de descanso" speed={14} className="aspect-square" />
              <ParallaxImage src={heroImg} alt="Acabados interiores" speed={10} className="col-span-2 aspect-[16/9]" />
            </div>

            <a
              href="#contacto"
              className="self-start text-xs tracking-[0.2em] uppercase border-b border-[var(--clay)] pb-1 text-[var(--clay)] hover:opacity-70 transition-opacity"
            >
              ¿Tienes un proyecto similar? →
            </a>
          </motion.div>
        </div>

        {/* Full-width gallery with staggered parallax */}
        <div className="mt-20 grid grid-cols-2 md:grid-cols-3 gap-4">
          <ParallaxImage src={kitchenImg}   alt="Cocina Apto Cerezo"      speed={14} className="col-span-2 md:col-span-2 aspect-[16/9]" />
          <ParallaxImage src={floorplanImg} alt="Planimetría del proyecto" speed={10} className="col-span-2 md:col-span-1 aspect-[4/5]" />
          <ParallaxImage src={bedroomImg}   alt="Zona de descanso"         speed={12} className="col-span-1 aspect-square" />
          <ParallaxImage src={detailImg}    alt="Carpintería a medida"     speed={16} className="col-span-1 aspect-square" />
          <ParallaxImage src={heroImg}      alt="Vista general"            speed={10} className="col-span-2 md:col-span-1 aspect-[4/3]" />
          <ParallaxImage src={aptoCerezo}   alt="Plano general Apto Cerezo" speed={8} className="col-span-2 md:col-span-2 aspect-[16/9]" />
        </div>

        {/* Metadata footer */}
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
