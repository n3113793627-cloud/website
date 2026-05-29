import { motion, useScroll, useTransform } from "framer-motion";

export function Nav() {
  const { scrollY } = useScroll();
  const bg = useTransform(
    scrollY,
    [0, 200],
    ["rgba(245, 238, 225, 0)", "rgba(245, 238, 225, 0.92)"],
  );
  const border = useTransform(scrollY, [0, 200], ["rgba(0,0,0,0)", "rgba(0,0,0,0.08)"]);

  return (
    <motion.header
      style={{ backgroundColor: bg, borderBottomColor: border }}
      className="fixed top-0 inset-x-0 z-50 backdrop-blur-sm border-b"
    >
      <div className="max-w-[1400px] mx-auto px-6 md:px-10 py-5 flex items-center justify-between">
        <a href="#top" className="display text-xl tracking-tight text-ink">
          Natalia <span className="italic text-[var(--clay)]">Ramírez</span>
        </a>
        <nav className="hidden md:flex gap-10 text-sm text-foreground/80">
          <a href="#about" className="hover:text-[var(--clay)] transition-colors">Sobre mí</a>
          <a href="#proyectos" className="hover:text-[var(--clay)] transition-colors">Proyectos</a>
          <a href="#proceso" className="hover:text-[var(--clay)] transition-colors">Proceso</a>
          <a href="#contacto" className="hover:text-[var(--clay)] transition-colors">Contacto</a>
        </nav>
        <a
          href="#contacto"
          className="hidden md:inline-flex text-xs tracking-[0.2em] uppercase border border-foreground/30 px-4 py-2 hover:bg-foreground hover:text-background transition-colors"
        >
          Trabajemos juntos
        </a>
      </div>
    </motion.header>
  );
}