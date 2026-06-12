import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import aptoCerezo from "@/assets/apto-cerezo.png";
import detailImg from "@/assets/project-detail-1.jpg";
import kitchenImg from "@/assets/project-kitchen.jpg";
import bedroomImg from "@/assets/project-bedroom.jpg";
import sanAndresRender from "@/assets/diseño.png";
import sanAndresInfo1Part1 from "@/assets/san-andres-info-1-part1.png";
import sanAndresInfo1Part2 from "@/assets/san-andres-info-1-part2.png";
import sanAndresInfo1Part3 from "@/assets/san-andres-info-1-part3.png";
import sanAndresInfo2Part1 from "@/assets/san-andres-info-2-part1.png";
import sanAndresInfo2Part2 from "@/assets/san-andres-info-2-part2.png";
import sanAndresInfo2Part3 from "@/assets/san-andres-info-2-part3.png";
import casinoRender from "@/assets/casino-render.jpg";
import casinoProcess from "@/assets/casino-process.jpg";
import casinoInteriorFinished from "@/assets/casino-interior-finished.png";
import casinoFacadeFinished from "@/assets/casino-facade-finished.png";
import cherryBlossom from "@/assets/cherry-blossom.png";
import beachVideo from "@/assets/troque_a_primeira_cena_das_cab.mp4";

function AutoplayVideo({ src, className }: { src: string; className?: string }) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().catch((err) => {
        console.log("Autoplay failed/blocked:", err);
      });
    }
  }, [src]);

  return (
    <video
      ref={videoRef}
      src={src}
      autoPlay
      loop
      muted
      playsInline
      controls={false}
      className={className}
    />
  );
}

interface ComparisonSliderProps {
  beforeImg: string;
  afterImg: string;
  beforeLabel?: string;
  afterLabel?: string;
}

