import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

// --- ARCHITECTURAL PDFS ---
import ar103Pdf from "@/assets/AR103.pdf";
import ar201Pdf from "@/assets/AR201.pdf";
import ar301Pdf from "@/assets/AR301.pdf";
import ar302Pdf from "@/assets/AR302.pdf";

// --- STRUCTURAL PDFS ---
import es604Pdf from "@/assets/ES604.pdf";
import es606Pdf from "@/assets/ES606.pdf";
import es609Pdf from "@/assets/ES609.pdf";
import es617Pdf from "@/assets/ES617.pdf";

// --- INSTALLATIONS PDFS ---
import el804Pdf from "@/assets/EL804.pdf";
import el805Pdf from "@/assets/EL805.pdf";
import el806Pdf from "@/assets/EL806.pdf";

// Preview Image Assets
import imgFloorplan from "@/assets/floorplan-texture.jpg";
import imgSanAndres1 from "@/assets/san-andres-info-1-part1.png";
import imgSanAndres2 from "@/assets/san-andres-info-1-part2.png";
import imgSanAndres3 from "@/assets/san-andres-info-1-part3.png";
import imgSanAndres4 from "@/assets/san-andres-info-2-part1.png";
import imgSanAndres5 from "@/assets/san-andres-info-2-part2.png";
import imgSanAndres6 from "@/assets/san-andres-info-2-part3.png";
import imgCasinoProcess from "@/assets/casino-process.jpg";

interface Plano {
  id: string;
  code: string;
  title: string;
  category: "arquitectura" | "estructuras" | "instalaciones";
  categoryLabel: string;
  description: string;
  pdfUrl: string;
  previewImage: string;
}

const planosData: Plano[] = [
  // --- ARQUITECTURA ---
  {
    id: "plano-ar103",
    code: "AR-103",
    title: "Planta Arquitectónica General",
    category: "arquitectura",
    categoryLabel: "Arquitectura",
    description:
      "Distribución de muros, accesos, zonificación de flujos y modulación del espacio para optimizar la luz natural.",
    pdfUrl: ar103Pdf,
    previewImage: imgFloorplan,
  },
  {
    id: "plano-ar201",
    code: "AR-201",
    title: "Fachadas y Cortes Generales",
    category: "arquitectura",
    categoryLabel: "Arquitectura",
    description:
      "Secciones transversales que detallan las alturas, la relación con el terreno y la estrategia de ventilación cruzada.",
    pdfUrl: ar201Pdf,
    previewImage: imgSanAndres1,
  },
  {
    id: "plano-ar301",
    code: "AR-301",
    title: "Detalles de Carpintería y Mobiliario",
    category: "arquitectura",
    categoryLabel: "Arquitectura",
    description:
      "Plano técnico detallado para la fabricación del mobiliario integrado y ensambles de carpintería fija.",
    pdfUrl: ar301Pdf,
    previewImage: imgSanAndres2,
  },
  {
    id: "plano-ar302",
    code: "AR-302",
    title: "Especificación de Acabados y Cielorrasos",
    category: "arquitectura",
    categoryLabel: "Arquitectura",
    description:
      "Distribución de puntos de iluminación bio-compatible, selección de texturas mate y cielorrasos acústicos.",
    pdfUrl: ar302Pdf,
    previewImage: imgSanAndres3,
  },

  // --- ESTRUCTURAS ---
  {
    id: "plano-es604",
    code: "ES-604",
    title: "Cimentación y Vigas de Amarre",
    category: "estructuras",
    categoryLabel: "Estructuras",
    description:
      "Plano estructural de cimentación, zapatas, vigas de amarre y especificaciones de concreto reforzado.",
    pdfUrl: es604Pdf,
    previewImage: imgSanAndres4,
  },
  {
    id: "plano-es606",
    code: "ES-606",
    title: "Pórticos Estructurales y Refuerzos",
    category: "estructuras",
    categoryLabel: "Estructuras",
    description:
      "Detalle de pórticos estructurales de carga, armadura de refuerzo y acero de alta resistencia.",
    pdfUrl: es606Pdf,
    previewImage: imgSanAndres5,
  },
  {
    id: "plano-es609",
    code: "ES-609",
    title: "Detalles de Vigas y Nudos Constructivos",
    category: "estructuras",
    categoryLabel: "Estructuras",
    description:
      "Detalles y despieces de vigas principales, estribos y encuentros de nudos estructurales.",
    pdfUrl: es609Pdf,
    previewImage: imgSanAndres6,
  },
  {
    id: "plano-es617",
    code: "ES-617",
    title: "Estructura y Modulación de Entrepiso / Cubierta",
    category: "estructuras",
    categoryLabel: "Estructuras",
    description:
      "Plano de apoyos estructurales, viguetas de madera de soporte y detalles de anclajes de cubierta.",
    pdfUrl: es617Pdf,
    previewImage: imgCasinoProcess,
  },

  // --- INSTALACIONES ---
  {
    id: "plano-el804",
    code: "EL-804",
    title: "Red de Tomacorrientes y Datos",
    category: "instalaciones",
    categoryLabel: "Instalaciones",
    description:
      "Plano de canalizaciones eléctricas de fuerza, tomas reguladas y distribución de red de datos estructurales.",
    pdfUrl: el804Pdf,
    previewImage: imgFloorplan,
  },
  {
    id: "plano-el805",
    code: "EL-805",
    title: "Distribución de Alumbrado e Iluminación",
    category: "instalaciones",
    categoryLabel: "Instalaciones",
    description:
      "Zonificación de circuitos de iluminación, control de encendido y diseño lumínico bio-compatible y terapéutico.",
    pdfUrl: el805Pdf,
    previewImage: imgSanAndres1,
  },
  {
    id: "plano-el806",
    code: "EL-806",
    title: "Diagrama Unifilar y Cuadro de Cargas",
    category: "instalaciones",
    categoryLabel: "Instalaciones",
    description:
      "Esquema unifilar del tablero de distribución eléctrica, balance de fases y especificaciones de cuadros de carga.",
    pdfUrl: el806Pdf,
    previewImage: imgSanAndres6,
  },
];

