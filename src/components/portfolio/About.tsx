import { motion } from "framer-motion";
import { useLanguage } from "../../context/LanguageContext";

export function About() {
  const { language, t } = useLanguage();

  return (
    <section id="about" className="relative py-32 md:py-40 px-6 md:px-10 bg-background">
      <div className="max-w-[1400px] mx-auto grid md:grid-cols-12 gap-10 md:gap-16">
        <div className="md:col-span-5 md:sticky md:top-32 self-start">
          <p className="eyebrow mb-6">{t.about.label}</p>
          <h2 className="display text-5xl md:text-7xl leading-[1] mb-10">
            <em className="italic text-[var(--clay)]">{t.about.sensibilidad}</em>
            {t.about.paraDisenar}
            <br /> <em className="italic text-[var(--clay)]">{t.about.precision}</em>
            {t.about.paraConstruir}
          </h2>
        </div>

        <div className="md:col-span-7 md:pt-4">
          <div className="space-y-6 text-lg leading-relaxed text-foreground/85 max-w-xl">
            <p>
              {language === "es" && (
                <>
                  Soy <strong>Natalia Ramírez Díaz</strong>, arquitecta colombiana radicada en
                  Brasil, con experiencia en diseño arquitectónico, interiores y documentación
                  técnica para proyectos residenciales, comerciales e institucionales.
                </>
              )}
              {language === "pt" && (
                <>
                  Sou <strong>Natalia Ramírez Díaz</strong>, arquiteta colombiana radicada no
                  Brasil, com experiência em projeto arquitetônico, interiores e documentação
                  técnica para projetos residenciais, comerciais e institucionais.
                </>
              )}
              {language === "en" && (
                <>
                  I am <strong>Natalia Ramírez Díaz</strong>, a Colombian architect based in Brazil,
                  with experience in architectural design, interiors, and technical documentation
                  for residential, commercial, and institutional projects.
                </>
              )}
            </p>
            <p>{t.about.description2}</p>
            <p className="text-muted-foreground text-base">{t.about.locationText}</p>
          </div>

          <div className="mt-14 grid grid-cols-2 gap-6 max-w-xl">
            {t.about.credentials.map((c) => (
              <motion.div
                key={c.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.6 }}
                className="border-t border-foreground/20 pt-4"
              >
                <div className="display text-4xl text-[var(--clay)]">{c.year}</div>
                <div className="text-xs text-muted-foreground mt-2 leading-tight">{c.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
