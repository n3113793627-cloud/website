import { motion } from "framer-motion";

const words = [
  "Diseño Interior",
  "Arquitectura",
  "Mobiliario a Medida",
  "Espacios Reducidos",
  "Detalle Artesanal",
];

export function Marquee() {
  return (
    <div className="border-y border-foreground/15 bg-[var(--cream)] overflow-hidden flex whitespace-nowrap">
      <motion.div
        className="flex gap-16 py-6 shrink-0 pr-16"
        animate={{ x: ["0%", "-100%"] }}
        transition={{ duration: 25, ease: "linear", repeat: Infinity }}
      >
        {words.map((w, i) => (
          <span
            key={`a-${i}`}
            className="text-[0.65rem] text-foreground/50 shrink-0 tracking-[0.25em] uppercase"
          >
            {w} <span className="text-[var(--clay)]/65 mx-4">✦</span>
          </span>
        ))}
      </motion.div>
      <motion.div
        className="flex gap-16 py-6 shrink-0 pr-16"
        animate={{ x: ["0%", "-100%"] }}
        transition={{ duration: 25, ease: "linear", repeat: Infinity }}
      >
        {words.map((w, i) => (
          <span
            key={`b-${i}`}
            className="text-[0.65rem] text-foreground/50 shrink-0 tracking-[0.25em] uppercase"
          >
            {w} <span className="text-[var(--clay)]/65 mx-4">✦</span>
          </span>
        ))}
      </motion.div>
    </div>
  );
}
