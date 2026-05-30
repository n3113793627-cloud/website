import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import aptoCerezo from "@/assets/apto-cerezo.png";
import detailImg from "@/assets/project-detail-1.jpg";
import kitchenImg from "@/assets/project-kitchen.jpg";
import bedroomImg from "@/assets/project-bedroom.jpg";
import floorplanImg from "@/assets/floorplan-texture.jpg";
import heroImg from "@/assets/hero-interior.jpg";

function ParallaxImg({ src, alt, speed = 12, className = "" }: { src: string; alt: string; speed?: number; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [`-${speed}%`, `${speed}%`]);
  return (
    <div ref={ref} className={`overflow-hidden ${className}`}>
      <motion.img src={src} alt={alt} loading="lazy" style={{ y, scale: 1.25 }} className="w-full h-full object-cover" />
    </div>
  );
}

export function FeaturedProject() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const yLeft = useTransform(scrollYProgress, [0, 1], ["0%", "-12%"]);

  return (
    <section ref={ref} className="py-24 md:py-36 px-6 md:px-10 bg-[var(--ink)] text-[var(--cream)]">
      <div className="max-w-[1400px] mx-auto space-y-16">

        {/* Header */}
        <div className="flex items-end justify-between gap-6 border-b border-[var(--cream)]/10 pb-10">
          <div>
            <p className="eyebrow text-[var(--clay)] mb-3">Proyecto destacado · 01</p>
            <h2 className="display text-6xl md:text-8xl leading-[0.9]">
              Apto <em className="italic text-[var(--clay)]">Cerezo</em>
            </h2>
          </div>
          <div className="hidden md:block text-right text-sm text-[var(--cream)]/85 space-y-1">
            <p>Diseño interior integral · Mobiliario personalizado</p>
            <p>Bogotá · 2025</p>
          </div>
        </div>

        {/* Main: image left + content + images right */}
        <div className="grid md:grid-cols-2 gap-8 md:gap-6 items-stretch">

          {/* Left: main image */}
          <motion.div style={{ y: yLeft }} className="overflow-hidden bg-[var(--cherry)]">
            <img src={aptoCerezo} alt="Apto Cerezo" className="w-full h-auto" loading="lazy" />
          </motion.div>

          {/* Right: text + stats + images filling same height */}
          <div className="flex flex-col gap-6">
            <div className="space-y-4">
              <p className="text-[var(--cream)]/85 leading-relaxed">
                "Apto Cerezo" nace de la necesidad de optimizar un espacio reducido sin
                sacrificar funcionalidad ni estética. Una propuesta integral que incluye
                cocina, closets, mobiliario de baño, puertas y un elemento central
                multifuncional: un centro de entretenimiento que también actúa como
                biombo divisorio y biblioteca.
              </p>
              <p className="text-[var(--cream)]/70 leading-relaxed text-sm">
                La elección de la melamina cerezo claro fue clave: un tono cálido que
                unifica todos los ambientes y dialoga con la luz natural del apartamento.
                Cada mueble cumple más de una función sin que el resultado se sienta recargado.
              </p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 border-t border-[var(--cream)]/15 pt-5">
              {[
                { label: "Área", value: "68 m²" },
                { label: "Duración", value: "4 meses" },
                { label: "Piezas", value: "11 módulos" },
              ].map((item) => (
                <div key={item.label}>
                  <p className="text-[10px] text-[var(--cream)]/65 uppercase tracking-widest mb-1">{item.label}</p>
                  <p className="display text-2xl text-[var(--cream)]">{item.value}</p>
                </div>
              ))}
            </div>

            {/* Images — flex-1 makes this block fill the remaining height */}
            <div className="flex-1 grid grid-cols-2 grid-rows-2 gap-2 min-h-0">
              <ParallaxImg src={detailImg}    alt="Detalle carpintería" speed={10} className="col-span-2 row-span-1 h-full" />
              <ParallaxImg src={kitchenImg}   alt="Cocina"              speed={12} className="col-span-1 row-span-1 h-full" />
              <ParallaxImg src={bedroomImg}   alt="Zona de descanso"    speed={8}  className="col-span-1 row-span-1 h-full" />
            </div>

            <a
              href="#contacto"
              className="self-start text-xs tracking-[0.2em] uppercase border-b border-[var(--clay)] pb-1 text-[var(--clay)] hover:opacity-70 transition-opacity"
            >
              ¿Tienes un proyecto similar? →
            </a>
          </div>
        </div>

        {/* Metadata footer */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 border-t border-[var(--cream)]/15 pt-10">
          {[
            { k: "Material", v: "Melamina RH cerezo claro" },
            { k: "Concepto", v: "Multifuncionalidad y calidez" },
            { k: "Pieza clave", v: "Biombo-biblioteca-TV" },
            { k: "Áreas", v: "Cocina · Sala · Oficina · Baño" },
          ].map((d) => (
            <div key={d.k}>
              <p className="eyebrow text-[var(--clay)] mb-2">{d.k}</p>
              <p className="text-[var(--cream)]/90 text-sm">{d.v}</p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