function ComparisonSlider({
  beforeImg,
  afterImg,
  beforeLabel = "Antes",
  afterLabel = "Después",
}: ComparisonSliderProps) {
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMove = (clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const position = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setSliderPosition(position);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging) return;
    if (e.touches.length > 0) {
      handleMove(e.touches[0].clientX);
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    handleMove(e.clientX);
  };

  useEffect(() => {
    const handleMouseUp = () => setIsDragging(false);
    if (isDragging) {
      window.addEventListener("mouseup", handleMouseUp);
      window.addEventListener("touchend", handleMouseUp);
    }
    return () => {
      window.removeEventListener("mouseup", handleMouseUp);
      window.removeEventListener("touchend", handleMouseUp);
    };
  }, [isDragging]);

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onTouchMove={handleTouchMove}
      onMouseDown={() => setIsDragging(true)}
      onTouchStart={() => setIsDragging(true)}
      className="relative w-full aspect-[4/3] md:aspect-[16/10] bg-muted overflow-hidden select-none cursor-ew-resize rounded-lg border border-[var(--cream)]/10 shadow-lg"
    >
      {/* AFTER Image (Base) */}
      <img
        src={afterImg}
        alt={afterLabel}
        className="absolute inset-0 w-full h-full object-cover pointer-events-none"
        loading="lazy"
      />
      <div className="absolute bottom-3 right-3 z-10 bg-black/60 backdrop-blur-md text-[var(--cream)] px-3 py-1 text-[9px] font-mono tracking-widest rounded pointer-events-none uppercase shadow-md">
        {afterLabel}
      </div>

      {/* BEFORE Image (Clipped overlay) */}
      <div
        className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none"
        style={{
          clipPath: `polygon(0 0, ${sliderPosition}% 0, ${sliderPosition}% 100%, 0 100%)`,
        }}
      >
        <img
          src={beforeImg}
          alt={beforeLabel}
          className="absolute inset-0 w-full h-full object-cover pointer-events-none"
          loading="lazy"
        />
        <div className="absolute bottom-3 left-3 z-10 bg-black/60 backdrop-blur-md text-[var(--cream)] px-3 py-1 text-[9px] font-mono tracking-widest rounded pointer-events-none uppercase shadow-md">
          {beforeLabel}
        </div>
      </div>

      {/* Divider Line */}
      <div
        className="absolute top-0 bottom-0 w-[2px] bg-white z-20 pointer-events-none shadow-[0_0_10px_rgba(0,0,0,0.5)]"
        style={{ left: `${sliderPosition}%` }}
      >
        {/* Handle Button */}
        <div
          className={`absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-white border border-[var(--clay)] text-[var(--clay)] flex items-center justify-center shadow-xl backdrop-blur-md transition-transform duration-200 ${
            isDragging ? "scale-90 bg-[var(--cream)]" : "hover:scale-105"
          }`}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="12"
            height="12"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="m9 18-6-6 6-6" />
            <path d="m15 6 6 6-6 6" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function ParallaxImg({
  src,
  alt,
  speed = 12,
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
        style={{ y, scale: 1.25 }}
        className="w-full h-full object-cover"
      />
    </div>
  );
}

interface HotspotData {
  project: string;
  title: string;
  decision: string;
  rationale: string;
  pillar: string;
}

function Hotspot({ x, y, onClick }: { x: string; y: string; onClick: () => void }) {
  return (
    <button
      onClick={(e) => {
        e.stopPropagation();
        onClick();
      }}
      style={{ left: x, top: y }}
      className="absolute z-20 -translate-x-1/2 -translate-y-1/2 cursor-pointer p-2 flex items-center justify-center group/btn"
      aria-label="Ver decisión de diseño"
    >
      <span className="relative flex h-6 w-6">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[var(--clay)] opacity-75"></span>
        <span className="relative inline-flex rounded-full h-6 w-6 bg-[var(--clay)] border-2 border-[var(--cream)] items-center justify-center text-[var(--cream)] text-[10px] font-bold shadow-lg transition-transform duration-300 group-hover/btn:scale-115">
          +
        </span>
      </span>
      <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2.5 py-1 bg-black/85 text-[var(--cream)] text-[8px] font-mono tracking-widest rounded uppercase whitespace-nowrap opacity-0 pointer-events-none transition-opacity duration-300 group-hover/btn:opacity-100 shadow-md">
        Decisión de Diseño
      </span>
    </button>
  );
}

export function FeaturedProject({ onInquire }: { onInquire: (msg: string) => void }) {
  const [lightboxImages, setLightboxImages] = useState<string[] | null>(null);
  const [zoomPercent, setZoomPercent] = useState<number>(100);
  const [activeHotspot, setActiveHotspot] = useState<HotspotData | null>(null);

  const lightboxContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!lightboxImages) {
      setZoomPercent(100);
    }
  }, [lightboxImages]);

  useEffect(() => {
    const handleWheelNative = (e: WheelEvent) => {
      if (e.ctrlKey) {
        e.preventDefault();
        const delta = -e.deltaY;
        setZoomPercent((prev) => {
          const next = prev + (delta > 0 ? 15 : -15);
          return Math.min(500, Math.max(100, next));
        });
      }
    };

    const container = lightboxContainerRef.current;
    if (container) {
      container.addEventListener("wheel", handleWheelNative, { passive: false });
    }
    return () => {
      if (container) {
        container.removeEventListener("wheel", handleWheelNative);
      }
    };
  }, [lightboxImages]);

  const ref1 = useRef<HTMLDivElement>(null);
  const { scrollYProgress: scroll1 } = useScroll({
    target: ref1,
    offset: ["start end", "end start"],
  });
  const yLeft1 = useTransform(scroll1, [0, 1], ["0%", "-12%"]);

  const ref2 = useRef<HTMLDivElement>(null);
  const { scrollYProgress: scroll2 } = useScroll({
    target: ref2,
    offset: ["start end", "end start"],
  });
  const yLeft2 = useTransform(scroll2, [0, 1], ["0%", "-8%"]);

  const ref3 = useRef<HTMLDivElement>(null);
  const { scrollYProgress: scroll3 } = useScroll({
    target: ref3,
    offset: ["start end", "end start"],
  });
  const yLeft3 = useTransform(scroll3, [0, 1], ["0%", "-8%"]);

  return (
    <div id="proyectos" className="bg-[var(--ink)] text-[var(--cream)]">
      {/* Proyecto 01: Apto Cerezo */}
      <section
        ref={ref1}
        className="py-12 md:py-16 px-6 md:px-10 border-b border-[var(--cream)]/10"
      >
        <div className="max-w-[1400px] mx-auto space-y-10">
          {/* Header */}
          <div className="flex items-end justify-between gap-6 border-b border-[var(--cream)]/10 pb-10">
            <div>
              <p className="eyebrow text-[var(--clay-light)] mb-3">Proyecto destacado · 01</p>
              <h3 className="display text-4xl md:text-6xl text-white leading-tight">
                Apto <em className="italic text-[var(--clay-light)]">Cerezo</em>
              </h3>
            </div>
            <div className="hidden md:block text-right text-sm text-[var(--cream)]/85 space-y-1">
              <p>Diseño interior integral · Mobiliario personalizado</p>
              <p>Bogotá · 2025</p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-8 md:gap-6 items-start">
            {/* Left: main image (collage) with hotspots */}
            <div className="relative overflow-hidden bg-[var(--cherry)] rounded-lg border border-[var(--cream)]/10 shadow-lg group">
              <img
                src={aptoCerezo}
                alt="Apto Cerezo Plano y Collage"
                className="w-full h-auto"
                loading="lazy"
              />

              <Hotspot
                x="25%"
                y="75%"
                onClick={() =>
                  setActiveHotspot({
                    project: "Apto Cerezo",
                    title: "Biombo Divisor Flotante",
                    decision: "Estructuración espacial porosa mediante biombo de madera",
                    rationale:
                      "En apartamentos pequeños, las paredes sólidas tradicionales restringen la luz e inducen una fatiga espacial claustrofóbica. Este divisor central actúa como diafragma espacial: permite ver a través de él para ampliar la percepción de profundidad (lo cual relaja el nervio óptico) mientras delimita zonas sin bloquear la ventilación ni la luz natural circadiana.",
                    pillar: "Agencia Espacial y Fluidez Visual",
                  })
                }
              />

              <Hotspot
                x="62%"
                y="38%"
                onClick={() =>
                  setActiveHotspot({
                    project: "Apto Cerezo",
                    title: "Textura de Cerezo y Tonos Mate",
                    decision:
                      "Uso estratégico de melamina de madera clara y acabados de baja saturación",
                    rationale:
                      "Los contrastes visuales altos e intensos disparan micro-alertas en el cerebro de forma constante. La melamina de cerezo mate absorbe y dispersa la iluminación en lugar de reflejarla bruscamente. Esto activa el tacto visual de la corteza somatosensorial de forma equilibrada, promoviendo una sensación de serenidad física inmediata y disminuyendo los niveles basales de cortisol.",
                    pillar: "Estimulación Sensorial Controlada",
                  })
                }
              />
            </div>

            {/* Right: sub-images grid (Detail, Kitchen, Bedroom) next to it */}
            <div className="grid grid-cols-2 grid-rows-2 gap-2 min-h-[320px] md:min-h-[450px]">
              <ParallaxImg
                src={detailImg}
                alt="Detalle carpintería"
                speed={10}
                className="col-span-2 row-span-1 h-full rounded"
              />
              <ParallaxImg
                src={kitchenImg}
                alt="Cocina"
                speed={12}
                className="col-span-1 row-span-1 h-full rounded"
              />
              <ParallaxImg
                src={bedroomImg}
                alt="Zona de descanso"
                speed={8}
                className="col-span-1 row-span-1 h-full rounded"
              />
            </div>
          </div>

          {/* Fila del Medio: Textos descriptivos y CTA */}
          <div className="grid md:grid-cols-12 gap-8 md:gap-12 items-start mt-8">
            {/* Columna Izquierda: Textos descriptivos (ocupa 7 columnas en md) */}
            <div className="md:col-span-7 flex flex-col gap-6">
              <div className="space-y-4">
                <p className="text-[var(--cream)]/85 leading-relaxed">
                  "Apto Cerezo" es un ejercicio de{" "}
                  <strong>neuroarquitectura aplicada a espacios compactos</strong>. Nace del desafío
                  de optimizar un apartamento reducido, estructurando el espacio para disminuir la
                  fatiga visual y favorecer la calma mental a través de un biombo central
                  multifuncional que divide sin obstruir.
                </p>
                <p className="text-[var(--cream)]/70 leading-relaxed text-sm">
                  La elección de melamina de cerezo claro y texturas naturales fue estratégica:
                  tonos y materialidades de baja saturación que reducen el cortisol en sangre,
                  promoviendo el bienestar sensorial y respetando el ingreso de luz natural para
                  regular los ritmos circadianos.
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
                    <p className="text-[10px] text-[var(--cream)]/65 uppercase tracking-widest mb-1">
                      {item.label}
                    </p>
                    <p className="display text-2xl text-[var(--cream)]">{item.value}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Columna Derecha: CTA */}
            <div className="md:col-span-5 flex flex-col justify-between h-full pt-4">
              <p className="text-xs text-[var(--cream)]/60 leading-relaxed mb-6">
                El biombo central divisor actúa como regulador espacial y visual, permitiendo la
                reconfiguración del espacio según la hora del día y la necesidad de privacidad o
                integración de la usuaria.
              </p>
              <button
                onClick={() =>
                  onInquire(
                    "Hola Natalia, estuve revisando tu portafolio y en especial el proyecto del Apto Cerezo. Me pareció excelente tu enfoque en neuroarquitectura para espacios reducidos. Me gustaría que nos pusiéramos en contacto para conversar sobre una oportunidad de colaboración.",
                  )
                }
                className="self-start text-xs tracking-[0.2em] uppercase border-b border-[var(--clay-light)] pb-1 text-[var(--clay-light)] hover:opacity-70 transition-opacity text-left font-semibold mt-2"
              >
                ¿Tienes un proyecto similar? →
              </button>
            </div>
          </div>

          {/* Metadata footer */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 border-t border-[var(--cream)]/15 pt-10">
            {[
              { k: "Materiales", v: "Melamina cerezo, linos y texturas de baja saturación" },
              { k: "Enfoque Neuro", v: "Regulación circadiana, fluidez visual y biophilic design" },
              { k: "Pieza clave", v: "Biombo-biblioteca divisor flotante" },
              { k: "Áreas", v: "Cocina · Sala · Zona social · Baño" },
            ].map((d) => (
              <div key={d.k}>
                <p className="eyebrow text-[var(--clay-light)] mb-2">{d.k}</p>
                <p className="text-[var(--cream)]/90 text-sm">{d.v}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Proyecto 02: Centro Orange Hill */}
      <section ref={ref2} className="py-12 md:py-16 border-b border-[var(--cream)]/10 px-0">
        {/* Header (Contenedor limitado) */}
        <div className="max-w-[1400px] mx-auto px-6 md:px-10 mb-10">
          <div className="flex items-end justify-between gap-6 border-b border-[var(--cream)]/10 pb-10">
            <div>
              <p className="eyebrow text-[var(--clay-light)] mb-3">Proyecto destacado · 02</p>
              <h3 className="display text-4xl md:text-6xl text-white leading-tight">
                Centro <em className="italic text-[var(--clay-light)]">Orange Hill</em>
              </h3>
            </div>
            <div className="hidden md:block text-right text-sm text-[var(--cream)]/85 space-y-1">
              <p>Equipamiento Paliativo · Neuroarquitectura</p>
              <p>San Andrés Isla · 2025</p>
            </div>
          </div>
        </div>

        {/* Fila Superior: Render que ocupa toda la pantalla (Ancho completo real) con hotspots */}
        <div className="w-full relative group aspect-[21/9] md:h-[65vh] md:aspect-auto overflow-hidden shadow-2xl">
          <img
            src={sanAndresRender}
            alt="Centro Orange Hill Render"
            className="w-full h-full object-cover"
            loading="lazy"
          />

          <Hotspot
            x="45%"
            y="72%"
            onClick={() =>
              setActiveHotspot({
                project: "Centro Orange Hill",
                title: "Cabañas Flotantes sobre Pilotes",
                decision: "Elevación volumétrica de madera estructural sobre pilotes",
                rationale:
                  "Separar la cabaña del suelo natural no solo responde a criterios hidráulicos de la isla, sino que psicológicamente produce levedad y desconexión del ruido terrestre. Elevar las unidades genera una perspectiva aérea que aminora la sensación de vulnerabilidad, estimulando la sensación de resguardo y control del habitante.",
                pillar: "Territorialidad and Amplitud Aérea",
              })
            }
          />

          <Hotspot
            x="70%"
            y="40%"
            onClick={() =>
              setActiveHotspot({
                project: "Centro Orange Hill",
                title: "Patios Internos de Biofilia",
                decision:
                  "Jardines interiores integrados con vegetación local y ventilación cruzada",
                rationale:
                  "El contacto visual directo y el aroma de la vegetación nativa estimulan el nervio vago y reducen de manera drástica las ondas beta (asociadas a la ansiedad) a favor de las ondas alfa (relaxación). En cuidados paliativos, esto funciona como un analgésico ambiental, reduciendo la percepción del dolor físico e induciendo la meditación espontánea.",
                pillar: "Biofilia y Recuperación Sensorial",
              })
            }
          />
        </div>

        {/* Resto del contenido (Contenedor limitado) */}
        <div className="max-w-[1400px] mx-auto px-6 md:px-10 mt-12 space-y-10">
          {/* Fila del Medio: Texto a la izquierda (agrandado), Video a la derecha */}
          <div className="grid md:grid-cols-12 gap-8 md:gap-12 items-start mt-8">
            {/* Columna Izquierda: Textos descriptivos agrandados + Stats */}
            <div className="md:col-span-7 flex flex-col gap-6">
              <div className="space-y-4">
                <p className="text-[var(--cream)]/90 text-base md:text-lg leading-relaxed">
                  "Centro Orange Hill" es un santuario de{" "}
                  <strong>cuidados paliativos y sanación sensorial</strong> en San Andrés Isla. Nace
                  de la necesidad de diseñar espacios que satisfagan las necesidades espirituales y
                  emocionales de pacientes críticos, aliviando el sufrimiento mediante estímulos
                  cognitivos y el entorno natural.
                </p>
                <p className="text-[var(--cream)]/75 text-sm md:text-base leading-relaxed">
                  La propuesta integra cabañas modulares de madera elevadas sobre pilotes que
                  reinterpretan la arquitectura isleña tradicional. Los volúmenes están
                  estratégicamente rotados hacia el mar e incorporan patios internos con abundante
                  vegetación (biofilia), lo cual reduce el cortisol en sangre y facilita la calma y
                  la meditación profunda.
                </p>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-4 border-t border-[var(--cream)]/15 pt-5">
                {[
                  { label: "Área", value: "5.233 m²" },
                  { label: "Distribución", value: "4 zonas" },
                  { label: "Cabañas", value: "Modulares" },
                ].map((item) => (
                  <div key={item.label}>
                    <p className="text-[10px] text-[var(--cream)]/65 uppercase tracking-widest mb-1">
                      {item.label}
                    </p>
                    <p className="display text-xl text-[var(--cream)] font-bold">{item.value}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Columna Derecha: Video y CTA */}
            <div className="md:col-span-5 flex flex-col gap-6">
              <div className="space-y-2">
                <p className="text-[10px] text-[var(--clay-light)] uppercase tracking-widest font-mono font-bold">
                  Atmósfera Sensorial: Brisa y atardecer
                </p>
                <div className="relative overflow-hidden rounded-lg border border-[var(--cream)]/15 aspect-video shadow-lg group">
                  <AutoplayVideo
                    src={beachVideo}
                    className="w-full h-full object-cover origin-top-left scale-[1.15] transition-transform duration-700 group-hover:scale-[1.20]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[rgba(20,10,5,0.4)] to-transparent flex items-end p-3">
                    <p className="text-[10px] font-mono text-[var(--cream)]/90 tracking-wide">
                      San Andrés Isla · Entorno Natural
                    </p>
                  </div>
                </div>
              </div>

              <button
                onClick={() =>
                  onInquire(
                    "Hola Natalia, estuve revisando tu portafolio y en especial el proyecto de San Andrés (Centro Orange Hill). Me pareció increíble cómo integras la neuroarquitectura y la biofilia para el cuidado de la salud. Me gustaría que nos pusiéramos en contacto para conversar sobre una oportunidad de colaboración.",
                  )
                }
                className="self-start text-xs tracking-[0.2em] uppercase border-b border-[var(--clay-light)] pb-1 text-[var(--clay-light)] hover:opacity-70 transition-opacity text-left font-semibold mt-2"
              >
                ¿Colaboramos en este proyecto? →
              </button>
            </div>
          </div>

          {/* Fila Inferior: Láminas Explicativas en Tarjeta Lado a Lado */}
          <div className="border-t border-[var(--cream)]/15 pt-12 space-y-6">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
              <div className="space-y-4">
                <p className="eyebrow text-[var(--clay-light)] mb-2">
                  — Análisis y Esquema Técnico
                </p>
                <h3 className="display text-3xl md:text-4xl">
                  Programa y Experiencia en el Espacio
                </h3>
              </div>
              <p className="text-xs text-[var(--cream)]/60 max-w-sm leading-relaxed font-mono">
                Haz clic sobre cualquiera de las láminas para ampliarla en alta definición y leer
                detenidamente el análisis clínico-espacial.
              </p>
            </div>

            <div className="bg-[#EAEAEA] text-[#111111] rounded-3xl p-6 md:p-10 shadow-2xl max-w-7xl mx-auto my-8 border border-white/5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center">
                {/* Lámina 1 */}
                <div
                  onClick={() =>
                    setLightboxImages([
                      sanAndresInfo1Part1,
                      sanAndresInfo1Part2,
                      sanAndresInfo1Part3,
                    ])
                  }
                  className="group relative flex flex-col items-center justify-center cursor-zoom-in transition-all duration-300 hover:scale-[1.01]"
                >
                  <div className="w-full flex flex-col gap-0 rounded-lg shadow-md overflow-hidden max-h-[70vh] md:max-h-[78vh] relative bg-white">
                    <img
                      src={sanAndresInfo1Part1}
                      alt="Lámina de Análisis Clínico-Espacial - Parte 1"
                      className="w-full h-auto block"
                    />
                    <img
                      src={sanAndresInfo1Part2}
                      alt="Lámina de Análisis Clínico-Espacial - Parte 2"
                      className="w-full h-auto block"
                    />
                    <img
                      src={sanAndresInfo1Part3}
                      alt="Lámina de Análisis Clínico-Espacial - Parte 3"
                      className="w-full h-auto block"
                    />
                    {/* Fade overlay */}
                    <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-[#EAEAEA] to-transparent pointer-events-none" />
                  </div>
                  {/* Botón flotante 'Clic para ampliar' */}
                  <div className="absolute bottom-6 bg-black/75 hover:bg-black/95 text-white text-xs px-4 py-2.5 rounded-full flex items-center gap-2 shadow-lg backdrop-blur-sm transition-all duration-300 group-hover:scale-105 font-mono tracking-wider z-10">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="w-3.5 h-3.5"
                    >
                      <circle cx="11" cy="11" r="8"></circle>
                      <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                    </svg>
                    <span>Clic para ampliar</span>
                  </div>
                </div>

                {/* Lámina 2 */}
                <div
                  onClick={() =>
                    setLightboxImages([
                      sanAndresInfo2Part1,
                      sanAndresInfo2Part2,
                      sanAndresInfo2Part3,
                    ])
                  }
                  className="group relative flex flex-col items-center justify-center cursor-zoom-in transition-all duration-300 hover:scale-[1.01]"
                >
                  <div className="w-full flex flex-col gap-0 rounded-lg shadow-md overflow-hidden max-h-[70vh] md:max-h-[78vh] relative bg-white">
                    <img
                      src={sanAndresInfo2Part1}
                      alt="Lámina de Análisis Clínico-Espacial - Parte 2"
                      className="w-full h-auto block"
                    />
                    <img
                      src={sanAndresInfo2Part2}
                      alt="Lámina de Análisis Clínico-Espacial - Parte 2"
                      className="w-full h-auto block"
                    />
                    <img
                      src={sanAndresInfo2Part3}
                      alt="Lámina de Análisis Clínico-Espacial - Parte 2"
                      className="w-full h-auto block"
                    />
                    {/* Fade overlay */}
                    <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-[#EAEAEA] to-transparent pointer-events-none" />
                  </div>
                  {/* Botón flotante 'Clic para ampliar' */}
                  <div className="absolute bottom-6 bg-black/75 hover:bg-black/95 text-white text-xs px-4 py-2.5 rounded-full flex items-center gap-2 shadow-lg backdrop-blur-sm transition-all duration-300 group-hover:scale-105 font-mono tracking-wider z-10">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="w-3.5 h-3.5"
                    >
                      <circle cx="11" cy="11" r="8"></circle>
                      <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                    </svg>
                    <span>Clic para ampliar</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Metadata footer */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 border-t border-[var(--cream)]/15 pt-10">
            {[
              {
                k: "Materiales",
                v: "Madera estructural local, celosías tradicionales y ventilación cruzada",
              },
              {
                k: "Enfoque Neuro",
                v: "Biofilia activa, reducción de cortisol y psicología del color",
              },
              { k: "Pieza clave", v: "Módulos habitacionales elevados y patios de meditación" },
              {
                k: "Áreas",
                v: "Terapia espiritual · Módulos habitacionales · Senderos y paisajismo",
              },
            ].map((d) => (
              <div key={d.k}>
                <p className="eyebrow text-[var(--clay-light)] mb-2">{d.k}</p>
                <p className="text-[var(--cream)]/90 text-sm">{d.v}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Proyecto 03: Casino The Lounge */}
      <section ref={ref3} className="py-12 md:py-16 px-6 md:px-10">
        <div className="max-w-[1400px] mx-auto space-y-10">
          {/* Header */}
          <div className="flex items-end justify-between gap-6 border-b border-[var(--cream)]/10 pb-10">
            <div>
              <p className="eyebrow text-[var(--clay-light)] mb-3">Proyecto destacado · 03</p>
              <h3 className="display text-4xl md:text-6xl text-white leading-tight">
                Casino <em className="italic text-[var(--clay-light)]">The Lounge</em>
              </h3>
            </div>
            <div className="hidden md:block text-right text-sm text-[var(--cream)]/85 space-y-1">
              <p>Fachada comercial e interiorismo integral</p>
              <p>Bogotá · 2026</p>
            </div>
          </div>

          {/* Fila Superior: Comparaciones de Antes y Después en Grid de 2 Columnas */}
          <div className="grid md:grid-cols-2 gap-8 md:gap-12">
            <div className="space-y-4">
              <p className="text-[10px] text-[var(--clay-light)] uppercase tracking-widest font-mono font-bold">
                — Fachada: Propuesta de Diseño (Render)
              </p>
              <div className="relative w-full aspect-[4/3] md:aspect-[16/10] overflow-hidden rounded-lg border border-[var(--cream)]/10 shadow-lg bg-muted group">
                <img
                  src={casinoRender}
                  alt="Propuesta de Fachada (Render)"
                  className="w-full h-full object-cover"
                  loading="lazy"
                />

                <Hotspot
                  x="38%"
                  y="45%"
                  onClick={() =>
                    setActiveHotspot({
                      project: "Casino The Lounge",
                      title: "Fachada Paramétrica en Ondas",
                      decision: "Celosía de paneles de aluminio compuesto ondulado",
                      rationale:
                        "Evolutivamente, el cerebro asocia las formas de líneas duras y esquinas afiladas con amenazas (objetos punzantes o dientes). Las fachadas orgánicas curvas estimulan el giro de la mirada sin sobresaltos. En un contexto comercial de ocio nocturno, esto disminuye las barreras defensivas subconscientes y genera una transición fluida hacia el interior.",
                      pillar: "Geometría de Curvas Orgánicas",
                    })
                  }
                />

                <Hotspot
                  x="68%"
                  y="62%"
                  onClick={() =>
                    setActiveHotspot({
                      project: "Casino The Lounge",
                      title: "Iluminación LED Indirecta",
                      decision: "Luminarias LED integradas y retroiluminación en fachada comercial",
                      rationale:
                        "La iluminación directa dura genera cansancio mental e incomodidad social. Diseñé un esquema de luz indirecta de baja intensidad en tonos ámbar. La luz ámbar y cálida (2700K o menos) estimula las glándulas que inducen a la calma, promoviendo una experiencia social elegante, segura y de mayor permanencia voluntaria.",
                      pillar: "Ritmos de Luz y Psicología Ambiental",
                    })
                  }
                />
              </div>
            </div>
            <div className="space-y-4">
              <p className="text-[10px] text-[var(--clay-light)] uppercase tracking-widest font-mono font-bold">
                — Interior: Proceso vs Acabado Final
              </p>
              <ComparisonSlider
                beforeImg={casinoProcess}
                afterImg={casinoInteriorFinished}
                beforeLabel="En Proceso"
                afterLabel="Mesa de Poker"
              />
            </div>
          </div>

          {/* Fila del Medio: Textos y CTA */}
          <div className="grid md:grid-cols-12 gap-8 md:gap-12 items-start mt-8">
            {/* Columna Izquierda: Textos descriptivos (ocupa 7 columnas) */}
            <div className="md:col-span-7 flex flex-col gap-6">
              <div className="space-y-4">
                <p className="text-[var(--cream)]/85 leading-relaxed">
                  "Casino The Lounge" es un proyecto de{" "}
                  <strong>rediseño integral y comercial</strong>. El encargo consistió en
                  transformar la fachada exterior y todo el interior de una edificación que
                  funcionaba previamente como restaurante, convirtiéndola en un club de juego
                  premium en Bogotá.
                </p>
                <p className="text-[var(--cream)]/70 leading-relaxed text-sm">
                  La fachada se concibió con líneas orgánicas y celosías retroiluminadas con
                  iluminación LED indirecta, logrando un impacto escénico nocturno único. El
                  interiorismo maximiza la fluidez espacial, zonificando acústicamente las salas de
                  juego y aplicando psicología ambiental a través de muros de cuarcita
                  retroiluminada en tonos dorados/ámbar para promover la calma y el confort térmico
                  y mental.
                </p>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-4 border-t border-[var(--cream)]/15 pt-5">
                {[
                  { label: "Área", value: "420 m²" },
                  { label: "Ubicación", value: "Bogotá" },
                  { label: "Tipo", value: "Fachada & Interior" },
                ].map((item) => (
                  <div key={item.label}>
                    <p className="text-[10px] text-[var(--cream)]/65 uppercase tracking-widest mb-1">
                      {item.label}
                    </p>
                    <p className="display text-xl text-[var(--cream)] font-bold">{item.value}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Columna Derecha: CTA */}
            <div className="md:col-span-5 flex flex-col justify-between h-full pt-4">
              <p className="text-xs text-[var(--cream)]/60 leading-relaxed mb-6">
                El paso de restaurante a casino implicó una reingeniería acústica y una
                planificación lumínica circadiana social, reduciendo la estimulación invasiva para
                favorecer una experiencia inmersiva elegante y controlada.
              </p>
              <button
                onClick={() =>
                  onInquire(
                    "Hola Natalia, estuve revisando tu portafolio y en especial el proyecto del Casino The Lounge en Bogotá. Me pareció excelente el diseño de la fachada frontal y el interiorismo. Me gustaría que nos pusiéramos en contacto para conversar sobre una oportunidad de colaboración.",
                  )
                }
                className="self-start text-xs tracking-[0.2em] uppercase border-b border-[var(--clay-light)] pb-1 text-[var(--clay-light)] hover:opacity-70 transition-opacity text-left font-semibold"
              >
                ¿Quieres rediseñar tu espacio comercial? →
              </button>
            </div>
          </div>

          {/* Metadata footer */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 border-t border-[var(--cream)]/15 pt-10">
            {[
              {
                k: "Materiales",
                v: "Paneles de aluminio compuesto, cuarcita retroiluminada, maderas nobles y cuero",
              },
              {
                k: "Enfoque Neuro",
                v: "Psicología del color ámbar, zonificación acústica activa y ritmos sociales",
              },
              { k: "Pieza clave", v: "Fachada de ondas paramétricas y paneles de luz de cuarcita" },
              { k: "Áreas", v: "Fachada principal · Salón de Poker · Barra de tragos · Zona VIP" },
            ].map((d) => (
              <div key={d.k}>
                <p className="eyebrow text-[var(--clay-light)] mb-2">{d.k}</p>
                <p className="text-[var(--cream)]/90 text-sm">{d.v}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Lightbox / Visor de Imagen a Pantalla Completa */}
      <AnimatePresence>
        {lightboxImages && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-sm flex items-center justify-center p-4 md:p-8 overflow-y-auto cursor-zoom-out"
            onClick={() => setLightboxImages(null)}
          >
            {/* Botón de cierre */}
            <button
              className="fixed top-6 right-6 text-white bg-black/50 hover:bg-black/80 transition-colors w-12 h-12 rounded-full flex items-center justify-center text-3xl font-mono shadow-2xl z-[120]"
              onClick={(e) => {
                e.stopPropagation();
                setLightboxImages(null);
              }}
            >
              ×
            </button>

            {/* Imagen ampliada scrollable */}
            <motion.div
              initial={{ scale: 0.95, y: 10 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 10 }}
              transition={{ type: "spring", damping: 25, stiffness: 220 }}
              className="relative max-w-[95vw] md:max-w-6xl w-full bg-[#FDFBF7] rounded-xl p-4 md:p-6 shadow-2xl my-auto cursor-default transition-all duration-300"
              onClick={(e) => e.stopPropagation()}
            >
              <div
                ref={lightboxContainerRef}
                className="max-h-[76vh] overflow-auto scrollbar-thin pr-1 flex justify-center items-start bg-black/5 rounded-lg p-2"
              >
                <div
                  className="flex flex-col gap-0 select-none items-center bg-white"
                  style={{
                    width: `${zoomPercent}%`,
                    minWidth: "100%",
                  }}
                >
                  {lightboxImages.map((src, index) => (
                    <img
                      key={index}
                      src={src}
                      alt={`Lámina Ampliada Parte ${index + 1}`}
                      className="w-full h-auto block object-contain transition-all duration-300"
                      loading="eager"
                    />
                  ))}
                </div>
              </div>
              <div className="mt-4 pt-3 border-t border-black/10 flex flex-wrap gap-4 justify-between items-center text-[10px] font-mono text-black/60 uppercase tracking-wider">
                <div className="flex flex-wrap items-center gap-4">
                  <span className="hidden sm:inline">
                    Desliza o usa [Ctrl + Rueda] para zoom libre (hasta 500%)
                  </span>
                  <div className="flex bg-black/5 rounded p-0.5 border border-black/10">
                    {[
                      { val: 100, label: "100% (Ajustar)" },
                      { val: 250, label: "250% (Zoom HD)" },
                      { val: 400, label: "400% (Resolución Real)" },
                    ].map((opt) => (
                      <button
                        key={opt.val}
                        onClick={() => setZoomPercent(opt.val)}
                        className={`px-3 py-1.5 rounded text-[9px] font-bold cursor-pointer transition-all duration-200 ${
                          zoomPercent === opt.val
                            ? "bg-[var(--clay)] text-white shadow-sm"
                            : "text-black/60 hover:text-black hover:bg-black/5"
                        }`}
                      >
                        {opt.label}
                      </button>
                    ))}
                  </div>
                </div>
                <button
                  onClick={() => setLightboxImages(null)}
                  className="text-[var(--clay)] font-bold hover:underline"
                >
                  Cerrar vista [×]
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Side Drawer for Design Decision Hotspots */}
      <AnimatePresence>
        {activeHotspot && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex justify-end cursor-zoom-out"
            onClick={() => setActiveHotspot(null)}
          >
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 30, stiffness: 260 }}
              className="w-full max-w-md bg-[#1b1715] h-full p-8 md:p-10 border-l border-white/10 shadow-2xl flex flex-col justify-between cursor-default grain"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Top area */}
              <div className="space-y-8">
                <div className="flex justify-between items-start">
                  <div>
                    <span className="font-mono text-[9px] text-[var(--clay-light)] uppercase tracking-[0.2em]">
                      {activeHotspot.project}
                    </span>
                    <p className="text-[var(--cream)]/60 text-[9px] font-mono tracking-[0.2em] uppercase mt-1">
                      Punto Clave
                    </p>
                  </div>
                  <button
                    onClick={() => setActiveHotspot(null)}
                    className="w-10 h-10 rounded-full border border-white/10 hover:border-white/30 text-white flex items-center justify-center transition-colors text-lg"
                    aria-label="Cerrar panel"
                  >
                    ×
                  </button>
                </div>

                <div className="space-y-6">
                  <div>
                    <span className="eyebrow text-[var(--clay-light)] text-[10px]">
                      Cómo Pienso la Solución
                    </span>
                    <h3 className="display text-3xl md:text-4xl text-white mt-2 leading-[1.05]">
                      {activeHotspot.title}
                    </h3>
                  </div>

                  <div className="bg-white/5 p-4 rounded-lg border border-white/5 space-y-2">
                    <span className="text-[8px] font-mono uppercase tracking-widest text-[var(--clay-light)] block">
                      Decisión Ejecutada:
                    </span>
                    <p className="text-sm font-semibold text-white leading-relaxed">
                      {activeHotspot.decision}
                    </p>
                  </div>

                  <div className="space-y-2 pt-2">
                    <span className="text-[8px] font-mono uppercase tracking-widest text-[var(--cream)]/50 block">
                      Racional Científico & Ambiental:
                    </span>
                    <p className="text-sm text-[var(--cream)]/85 leading-relaxed">
                      {activeHotspot.rationale}
                    </p>
                  </div>
                </div>
              </div>

              {/* Bottom area */}
              <div className="border-t border-white/10 pt-6 space-y-4">
                <div className="flex justify-between items-center text-[10px] font-mono text-[var(--cream)]/40 uppercase">
                  <span>Pilar Relacionado:</span>
                  <span className="text-[var(--clay-light)] font-bold">{activeHotspot.pillar}</span>
                </div>
                <button
                  onClick={() => {
                    setActiveHotspot(null);
                    const contactSection = document.getElementById("contacto");
                    if (contactSection) {
                      contactSection.scrollIntoView({ behavior: "smooth" });
                    }
                  }}
                  className="w-full text-center text-xs tracking-[0.2em] uppercase border border-[var(--clay-light)] text-[var(--clay-light)] hover:bg-[var(--clay-light)] hover:text-[#1b1715] px-6 py-4.5 transition-all duration-300 font-semibold"
                >
                  Discutir este enfoque →
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
