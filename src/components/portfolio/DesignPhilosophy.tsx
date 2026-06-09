import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface Pillar {
  id: string;
  n: string;
  t: string;
  scientificTerm: string;
  d: string;
  foundation: string;
  application: string;
  citation: string;
  citationAuthor: string;
  visualEffect: React.ReactNode;
}

const pillars: Pillar[] = [
  {
    id: "circadian",
    n: "01",
    t: "Ritmos Circadianos",
    scientificTerm: "Sincronización Neuro-Luminosa",
    d: "Regulación del ciclo biológico sueño-vigilia mediante la gestión precisa de los niveles de luz natural y la temperatura del color artificial.",
    foundation:
      "La luz fría (azulada) de la mañana suprime la secreción de melatonina y eleva el cortisol para activarnos, mientras que la luz cálida indirecta al atardecer prepara al cerebro para el descanso profundo.",
    application:
      "Diseño aberturas estratégicas para optimizar la luz natural del día y especifico sistemas de iluminación artificial biodinámica que regulan automáticamente su espectro e intensidad según la hora solar.",
    citation:
      "La luz es el sincronizador ambiental más potente de nuestro marcapasos circadiano central, influyendo directamente en el estado de ánimo, la lucidez y la calidad del sueño.",
    citationAuthor: "Academy of Neuroscience for Architecture (ANFA)",
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
          <span className="font-mono text-[10px] text-[var(--clay)] uppercase tracking-[0.2em] mb-2">
            Simulación Espectral
          </span>
          <span className="text-[var(--cream)]/80 text-xs font-mono">
            Día (5000K) → Atardecer (2200K)
          </span>
        </div>
        <div className="absolute bottom-4 inset-x-4 flex justify-between text-[8px] font-mono text-[var(--cream)]/40 uppercase tracking-widest">
          <span>06:00 · Activación</span>
          <span>18:00 · Melatonina</span>
        </div>
      </div>
    ),
  },
  {
    id: "biophilia",
    n: "02",
    t: "Biofilia y Forma",
    scientificTerm: "Reducción de Fatiga Cognitiva",
    d: "Incorporación sistemática de patrones biológicos, geometría de curvas orgánicas y naturaleza viva para inducir estados de relajación mental.",
    foundation:
      "Visualizar fractales naturales o contornos suavizados reduce de forma inmediata la actividad en la amígdala (el radar de amenazas del cerebro), estimulando la producción de ondas cerebrales alfa asociadas a la calma.",
    application:
      "Elimino esquinas agudas en zonas de paso y diseño mobiliario a medida (como los biombos del Apto Cerezo) con lógicas de fluidez natural que imitan la distribución espacial del bosque.",
    citation:
      "La exposición a la geometría natural y vegetación activa la Red Neuronal por Defecto, permitiendo que la atención dirigida descanse y reduciendo el estrés autopercibido.",
    citationAuthor: "Teoría de la Restauración de la Atención (Kaplan & Kaplan)",
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
            Resonancia Orgánica
          </span>
          <span className="text-[var(--cream)]/80 text-xs font-mono">
            Curvatura Fractal & Ondas Alfa
          </span>
        </div>
        <div className="absolute bottom-4 inset-x-4 flex justify-between text-[8px] font-mono text-[var(--cream)]/40 uppercase tracking-widest">
          <span>Ondas Beta (Alerta)</span>
          <span>→ Ondas Alfa (Calma)</span>
        </div>
      </div>
    ),
  },
  {
    id: "acoustics",
    n: "03",
    t: "Zonificación Acústica",
    scientificTerm: "Preservación del Nervio Vago",
    d: "Estructuración física del espacio para aislar ruidos ambientales perjudiciales y crear refugios de privacidad auditiva.",
    foundation:
      "Los sonidos repentinos o el murmullo constante y repetitivo en interiores sobreestimulan el sistema nervioso simpático, aumentando el pulso cardíaco y fragmentando la concentración cognitiva.",
    application:
      "Zonifico las áreas sociales de las de descanso usando separadores físicos con maderas nobles absorbentes, cuarcitas de gran masa o materiales textiles que amortiguan la reverberación.",
    citation:
      "La contaminación auditiva interior eleva los niveles de adrenalina de forma crónica, incluso cuando la persona cree estar acostumbrada al ruido de fondo.",
    citationAuthor: "Organización Mundial de la Salud (OMS)",
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
            Entrada
          </div>
          <div className="absolute top-[-24px] right-0 text-[7px] font-mono text-emerald-400 uppercase tracking-widest">
            Absorción
          </div>
        </div>
        <div className="absolute bottom-4 inset-x-4 flex justify-between text-[8px] font-mono text-[var(--cream)]/40 uppercase tracking-widest">
          <span>Decibelios Altos (Estrés)</span>
          <span>Bajo Ruido (Foco)</span>
        </div>
      </div>
    ),
  },
  {
    id: "sensory",
    n: "04",
    t: "Estímulo Controlado",
    scientificTerm: "Atenuación Somatosensorial",
    d: "Selección selectiva de materiales y paletas cromáticas desaturadas para minimizar la fatiga visual y sensorial.",
    foundation:
      "Los contrastes lumínicos intensos y materiales artificiales lisos provocan apatía táctil y estrés del nervio óptico. Los materiales mate de origen mineral y vegetal absorben el exceso de luz y calman los sentidos.",
    application:
      "Apuesto por estucos de arcilla, maderas claras con vetas expuestas (como el cerezo) y linos con texturas imperfectas que invitan al tacto y dispersan la iluminación de forma homogénea.",
    citation:
      "La textura y reflectancia de los materiales influyen en nuestra percepción de confort térmico y seguridad psicológica mediante el sentido háptico del espacio.",
    citationAuthor: "Juhani Pallasmaa (Los Ojos de la Piel)",
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
            Paleta Terapéutica
          </span>
        </div>
        <div className="absolute bottom-4 inset-x-4 flex justify-between text-[8px] font-mono text-[var(--cream)]/40 uppercase tracking-widest">
          <span>Baja Satización</span>
          <span>Textura Orgánica</span>
        </div>
      </div>
    ),
  },
  {
    id: "agency",
    n: "05",
    t: "Agencia Espacial",
    scientificTerm: "Territorialidad y Autonomía",
    d: "Capacidad de modular y reconfigurar la arquitectura por parte del propio habitante, devolviendo la sensación de control sobre el microentorno.",
    foundation:
      "No poder influir sobre las condiciones térmicas, visuales o de privacidad de nuestro propio espacio habitado activa el cortisol al simular un estado de atrapamiento pasivo.",
    application:
      "Proyecto elementos móviles como paneles, biombos-biblioteca flotantes u hojas deslizantes que permiten al usuario unificar o independizar salas según su estado de ánimo.",
    citation:
      "La posibilidad de adaptar y personalizar el microentorno espacial amortigua el estrés laboral y residencial al restaurar el sentido de agencia biológica.",
    citationAuthor: "Environmental Design Research Association (EDRA)",
    visualEffect: (
      <div className="relative w-full h-full rounded-2xl overflow-hidden bg-gradient-to-br from-[#1b1c20] to-[#2c2d35] flex items-center justify-center p-8 border border-white/5 shadow-inner">
        {/* Slider interaction simulation */}
        <div className="w-40 h-10 border border-white/10 rounded-full flex items-center px-2 justify-between relative bg-black/25">
          <motion.div
            animate={{
              x: [0, 100, 0],
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
          <span className="text-[8px] font-mono text-[var(--cream)]/40 absolute left-14 tracking-widest uppercase">
            Privacidad
          </span>
          <span className="text-[8px] font-mono text-[var(--cream)]/40 absolute right-4 tracking-widest uppercase">
            Amplitud
          </span>
        </div>
        <div className="absolute bottom-4 inset-x-4 flex justify-between text-[8px] font-mono text-[var(--cream)]/40 uppercase tracking-widest">
          <span>Configuración Flexible</span>
          <span>Control del Habitante</span>
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
        <div className="max-w-3xl mb-16 md:mb-20">
          <p className="eyebrow text-[var(--clay)] mb-4">— Enfoque Científico</p>
          <h2 className="display text-5xl md:text-7xl leading-[0.95]">
            Cómo <em className="italic text-[var(--clay)]">pienso</em> el espacio:
            <br />
            Los pilares de la <em className="italic">neuroarquitectura</em>.
          </h2>
          <p className="text-[var(--cream)]/75 mt-6 text-sm md:text-base max-w-xl leading-relaxed">
            No diseño bajo caprichos visuales. Cada línea, material y entrada de luz responde a
            principios neurobiológicos enfocados en mejorar la respuesta emocional, cognitiva y
            fisiológica del habitante.
          </p>
        </div>

        {/* Main Grid layout */}
        <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-stretch min-h-[500px]">
          {/* Navigation Panel (Left Column: 5 Cols) */}
          <div className="lg:col-span-5 flex flex-col justify-between gap-4">
            <div className="flex flex-col gap-2">
              {pillars.map((p) => {
                const isActive = p.id === activeTab;
                return (
                  <button
                    key={p.id}
                    onClick={() => setActiveTab(p.id)}
                    className={`group text-left p-5 md:p-6 rounded-xl border transition-all duration-300 flex items-start justify-between ${
                      isActive
                        ? "bg-white/5 border-[var(--clay)] text-white shadow-lg"
                        : "border-white/5 bg-transparent text-[var(--cream)]/60 hover:text-white hover:border-white/10"
                    }`}
                  >
                    <div className="flex items-start gap-4">
                      <span
                        className={`font-mono text-sm ${isActive ? "text-[var(--clay)] font-bold" : "text-[var(--cream)]/40"}`}
                      >
                        {p.n}
                      </span>
                      <div>
                        <h3 className="display text-xl md:text-2xl leading-none mb-1 group-hover:translate-x-1 transition-transform duration-300">
                          {p.t}
                        </h3>
                        <span
                          className={`font-mono text-[9px] uppercase tracking-wider ${isActive ? "text-[var(--clay)]" : "text-[var(--cream)]/40"}`}
                        >
                          {p.scientificTerm}
                        </span>
                      </div>
                    </div>
                    <span
                      className={`text-xl transition-transform duration-300 ${isActive ? "text-[var(--clay)] translate-x-1" : "text-[var(--cream)]/20 group-hover:translate-x-1"}`}
                    >
                      →
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Details Panel (Right Column: 7 Cols) */}
          <div className="lg:col-span-7 flex">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.35, ease: "easeOut" }}
                className="w-full bg-[#1b1715] rounded-2xl p-6 md:p-10 border border-white/5 shadow-2xl flex flex-col justify-between"
              >
                <div className="grid md:grid-cols-12 gap-8 items-start">
                  {/* Text descriptions */}
                  <div className="md:col-span-7 space-y-6">
                    <div>
                      <span className="eyebrow text-[var(--clay)] text-[10px]">
                        El Principio Biológico
                      </span>
                      <h4 className="display text-3xl md:text-4xl mt-2 mb-3 text-white">
                        {activePillar.t}
                      </h4>
                      <p className="text-[var(--cream)]/85 text-sm leading-relaxed">
                        {activePillar.d}
                      </p>
                    </div>

                    <div className="border-t border-white/10 pt-4">
                      <span className="eyebrow text-[var(--cream)]/50 text-[9px]">
                        Sustento Neurocientífico
                      </span>
                      <p className="text-[var(--cream)]/70 text-xs mt-2 leading-relaxed italic">
                        "{activePillar.foundation}"
                      </p>
                    </div>
                  </div>

                  {/* Visual simulation representation (interactive graphic element) */}
                  <div className="md:col-span-5 aspect-square md:aspect-auto md:h-full min-h-[180px]">
                    {activePillar.visualEffect}
                  </div>
                </div>

                <div className="grid md:grid-cols-12 gap-6 border-t border-white/10 pt-6 mt-8 items-end">
                  <div className="md:col-span-7">
                    <span className="eyebrow text-[var(--clay)] text-[9px]">
                      Aplicación en mis Proyectos
                    </span>
                    <p className="text-[var(--cream)]/90 text-xs mt-2 leading-relaxed">
                      {activePillar.application}
                    </p>
                  </div>
                  <div className="md:col-span-5 bg-black/20 p-4 rounded-xl border border-white/5 text-right">
                    <p className="text-[10px] text-[var(--cream)]/80 italic leading-relaxed text-left">
                      "{activePillar.citation}"
                    </p>
                    <p className="text-[8px] font-mono text-[var(--clay)] uppercase tracking-wider mt-2">
                      — {activePillar.citationAuthor}
                    </p>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
