import { motion, useScroll, useTransform, AnimatePresence, useReducedMotion } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { useLanguage } from "../../context/LanguageContext";
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

// TRÍPODE project assets
import tripodeConcept from "@/assets/TRÍPODE.png";
import tripode1Antes from "@/assets/TRÍPODE (1)_antes.png";
import tripode1Despues from "@/assets/TRÍPODE (1)_despues.png";
import tripode2Antes from "@/assets/TRÍPODE (2)_antes.png";
import tripode2Despues from "@/assets/TRÍPODE (2)_despues.png";
import tripode1 from "@/assets/TRÍPODE (1).png";
import tripode2 from "@/assets/TRÍPODE (2).png";

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

function ComparisonSlider({ beforeImg, afterImg, beforeLabel, afterLabel }: ComparisonSliderProps) {
  const { language } = useLanguage();
  const defBefore = language === "es" ? "Antes" : language === "pt" ? "Antes" : "Before";
  const defAfter = language === "es" ? "Después" : language === "pt" ? "Depois" : "After";
  const bLabel = beforeLabel || defBefore;
  const aLabel = afterLabel || defAfter;
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
        alt={aLabel}
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
          alt={bLabel}
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

interface TransformationPairProps {
  title: string;
  subtitle: string;
  description?: string;
  beforeImg: string;
  afterImg: string;
  beforeLabel?: string;
  afterLabel?: string;
  onOpenImage: (img: string) => void;
}

function TransformationPair({
  title,
  subtitle,
  description,
  beforeImg,
  afterImg,
  beforeLabel,
  afterLabel,
  onOpenImage,
}: TransformationPairProps) {
  const { language, t } = useLanguage();
  const shouldReduceMotion = useReducedMotion();
  const defBefore =
    language === "es"
      ? "Estado existente"
      : language === "pt"
        ? "Estado existente"
        : "Existing state";
  const defAfter =
    language === "es"
      ? "Propuesta TRÍPODE"
      : language === "pt"
        ? "Proposta TRÍPODE"
        : "TRÍPODE Proposal";
  const bLabel = beforeLabel || defBefore;
  const aLabel = afterLabel || defAfter;

  return (
    <div className="space-y-8 pt-10 border-t border-[var(--cream)]/10">
      {/* Header and description outside */}
      <div className="space-y-2">
        <p className="eyebrow text-[var(--clay-light)] tracking-widest text-xs uppercase">
          {subtitle}
        </p>
        <h3 className="display text-3xl md:text-4xl text-white font-medium">{title}</h3>
        {description && (
          <p className="text-sm text-[var(--cream)]/75 max-w-3xl font-sans mt-1">{description}</p>
        )}
      </div>

      {/* Main Grid: stack on mobile (<900px), grid minmax(0, 1fr) 72px minmax(0, 1fr) on desktop */}
      <div className="w-full max-w-[1550px] mx-auto flex flex-col min-[900px]:grid min-[900px]:grid-cols-[1fr_72px_1fr] items-center gap-6 min-[900px]:gap-0">
        {/* Card Left: Before */}
        <div className="w-full flex flex-col space-y-3">
          {/* Card Header outside */}
          <div className="flex items-baseline gap-2 font-mono">
            <span className="text-xs text-[var(--cream)]/40">01</span>
            <span className="text-[10px] text-[var(--cream)]/60 uppercase tracking-wider font-semibold">
              {beforeLabel}
            </span>
          </div>
          {/* Image Wrapper */}
          <button
            onClick={() => onOpenImage(beforeImg)}
            className="w-full relative overflow-hidden rounded-xl border border-white/10 bg-black/20 flex items-center justify-center cursor-zoom-in group transition-transform focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#EFA07F] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--ink)]"
            aria-label={
              language === "es"
                ? `Ampliar ${bLabel}`
                : language === "pt"
                  ? `Ampliar ${bLabel}`
                  : `Enlarge ${bLabel}`
            }
          >
            <img
              src={beforeImg}
              alt={bLabel}
              className="w-full h-auto max-h-[500px] object-contain rounded-xl transition-transform duration-500 group-hover:scale-[1.01]"
              loading="lazy"
            />
            {/* Soft border styling */}
            <div className="absolute inset-0 rounded-xl border border-white/5 pointer-events-none" />
            <div className="absolute bottom-3 right-3 bg-black/75 text-[var(--cream)] text-[9px] font-mono px-3 py-1.5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              {language === "en" ? "ENLARGE" : "AMPLIAR"}
            </div>
          </button>
        </div>

        {/* Connector: Arrow indicator */}
        <div className="flex flex-col items-center justify-center w-full min-[900px]:h-full px-2 py-4 min-[900px]:py-0 select-none">
          <span className="text-[8px] font-mono tracking-widest text-[#EFA07F] uppercase mb-2 font-bold">
            TRANSFORMACIÓN
          </span>
          <div className="relative flex items-center justify-center w-full min-[900px]:w-[72px]">
            {/* Line extending animation */}
            <motion.div
              className="absolute h-px bg-[#EFA07F]/30 left-0 right-0 hidden min-[900px]:block"
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: shouldReduceMotion ? 0 : 0.6, ease: "easeOut" }}
            />
            {/* Line extending animation vertical for mobile */}
            <motion.div
              className="absolute w-px bg-[#EFA07F]/30 top-0 bottom-0 min-[900px]:hidden"
              initial={{ scaleY: 0 }}
              whileInView={{ scaleY: 1 }}
              viewport={{ once: true }}
              transition={{ duration: shouldReduceMotion ? 0 : 0.6, ease: "easeOut" }}
            />
            {/* Circle and simple arrow */}
            <motion.div
              className="relative z-10 w-11 h-11 rounded-full bg-[#1c1411] border border-[#EFA07F]/40 flex items-center justify-center text-[#EFA07F] font-bold text-base shadow-md"
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              transition={{
                delay: shouldReduceMotion ? 0 : 0.2,
                duration: shouldReduceMotion ? 0 : 0.4,
                type: "spring",
              }}
              aria-hidden="true"
            >
              {/* Desktop arrow right, mobile arrow down */}
              <span className="hidden min-[900px]:inline">→</span>
              <span className="min-[900px]:hidden">↓</span>
            </motion.div>
          </div>
        </div>

        {/* Card Right: After */}
        <div className="w-full flex flex-col space-y-3">
          {/* Card Header outside */}
          <div className="flex items-baseline gap-2 font-mono">
            <span className="text-xs text-[#EFA07F]">02</span>
            <span className="text-[10px] text-[#EFA07F] uppercase tracking-wider font-semibold">
              {afterLabel}
            </span>
          </div>
          {/* Image Wrapper */}
          <button
            onClick={() => onOpenImage(afterImg)}
            className="w-full relative overflow-hidden rounded-xl border border-white/10 bg-black/20 flex items-center justify-center cursor-zoom-in group transition-transform focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#EFA07F] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--ink)]"
            aria-label={
              language === "es"
                ? `Ampliar ${aLabel}`
                : language === "pt"
                  ? `Ampliar ${aLabel}`
                  : `Enlarge ${aLabel}`
            }
          >
            <img
              src={afterImg}
              alt={aLabel}
              className="w-full h-auto max-h-[500px] object-contain rounded-xl transition-transform duration-500 group-hover:scale-[1.01]"
              loading="lazy"
            />
            {/* Soft border styling */}
            <div className="absolute inset-0 rounded-xl border border-white/5 pointer-events-none" />
            <div className="absolute bottom-3 right-3 bg-black/75 text-[var(--cream)] text-[9px] font-mono px-3 py-1.5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              {language === "en" ? "ENLARGE" : "AMPLIAR"}
            </div>
          </button>
        </div>
      </div>
    </div>
  );
}

