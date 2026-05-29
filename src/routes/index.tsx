import { createFileRoute } from "@tanstack/react-router";
import { Nav } from "@/components/portfolio/Nav";
import { Hero } from "@/components/portfolio/Hero";
import { Marquee } from "@/components/portfolio/Marquee";
import { About } from "@/components/portfolio/About";
import { FeaturedProject } from "@/components/portfolio/FeaturedProject";
import { ProjectsGrid } from "@/components/portfolio/ProjectsGrid";
import { Process } from "@/components/portfolio/Process";
import { Contact } from "@/components/portfolio/Contact";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Natalia Ramírez — Arquitecta & Diseñadora de Interiores" },
      { name: "description", content: "Portfolio de Natalia Ramírez. Arquitectura y diseño interior con calidez, propósito y mobiliario a medida desde Bogotá, Colombia." },
      { property: "og:title", content: "Natalia Ramírez — Arquitecta & Diseñadora de Interiores" },
      { property: "og:description", content: "Espacios que respiran, materia que cuenta historias. Diseño interior y mobiliario personalizado." },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <main className="bg-background text-foreground overflow-x-hidden">
      <Nav />
      <Hero />
      <Marquee />
      <About />
      <FeaturedProject />
      <ProjectsGrid />
      <Process />
      <Contact />
    </main>
  );
}
