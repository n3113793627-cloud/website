import { useState } from "react";
import { motion } from "framer-motion";

type FormState = "idle" | "sending" | "sent" | "error";

export function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [state, setState] = useState<FormState>("idle");

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setState("sending");
    await new Promise((r) => setTimeout(r, 1200));
    setState("sent");
  }

  return (
    <section id="contacto" className="py-32 md:py-44 px-6 md:px-10 bg-background">
      <div className="max-w-[1400px] mx-auto grid md:grid-cols-12 gap-16">
        <div className="md:col-span-5">
          <p className="eyebrow mb-6">— Hablemos</p>
          <h2 className="display text-6xl md:text-[7rem] leading-[0.88]">
            ¿Tienes un <em className="italic text-[var(--clay)]">espacio</em>
            <br /> en mente?
          </h2>
          <p className="mt-10 text-lg text-foreground/80 max-w-lg leading-relaxed">
            Cuéntame sobre tu proyecto. Una conversación inicial es siempre gratis —
            es donde empiezan las mejores casas.
          </p>

          <div className="mt-14 space-y-8">
            <div>
              <p className="eyebrow mb-2">Email directo</p>
              <a
                href="mailto:hola@nataliaramirez.co"
                className="display text-2xl hover:text-[var(--clay)] transition-colors"
              >
                hola@nataliaramirez.co
              </a>
            </div>
            <div>
              <p className="eyebrow mb-2">WhatsApp</p>
              <a
                href="https://wa.me/573118383064"
                className="display text-2xl hover:text-[var(--clay)] transition-colors"
              >
                +57 311 838 3064
              </a>
            </div>
            <div>
              <p className="eyebrow mb-2">Estudio</p>
              <p className="text-foreground/80">
                Bogotá, Colombia
                <br />
                Disponible para proyectos en LATAM
              </p>
            </div>
            <div className="flex gap-6 pt-2">
              {["Instagram", "Behance", "LinkedIn", "Pinterest"].map((s) => (
                <a
                  key={s}
                  href="#"
                  className="text-sm border-b border-foreground/30 pb-1 hover:text-[var(--clay)] hover:border-[var(--clay)] transition-colors"
                >
                  {s}
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="md:col-span-7 md:pt-16">
          {state === "sent" ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="h-full flex flex-col justify-center py-20"
            >
              <span className="display text-7xl text-[var(--clay)] mb-6">✦</span>
              <h3 className="display text-4xl mb-4">¡Gracias por escribir!</h3>
              <p className="text-foreground/85 text-lg leading-relaxed max-w-sm">
                Recibí tu mensaje. Te respondo en menos de 48 horas para hablar de tu
                proyecto.
              </p>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-8">
              <div className="grid sm:grid-cols-2 gap-8">
                <Field
                  label="Nombre"
                  name="name"
                  type="text"
                  value={form.name}
                  onChange={handleChange}
                  required
                />
                <Field
                  label="Email"
                  name="email"
                  type="email"
                  value={form.email}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="flex flex-col gap-2">
                <label className="eyebrow">Cuéntame tu proyecto</label>
                <textarea
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  required
                  rows={6}
                  placeholder="¿Qué tienes en mente? Espacio, estilo, presupuesto aproximado…"
                  className="bg-transparent border-b border-foreground/30 focus:border-[var(--clay)] focus:outline-none resize-none text-foreground placeholder:text-foreground/30 text-base py-3 transition-colors"
                />
              </div>
              <button
                type="submit"
                disabled={state === "sending"}
                className="group flex items-center gap-4 text-sm tracking-[0.2em] uppercase border border-foreground/40 px-8 py-4 hover:bg-foreground hover:text-background disabled:opacity-50 transition-all duration-300"
              >
                {state === "sending" ? (
                  <>
                    <span className="w-4 h-4 border border-current border-t-transparent rounded-full animate-spin" />
                    Enviando…
                  </>
                ) : (
                  <>
                    Enviar mensaje
                    <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
                  </>
                )}
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}

function Field({
  label,
  name,
  type,
  value,
  onChange,
  required,
}: {
  label: string;
  name: string;
  type: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
}) {
  return (
    <div className="flex flex-col gap-2">
      <label className="eyebrow">{label}</label>
      <input
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        required={required}
        className="bg-transparent border-b border-foreground/30 focus:border-[var(--clay)] focus:outline-none text-foreground placeholder:text-foreground/30 text-base py-3 transition-colors"
      />
    </div>
  );
}
