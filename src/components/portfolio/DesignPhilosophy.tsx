import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface Pillar {
  id: string;
  n: string;
  t: string;
  subtitle: string;
  d: string;
  foundation: string;
  application: string;
  decision: string;
  visualEffect: React.ReactNode;
}

const pillars: Pillar[] = [
  {
    id: "circadian",
    n: "01",
    t: "Luz y ritmos cotidianos",
    subtitle: "ILUMINACIÓN Y ATMÓSFERA",
    d: "La luz define la atmósfera, facilita las actividades y permite acompañar los distintos momentos del día.",
    foundation:
      "Considero la orientación, la entrada de luz natural, el deslumbramiento y la temperatura de color para equilibrar confort visual y carácter espacial.",
    application:
      "Diseño aperturas y diferentes escenas de iluminación según el uso, el horario y las necesidades de cada proyecto.",
    decision: "La iluminación debe responder al uso del espacio, no imponerse sobre él.",
    visualEffect: (
      <div className="relative w-full h-full rounded-2xl overflow-hidden bg-gradient-to-tr from-[#1a0f0a] to-[#2d1b10] flex items-center justify-center p-8 border border-white/5 shadow-inner">
        {/* Sun/Moon simulation */}
        <motion.div
          animate={{
            scale: [1, 1.1, 1],
            boxShadow: [
              "0 0 20px rgba(230,175,120,0.2)",
              "0 0 45px rgba(230,175,120,0.4)",
              "0 0 20px rgba(230,175,120,0.2)",
            ],
            background: [
              "radial-gradient(circle, #E6AF78 0%, rgba(230,175,120,0) 70%)",
              "radial-gradient(circle, #F4D3B0 0%, rgba(230,175,120,0) 80%)",
              "radial-gradient(circle, #E6AF78 0%, rgba(230,175,120,0) 70%)",
            ],
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute w-52 h-52 rounded-full"
        />
        <div className="relative z-10 flex flex-col items-center text-center">
          <span className="font-mono text-[10px] text-[var(--clay-light)] uppercase tracking-[0.2em] mb-2">
            Escenario lumínico
          </span>
          <span className="text-[var(--cream)]/80 text-xs font-mono">
            Luz diurna → Luz cálida
          </span>
        </div>
        <div className="absolute bottom-4 inset-x-4 flex justify-between text-[8px] font-mono text-[var(--cream)]/40 uppercase tracking-widest">
          <span>Día</span>
          <span>Tarde</span>
        </div>
      </div>
    ),
  },
  {
    id: "biophilia",
    n: "02",
    t: "Biofilia y formas orgánicas",
    subtitle: "NATURALEZA Y CONTINUIDAD VISUAL",
    d: "La presencia de vegetación, materiales naturales y geometrías suaves puede reforzar la conexión visual con el entorno y aportar calidez.",
    foundation:
      "Integro recursos biofílicos cuando contribuyen a la orientación, la escala y la experiencia del lugar, evitando utilizarlos como decoración automática.",
    application:
      "En el Apto Cerezo, las curvas del mobiliario y la continuidad de los materiales organizan el recorrido y suavizan los encuentros.",
    decision: "La naturaleza se integra como una relación espacial, material y visual.",
    visualEffect: (
      <div className="relative w-full h-full rounded-2xl overflow-hidden bg-gradient-to-br from-[#121c16] to-[#1d2f25] flex items-center justify-center p-8 border border-white/5 shadow-inner">
        {/* Organic waves animation */}
        <svg
          className="absolute inset-0 w-full h-full opacity-20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <motion.path
            animate={{
              d: [
                "M-100,100 C100,50 200,150 400,100 C600,50 700,150 900,100 L900,300 L-100,300 Z",
                "M-100,100 C150,150 100,50 350,100 C600,150 650,50 900,100 L900,300 L-100,300 Z",
                "M-100,100 C100,50 200,150 400,100 C600,50 700,150 900,100 L900,300 L-100,300 Z",
              ],
            }}
            transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
            fill="var(--clay)"
          />
        </svg>
        <div className="relative z-10 flex flex-col items-center text-center">
          <span className="font-mono text-[10px] text-emerald-400/80 uppercase tracking-[0.2em] mb-2">
            Forma orgánica
          </span>
          <span className="text-[var(--cream)]/80 text-xs font-mono">
            Curva
          </span>
        </div>
        <div className="absolute bottom-4 inset-x-4 flex justify-between text-[8px] font-mono text-[var(--cream)]/40 uppercase tracking-widest">
          <span>Continuidad</span>
        </div>
      </div>
    ),
  },
  {
    id: "acoustics",
    n: "03",
    t: "Confort acústico",
    subtitle: "ZONIFICACIÓN Y ABSORCIÓN",
    d: "La distribución puede separar actividades ruidosas de las áreas que requieren descanso, privacidad o concentración.",
    foundation:
      "Considero las fuentes de ruido, los recorridos, los cerramientos y las superficies absorbentes para reducir la reverberación y mejorar el confort.",
    application:
      "Zonifico las áreas sociales y de descanso e incorporo separadores, textiles, paneles o materiales absorbentes según las necesidades del proyecto.",
    decision: "El confort acústico comienza en la distribución y se refuerza mediante la materialidad.",
    visualEffect: (
      <div className="relative w-full h-full rounded-2xl overflow-hidden bg-gradient-to-tr from-[#0e1620] to-[#1a2533] flex items-center justify-center p-8 border border-white/5 shadow-inner">
        {/* Sound dampening simulation */}
        <div className="flex gap-1.5 items-end h-16 relative">
          {[1.2, 0.4, 1.8, 0.6, 2.2, 0.5, 1.6, 0.3, 0.9, 0.2].map((height, i) => (
            <motion.div
              key={i}
              animate={{
                height: [height * 20, height * 0.2 * 20, height * 20],
              }}
              transition={{
                duration: 2.5,
                repeat: Infinity,
                delay: i * 0.1,
                ease: "easeInOut",
              }}
              className="w-1.5 bg-[var(--clay)] rounded-full"
            />
          ))}
          {/* Audio dampening line */}
          <div className="absolute inset-y-0 left-1/2 w-0.5 bg-white/20" />
          <div className="absolute top-[-24px] left-0 text-[7px] font-mono text-rose-400 uppercase tracking-widest">
            Fuente sonora
          </div>
          <div className="absolute top-[-24px] right-0 text-[7px] font-mono text-emerald-400 uppercase tracking-widest">
            Absorción
          </div>
        </div>
        <div className="absolute bottom-4 inset-x-4 flex justify-between text-[8px] font-mono text-[var(--cream)]/40 uppercase tracking-widest">
          <span>Mayor reverberación</span>
          <span>Mayor control acústico</span>
        </div>
      </div>
    ),
  },
  {
    id: "sensory",
    n: "04",
    t: "Equilibrio sensorial",
    subtitle: "COLOR, TEXTURA Y MATERIALIDAD",
    d: "El color, la textura, el brillo y la materialidad influyen en cómo percibimos la calidez, la escala y la luminosidad de un espacio.",
    foundation:
      "Selecciono paletas y acabados considerando la luz natural y artificial, el uso, el mantenimiento y la atmósfera buscada.",
    application:
      "Combino estucos, maderas claras y textiles con texturas visibles para aportar coherencia material y riqueza táctil.",
    decision: "Cada decisión material debe responder tanto al uso como a la intención estética.",
    visualEffect: (
      <div className="relative w-full h-full rounded-2xl overflow-hidden bg-gradient-to-tr from-[#251e18] to-[#3a3026] flex items-center justify-center p-8 border border-white/5 shadow-inner">
        {/* Soft light dispersion */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(230,175,120,0.08)_0%,transparent_60%)]" />
        <div className="flex flex-col items-center">
          <div className="grid grid-cols-3 gap-2 w-28 h-12 mb-3">
            <div className="bg-[#DFCBB4] rounded border border-white/10" />
            <div className="bg-[#B99A82] rounded border border-white/10" />
            <div className="bg-[#7D6652] rounded border border-white/10" />
          </div>
          <span className="text-[var(--cream)]/80 text-[10px] font-mono tracking-widest uppercase">
            Paleta y materialidad
          </span>
        </div>
        <div className="absolute bottom-4 inset-x-4 flex justify-between text-[8px] font-mono text-[var(--cream)]/40 uppercase tracking-widest">
          <span>Saturación controlada</span>
          <span>Textura visible</span>
        </div>
      </div>
    ),
  },
  {
    id: "agency",
    n: "05",
    t: "Flexibilidad y control",
    subtitle: "ADAPTABILIDAD Y PRIVACIDAD",
    d: "Un espacio flexible permite adaptar la privacidad, la distribución y el uso cuando cambian las necesidades de sus habitantes.",
    foundation:
      "Incorporo elementos móviles, corredizos o multifuncionales para que el espacio pueda evolucionar sin intervenciones complejas.",
    application:
      "Propongo paneles móviles, biombos-biblioteca u hojas deslizantes que permiten unir o separar ambientes según la actividad.",
    decision: "Dar opciones al usuario mejora la funcionalidad y prolonga la utilidad del espacio.",
    visualEffect: (
      <div className="relative w-full h-full rounded-2xl overflow-hidden bg-gradient-to-br from-[#1b1c20] to-[#2c2d35] flex items-center justify-center p-8 border border-white/5 shadow-inner">
        {/* Slider interaction simulation */}
        <div className="flex flex-col items-center gap-4">
          <span className="text-[10px] font-mono text-[var(--cream)]/80 tracking-[0.2em] uppercase">
            Privacidad ↔ Apertura
          </span>
          <div className="w-40 h-10 border border-white/10 rounded-full flex items-center px-2 relative bg-black/25">
            <motion.div
              animate={{
                x: [0, 118, 0],
              }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
              className="w-8 h-8 rounded-full bg-[var(--clay)] shadow-lg flex items-center justify-center text-white"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="12"
                height="12"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="3"
                className="rotate-90"
              >
                <path d="m9 18-6-6 6-6" />
                <path d="m15 6 6 6-6 6" />
              </svg>
            </motion.div>
          </div>
        </div>
        <div className="absolute bottom-4 inset-x-4 flex justify-between text-[8px] font-mono text-[var(--cream)]/40 uppercase tracking-widest">
          <span>Configuración fija</span>
          <span>Configuración adaptable</span>
        </div>
      </div>
    ),
  },
];

export function DesignPhilosophy() {
  const [activeTab, setActiveTab] = useState<string>("circadian");
  const activePillar = pillars.find((p) => p.id === activeTab) || pillars[0];

  return (
    <section
      id="enfoque"
      className="py-24 md:py-36 px-6 md:px-10 bg-[var(--ink)] text-[var(--cream)] relative overflow-hidden"
    >
      {/* Decorative background grid */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_30%,rgba(76,50,38,0.08)_0%,transparent_50%)] pointer-events-none" />

      <div className="max-w-[1400px] mx-auto relative z-10">
        {/* Intro Grid section */}
        <div className="grid md:grid-cols-12 gap-8 items-end mb-12 md:mb-16">
          <div className="md:col-span-7">
            <p className="eyebrow text-[var(--clay-light)] mb-4">— ENFOQUE DE DISEÑO</p>
            <h2 className="display text-5xl md:text-7xl leading-[0.95]">
              Cómo <em className="italic text-[var(--clay-light)]">pienso</em> el espacio:
              <br />
              cinco criterios para diseñar.
            </h2>
          </div>
          <div className="md:col-span-5 md:pb-2">
            <p className="text-[var(--cream)]/75 text-sm md:text-base leading-relaxed">
              No parto de fórmulas rígidas. Observo cómo la luz, la materialidad, el sonido, la escala y la posibilidad de adaptar un espacio influyen en la experiencia cotidiana de quienes lo habitan.
            </p>
          </div>
        </div>

        {/* Responsive layout container */}
        <div className="lg:grid lg:grid-cols-12 gap-8 lg:gap-12 items-stretch min-h-[500px]">
          {/* Left Panel (Desktop: 5 columns, Mobile/Tablet: full width accordion stack) */}
          <div className="lg:col-span-5 flex flex-col gap-4">
            {pillars.map((p) => {
              const isActive = p.id === activeTab;
              return (
                <div key={p.id} className="flex flex-col gap-3">
                  <button
                    id={`tab-${p.id}`}
                    role="tab"
                    aria-selected={isActive}
                    aria-expanded={isActive}
                    aria-controls={`panel-${p.id}`}
                    onClick={() => setActiveTab(p.id)}
                    className={`group text-left p-5 md:p-6 rounded-xl border transition-all duration-300 flex items-start justify-between w-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--clay-light)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--ink)] ${
                      isActive
                        ? "bg-white/5 border-[var(--clay-light)] text-white shadow-lg"
                        : "border-white/10 bg-black/10 text-[var(--cream)]/75 hover:text-white hover:border-white/20"
                    }`}
                  >
                    <div className="flex items-start gap-4 text-left">
                      <span
                        className={`font-mono text-sm ${
                          isActive ? "text-[var(--clay-light)] font-bold" : "text-[var(--cream)]/40"
                        }`}
                      >
                        {p.n}
                      </span>
                      <div>
                        <h3 className="display text-xl md:text-2xl leading-none mb-1 group-hover:translate-x-1 transition-transform duration-300">
                          {p.t}
                        </h3>
                        <span
                          className={`font-mono text-[9px] uppercase tracking-wider ${
                            isActive ? "text-[var(--clay-light)]" : "text-[var(--cream)]/45"
                          }`}
                        >
                          {p.subtitle}
                        </span>
                      </div>
                    </div>
                    <span
                      className={`text-xl transition-transform duration-300 ${
                        isActive
                          ? "text-[var(--clay-light)] translate-x-1"
                          : "text-[var(--cream)]/20 group-hover:translate-x-1"
                      }`}
                    >
                      →
                    </span>
                  </button>

                  {/* Mobile Accordion Panel (Inline details panel on mobile/tablet) */}
                  <div
                    id={`panel-${p.id}`}
                    role="tabpanel"
                    aria-labelledby={`tab-${p.id}`}
                    className="block lg:hidden overflow-hidden"
                  >
                    <AnimatePresence initial={false}>
                      {isActive && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3, ease: "easeInOut" }}
                          className="pt-2 pb-4"
                        >
                          <DetailsContent pillar={p} />
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Details Panel (Desktop: 7 columns, Mobile/Tablet: hidden as it renders inline) */}
          <div className="hidden lg:col-span-7 lg:flex">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                id={`panel-${activePillar.id}`}
                role="tabpanel"
                aria-labelledby={`tab-${activePillar.id}`}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.35, ease: "easeOut" }}
                className="w-full flex animate-in fade-in zoom-in-95 duration-200"
              >
                <DetailsContent pillar={activePillar} />
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}

function DetailsContent({ pillar }: { pillar: Pillar }) {
  return (
    <div className="w-full bg-[#1b1715] rounded-2xl p-6 md:p-10 border border-white/5 shadow-2xl flex flex-col justify-between">
      <div className="grid md:grid-cols-12 gap-8 items-start">
        {/* Text descriptions */}
        <div className="md:col-span-7 space-y-6">
          <div>
            <span className="eyebrow text-[var(--clay-light)] text-[10px] uppercase tracking-wider font-semibold">
              El criterio de diseño
            </span>
            <h4 className="display text-3xl md:text-4xl mt-2 mb-3 text-white">
              {pillar.t}
            </h4>
            <p className="text-[var(--cream)]/85 text-sm leading-relaxed">
              {pillar.d}
            </p>
          </div>

          <div className="border-t border-white/10 pt-4">
            <span className="eyebrow text-[var(--cream)]/60 text-[9px] uppercase tracking-wider font-semibold">
              Por qué importa
            </span>
            <p className="text-[var(--cream)]/75 text-xs mt-2 leading-relaxed italic">
              "{pillar.foundation}"
            </p>
          </div>
        </div>

        {/* Visual simulation representation (interactive graphic element) */}
        <div className="md:col-span-5 aspect-square md:aspect-auto md:h-full min-h-[180px] flex items-center justify-center">
          {pillar.visualEffect}
        </div>
      </div>

      <div className="grid md:grid-cols-12 gap-6 border-t border-white/10 pt-6 mt-8 items-end">
        <div className="md:col-span-7">
          <span className="eyebrow text-[var(--clay-light)] text-[9px] uppercase tracking-wider font-semibold">
            Cómo lo aplico
          </span>
          <p className="text-[var(--cream)]/90 text-xs mt-2 leading-relaxed">
            {pillar.application}
          </p>
        </div>
        <div className="md:col-span-5 bg-black/20 p-4 rounded-xl border border-white/5 text-left">
          <span className="eyebrow text-[var(--cream)]/60 text-[8px] uppercase tracking-wider font-semibold block mb-1">
            Decisión clave
          </span>
          <p className="text-[10px] text-[var(--cream)]/80 italic leading-relaxed">
            "{pillar.decision}"
          </p>
        </div>
      </div>
    </div>
  );
}