export function TechnicalDrawings() {
  const [activeCategory, setActiveCategory] = useState<string>("todos");
  const [selectedPlano, setSelectedPlano] = useState<Plano | null>(null);

  const filteredPlanos = planosData.filter(
    (plano) => activeCategory === "todos" || plano.category === activeCategory,
  );

  return (
    <section className="portfolio-planos relative overflow-hidden" id="planos-tecnicos">
      <div className="container mx-auto px-4 max-w-[1400px]">
        <div className="max-w-3xl mb-16">
          <p className="eyebrow text-[var(--clay)] mb-4">— Rigor Técnico</p>
          <h2 className="display text-5xl md:text-7xl text-white">
            Planos y detalle:
            <br />
            Mi trabajo <em className="italic text-[var(--clay)]">técnico</em>.
          </h2>
          <p className="text-[var(--cream)]/75 mt-6 text-sm md:text-base max-w-xl leading-relaxed">
            Aquí comparto una selección de los últimos planos técnicos de distribución, estructuras
            e instalaciones en los que he trabajado recientemente.
          </p>
        </div>

        {/* Filtros Modernos */}
        <div className="filters flex justify-center gap-4 flex-wrap mb-10">
          {[
            { id: "todos", label: "Todos" },
            { id: "arquitectura", label: "Arquitectura" },
            { id: "estructuras", label: "Estructuras" },
            { id: "instalaciones", label: "Instalaciones" },
          ].map((cat) => (
            <button
              key={cat.id}
              className={`btn-filter ${activeCategory === cat.id ? "active" : ""}`}
              onClick={() => setActiveCategory(cat.id)}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Grilla de planos con Framer Motion */}
        <motion.div
          layout
          className="planos-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8 max-w-[1000px] mx-auto justify-center"
        >
          <AnimatePresence mode="popLayout">
            {filteredPlanos.length > 0 ? (
              filteredPlanos.map((plano) => (
                <motion.div
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.35, ease: "easeInOut" }}
                  key={plano.id}
                  className={`plano-card ${plano.category} cursor-zoom-in p-6 flex flex-col justify-between min-h-[220px] transition-all hover:border-[var(--clay)]/40`}
                  onClick={() => setSelectedPlano(plano)}
                >
                  <div>
                    <div className="flex justify-between items-start mb-4">
                      <span className="text-[10px] uppercase tracking-widest text-[var(--clay)] font-semibold font-mono">
                        {plano.categoryLabel}
                      </span>
                      <div className="bg-black/30 text-[var(--clay)] text-xs font-mono font-bold px-3 py-1 rounded border border-[var(--clay)]/20">
                        {plano.code}
                      </div>
                    </div>
                    <h3 className="text-xl font-semibold mb-2 text-white leading-snug">
                      {plano.title}
                    </h3>
                    <p className="text-[var(--cream)]/65 text-sm leading-relaxed mb-6">
                      {plano.description}
                    </p>
                  </div>
                  <div className="flex items-center gap-2 text-xs font-mono text-[var(--clay)] uppercase tracking-wider group-hover:text-white transition-colors mt-auto">
                    <span>Visualizar plano →</span>
                  </div>
                </motion.div>
              ))
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="col-span-full text-center py-16 text-[var(--cream)]/50 font-mono text-sm"
              >
                Próximamente planos para esta categoría.
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Lightbox / Visor de Plano PDF Interactivo */}
      <AnimatePresence>
        {selectedPlano && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-md flex items-center justify-center p-4 md:p-8"
            onClick={() => setSelectedPlano(null)}
          >
            {/* Botón de cierre */}
            <button
              className="absolute top-6 right-6 text-white bg-black/50 hover:bg-black/80 transition-colors w-12 h-12 rounded-full flex items-center justify-center text-3xl font-mono shadow-2xl z-[120]"
              onClick={() => setSelectedPlano(null)}
              aria-label="Cerrar"
            >
              ×
            </button>

            {/* Modal de Plano */}
            <motion.div
              initial={{ scale: 0.95, y: 10 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 10 }}
              transition={{ type: "spring", damping: 25, stiffness: 220 }}
              className="relative max-w-6xl w-full h-[85vh] bg-[var(--ink)] rounded-xl flex flex-col overflow-hidden shadow-2xl border border-white/10"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Encabezado del visor */}
              <div className="p-5 border-b border-white/10 flex flex-wrap gap-4 items-center justify-between bg-[#1b1715]">
                <div>
                  <span className="text-xs font-mono text-[var(--clay)] font-bold tracking-wider uppercase">
                    Visor de Plano Técnico · {selectedPlano.code}
                  </span>
                  <h3 className="text-xl font-display text-white mt-1">{selectedPlano.title}</h3>
                </div>
                <div className="flex gap-3">
                  <a
                    href={selectedPlano.pdfUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-[var(--clay)] hover:bg-[var(--clay)]/90 text-[var(--cream)] px-4 py-2 rounded font-semibold text-xs tracking-wider uppercase transition-colors flex items-center gap-2"
                  >
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
                    >
                      <path d="M15 3h6v6" />
                      <path d="M10 14 21 3" />
                      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                    </svg>
                    <span>Abrir PDF Completo</span>
                  </a>
                </div>
              </div>

              {/* Contenedor del PDF (iFrame / Embed) */}
              <div className="flex-1 bg-slate-950 relative">
                <iframe
                  src={`${selectedPlano.pdfUrl}#toolbar=1`}
                  className="w-full h-full border-none"
                  title={`Plano ${selectedPlano.code}`}
                />
              </div>

              {/* Pie del visor */}
              <div className="p-4 bg-[#1b1715] border-t border-white/10 text-center text-xs text-[var(--cream)]/65 font-mono">
                Puedes hacer zoom, imprimir o guardar el plano utilizando los controles nativos del
                visor PDF.
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
