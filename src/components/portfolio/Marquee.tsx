import { useLanguage } from "../../context/LanguageContext";

export function Marquee() {
  const { t } = useLanguage();

  const words = [
    t.marquee.interiorDesign,
    t.marquee.architecture,
    t.marquee.customFurniture,
    t.marquee.smallSpaces,
    t.marquee.craftedDetail,
  ];

  return (
    <div className="border-y border-foreground/15 bg-[var(--cream)] overflow-hidden flex whitespace-nowrap pause-marquee w-full select-none">
      <div className="animate-marquee flex gap-12 py-3 pr-12">
        {words.map((w, i) => (
          <span
            key={`a-${i}`}
            className="text-[0.7rem] text-foreground/75 shrink-0 tracking-[0.15em] uppercase font-semibold"
          >
            {w} <span className="text-[var(--clay)]/80 mx-4">✦</span>
          </span>
        ))}
      </div>
      <div className="animate-marquee flex gap-12 py-3 pr-12" aria-hidden="true">
        {words.map((w, i) => (
          <span
            key={`b-${i}`}
            className="text-[0.7rem] text-foreground/75 shrink-0 tracking-[0.15em] uppercase font-semibold"
          >
            {w} <span className="text-[var(--clay)]/80 mx-4">✦</span>
          </span>
        ))}
      </div>
    </div>
  );
}
