import { motion, useScroll, useMotionValueEvent, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

const links = [
  { href: "#about", label: "Sobre mí" },
  { href: "#enfoque", label: "Enfoque" },
  { href: "#proyectos", label: "Proyectos" },
  { href: "#proceso", label: "Proceso" },
  { href: "#contacto", label: "Contacto" },
];

export function Nav() {
  const { scrollY } = useScroll();
  const [isScrolled, setIsScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

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

          <a
            href="/documents/CV_Natalia_Ramirez_Diaz_ES.pdf"
            download="CV_Natalia_Ramirez_Diaz_ES.pdf"
            aria-label="Descargar currículum de Natalia Ramírez Díaz en PDF"
            className={`hidden md:inline-flex text-[0.65rem] tracking-[0.2em] uppercase px-5 py-2.5 rounded-full transition-all duration-300 ${
              isScrolled
                ? "bg-foreground text-background hover:bg-[var(--clay)] shadow-md"
                : "border border-white/40 text-white hover:bg-white hover:text-black backdrop-blur-sm"
            }`}
          >
            DESCARGAR CV
          </a>

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
            <motion.a
              href="#contacto"
              onClick={() => setOpen(false)}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="mt-14 self-start text-xs tracking-[0.2em] uppercase border border-foreground/30 px-5 py-3 hover:bg-foreground hover:text-background transition-colors rounded-full"
            >
              Trabajemos juntos
            </motion.a>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
