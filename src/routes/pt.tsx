import { createFileRoute } from "@tanstack/react-router";
import { PortfolioPage } from "@/components/portfolio/PortfolioPage";

export const Route = createFileRoute("/pt")({
  head: () => ({
    meta: [
      { title: "Natalia Ramírez — Arquitetura e Design de Interiores" },
      {
        name: "description",
        content:
          "Arquiteta e designer de interiores com interesse especial em como o espaço influencia o bem-estar. Projetos residenciais, comerciais e institucionais.",
      },
      {
        property: "og:title",
        content: "Natalia Ramírez — Arquitetura & Design de Interiores",
      },
      {
        property: "og:description",
        content:
          "Design de espaços com interesse especial em como o entorno influencia o bem-estar emocional, mental e físico.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://nataliaramirezdiaz.com/pt" },
    ],
    links: [
      { rel: "canonical", href: "https://nataliaramirezdiaz.com/pt" },
      { rel: "alternate", hreflang: "es", href: "https://nataliaramirezdiaz.com/es" },
      { rel: "alternate", hreflang: "pt", href: "https://nataliaramirezdiaz.com/pt" },
      { rel: "alternate", hreflang: "en", href: "https://nataliaramirezdiaz.com/en" },
      { rel: "alternate", hreflang: "x-default", href: "https://nataliaramirezdiaz.com/es" },
    ],
  }),
  component: PortfolioPage,
});