function TripodeVideoPlayer() {
  const { t } = useLanguage();
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [posterFailed, setPosterFailed] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);
  const [showPlayButton, setShowPlayButton] = useState(true);
  const [hasAudio, setHasAudio] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    const video = videoRef.current;
    if (!video || shouldReduceMotion) {
      if (video) {
        video.autoplay = false;
      }
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          video
            .play()
            .then(() => {
              setIsPlaying(true);
              setShowPlayButton(false);
              setHasStarted(true);
            })
            .catch((err) => {
              console.log("Autoplay was blocked or failed:", err);
              setShowPlayButton(true);
            });
        } else {
          video.pause();
          setIsPlaying(false);
        }
      },
      {
        threshold: 0.3,
      },
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, [shouldReduceMotion]);

  // Detect whether the video file actually contains an audio track
  const handleLoadedMetadata = () => {
    const video = videoRef.current;
    if (!video) return;

    interface ExtendedHTMLVideoElement {
      audioTracks?: { length: number };
      webkitAudioDecodedByteCount?: number;
      mozHasAudio?: boolean;
    }
    const extVideo = video as unknown as ExtendedHTMLVideoElement;
    const hasAudioTrack = !!extVideo.audioTracks && extVideo.audioTracks.length > 0;
    const hasWebkitAudio =
      typeof extVideo.webkitAudioDecodedByteCount === "number" &&
      extVideo.webkitAudioDecodedByteCount > 0;
    const hasMozAudio = !!extVideo.mozHasAudio;

    if (hasAudioTrack || hasWebkitAudio || hasMozAudio) {
      setHasAudio(true);
    }
  };

  const handlePlayToggle = () => {
    const video = videoRef.current;
    if (!video) return;

    if (isPlaying) {
      video.pause();
      setIsPlaying(false);
    } else {
      video
        .play()
        .then(() => {
          setIsPlaying(true);
          setHasStarted(true);
        })
        .catch((err) => {
          console.error("Play failed:", err);
        });
    }
  };

  const handleVideoPlay = () => {
    setIsPlaying(true);
    setShowPlayButton(false);
    setHasStarted(true);
  };

  const handleVideoPause = () => {
    setIsPlaying(false);
    setShowPlayButton(true);
  };

  const handleVideoError = (e: React.SyntheticEvent<HTMLVideoElement, Event>) => {
    setHasError(true);
    console.error("Error loading video from path: /media/tripode-concepto.mp4", e);
  };

  const handleVolumeToggle = (e: React.MouseEvent) => {
    e.stopPropagation();
    const video = videoRef.current;
    if (!video) return;
    video.muted = !video.muted;
    setIsMuted(video.muted);
  };

  if (hasError) {
    return (
      <div className="flex flex-col items-center justify-center p-6 bg-[#120e0c]/60 border border-[var(--primary)]/20 rounded-2xl w-full text-center space-y-4 min-h-[220px]">
        <p className="text-[var(--cream)]/90 font-medium">El video no pudo cargarse.</p>
        <button
          onClick={() => {
            setHasError(false);
            setPosterFailed(false);
            setHasStarted(false);
            setShowPlayButton(true);
            setTimeout(() => {
              if (videoRef.current) {
                videoRef.current.load();
              }
            }, 100);
          }}
          className="px-6 py-2.5 bg-[var(--primary)] hover:bg-[#EFA07F] text-[var(--cream)] hover:text-[var(--ink)] font-semibold text-xs tracking-wider rounded-full transition-all duration-300 cursor-pointer min-h-[44px] min-w-[120px]"
        >
          REINTENTAR
        </button>
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      className="relative w-full rounded-2xl border border-white/5 bg-[#120e0c]/40 overflow-hidden shadow-md flex items-center justify-center group"
    >
      <video
        ref={videoRef}
        src="/media/tripode-concepto.mp4"
        muted={isMuted}
        playsInline
        loop
        preload="metadata"
        aria-label={t.projects.tripode.videoAria}
        onError={handleVideoError}
        onPlay={handleVideoPlay}
        onPause={handleVideoPause}
        onLoadedMetadata={handleLoadedMetadata}
        className="w-full h-auto block object-contain rounded-2xl z-0"
      />

      {!hasStarted && !posterFailed && (
        <img
          src="/media/tripode-poster.jpg"
          onError={() => setPosterFailed(true)}
          alt=""
          className="absolute inset-0 w-full h-full object-contain z-10 pointer-events-none rounded-2xl"
        />
      )}

      {/* Center play icon overlay (when paused/stopped) */}
      {!isPlaying && showPlayButton && (
        <button
          onClick={handlePlayToggle}
          className="absolute w-14 h-14 rounded-full bg-black/60 hover:bg-black/85 text-white flex items-center justify-center shadow-lg transition-transform hover:scale-105 border border-white/10 z-20 focus-visible:ring-2 focus-visible:ring-[#EFA07F] focus-visible:outline-none min-w-[44px] min-h-[44px] cursor-pointer"
          aria-label={isPlaying ? "Pausar video" : "Reproducir video"}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="currentColor"
          >
            <path d="M8 5v14l11-7z" />
          </svg>
        </button>
      )}

      {/* Action control bar on hover */}
      <div className="absolute bottom-4 right-4 flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20">
        {hasAudio && (
          <button
            onClick={handleVolumeToggle}
            className="w-10 h-10 rounded-full bg-black/60 hover:bg-black/80 text-white border border-white/10 flex items-center justify-center transition-colors focus-visible:ring-2 focus-visible:ring-[#EFA07F] focus-visible:outline-none min-w-[44px] min-h-[44px] cursor-pointer"
            aria-label={isMuted ? "Activar sonido" : "Silenciar"}
          >
            {isMuted ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M11 5 6 9H2v6h4l5 4V5zM23 9l-6 6M17 9l6 6" />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M11 5 6 9H2v6h4l5 4V5zM15.54 8.46a5 5 0 0 1 0 7.07M19.07 4.93a10 10 0 0 1 0 14.14" />
              </svg>
            )}
          </button>
        )}

        <button
          onClick={handlePlayToggle}
          className="w-10 h-10 rounded-full bg-black/60 hover:bg-black/80 text-white border border-white/10 flex items-center justify-center transition-colors focus-visible:ring-2 focus-visible:ring-[#EFA07F] focus-visible:outline-none min-w-[44px] min-h-[44px] cursor-pointer"
          aria-label={isPlaying ? "Pausar" : "Reproducir"}
        >
          {isPlaying ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M8 5v14l11-7z" />
            </svg>
          )}
        </button>
      </div>
    </div>
  );
}

