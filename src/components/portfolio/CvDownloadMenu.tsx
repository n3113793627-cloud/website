import { useState, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { useLanguage } from "../../context/LanguageContext";

interface CvDownloadMenuProps {
  className?: string;
  align?: "left" | "right";
}

export function CvDownloadMenu({ className = "", align = "right" }: CvDownloadMenuProps) {
  const { language } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const [focusedIndex, setFocusedIndex] = useState(-1);
  const [isMounted, setIsMounted] = useState(false);
  const [coords, setCoords] = useState({ top: 0, left: 0 });

  const containerRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const options = [
    {
      code: "es",
      langLabel: "Español",
      description: "CV en español · PDF",
      fileName: "natalia-ramirez-cv-es.pdf",
      ariaLabel: "Descargar currículum de Natalia Ramírez en Español",
    },
    {
      code: "pt",
      langLabel: "Português",
      description: "Currículo em português · PDF",
      fileName: "natalia-ramirez-cv-pt.pdf",
      ariaLabel: "Baixar currículo de Natalia Ramírez em Português",
    },
    {
      code: "en",
      langLabel: "English",
      description: "CV in English · PDF",
      fileName: "natalia-ramirez-cv-en.pdf",
      ariaLabel: "Download Natalia Ramírez's CV in English",
    },
  ];

  const getTriggerLabel = () => {
    switch (language) {
      case "pt":
        return "Baixar CV";
      case "en":
        return "Download CV";
      default:
        return "Descargar CV";
    }
  };

  // Enable client-side mounting for Portal
  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Close when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      // If clicking trigger or dropdown, let their internal logic handle it
      if (
        (triggerRef.current && triggerRef.current.contains(event.target as Node)) ||
        (dropdownRef.current && dropdownRef.current.contains(event.target as Node))
      ) {
        return;
      }
      setIsOpen(false);
    };
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  // Position calculation and scroll/resize listeners
  useEffect(() => {
    if (!isOpen) return;

    const measureAndPosition = () => {
      if (!triggerRef.current) return;
      const rect = triggerRef.current.getBoundingClientRect();
      const dropdownEl = dropdownRef.current;

      const dropdownHeight = dropdownEl ? dropdownEl.offsetHeight : 180;
      const dropdownWidth = dropdownEl ? dropdownEl.offsetWidth : 290;
      const gap = 8;
      const margin = 16;

      // Check vertical space
      const spaceBelow = window.innerHeight - rect.bottom;
      const openDown = spaceBelow >= dropdownHeight + gap || spaceBelow > rect.top;

      let top = 0;
      if (openDown) {
        top = rect.bottom + gap;
      } else {
        top = rect.top - dropdownHeight - gap;
      }

      // Horizontal bounds clamping
      let left = align === "right" ? rect.right - dropdownWidth : rect.left;
      left = Math.max(margin, Math.min(window.innerWidth - dropdownWidth - margin, left));

      setCoords({ top, left });
    };

    // Run measurement immediately
    measureAndPosition();

    // Close on scroll or recalculate on resize
    window.addEventListener("resize", measureAndPosition);
    const handleScroll = () => setIsOpen(false);
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("resize", measureAndPosition);
      window.removeEventListener("scroll", handleScroll);
    };
  }, [isOpen, align]);

  // Handle keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!isOpen) {
      if (e.key === "ArrowDown" || e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        setIsOpen(true);
        setFocusedIndex(0);
      }
      return;
    }

    switch (e.key) {
      case "Escape":
        e.preventDefault();
        setIsOpen(false);
        triggerRef.current?.focus();
        break;
      case "ArrowDown":
        e.preventDefault();
        setFocusedIndex((prev) => (prev + 1) % options.length);
        break;
      case "ArrowUp":
        e.preventDefault();
        setFocusedIndex((prev) => (prev - 1 + options.length) % options.length);
        break;
      case "Tab":
        setIsOpen(false);
        break;
      default:
        break;
    }
  };

  // Sync keyboard focus to items
  useEffect(() => {
    if (isOpen && focusedIndex >= 0) {
      const items = dropdownRef.current?.querySelectorAll('[role="menuitem"]');
      if (items && items[focusedIndex]) {
        (items[focusedIndex] as HTMLElement).focus();
      }
    }
  }, [focusedIndex, isOpen]);

  // Reset focus index when closed
  useEffect(() => {
    if (!isOpen) {
      setFocusedIndex(-1);
      setCoords({ top: 0, left: 0 }); // reset positions
    }
  }, [isOpen]);

  const dropdownMenu = isOpen && isMounted && (
    <div
      ref={dropdownRef}
      style={{
        position: "fixed",
        top: coords.top,
        left: coords.left,
        visibility: coords.top === 0 ? "hidden" : "visible",
      }}
      className="w-[290px] rounded-xl bg-[var(--cream)] border border-foreground/15 shadow-xl z-[9999] py-2 overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200"
      role="menu"
      aria-label="CV Download Options"
      onKeyDown={handleKeyDown}
    >
      {options.map((opt, i) => {
        const isSiteLang = language === opt.code;
        return (
          <a
            key={opt.code}
            href={`/cv/${opt.fileName}`}
            download={opt.fileName}
            role="menuitem"
            tabIndex={focusedIndex === i ? 0 : -1}
            onClick={() => setIsOpen(false)}
            aria-label={opt.ariaLabel}
            className={`w-full px-5 py-3 text-xs text-left text-[var(--ink)] flex items-center justify-between border-b border-foreground/5 last:border-0 hover:bg-black/5 focus:bg-black/5 focus:outline-none transition-colors min-h-[44px] cursor-pointer ${
              isSiteLang ? "text-[var(--clay)] font-semibold" : ""
            }`}
          >
            <div className="flex flex-col gap-0.5">
              <span className="font-semibold text-[13px]">{opt.langLabel}</span>
              <span className="text-[10px] text-foreground/60">{opt.description}</span>
            </div>
            {isSiteLang && (
              <span className="text-[var(--clay)] text-sm font-sans" aria-hidden="true">
                ✓
              </span>
            )}
          </a>
        );
      })}
    </div>
  );

  return (
    <div ref={containerRef} className="relative inline-block text-left" onKeyDown={handleKeyDown}>
      <button
        ref={triggerRef}
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        aria-haspopup="menu"
        aria-expanded={isOpen}
        aria-label={`${getTriggerLabel()} Options`}
        className={`${className} flex items-center justify-center gap-1.5 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--clay)] focus-visible:ring-offset-2`}
      >
        <span>{getTriggerLabel()}</span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="12"
          height="12"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="3"
          className={`transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
        >
          <path d="m6 9 6 6 6-6" />
        </svg>
      </button>

      {/* Render menu dropdown inside Portal mounted at document.body */}
      {isOpen && isMounted && createPortal(dropdownMenu, document.body)}
    </div>
  );
}
