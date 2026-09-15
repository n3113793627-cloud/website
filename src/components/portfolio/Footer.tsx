import { useLanguage } from "../../context/LanguageContext";

export function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="px-6 md:px-10 py-12 border-t border-foreground/15 bg-background">
      <div className="max-w-[1400px] mx-auto flex flex-col md:flex-row justify-between items-start md:items-center gap-6 text-xs text-muted-foreground">
        <div className="space-y-1">
          <p>{t.footer.text}</p>
          <p className="italic">{t.footer.designedWithIntent}</p>
        </div>

        <div className="flex flex-wrap items-center gap-4 sm:gap-6 font-mono text-foreground/80">
          <a
            href="https://wa.me/573118383064"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-[var(--primary)] transition-colors focus-visible:outline-none focus-visible:underline"
            aria-label={`${t.contact.whatsappAction}: +57 311 838 3064`}
          >
            WhatsApp <span className="text-muted-foreground">+57 311 838 3064</span>
          </a>
          <span className="hidden sm:inline text-foreground/20">·</span>
          <a
            href="tel:+573118383064"
            className="hover:text-[var(--primary)] transition-colors focus-visible:outline-none focus-visible:underline"
            aria-label={`${t.contact.callAction}: +57 311 838 3064`}
          >
            {t.contact.callAction} <span className="text-muted-foreground">+57 311 838 3064</span>
          </a>
          <span className="hidden sm:inline text-foreground/20">·</span>
          <a
            href="mailto:nataliaramirez1799@gmail.com"
            className="hover:text-[var(--primary)] transition-colors focus-visible:outline-none focus-visible:underline"
          >
            nataliaramirez1799@gmail.com
          </a>
        </div>
      </div>
    </footer>
  );
}