export function FeaturedProject({ onInquire }: { onInquire: (msg: string) => void }) {
  const { language, t } = useLanguage();
  const [lightboxImages, setLightboxImages] = useState<string[] | null>(null);
  const [lightboxGallery, setLightboxGallery] = useState<string[] | null>(null);
  const [lightboxIndex, setLightboxIndex] = useState<number>(0);
  const [zoomPercent, setZoomPercent] = useState<number>(100);
  const [activeHotspot, setActiveHotspot] = useState<HotspotData | null>(null);
  const [boardSrc, setBoardSrc] = useState<string>(tripodeConcept);
  const [isSheetLightboxOpen, setIsSheetLightboxOpen] = useState(false);

  useEffect(() => {
    const localizedPath = `/media/tripode-board-${language}.png`;
    const img = new Image();
    img.src = localizedPath;
    img.onload = () => {
      setBoardSrc(localizedPath);
    };
    img.onerror = () => {
      setBoardSrc(tripodeConcept);
    };
  }, [language]);

  const lightboxContainerRef = useRef<HTMLDivElement>(null);

  const handlePrevImage = () => {
    if (!lightboxGallery) return;
    setLightboxIndex((prev) => (prev > 0 ? prev - 1 : lightboxGallery.length - 1));
  };

  const handleNextImage = () => {
    if (!lightboxGallery) return;
    setLightboxIndex((prev) => (prev < lightboxGallery.length - 1 ? prev + 1 : 0));
  };

  useEffect(() => {
    if (!lightboxImages && !lightboxGallery) {
      setZoomPercent(100);
    }
  }, [lightboxImages, lightboxGallery]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setLightboxImages(null);
        setLightboxGallery(null);
        setActiveHotspot(null);
      } else if (e.key === "ArrowLeft") {
        if (lightboxGallery && lightboxGallery.length > 1) {
          setLightboxIndex((prev) => (prev > 0 ? prev - 1 : lightboxGallery.length - 1));
        }
      } else if (e.key === "ArrowRight") {
        if (lightboxGallery && lightboxGallery.length > 1) {
          setLightboxIndex((prev) => (prev < lightboxGallery.length - 1 ? prev + 1 : 0));
        }
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [lightboxGallery]);

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

  const ref4 = useRef<HTMLDivElement>(null);
  const { scrollYProgress: scroll4 } = useScroll({
    target: ref4,
    offset: ["start end", "end start"],
  });
  const yLeft4 = useTransform(scroll4, [0, 1], ["0%", "-8%"]);

  return (
    <div id="proyectos" className="bg-[var(--ink)] text-[var(--cream)]">
      {/* Proyecto 01: TRÍPODE */}
      <section
        id="tripode"
        ref={ref1}
        className="py-10 md:py-16 px-6 md:px-10 border-b border-[var(--cream)]/10 scroll-mt-28"
      >
        <div className="max-w-[1400px] mx-auto space-y-16 md:space-y-28">
          {/* 1. ENCABEZADO Y SÍNTESIS */}
          <div className="space-y-8">
            <div className="flex items-end justify-between gap-6 border-b border-[var(--cream)]/10 pb-6">
              <div>
                <p className="eyebrow text-[var(--clay-light)] mb-2">{t.projects.tripode.tag}</p>
                <h3 className="display text-4xl md:text-6xl text-white leading-tight">
                  {t.projects.tripode.title}
                </h3>
              </div>
              <div className="hidden md:block text-right text-sm text-[var(--cream)]/85 space-y-1 font-mono">
                <p>{t.projects.tripode.concept}</p>
                <p>{t.projects.tripode.location}</p>
              </div>
            </div>

            <div className="grid md:grid-cols-12 gap-8 md:gap-12 items-start pt-2">
              <div className="md:col-span-8 space-y-4">
                <h4 className="display text-2xl md:text-3xl text-white leading-relaxed italic font-light">
                  "{t.projects.tripode.question.replace('"', "")}"
                </h4>
                <p className="text-[var(--cream)]/85 text-base leading-relaxed">
                  {t.projects.tripode.synthesis}
                </p>
              </div>
              <div className="md:col-span-4 bg-white/5 p-5 rounded-lg border border-white/5 shadow-md">
                <p className="text-[10px] text-[var(--clay-light)] uppercase tracking-widest font-mono mb-3">
                  {t.projects.tripode.techSheet}
                </p>
                <div className="space-y-3">
                  {[
                    {
                      label: t.projects.tripode.stats.tipo,
                      value: t.projects.tripode.stats.tipoVal,
                    },
                    { label: t.projects.tripode.stats.rol, value: t.projects.tripode.stats.rolVal },
                    {
                      label: t.projects.tripode.stats.herramientas,
                      value: t.projects.tripode.stats.herramientasVal,
                    },
                    { label: t.projects.tripode.stats.ano, value: t.projects.tripode.stats.anoVal },
                    {
                      label: t.projects.tripode.stats.alcance,
                      value: t.projects.tripode.stats.alcanceVal,
                    },
                  ].map((stat) => (
                    <div
                      key={stat.label}
                      className="border-b border-white/10 pb-1.5 last:border-0 last:pb-0"
                    >
                      <p className="text-[9px] text-[var(--cream)]/60 uppercase tracking-wider">
                        {stat.label}
                      </p>
                      <p className="text-xs font-semibold text-white mt-0.5">{stat.value}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* 2. VIDEO CONCEPTUAL - Grid editorial de dos columnas */}
          <div className="py-12 md:py-20 border-b border-[var(--cream)]/10">
            <div className="max-w-[1400px] mx-auto px-6 md:px-10 grid md:grid-cols-12 gap-8 md:gap-16 items-center">
              {/* Columna Izquierda: 35–40% del ancho (5 columnas) */}
              <div className="md:col-span-5 space-y-5 text-left">
                <span className="text-[10px] tracking-[0.2em] uppercase font-mono text-[var(--clay-light)] font-bold block">
                  {t.projects.tripode.videoTag}
                </span>
                <h3 className="display text-3xl md:text-4xl text-white leading-tight">
                  {t.projects.tripode.videoTitle}
                </h3>
                <p className="text-sm text-[var(--cream)]/75 leading-relaxed">
                  {t.projects.tripode.videoDesc}
                </p>
                <div className="text-[10px] font-mono text-[var(--cream)]/40 uppercase tracking-widest pt-2 border-t border-white/5">
                  {t.projects.tripode.videoCaption}
                </div>
              </div>

              {/* Columna Derecha: 60–65% del ancho (7 columnas) */}
              <div className="md:col-span-7 flex justify-center w-full">
                <TripodeVideoPlayer />
              </div>
            </div>
          </div>

          {/* 3. LÁMINA DEL SISTEMA */}
          <div className="space-y-8 max-w-[1550px] mx-auto w-full pt-6">
            <div className="max-w-2xl text-left space-y-4">
              <h3 className="display text-3xl md:text-4xl text-white leading-tight">
                {t.projects.tripode.systemTitle}
              </h3>
              <p className="text-sm text-[var(--cream)]/75 leading-relaxed">
                {t.projects.tripode.systemDesc}
              </p>
            </div>

            <div className="space-y-4">
              {/* Barra Editorial Superior */}
              <div className="border-b border-white/10 pb-3 flex items-center justify-between gap-4">
                <span className="text-[10px] md:text-xs font-mono uppercase tracking-widest text-[var(--cream)]/70">
                  {t.projects.tripode.sheetTag}
                </span>
                <button
                  type="button"
                  onClick={() => setIsSheetLightboxOpen(true)}
                  className="px-5 py-2.5 bg-white/10 hover:bg-white/20 text-white rounded-full transition-all duration-300 font-mono text-[10px] tracking-wider border border-white/10 cursor-pointer min-h-[44px] flex items-center justify-center font-bold"
                >
                  {t.projects.tripode.sheetBtn}
                </button>
              </div>

              {/* Aclaración de Idioma (sólo para PT y EN) */}
              {t.projects.tripode.sheetLangWarning && (
                <p className="text-[11px] text-[var(--cream)]/50 font-serif italic text-left -mt-2">
                  {t.projects.tripode.sheetLangWarning}
                </p>
              )}

              {/* Lámina con Marco Blanco Optimizado */}
              <div
                onClick={() => setIsSheetLightboxOpen(true)}
                className="relative w-full bg-white rounded-2xl border border-white/10 shadow-lg p-1 md:p-1.5 cursor-zoom-in group overflow-hidden"
              >
                <img
                  src={boardSrc}
                  alt={t.projects.tripode.sheetAlt}
                  className="w-full h-auto block object-contain rounded-xl transition-all duration-300 group-hover:opacity-95"
                  loading="lazy"
                />

                {/* Visual hover tip */}
                <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none rounded-xl" />
              </div>
            </div>
          </div>

          {/* 4. TRANSFORMACIÓN 01 */}
          <TransformationPair
            title={t.projects.tripode.trans1Title}
            subtitle={t.projects.tripode.trans1Sub}
            description={t.projects.tripode.trans1Desc}
            beforeImg={tripode1Antes}
            afterImg={tripode1Despues}
            beforeLabel="Estado existente"
            afterLabel="Propuesta TRÍPODE"
            onOpenImage={(img) => {
              setLightboxGallery([
                tripodeConcept,
                tripode1Antes,
                tripode1Despues,
                tripode2Antes,
                tripode2Despues,
              ]);
              setLightboxIndex(img === tripode1Antes ? 1 : 2);
            }}
          />

          {/* 5. TRANSFORMACIÓN 02 */}
          <TransformationPair
            title={t.projects.tripode.trans2Title}
            subtitle={t.projects.tripode.trans2Sub}
            description={t.projects.tripode.trans2Desc}
            beforeImg={tripode2Antes}
            afterImg={tripode2Despues}
            beforeLabel="Estado existente"
            afterLabel="Propuesta TRÍPODE"
            onOpenImage={(img) => {
              setLightboxGallery([
                tripodeConcept,
                tripode1Antes,
                tripode1Despues,
                tripode2Antes,
                tripode2Despues,
              ]);
              setLightboxIndex(img === tripode2Antes ? 3 : 4);
            }}
          />

          {/* 6. CIERRE Y SIGUIENTE PROYECTO */}
          <div className="space-y-12">
            <div className="grid md:grid-cols-12 gap-8 md:gap-12 items-start mt-8 pt-8 border-t border-[var(--cream)]/15">
              <div className="md:col-span-7 flex flex-col gap-6">
                <p className="text-base text-[var(--cream)]/90 leading-relaxed font-light font-sans">
                  {t.projects.tripode.cierreDesc1}
                  <strong>{t.projects.tripode.cierreDescBold1}</strong>
                  {t.projects.tripode.cierreDesc2}
                  <strong>{t.projects.tripode.cierreDescBold2}</strong>
                  {t.projects.tripode.cierreDesc3}
                </p>
              </div>

              <div className="md:col-span-5 flex flex-col justify-between h-full pt-4">
                <p className="text-xs text-[var(--cream)]/60 leading-relaxed mb-6 font-sans">
                  {t.projects.tripode.cierreRightText}
                </p>
                <button
                  onClick={() => {
                    const el = document.getElementById("apto-cerezo");
                    if (el) {
                      el.scrollIntoView({ behavior: "smooth" });
                    }
                  }}
                  className="self-start text-xs tracking-[0.2em] uppercase border-b border-[var(--clay-light)] pb-1 text-[var(--clay-light)] hover:opacity-70 transition-opacity text-left font-semibold mt-2 cursor-pointer"
                >
                  {t.projects.tripode.nextProjectLink}
                </button>
              </div>
            </div>

            {/* Ficha inferior */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 border-t border-[var(--cream)]/15 pt-10">
              {t.projects.tripode.metadata.map((d) => (
                <div key={d.k}>
                  <p className="eyebrow text-[var(--clay-light)] mb-2">{d.k}</p>
                  <p className="text-[var(--cream)]/90 text-sm">{d.v}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Proyecto 02: Apto Cerezo */}
      <section
        id="apto-cerezo"
        ref={ref2}
        className="py-12 md:py-16 px-6 md:px-10 border-b border-[var(--cream)]/10 scroll-mt-28"
      >
        <div className="max-w-[1400px] mx-auto space-y-10">
          {/* Header */}
          <div className="flex items-end justify-between gap-6 border-b border-[var(--cream)]/10 pb-10">
            <div>
              <p className="eyebrow text-[var(--clay-light)] mb-3">{t.projects.cerezo.tag}</p>
              <h3 className="display text-4xl md:text-6xl text-white leading-tight">
                {t.projects.cerezo.title.includes("Cerezo") ? (
                  <>
                    {t.projects.cerezo.title.split(" ")[0]}{" "}
                    <em className="italic text-[var(--clay-light)]">
                      {t.projects.cerezo.title.split(" ")[1]}
                    </em>
                  </>
                ) : (
                  t.projects.cerezo.title
                )}
              </h3>
            </div>
            <div className="hidden md:block text-right text-sm text-[var(--cream)]/85 space-y-1">
              <p>{t.projects.cerezo.concept}</p>
              <p>{t.projects.cerezo.location}</p>
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
                    project: t.projects.cerezo.title,
                    title: t.projects.cerezo.hotspot1.title,
                    decision: t.projects.cerezo.hotspot1.decision,
                    rationale: t.projects.cerezo.hotspot1.rationale,
                    pillar: t.projects.cerezo.hotspot1.pillar,
                  })
                }
              />

              <Hotspot
                x="62%"
                y="38%"
                onClick={() =>
                  setActiveHotspot({
                    project: t.projects.cerezo.title,
                    title: t.projects.cerezo.hotspot2.title,
                    decision: t.projects.cerezo.hotspot2.decision,
                    rationale: t.projects.cerezo.hotspot2.rationale,
                    pillar: t.projects.cerezo.hotspot2.pillar,
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
                  {t.projects.cerezo.desc1}
                  <strong>{t.projects.cerezo.descBold1}</strong>
                  {t.projects.cerezo.desc2}
                </p>
                <p className="text-[var(--cream)]/70 leading-relaxed text-sm">
                  {t.projects.cerezo.desc3}
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
                {t.projects.cerezo.inquiryBtn}
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

      {/* Proyecto 03: Centro Orange Hill */}
      <section ref={ref3} className="py-12 md:py-16 border-b border-[var(--cream)]/10 px-0">
        {/* Header (Contenedor limitado) */}
        <div className="max-w-[1400px] mx-auto px-6 md:px-10 mb-10">
          <div className="flex items-end justify-between gap-6 border-b border-[var(--cream)]/10 pb-10">
            <div>
              <p className="eyebrow text-[var(--clay-light)] mb-3">{t.projects.orange.tag}</p>
              <h3 className="display text-4xl md:text-6xl text-white leading-tight">
                {t.projects.orange.title.includes("Orange") ? (
                  <>
                    {t.projects.orange.title.split(" ")[0]}{" "}
                    <em className="italic text-[var(--clay-light)]">
                      {t.projects.orange.title.split(" ")[1]}{" "}
                      {t.projects.orange.title.split(" ")[2]}
                    </em>
                  </>
                ) : (
                  t.projects.orange.title
                )}
              </h3>
            </div>
            <div className="hidden md:block text-right text-sm text-[var(--cream)]/85 space-y-1">
              <p>{t.projects.orange.concept}</p>
              <p>{t.projects.orange.location}</p>
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
                  {t.projects.orange.desc1}
                  <strong>{t.projects.orange.descBold1}</strong>
                  {t.projects.orange.desc2}
                </p>
                <p className="text-[var(--cream)]/75 text-sm md:text-base leading-relaxed">
                  {t.projects.orange.desc3}
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
                  {t.projects.orange.videoTitle}
                </p>
                <div className="relative overflow-hidden rounded-lg border border-[var(--cream)]/15 aspect-video shadow-lg group">
                  <AutoplayVideo
                    src={beachVideo}
                    className="w-full h-full object-cover origin-top-left scale-[1.15] transition-transform duration-700 group-hover:scale-[1.20]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[rgba(20,10,5,0.4)] to-transparent flex items-end p-3">
                    <p className="text-[10px] font-mono text-[var(--cream)]/90 tracking-wide">
                      {t.projects.orange.videoCaption}
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
                  {t.projects.orange.sheetsLabel}
                </p>
                <h3 className="display text-3xl md:text-4xl">{t.projects.orange.sheetsTitle}</h3>
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

      {/* Proyecto 04: Casino The Lounge */}
      <section ref={ref4} className="py-12 md:py-16 px-6 md:px-10">
        <div className="max-w-[1400px] mx-auto space-y-10">
          {/* Header */}
          <div className="flex items-end justify-between gap-6 border-b border-[var(--cream)]/10 pb-10">
            <div>
              <p className="eyebrow text-[var(--clay-light)] mb-3">{t.projects.casino.tag}</p>
              <h3 className="display text-4xl md:text-6xl text-white leading-tight">
                {t.projects.casino.title.includes("Casino") ? (
                  <>
                    {t.projects.casino.title.split(" ")[0]}{" "}
                    <em className="italic text-[var(--clay-light)]">
                      {t.projects.casino.title.split(" ")[1]}{" "}
                      {t.projects.casino.title.split(" ")[2]}
                    </em>
                  </>
                ) : (
                  t.projects.casino.title
                )}
              </h3>
            </div>
            <div className="hidden md:block text-right text-sm text-[var(--cream)]/85 space-y-1">
              <p>{t.projects.casino.concept}</p>
              <p>{t.projects.tripode.location}</p>
            </div>
          </div>

          {/* Fila Superior: Comparaciones de Antes y Después en Grid de 2 Columnas */}
          <div className="grid md:grid-cols-2 gap-8 md:gap-12">
            <div className="space-y-4">
              <p className="text-[10px] text-[var(--clay-light)] uppercase tracking-widest font-mono font-bold">
                {t.projects.casino.facadeLabel}
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
                {t.projects.casino.interiorLabel}
              </p>
              <ComparisonSlider
                beforeImg={casinoProcess}
                afterImg={casinoInteriorFinished}
                beforeLabel="{t.projects.casino.beforeLabel}"
                afterLabel="{t.projects.casino.afterLabel}"
              />
            </div>
          </div>

          {/* Fila del Medio: Textos y CTA */}
          <div className="grid md:grid-cols-12 gap-8 md:gap-12 items-start mt-8">
            {/* Columna Izquierda: Textos descriptivos (ocupa 7 columnas) */}
            <div className="md:col-span-7 flex flex-col gap-6">
              <div className="space-y-4">
                <p className="text-[var(--cream)]/85 leading-relaxed">
                  {t.projects.casino.desc1}
                  <strong>{t.projects.casino.descBold1}</strong>
                  {t.projects.casino.desc2}
                </p>
                <p className="text-[var(--cream)]/70 leading-relaxed text-sm">
                  {t.projects.casino.desc3}
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
                {t.projects.casino.inquiryBtn}
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
                      alt={
                        language === "es"
                          ? `Lámina Ampliada Parte ${index + 1}`
                          : language === "pt"
                            ? `Prancha Ampliada Parte ${index + 1}`
                            : `Enlarged Sheet Part ${index + 1}`
                      }
                      className="w-full h-auto block object-contain transition-all duration-300"
                      loading="eager"
                    />
                  ))}
                </div>
              </div>
              <div className="mt-4 pt-3 border-t border-black/10 flex flex-wrap gap-4 justify-between items-center text-[10px] font-mono text-black/60 uppercase tracking-wider">
                <div className="flex flex-wrap items-center gap-4">
                  <span className="hidden sm:inline">{t.projects.zoomTitle}</span>
                  <div className="flex bg-black/5 rounded p-0.5 border border-black/10">
                    {[
                      { val: 100, label: t.projects.zoomPercent100 },
                      { val: 250, label: t.projects.zoomPercent250 },
                      { val: 400, label: t.projects.zoomPercent400 },
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
                  {t.projects.closeView}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}

        {lightboxGallery && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex items-center justify-center p-4 md:p-10 cursor-zoom-out"
            onClick={() => setLightboxGallery(null)}
          >
            {/* Gallery Slide */}
            <motion.div
              initial={{ scale: 0.95, y: 10 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 10 }}
              transition={{ type: "spring", damping: 25, stiffness: 220 }}
              className="relative max-w-[95vw] md:max-w-6xl w-full bg-[#1b1715] rounded-xl p-4 md:p-6 shadow-2xl border border-white/5 my-auto cursor-default transition-all duration-300 flex flex-col justify-between"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Image viewer */}
              <div className="relative max-h-[70vh] flex items-center justify-center overflow-hidden bg-black/40 rounded-lg p-2 aspect-[4/3] md:aspect-[16/10] w-full">
                <img
                  src={lightboxGallery[lightboxIndex]}
                  alt={`Gallery Image ${lightboxIndex + 1}`}
                  className="max-w-full max-h-full object-contain select-none transition-all duration-300"
                  style={{ transform: `scale(${zoomPercent / 100})` }}
                />

                {/* Navigation arrows */}
                {lightboxGallery.length > 1 && (
                  <>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handlePrevImage();
                      }}
                      className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-black/60 hover:bg-black/85 text-white flex items-center justify-center border border-white/10 shadow-lg cursor-pointer transition-transform hover:scale-105 active:scale-95 text-lg font-bold"
                      aria-label={t.projects.prevImage}
                    >
                      ←
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleNextImage();
                      }}
                      className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-black/60 hover:bg-black/85 text-white flex items-center justify-center border border-white/10 shadow-lg cursor-pointer transition-transform hover:scale-105 active:scale-95 text-lg font-bold"
                      aria-label={t.projects.nextImage}
                    >
                      →
                    </button>
                  </>
                )}
              </div>

              {/* Status and Zoom Controls */}
              <div className="mt-4 pt-3 border-t border-white/10 flex flex-wrap gap-4 justify-between items-center text-[10px] font-mono text-[var(--cream)]/60 uppercase tracking-wider">
                <div className="flex flex-wrap items-center gap-4">
                  {lightboxGallery.length > 1 && (
                    <span className="text-[var(--clay-light)] font-bold">
                      {t.projects.galleryStatus
                        .replace("{index}", String(lightboxIndex + 1))
                        .replace("{total}", String(lightboxGallery.length))}
                    </span>
                  )}
                  <span className="hidden sm:inline">{t.projects.galleryTip}</span>
                  <div className="flex bg-black/20 rounded p-0.5 border border-white/10">
                    {[
                      { val: 100, label: "100%" },
                      { val: 150, label: "150%" },
                      { val: 200, label: "200%" },
                    ].map((opt) => (
                      <button
                        key={opt.val}
                        onClick={() => setZoomPercent(opt.val)}
                        className={`px-3 py-1.5 rounded text-[9px] font-bold cursor-pointer transition-all duration-200 ${
                          zoomPercent === opt.val
                            ? "bg-[var(--clay)] text-white shadow-sm"
                            : "text-[var(--cream)]/60 hover:text-white hover:bg-white/5"
                        }`}
                      >
                        {opt.label}
                      </button>
                    ))}
                  </div>
                </div>
                <button
                  onClick={() => setLightboxGallery(null)}
                  className="text-[var(--clay-light)] font-bold hover:underline"
                >
                  {t.projects.closeView}
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
                      {t.projects.keyPoint}
                    </p>
                  </div>
                  <button
                    onClick={() => setActiveHotspot(null)}
                    className="w-10 h-10 rounded-full border border-white/10 hover:border-white/30 text-white flex items-center justify-center transition-colors text-lg"
                    aria-label={t.projects.closePanel}
                  >
                    ×
                  </button>
                </div>

                <div className="space-y-6">
                  <div>
                    <span className="eyebrow text-[var(--clay-light)] text-[10px]">
                      {t.projects.howIThinkTitle}
                    </span>
                    <h3 className="display text-3xl md:text-4xl text-white mt-2 leading-[1.05]">
                      {activeHotspot.title}
                    </h3>
                  </div>

                  <div className="bg-white/5 p-4 rounded-lg border border-white/5 space-y-2">
                    <span className="text-[8px] font-mono uppercase tracking-widest text-[var(--clay-light)] block">
                      {t.projects.decisionExecuted}
                    </span>
                    <p className="text-sm font-semibold text-white leading-relaxed">
                      {activeHotspot.decision}
                    </p>
                  </div>

                  <div className="space-y-2 pt-2">
                    <span className="text-[8px] font-mono uppercase tracking-widest text-[var(--cream)]/50 block">
                      {t.projects.scientificRationale}
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
                  <span>{t.projects.relatedPillar}</span>
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
                  {t.projects.discussApproach}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Lightbox Dedicado de la Lámina */}
      <SheetLightbox
        isOpen={isSheetLightboxOpen}
        onClose={() => setIsSheetLightboxOpen(false)}
        imageSrc={boardSrc}
        imageAlt={t.projects.tripode.sheetAlt}
      />
    </div>
  );
}

