import { createFileRoute } from "@tanstack/react-router";
import { PortfolioPage } from "@/components/portfolio/PortfolioPage";

export const Route = createFileRoute("/en")({
  head: () => ({
    meta: [
      { title: "Natalia Ramírez — Architecture and Interior Design" },
      {
        name: "description",
        content:
          "Architect and interior designer with a particular interest in how spaces influence well-being. Residential, commercial, and institutional projects.",
      },
      {
        property: "og:title",
        content: "Natalia Ramírez — Architecture & Interior Design",
      },
      {
        property: "og:description",
        content:
          "Spatial design with a particular interest in how environments influence emotional, mental, and physical well-being.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://nataliaramirezdiaz.com/en" },
    ],
    links: [
      { rel: "canonical", href: "https://nataliaramirezdiaz.com/en" },
      { rel: "alternate", hreflang: "es", href: "https://nataliaramirezdiaz.com/es" },
      { rel: "alternate", hreflang: "pt", href: "https://nataliaramirezdiaz.com/pt" },
      { rel: "alternate", hreflang: "en", href: "https://nataliaramirezdiaz.com/en" },
      { rel: "alternate", hreflang: "x-default", href: "https://nataliaramirezdiaz.com/es" },
    ],
  }),
  component: PortfolioPage,
});
