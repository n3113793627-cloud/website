import { motion } from "framer-motion";

const words = [
  "Diseño Interior",
  "Arquitectura",
  "Mobiliario a Medida",
  "Espacios Reducidos",
  "Detalle Artesanal",
];

const repeated = [...words, ...words, ...words, ...words];

export function Marquee() {
  return (
    <div className="border-y border-foreground/15 bg-[var(--cream)] overflow-hidden">
      <motion.div
        className="flex gap-16 py-6 whitespace-nowrap"
        animate={{ x: ["0%", "-25%"] }}
        transition={{ duration: 28, ease: "linear", repeat: Infinity }}
      >
        {repeated.map((w, i) => (
          <span
            key={i}
            className="text-[0.65rem] text-foreground/35 shrink-0 tracking-[0.25em] uppercase"
          >
            {w} <span className="text-[var(--clay)]/50 mx-4">✦</span>
          </span>
        ))}
      </motion.div>
    </div>
  );
}
