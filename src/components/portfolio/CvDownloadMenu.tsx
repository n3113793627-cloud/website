import { useState, useEffect, useRef } from "react";
import { useLanguage } from "../../context/LanguageContext";

interface CvDownloadMenuProps {
  className?: string;
  align?: "left" | "right";
}

export function CvDownloadMenu({ className = "", align = "right" }: CvDownloadMenuProps) {
  const { language } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const [focusedIndex, setFocusedIndex] = useState(-1);
  const containerRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);

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

  // Close when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

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
        // Keep focus inside or close
        setIsOpen(false);
        break;
      default:
        break;
    }
  };

  // Sync keyboard focus to items
  useEffect(() => {
    if (isOpen && focusedIndex >= 0) {
      const items = containerRef.current?.querySelectorAll('[role="menuitem"]');
      if (items && items[focusedIndex]) {
        (items[focusedIndex] as HTMLElement).focus();
      }
    }
  }, [focusedIndex, isOpen]);

  // Sync focus back to trigger when closed manually
  useEffect(() => {
    if (!isOpen) {
      setFocusedIndex(-1);
    }
  }, [isOpen]);

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

      {isOpen && (
        <div
          className={`absolute ${
            align === "right" ? "right-0" : "left-0"
          } mt-2 w-[290px] rounded-xl bg-[var(--cream)] border border-foreground/15 shadow-xl z-[100] py-2 overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200`}
          role="menu"
          aria-label="CV Download Options"
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
      )}
    </div>
  );
}
