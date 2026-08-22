import { useEffect } from "react";
import { createFileRoute, useNavigate } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Natalia Ramírez — Arquitectura y Diseño de Interiores" },
      {
        name: "description",
        content:
          "Arquitecta y diseñadora de interiores con especial interés en cómo el espacio influye en el bienestar. Proyectos residenciales, comerciales e institucionales.",
      },
    ],
  }),
  component: RedirectComponent,
});

function RedirectComponent() {
  const navigate = useNavigate();

  useEffect(() => {
    // Client-side detection of preferred language
    const savedLang = localStorage.getItem("natalia_portfolio_lang");
    if (savedLang === "pt" || savedLang === "en" || savedLang === "es") {
      navigate({ to: `/${savedLang}`, replace: true });
      return;
    }

    const browserLang = navigator.language.toLowerCase();
    if (browserLang.startsWith("pt")) {
      navigate({ to: "/pt", replace: true });
    } else if (browserLang.startsWith("en")) {
      navigate({ to: "/en", replace: true });
    } else {
      navigate({ to: "/es", replace: true });
    }
  }, [navigate]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background">
      <div className="h-6 w-6 animate-spin rounded-full border-2 border-[var(--clay)] border-t-transparent" />
    </div>
  );
}
