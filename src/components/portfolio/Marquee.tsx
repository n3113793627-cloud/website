export function Marquee() {
  const words = ["Diseño Interior", "Arquitectura", "Mobiliario a Medida", "Espacios Reducidos", "Detalle Artesanal"];
  return (
    <div className="border-y border-foreground/15 bg-[var(--cream)] overflow-hidden">
      <div className="flex gap-16 py-6 whitespace-nowrap animate-[scroll_30s_linear_infinite]">
        {[...words, ...words, ...words].map((w, i) => (
          <span key={i} className="display text-4xl md:text-6xl text-foreground/80">
            {w} <span className="text-[var(--clay)] mx-6">✦</span>
          </span>
        ))}
      </div>
      <style>{`
        @keyframes scroll {
          from { transform: translateX(0); }
          to { transform: translateX(-33.333%); }
        }
      `}</style>
    </div>
  );
}