interface SheetLightboxProps {
  isOpen: boolean;
  onClose: () => void;
  imageSrc: string;
  imageAlt: string;
}

function SheetLightbox({ isOpen, onClose, imageSrc, imageAlt }: SheetLightboxProps) {
  const [zoom, setZoom] = useState(100);
  const [isMounted, setIsMounted] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Lock page scrolling when open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  // Handle Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };
    if (isOpen) {
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen || !isMounted) return null;

  const handleZoomIn = () => setZoom((prev) => Math.min(300, prev + 25));
  const handleZoomOut = () => setZoom((prev) => Math.max(50, prev - 25));
  const handleZoomReset = () => setZoom(100);

  return createPortal(
    <div
      className="fixed inset-0 z-[99999] bg-black/95 backdrop-blur-md flex flex-col justify-between p-4 md:p-6 select-none animate-in fade-in duration-200"
      role="dialog"
      aria-modal="true"
      aria-label="Image viewer"
    >
      {/* Top Header / Bar */}
      <div className="flex items-center justify-between text-[var(--cream)]/80 text-xs font-mono pb-2 border-b border-white/10 z-30">
        <span>{imageAlt}</span>
        <button
          onClick={onClose}
          className="text-2xl hover:text-white font-bold transition-colors w-10 h-10 flex items-center justify-center rounded-full hover:bg-white/10 cursor-pointer"
          aria-label="Cerrar vista"
        >
          ×
        </button>
      </div>

      {/* Main Container */}
      <div
        ref={containerRef}
        onClick={onClose}
        className="flex-1 w-full flex items-center justify-center overflow-auto p-4 md:p-8 cursor-zoom-out"
      >
        <div
          className="flex items-center justify-center transition-all duration-200"
          style={{
            width: `${zoom}%`,
            minWidth: zoom > 100 ? `${zoom}%` : "auto",
            maxWidth: zoom <= 100 ? "100%" : "none",
          }}
          onClick={(e) => e.stopPropagation()}
        >
          <img
            ref={imgRef}
            src={imageSrc}
            alt={imageAlt}
            className={`max-w-full h-auto block object-contain rounded-lg shadow-2xl transition-all duration-200 select-none ${
              zoom > 100 ? "cursor-grab active:cursor-grabbing" : "cursor-zoom-in"
            }`}
            onClick={zoom <= 100 ? handleZoomIn : undefined}
          />
        </div>
      </div>

      {/* Controls Footer */}
      <div className="flex flex-wrap items-center justify-between gap-4 pt-3 border-t border-white/10 z-30">
        {/* Zoom Controls */}
        <div className="flex items-center gap-2">
          <button
            onClick={handleZoomOut}
            disabled={zoom <= 50}
            className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 disabled:opacity-40 text-white flex items-center justify-center border border-white/10 transition-colors cursor-pointer min-h-[44px] min-w-[44px]"
            aria-label="Disminuir zoom"
          >
            －
          </button>
          <span className="text-[10px] font-mono text-[var(--cream)] w-12 text-center">
            {zoom}%
          </span>
          <button
            onClick={handleZoomIn}
            disabled={zoom >= 300}
            className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 disabled:opacity-40 text-white flex items-center justify-center border border-white/10 transition-colors cursor-pointer min-h-[44px] min-w-[44px]"
            aria-label="Aumentar zoom"
          >
            ＋
          </button>
          <button
            onClick={handleZoomReset}
            className="px-4 py-2 rounded-full bg-white/10 hover:bg-white/20 text-white text-[10px] font-mono border border-white/10 transition-colors cursor-pointer min-h-[44px] flex items-center justify-center"
          >
            100%
          </button>
        </div>

        {/* Close Button */}
        <button
          onClick={onClose}
          className="px-6 py-2 rounded-full bg-[var(--primary)] hover:bg-[#EFA07F] text-white hover:text-[var(--ink)] text-[10px] font-mono transition-colors font-bold cursor-pointer min-h-[44px] flex items-center justify-center"
        >
          CERRAR
        </button>
      </div>
    </div>,
    document.body,
  );
}
