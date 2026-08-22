import { useLanguage } from "../../context/LanguageContext";

export function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="px-6 md:px-10 py-10 border-t border-foreground/15 bg-background">
      <div className="max-w-[1400px] mx-auto flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 text-xs text-muted-foreground">
        <p>{t.footer.text}</p>
        <p className="italic">{t.footer.designedWithIntent}</p>
      </div>
    </footer>
  );
}
