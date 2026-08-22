import { motion, useScroll, useMotionValueEvent, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { useLanguage } from "../../context/LanguageContext";
import { CvDownloadMenu } from "./CvDownloadMenu";

export function Nav() {
  const { language, t, setLanguage } = useLanguage();
  const [mobileLangOpen, setMobileLangOpen] = useState(false);
  const { scrollY } = useScroll();
  const [isScrolled, setIsScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  const links = [
    { href: "#about", label: t.nav.about },
    { href: "#enfoque", label: t.nav.approach },
    { href: "#proyectos", label: t.nav.projects },
    { href: "#proceso", label: t.nav.process },
    { href: "#contacto", label: t.nav.contact },
  ];

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(mediaQuery.matches);
    const listener = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
    mediaQuery.addEventListener("change", listener);
    return () => mediaQuery.removeEventListener("change", listener);
  }, []);

  useMotionValueEvent(scrollY, "change", (latest) => {
    setIsScrolled(latest > 50);

    // Hide when scrolling down, show when scrolling up
    if (latest > lastScrollY && latest > 150) {
      setIsVisible(false);
    } else {
      setIsVisible(true);
    }
    setLastScrollY(latest);
  });

  const handleFocus = () => {
    setIsVisible(true);
  };

  return (
    <>
      <header
        onFocus={handleFocus}
        className={`fixed inset-x-0 z-50 flex justify-center ${
          isScrolled ? "top-4 px-4" : "top-0 px-0"
        } ${isVisible || open ? "translate-y-0" : "-translate-y-full"} ${
          prefersReducedMotion ? "" : "transition-all duration-500 ease-out"
        }`}
      >
        <div
          className={`flex items-center justify-between transition-all duration-500 ease-out ${
            isScrolled
              ? "w-full max-w-5xl bg-[var(--cream)]/85 backdrop-blur-xl border border-black/5 shadow-[0_8px_30px_rgba(0,0,0,0.06)] rounded-full px-6 md:px-8 py-3"
              : "w-full max-w-[1400px] bg-transparent px-6 md:px-10 py-6"
          }`}
        >
          <a
            href="#top"
            onClick={(e) => {
              e.preventDefault();
              const el = document.getElementById("top");
              if (el) el.scrollIntoView({ behavior: "smooth" });
            }}
            className={`display tracking-tight transition-all duration-500 ${
              isScrolled ? "text-xl text-ink" : "text-2xl text-white drop-shadow-md"
            }`}
          >
            Natalia{" "}
            <span
              className={`italic transition-colors duration-500 ${
                isScrolled ? "text-[oklch(0.38_0.11_40)]" : "text-white/90"
              }`}
            >
              Ramírez
            </span>
          </a>

          <nav className="hidden md:flex gap-8 text-[0.75rem] uppercase tracking-widest font-medium">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className={`transition-colors duration-300 ${
                  isScrolled
                    ? "text-foreground/75 hover:text-[var(--clay)]"
                    : "text-white/90 hover:text-white drop-shadow-sm"
                }`}
              >
                {l.label}
              </a>
            ))}
          </nav>

          {/* Desktop Language Selector */}
          <div
            className={`hidden md:inline-flex items-center border rounded-full p-0.5 transition-all duration-300 ${
              isScrolled ? "border-foreground/10 bg-background/50" : "border-white/20 bg-white/5"
            }`}
          >
            {(["es", "pt", "en"] as const).map((langCode) => {
              const isActive = language === langCode;
              return (
                <button
                  key={langCode}
                  onClick={() => setLanguage(langCode)}
                  aria-label={
                    langCode === "es"
                      ? "Cambiar idioma a Español"
                      : langCode === "pt"
                        ? "Alterar idioma para Português"
                        : "Change language to English"
                  }
                  className={`text-[0.65rem] font-bold tracking-[0.1em] uppercase rounded-full w-11 h-11 flex items-center justify-center transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--clay)] focus-visible:ring-offset-2 cursor-pointer ${
                    isActive
                      ? "bg-[var(--clay)] text-white shadow-sm"
                      : isScrolled
                        ? "text-foreground/75 hover:text-foreground hover:bg-black/5"
                        : "text-white/80 hover:text-white hover:bg-white/10"
                  }`}
                >
                  {langCode}
                </button>
              );
            })}
          </div>

          <CvDownloadMenu
            align="right"
            className={`hidden md:inline-flex text-[0.65rem] tracking-[0.2em] uppercase px-5 py-2.5 rounded-full transition-all duration-300 ${
              isScrolled
                ? "bg-foreground text-background hover:bg-[var(--clay)] shadow-md"
                : "border border-white/40 text-white hover:bg-white hover:text-black backdrop-blur-sm"
            }`}
          />

          <button
            onClick={() => setOpen((v) => !v)}
            className="md:hidden flex flex-col gap-[5px] p-2 z-60"
            aria-label={open ? "Cerrar menú" : "Abrir menú"}
          >
            <motion.span
              animate={open ? { rotate: 45, y: 7 } : { rotate: 0, y: 0 }}
              className={`block w-6 h-[1.5px] origin-center transition-colors duration-300 ${open || isScrolled ? "bg-foreground" : "bg-white"}`}
            />
            <motion.span
              animate={open ? { opacity: 0 } : { opacity: 1 }}
              className={`block w-6 h-[1.5px] transition-colors duration-300 ${open || isScrolled ? "bg-foreground" : "bg-white"}`}
            />
            <motion.span
              animate={open ? { rotate: -45, y: -7 } : { rotate: 0, y: 0 }}
              className={`block w-6 h-[1.5px] origin-center transition-colors duration-300 ${open || isScrolled ? "bg-foreground" : "bg-white"}`}
            />
          </button>
        </div>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 z-40 bg-[var(--cream)] flex flex-col justify-center px-10"
          >
            <nav className="flex flex-col gap-2">
              {links.map((l, i) => (
                <motion.a
                  key={l.href}
                  href={l.href}
                  onClick={() => setOpen(false)}
                  initial={{ opacity: 0, x: -24 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.08 + i * 0.07, duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                  className="display text-[clamp(3rem,12vw,6rem)] leading-tight text-foreground/90 hover:text-[var(--clay)] transition-colors"
                >
                  {l.label}
                </motion.a>
              ))}
            </nav>
            <div className="mt-14 flex flex-col gap-6 sm:flex-row sm:items-center">
              <motion.a
                href="#contacto"
                onClick={() => setOpen(false)}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="self-start text-xs tracking-[0.2em] uppercase border border-foreground/30 px-5 py-3 hover:bg-foreground hover:text-background transition-colors rounded-full"
              >
                {language === "es"
                  ? "Trabajemos juntos"
                  : language === "pt"
                    ? "Vamos trabalhar juntos"
                    : "Let's work together"}
              </motion.a>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.42 }}
                className="self-start"
              >
                <CvDownloadMenu
                  align="left"
                  className="text-xs tracking-[0.2em] uppercase border border-foreground/30 px-5 py-3 hover:bg-foreground hover:text-background transition-colors rounded-full flex items-center justify-center gap-1.5 cursor-pointer min-h-[44px]"
                />
              </motion.div>

              {/* Mobile Language Selector Dropdown */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.45 }}
                className="relative self-start"
              >
                <button
                  onClick={() => setMobileLangOpen(!mobileLangOpen)}
                  aria-label="Seleccionar idioma / Select language / Selecionar idioma"
                  aria-haspopup="listbox"
                  aria-expanded={mobileLangOpen}
                  className="flex items-center gap-2 text-xs tracking-[0.2em] uppercase border border-foreground/30 px-5 py-3 rounded-full hover:bg-foreground hover:text-background transition-colors min-h-[44px] cursor-pointer"
                >
                  IDIOMA · {language.toUpperCase()}
                </button>
                <AnimatePresence>
                  {mobileLangOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      className="absolute bottom-full mb-3 left-0 bg-[var(--cream)] border border-foreground/15 rounded-xl shadow-xl py-2 min-w-[160px] z-50"
                    >
                      <div role="listbox" aria-label="Idiomas disponibles">
                        {(
                          [
                            { code: "es", label: "Español" },
                            { code: "pt", label: "Português" },
                            { code: "en", label: "English" },
                          ] as const
                        ).map((item) => {
                          const isActive = language === item.code;
                          return (
                            <button
                              key={item.code}
                              role="option"
                              aria-selected={isActive}
                              onClick={() => {
                                setLanguage(item.code);
                                setMobileLangOpen(false);
                                setOpen(false);
                              }}
                              className={`w-full text-left px-5 py-3 text-xs uppercase tracking-wider transition-colors min-h-[44px] flex items-center justify-between cursor-pointer ${
                                isActive
                                  ? "bg-[var(--clay)] text-white font-bold"
                                  : "text-foreground hover:bg-black/5"
                              }`}
                            >
                              <span>{item.label}</span>
                              {isActive && <span className="font-sans">✓</span>}
                            </button>
                          );
                        })}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
