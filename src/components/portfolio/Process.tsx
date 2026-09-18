import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "../../context/LanguageContext";

interface ProcessStage {
  id: string;
  n: string;
  title: string;
  shortTag: string;
  description: string;
  keyIdea: string;
  itemsLabel?: string;
  items?: string[];
  image: string;
}

export function Process() {
  const { t } = useLanguage();
  const [activeStageId, setActiveStageId] = useState<string>("01");
  const [lightboxState, setLightboxState] = useState<{
    isOpen: boolean;
    imageSrc: string;
    title: string;
    index: number;
  }>({
    isOpen: false,
    imageSrc: "",
    title: "",
    index: 0,
  });

  const stages: ProcessStage[] = t.process.stages;
  const activeStage = stages.find((s) => s.id === activeStageId) || stages[0];

  const openLightbox = (imageSrc: string, title: string, index: number) => {
    setLightboxState({
      isOpen: true,
      imageSrc,
      title,
      index,
    });
  };

  const closeLightbox = useCallback(() => {
    setLightboxState((prev) => ({ ...prev, isOpen: false }));
  }, []);

  const nextLightbox = useCallback(() => {
    setLightboxState((prev) => {
      const nextIdx = (prev.index + 1) % stages.length;
      const nextStage = stages[nextIdx];
      return {
        ...prev,
        index: nextIdx,
        imageSrc: nextStage.image,
        title: `${nextStage.n} · ${nextStage.title}`,
      };
    });
  }, [stages]);

  const prevLightbox = useCallback(() => {
    setLightboxState((prev) => {
      const prevIdx = (prev.index - 1 + stages.length) % stages.length;
      const prevStage = stages[prevIdx];
      return {
        ...prev,
        index: prevIdx,
        imageSrc: prevStage.image,
        title: `${prevStage.n} · ${prevStage.title}`,
      };
    });
  }, [stages]);

  // Handle ESC and Arrow keys for Lightbox
  useEffect(() => {
    if (!lightboxState.isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowRight") nextLightbox();
      if (e.key === "ArrowLeft") prevLightbox();
    };

    window.addEventListener("keydown", handleKeyDown);
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = originalOverflow;
    };
  }, [lightboxState.isOpen, closeLightbox, nextLightbox, prevLightbox]);

  return (
    <section
      id="proceso"
      className="py-24 md:py-32 px-6 md:px-10 bg-[var(--cherry)] text-[var(--cream)] scroll-mt-28 relative overflow-hidden"
    >
      <div className="max-w-[1400px] mx-auto relative z-10">
        {/* Header Section */}
        <div className="max-w-3xl mb-12 md:mb-16">
          <p className="eyebrow text-[var(--clay-light)] mb-3">{t.process.label}</p>
          <h2 className="display text-3xl md:text-5xl font-bold leading-tight text-white max-w-2xl">
            {t.process.title}
          </h2>
          <p className="text-[var(--cream)]/85 text-base md:text-lg max-w-3xl mt-4 leading-relaxed font-sans">
            {t.process.intro}
          </p>
        </div>

        {/* Main Process Layout */}
        <div className="lg:grid lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* Left Column: List of Stages (Desktop: 5 cols, Mobile: interactive accordion stack) */}
          <div
            className="lg:col-span-5 flex flex-col gap-2.5"
            role="tablist"
            aria-label={t.process.title}
          >
            {stages.map((stage, idx) => {
              const isActive = stage.id === activeStageId;
              return (
                <div key={stage.id} className="flex flex-col">
                  <button
                    id={`stage-tab-${stage.id}`}
                    role="tab"
                    aria-selected={isActive}
                    aria-controls={`stage-panel-${stage.id}`}
                    tabIndex={isActive ? 0 : -1}
                    onClick={() => setActiveStageId(stage.id)}
                    className={`group text-left p-4 md:p-5 rounded-xl border transition-all duration-300 flex items-center justify-between w-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--clay-light)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--cherry)] cursor-pointer ${
                      isActive
                        ? "bg-white/10 border-[var(--clay-light)] text-white shadow-lg"
                        : "border-white/10 bg-black/15 text-[var(--cream)]/70 hover:text-white hover:border-white/20 hover:bg-black/25"
                    }`}
                  >
                    <div className="flex items-center gap-3.5 sm:gap-4 text-left min-w-0">
                      <span
                        className={`font-mono text-sm tracking-wider shrink-0 transition-colors ${
                          isActive ? "text-[var(--clay-light)] font-bold" : "text-[var(--cream)]/40"
                        }`}
                      >
                        {stage.n}
                      </span>
                      <div className="min-w-0">
                        <h3 className="display text-base md:text-lg font-medium leading-snug group-hover:translate-x-0.5 transition-transform duration-200 truncate">
                          {stage.title}
                        </h3>
                        <span
                          className={`font-mono text-[9px] uppercase tracking-wider block mt-0.5 transition-colors truncate ${
                            isActive ? "text-[var(--clay-light)]" : "text-[var(--cream)]/50"
                          }`}
                        >
                          {stage.shortTag}
                        </span>
                      </div>
                    </div>
                    <span
                      className={`text-lg transition-transform duration-300 shrink-0 ml-2 ${
                        isActive
                          ? "text-[var(--clay-light)] translate-x-1"
                          : "text-[var(--cream)]/25 group-hover:translate-x-1"
                      }`}
                      aria-hidden="true"
                    >
                      →
                    </span>
                  </button>

                  {/* Mobile Accordion Panel (expands inline on screens < lg) */}
                  <div
                    id={`stage-panel-mobile-${stage.id}`}
                    role="region"
                    aria-labelledby={`stage-tab-${stage.id}`}
                    className="block lg:hidden overflow-hidden"
                  >
                    <AnimatePresence initial={false}>
                      {isActive && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                          className="pt-2 pb-4"
                        >
                          <StageDetailContent
                            stage={stage}
                            stageIndex={idx}
                            keyIdeaLabel={t.process.keyIdeaLabel}
                            zoomPrompt={t.process.zoomPrompt}
                            onOpenLightbox={openLightbox}
                            isMobile
                          />
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Right Column: Expanded Stage Content (Desktop: 7 cols) */}
          <div className="hidden lg:block lg:col-span-7 sticky top-28">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeStage.id}
                id={`stage-panel-${activeStage.id}`}
                role="tabpanel"
                aria-labelledby={`stage-tab-${activeStage.id}`}
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -14 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
              >
                <StageDetailContent
                  stage={activeStage}
                  stageIndex={stages.findIndex((s) => s.id === activeStage.id)}
                  keyIdeaLabel={t.process.keyIdeaLabel}
                  zoomPrompt={t.process.zoomPrompt}
                  onOpenLightbox={openLightbox}
                />
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* Lightbox Modal for Process Slides */}
      <AnimatePresence>
        {lightboxState.isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8 bg-black/90 backdrop-blur-md"
            onClick={closeLightbox}
          >
            {/* Top Toolbar */}
            <div className="absolute top-4 left-4 right-4 flex items-center justify-between z-20 pointer-events-none">
              <span className="font-mono text-xs md:text-sm text-[var(--clay-light)] bg-black/60 px-4 py-1.5 rounded-full border border-white/10 pointer-events-auto">
                {lightboxState.title} ({lightboxState.index + 1} / {stages.length})
              </span>
              <button
                type="button"
                onClick={closeLightbox}
                className="w-10 h-10 rounded-full bg-black/60 hover:bg-white/20 border border-white/20 flex items-center justify-center text-white text-lg transition-colors cursor-pointer pointer-events-auto"
                aria-label={t.process.closeLightbox || "Cerrar"}
              >
                ✕
              </button>
            </div>

            {/* Navigation Buttons */}
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                prevLightbox();
              }}
              className="absolute left-4 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-black/60 hover:bg-black/90 border border-white/20 flex items-center justify-center text-white text-xl transition-all cursor-pointer hidden sm:flex"
              aria-label="Anterior"
            >
              ←
            </button>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                nextLightbox();
              }}
              className="absolute right-4 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-black/60 hover:bg-black/90 border border-white/20 flex items-center justify-center text-white text-xl transition-all cursor-pointer hidden sm:flex"
              aria-label="Siguiente"
            >
              →
            </button>

            {/* Slide Image Container */}
            <motion.div
              initial={{ scale: 0.94, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.94, opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="relative max-w-4xl max-h-[85vh] w-auto h-auto flex items-center justify-center"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={lightboxState.imageSrc}
                alt={lightboxState.title}
                className="max-w-full max-h-[85vh] w-auto h-auto object-contain rounded-xl shadow-2xl border border-white/10"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

function StageDetailContent({
  stage,
  stageIndex,
  keyIdeaLabel,
  zoomPrompt,
  onOpenLightbox,
  isMobile = false,
}: {
  stage: ProcessStage;
  stageIndex: number;
  keyIdeaLabel: string;
  zoomPrompt?: string;
  onOpenLightbox: (src: string, title: string, idx: number) => void;
  isMobile?: boolean;
}) {
  const { t } = useLanguage();
  const badgePrefix = t.process.stageBadgePrefix || "ETAPA";

  return (
    <div
      className={`w-full bg-[#351C15] rounded-2xl border border-white/10 shadow-2xl flex flex-col gap-6 text-[var(--cream)] ${
        isMobile ? "p-5" : "p-7 md:p-8"
      }`}
    >
      {/* Header Info */}
      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <span className="font-mono text-[10px] text-[var(--clay-light)] uppercase tracking-[0.2em] font-semibold">
            {`${badgePrefix} ${stage.n} / 07`}
          </span>
          <span className="text-white/20 text-xs">·</span>
          <span className="font-mono text-[10px] text-[var(--cream)]/60 uppercase tracking-widest">
            {stage.shortTag}
          </span>
        </div>
        <h3 className="display text-2xl md:text-3xl text-white font-medium leading-tight">
          {stage.title}
        </h3>
        <p className="text-[var(--cream)]/90 text-sm md:text-base leading-relaxed font-sans">
          {stage.description}
        </p>
      </div>

      {/* Key Idea Callout */}
      <div className="border-l-2 border-[var(--clay-light)] bg-black/25 px-4 py-3.5 rounded-r-lg space-y-1">
        <span className="eyebrow text-[9px] text-[var(--clay-light)] uppercase tracking-wider font-semibold block">
          {keyIdeaLabel}
        </span>
        <blockquote className="text-white/95 text-sm md:text-[15px] font-sans italic leading-snug">
          “{stage.keyIdea}”
        </blockquote>
      </div>

      {/* Optional Criteria / Deliverables List */}
      {stage.items && stage.items.length > 0 && (
        <div className="space-y-2 pt-1 border-t border-white/10">
          <span className="font-mono text-[10px] text-[var(--clay-light)] uppercase tracking-wider font-semibold block">
            {stage.itemsLabel}
          </span>
          <div className="flex flex-wrap gap-2">
            {stage.items.map((item, idx) => (
              <span
                key={idx}
                className="px-3 py-1.5 rounded-lg bg-black/30 border border-white/10 text-xs font-mono text-white/90 flex items-center gap-1.5 shadow-sm"
              >
                <span className="text-[var(--clay-light)] text-[11px] font-sans" aria-hidden="true">
                  ✓
                </span>
                {item}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Supporting Visual Slide with Click-to-Lightbox */}
      <div className="space-y-2 pt-1">
        <div className="relative w-full rounded-xl overflow-hidden border border-white/10 bg-black/40 group shadow-xl">
          <div className="relative aspect-[4/5] max-h-[460px] md:max-h-[500px] w-full flex items-center justify-center p-2 sm:p-3 bg-[#26130D]">
            <img
              src={stage.image}
              alt={`${stage.n} · ${stage.title}`}
              className="w-full h-full object-contain rounded-lg transition-transform duration-500 group-hover:scale-[1.01]"
              loading="lazy"
            />
            {/* Clickable Overlay for Lightbox */}
            <button
              type="button"
              onClick={() => onOpenLightbox(stage.image, `${stage.n} · ${stage.title}`, stageIndex)}
              className="absolute inset-0 w-full h-full bg-black/0 group-hover:bg-black/35 transition-all duration-300 flex items-center justify-center cursor-zoom-in"
              aria-label={zoomPrompt || "Ampliar diapositiva"}
            >
              <span className="opacity-0 group-hover:opacity-100 transition-all duration-200 transform translate-y-2 group-hover:translate-y-0 px-4 py-2 rounded-full bg-black/85 text-white text-xs font-mono uppercase tracking-wider backdrop-blur-md border border-white/20 flex items-center gap-2 shadow-2xl">
                <svg
                  className="w-3.5 h-3.5 text-[var(--clay-light)]"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v6m3-3H7"
                  />
                </svg>
                {zoomPrompt || "Ampliar diapositiva"}
              </span>
            </button>
          </div>
        </div>
        <p className="text-[11px] font-mono text-center text-[var(--cream)]/50 tracking-wider">
          {stage.n} / 07 · {stage.title}
        </p>
      </div>
    </div>
  );
}
