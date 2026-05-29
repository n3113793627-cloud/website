import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { useState } from "react";

const links = [
  { href: "#about", label: "Sobre mí" },
  { href: "#proyectos", label: "Proyectos" },
  { href: "#proceso", label: "Proceso" },
  { href: "#contacto", label: "Contacto" },
];

export function Nav() {
  const { scrollY } = useScroll();
  const bg = useTransform(
    scrollY,
    [0, 200],
    ["rgba(245, 238, 225, 0)", "rgba(245, 238, 225, 0.92)"],
  );
  const border = useTransform(scrollY, [0, 200], ["rgba(0,0,0,0)", "rgba(0,0,0,0.08)"]);
  const [open, setOpen] = useState(false);

  return (
    <>
      <motion.header
        style={{ backgroundColor: bg, borderBottomColor: border }}
        className="fixed top-0 inset-x-0 z-50 backdrop-blur-sm border-b"
      >
        <div className="max-w-[1400px] mx-auto px-6 md:px-10 py-5 flex items-center justify-between">
          <a href="#top" className="display text-xl tracking-tight text-ink">
            Natalia <span className="italic text-[var(--clay)]">Ramírez</span>
          </a>

          <nav className="hidden md:flex gap-10 text-sm text-foreground/80">
            {links.map((l) => (
              <a key={l.href} href={l.href} className="hover:text-[var(--clay)] transition-colors">
                {l.label}
              </a>
            ))}
          </nav>

          <a
            href="#contacto"
            className="hidden md:inline-flex text-xs tracking-[0.2em] uppercase border border-foreground/30 px-4 py-2 hover:bg-foreground hover:text-background transition-colors"
          >
            Trabajemos juntos
          </a>

          <button
            onClick={() => setOpen((v) => !v)}
            className="md:hidden flex flex-col gap-[5px] p-2 z-60"
            aria-label={open ? "Cerrar menú" : "Abrir menú"}
          >
            <motion.span
              animate={open ? { rotate: 45, y: 7 } : { rotate: 0, y: 0 }}
              className="block w-6 h-px bg-foreground origin-center"
            />
            <motion.span
              animate={open ? { opacity: 0 } : { opacity: 1 }}
              className="block w-6 h-px bg-foreground"
            />
            <motion.span
              animate={open ? { rotate: -45, y: -7 } : { rotate: 0, y: 0 }}
              className="block w-6 h-px bg-foreground origin-center"
            />
          </button>
        </div>
      </motion.header>

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
              className="mt-14 self-start text-xs tracking-[0.2em] uppercase border border-foreground/30 px-5 py-3 hover:bg-foreground hover:text-background transition-colors"
            >
              Trabajemos juntos
            </motion.a>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
