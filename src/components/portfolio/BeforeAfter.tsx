import { useState, useRef, useEffect } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import beforeImg from "@/assets/living-before.png";
import afterImg from "@/assets/living-after.png";

export function BeforeAfter() {
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const inView = useInView(titleRef, { once: true, margin: "-100px" });

  const handleMove = (clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const position = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setSliderPosition(position);
    if (!hasInteracted) setHasInteracted(true);
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
    <section className="py-12 md:py-16 px-6 md:px-10 bg-background overflow-hidden border-t border-foreground/5">
      <div className="max-w-[1400px] mx-auto">
        <div ref={titleRef} className="grid md:grid-cols-12 gap-8 mb-8 items-end">
          <div className="md:col-span-6">
            <p className="eyebrow mb-4">— Transformación</p>
            <h2 className="display text-5xl md:text-7xl">
              El impacto del <em className="italic text-[var(--clay)]">bienestar</em>.
            </h2>
          </div>
          <div className="md:col-span-6">
            <p className="text-muted-foreground text-sm md:text-base max-w-md leading-relaxed">
              Arrastra el selector central de izquierda a derecha para descubrir cómo la neuroarquitectura 
              transforma un espacio frío y desestructurado en un refugio terapéutico diseñado para la calma.
            </p>
          </div>
        </div>

        {/* Slider Container */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          ref={containerRef}
          onMouseMove={handleMouseMove}
          onTouchMove={handleTouchMove}
          onMouseDown={() => setIsDragging(true)}
          onTouchStart={() => setIsDragging(true)}
          className="relative w-full aspect-[16/10] md:aspect-[16/9] max-h-[75vh] bg-muted overflow-hidden select-none cursor-ew-resize rounded-lg border border-foreground/10 shadow-2xl"
        >
          {/* AFTER Image (Base) */}
          <img
            src={afterImg}
            alt="Espacio después del diseño"
            className="absolute inset-0 w-full h-full object-cover pointer-events-none"
            loading="lazy"
          />
          <div className="absolute bottom-6 right-6 z-10 bg-black/60 backdrop-blur-md text-[var(--cream)] px-4 py-1.5 text-xs font-mono tracking-widest rounded-full pointer-events-none uppercase shadow-md">
            Después
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
              alt="Espacio antes del diseño"
              className="absolute inset-0 w-full h-full object-cover pointer-events-none"
              loading="lazy"
            />
            <div className="absolute bottom-6 left-6 z-10 bg-black/60 backdrop-blur-md text-[var(--cream)] px-4 py-1.5 text-xs font-mono tracking-widest rounded-full pointer-events-none uppercase shadow-md">
              Antes
            </div>
          </div>

          {/* Floating Instructions Tooltip */}
          <AnimatePresence>
            {!hasInteracted && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9, x: "-50%", y: "-50%" }}
                animate={{ opacity: 1, scale: 1, x: "-50%", y: "-50%" }}
                exit={{ opacity: 0, scale: 0.9, x: "-50%", y: "-50%" }}
                transition={{ delay: 0.8, duration: 0.4 }}
                className="absolute top-1/2 left-1/2 z-30 pointer-events-none bg-black/75 backdrop-blur-md border border-white/10 text-[var(--cream)] px-5 py-2.5 text-xs font-mono tracking-[0.2em] rounded-md flex items-center gap-2 select-none shadow-2xl uppercase"
              >
                <span>← Desliza para comparar →</span>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Divider Line */}
          <div
            className="absolute top-0 bottom-0 w-[3px] bg-white z-20 pointer-events-none shadow-[0_0_15px_rgba(0,0,0,0.5)]"
            style={{ left: `${sliderPosition}%` }}
          >
            {/* Handle Button */}
            <div 
              className={`absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-14 h-14 rounded-full bg-white border-2 border-[var(--clay)] text-[var(--clay)] flex items-center justify-center shadow-2xl backdrop-blur-md transition-transform duration-200 ${
                isDragging ? "scale-95 bg-[var(--cream)]" : "hover:scale-110"
              }`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="22"
                height="22"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="animate-pulse"
              >
                <path d="m9 18-6-6 6-6" />
                <path d="m15 6 6 6-6 6" />
              </svg>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
