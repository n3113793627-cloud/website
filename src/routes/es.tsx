import { createFileRoute } from "@tanstack/react-router";
import { PortfolioPage } from "@/components/portfolio/PortfolioPage";

export const Route = createFileRoute("/es")({
  head: () => ({
    meta: [
      { title: "Natalia Ramírez — Arquitectura y Diseño de Interiores" },
      {
        name: "description",
        content:
          "Arquitecta y diseñadora de interiores con especial interés en cómo el espacio influye en el bienestar. Proyectos residenciales, comerciales e institucionales.",
      },
      {
        property: "og:title",
        content: "Natalia Ramírez — Arquitectura & Diseño de Interiores",
      },
      {
        property: "og:description",
        content:
          "Diseño de espacios con especial interés en cómo el entorno influye en el bienestar emocional, mental y físico.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://nataliaramirezdiaz.com/es" },
    ],
    links: [
      { rel: "canonical", href: "https://nataliaramirezdiaz.com/es" },
      { rel: "alternate", hreflang: "es", href: "https://nataliaramirezdiaz.com/es" },
      { rel: "alternate", hreflang: "pt", href: "https://nataliaramirezdiaz.com/pt" },
      { rel: "alternate", hreflang: "en", href: "https://nataliaramirezdiaz.com/en" },
      { rel: "alternate", hreflang: "x-default", href: "https://nataliaramirezdiaz.com/es" },
    ],
  }),
  component: PortfolioPage,
});
