export function Contact() {
  return (
    <section id="contacto" className="py-32 md:py-44 px-6 md:px-10 bg-background">
      <div className="max-w-[1400px] mx-auto grid md:grid-cols-12 gap-12">
        <div className="md:col-span-7">
          <p className="eyebrow mb-6">— Hablemos</p>
          <h2 className="display text-6xl md:text-[9rem] leading-[0.88]">
            ¿Tienes un <em className="italic text-[var(--clay)]">espacio</em>
            <br /> en mente?
          </h2>
          <p className="mt-10 text-lg text-foreground/80 max-w-lg leading-relaxed">
            Cuéntame sobre tu proyecto. Una conversación inicial es siempre gratis —
            es donde empiezan las mejores casas.
          </p>
        </div>

        <div className="md:col-span-5 md:pt-8">
          <div className="space-y-8">
            <div>
              <p className="eyebrow mb-2">Email</p>
              <a href="mailto:hola@nataliaramirez.co" className="display text-2xl md:text-3xl hover:text-[var(--clay)] transition-colors">
                hola@nataliaramirez.co
              </a>
            </div>
            <div>
              <p className="eyebrow mb-2">WhatsApp</p>
              <a href="https://wa.me/57" className="display text-2xl md:text-3xl hover:text-[var(--clay)] transition-colors">
                +57 300 000 0000
              </a>
            </div>
            <div>
              <p className="eyebrow mb-2">Estudio</p>
              <p className="text-foreground/80">Bogotá, Colombia<br />Disponible para proyectos en LATAM</p>
            </div>
            <div className="flex gap-6 pt-4">
              {["Instagram", "Behance", "LinkedIn", "Pinterest"].map((s) => (
                <a key={s} href="#" className="text-sm border-b border-foreground/30 pb-1 hover:text-[var(--clay)] hover:border-[var(--clay)] transition-colors">
                  {s}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>

      <footer className="max-w-[1400px] mx-auto mt-32 pt-8 border-t border-foreground/15 flex justify-between text-xs text-muted-foreground">
        <p>© 2026 Natalia Ramírez · Arquitecta</p>
        <p>Diseñado con intención.</p>
      </footer>
    </section>
  );
}