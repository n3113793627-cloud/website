import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate, useLocation } from "@tanstack/react-router";
import { es } from "../locales/es";
import { pt } from "../locales/pt";
import { en } from "../locales/en";

export type Language = "es" | "pt" | "en";

interface LanguageContextType {
  language: Language;
  t: typeof es;
  setLanguage: (lang: Language) => void;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({
  children,
  currentLang,
}: {
  children: React.ReactNode;
  currentLang: Language;
}) {
  const [lang, setLangState] = useState<Language>(currentLang);
  const navigate = useNavigate();
  const location = useLocation();

  // Sync state if path language changes (e.g. user goes back/forward or modifies URL)
  useEffect(() => {
    if (currentLang !== lang) {
      setLangState(currentLang);
    }
  }, [currentLang, lang]);

  const setLanguage = (newLang: Language) => {
    if (newLang === lang) return;

    setLangState(newLang);

    // Save to localStorage
    if (typeof window !== "undefined") {
      localStorage.setItem("natalia_portfolio_lang", newLang);
    }

    // Determine target route path
    // Our paths are simply '/es', '/pt', '/en'.
    // If navigating to another language segment, maintain scroll position!
    navigate({
      to: `/${newLang}`,
      resetScroll: false, // Maintain vertical scroll position
    });
  };

  const t = lang === "pt" ? pt : lang === "en" ? en : es;

  return (
    <LanguageContext.Provider value={{ language: lang, t, setLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}
