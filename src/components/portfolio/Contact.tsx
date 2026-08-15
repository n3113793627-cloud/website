import { useState, useEffect } from "react";
import { motion } from "framer-motion";

type FormState = "idle" | "sending" | "error";

interface ContactProps {
  prefilledMessage?: string;
}

export function Contact({ prefilledMessage = "" }: ContactProps) {
  const [form, setForm] = useState({
    name: "",
    email: "",
    reason: "",
    message: "",
  });
  const [state, setState] = useState<FormState>("idle");

  useEffect(() => {
    if (prefilledMessage) {
      setForm((f) => ({ ...f, message: prefilledMessage }));
    }
  }, [prefilledMessage]);

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
  ) {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    // Basic Validation
    if (!form.name.trim() || !form.email.trim() || !form.reason || !form.message.trim()) {
      return;
    }

    setState("sending");
    // Simulate check/sending attempt
    await new Promise((r) => setTimeout(r, 800));
    // Since there's no backend/provider configured, we intentionally set it to error state
    // and preserve what the user wrote.
    setState("error");
  }

  return (
    <section
      id="contacto"
      className="py-24 md:py-36 px-6 md:px-10 bg-background border-t border-foreground/5"
    >
      <div className="max-w-[1360px] mx-auto grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-16 items-start">
        {/* BLOCK A: Title & Introduction */}
        <div className="col-span-1 row-start-1 md:col-span-5 md:col-start-1 md:row-start-1 self-start space-y-6">
          <p className="eyebrow">— HABLEMOS</p>
          <h2 className="contact-title display text-foreground">
            ¿Trabajamos <span className="italic text-[var(--primary)]">juntos</span>?
          </h2>
          <p className="text-foreground/80 text-base md:text-lg leading-relaxed max-w-[450px]">
            Estoy abierta a oportunidades laborales, colaboraciones profesionales y proyectos de
            arquitectura e interiorismo. Cuéntame brevemente qué necesitas y conversemos.
          </p>
        </div>

        {/* BLOCK B: Form Card */}
        <div className="col-span-1 row-start-2 md:col-span-7 md:col-start-6 md:row-start-1 md:row-span-2 self-start">
          <div className="p-8 md:p-12 bg-[#ede7e1] border border-foreground/5 rounded-2xl shadow-[0_4px_30px_rgba(0,0,0,0.015)] space-y-8">
            <div>
              <h3 className="display text-xl md:text-2xl text-foreground">
                Cuéntame cómo podemos colaborar
              </h3>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <FormField
                  label="Nombre"
                  name="name"
                  type="text"
                  value={form.name}
                  onChange={handleChange}
                  required
                  placeholder="Tu nombre completo"
                />
                <FormField
                  label="Correo electrónico"
                  name="email"
                  type="email"
                  value={form.email}
                  onChange={handleChange}
                  required
                  placeholder="ejemplo@correo.com"
                />
              </div>

              <FormSelect
                label="Motivo del contacto"
                name="reason"
                value={form.reason}
                onChange={handleChange}
                required
                options={[
                  { value: "Oportunidad laboral", label: "Oportunidad laboral" },
                  { value: "Colaboración profesional", label: "Colaboración profesional" },
                  {
                    value: "Proyecto de arquitectura o interiorismo",
                    label: "Proyecto de arquitectura o interiorismo",
                  },
                  { value: "Otro", label: "Otro" },
                ]}
              />

              <FormTextArea
                label="Mensaje"
                name="message"
                value={form.message}
                onChange={handleChange}
                required
                placeholder="Cuéntame brevemente sobre la oportunidad, colaboración o proyecto..."
              />

              {state === "error" && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-4 bg-[var(--primary)]/10 border border-[var(--primary)]/20 rounded-xl text-foreground text-sm space-y-2"
                >
                  <p className="font-semibold text-[oklch(0.38_0.11_40)]">
                    El formulario de contacto no está configurado.
                  </p>
                  <p className="text-foreground/80 leading-relaxed text-xs">
                    Para activar los envíos automáticos se requiere configurar variables de entorno
                    para un proveedor de correo (como Resend o EmailJS) en la base de código.
                  </p>
                  <p className="text-foreground/80 text-xs">
                    Por favor, contáctame directamente usando los enlaces directos o escribe a:{" "}
                    <a
                      href="mailto:nataliaramirez1799@gmail.com"
                      className="underline hover:text-[var(--primary)] font-semibold"
                    >
                      nataliaramirez1799@gmail.com
                    </a>
                  </p>
                </motion.div>
              )}

              <button
                type="submit"
                disabled={state === "sending"}
                className="w-full md:w-auto px-8 py-4 bg-[var(--primary)] hover:bg-[#EFA07F] text-[var(--cream)] hover:text-[var(--ink)] font-semibold text-xs tracking-[0.2em] uppercase rounded-lg focus-visible:ring-4 focus-visible:ring-[#EFA07F] focus-visible:outline-none transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer min-h-[50px] disabled:opacity-50"
              >
                {state === "sending" ? (
                  <>
                    <span className="w-4 h-4 border border-current border-t-transparent rounded-full animate-spin" />
                    Enviando…
                  </>
                ) : (
                  <>Enviar mensaje →</>
                )}
              </button>
            </form>
          </div>
        </div>

        {/* BLOCK C: Direct Contact Block */}
        <div className="col-span-1 row-start-3 md:col-span-5 md:col-start-1 md:row-start-2 self-start space-y-8 mt-8 md:mt-6">
          <div className="space-y-6">
            <div>
              <p className="eyebrow mb-2">Email directo</p>
              <a
                href="mailto:nataliaramirez1799@gmail.com"
                className="display text-xl md:text-2xl hover:text-[var(--primary)] transition-colors focus-visible:text-[var(--primary)] focus-visible:outline-none"
              >
                nataliaramirez1799@gmail.com
              </a>
            </div>
            <div>
              <p className="eyebrow mb-2">WhatsApp</p>
              <a
                href="https://wa.me/5513978103416"
                target="_blank"
                rel="noopener noreferrer"
                className="display text-xl md:text-2xl hover:text-[var(--primary)] transition-colors focus-visible:text-[var(--primary)] focus-visible:outline-none"
              >
                +55 (13) 97810-3416
              </a>
            </div>
            <div>
              <p className="eyebrow mb-2">LinkedIn</p>
              <a
                href="https://www.linkedin.com/in/nataliaramirezdiazz/"
                target="_blank"
                rel="noopener noreferrer"
                className="display text-xl md:text-2xl hover:text-[var(--primary)] transition-colors focus-visible:text-[var(--primary)] focus-visible:outline-none"
              >
                linkedin.com/in/nataliaramirezdiazz
              </a>
            </div>
            <div>
              <p className="eyebrow mb-2">Ubicación</p>
              <p className="text-foreground/80 leading-relaxed text-sm md:text-base">
                Santos, São Paulo, Brasil
                <br />
                <span className="text-foreground/60 text-xs">
                  Disponible para proyectos remotos en LATAM
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function FormField({
  label,
  name,
  type,
  value,
  onChange,
  required,
  placeholder,
}: {
  label: string;
  name: string;
  type: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
  placeholder?: string;
}) {
  return (
    <div className="flex flex-col gap-2 w-full">
      <label
        htmlFor={name}
        className="text-xs font-semibold uppercase tracking-wider text-foreground/80 font-sans"
      >
        {label} {required && <span className="text-[var(--primary)]">*</span>}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        required={required}
        placeholder={placeholder}
        className="w-full h-[52px] px-4 rounded-lg bg-[var(--cream)] border border-foreground/20 text-foreground placeholder:text-foreground/40 text-base transition-all duration-200 hover:border-foreground/40 focus:border-[var(--primary)] focus:ring-2 focus:ring-[var(--primary)]/15 focus:outline-none"
      />
    </div>
  );
}

function FormSelect({
  label,
  name,
  value,
  onChange,
  required,
  options,
}: {
  label: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  required?: boolean;
  options: { value: string; label: string }[];
}) {
  return (
    <div className="flex flex-col gap-2 w-full">
      <label
        htmlFor={name}
        className="text-xs font-semibold uppercase tracking-wider text-foreground/80 font-sans"
      >
        {label} {required && <span className="text-[var(--primary)]">*</span>}
      </label>
      <div className="relative w-full">
        <select
          id={name}
          name={name}
          value={value}
          onChange={onChange}
          required={required}
          className="w-full h-[52px] pl-4 pr-10 rounded-lg bg-[var(--cream)] border border-foreground/20 text-foreground text-base transition-all duration-200 hover:border-foreground/40 focus:border-[var(--primary)] focus:ring-2 focus:ring-[var(--primary)]/15 focus:outline-none appearance-none cursor-pointer"
        >
          <option value="" disabled>
            Selecciona una opción...
          </option>
          {options.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
        <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none text-foreground/50">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function FormTextArea({
  label,
  name,
  value,
  onChange,
  required,
  placeholder,
}: {
  label: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  required?: boolean;
  placeholder?: string;
}) {
  return (
    <div className="flex flex-col gap-2 w-full">
      <label
        htmlFor={name}
        className="text-xs font-semibold uppercase tracking-wider text-foreground/80 font-sans"
      >
        {label} {required && <span className="text-[var(--primary)]">*</span>}
      </label>
      <textarea
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        required={required}
        placeholder={placeholder}
        className="w-full min-h-[150px] p-4 rounded-lg bg-[var(--cream)] border border-foreground/20 text-foreground placeholder:text-foreground/40 text-base transition-all duration-200 hover:border-foreground/40 focus:border-[var(--primary)] focus:ring-2 focus:ring-[var(--primary)]/15 focus:outline-none resize-y"
      />
    </div>
  );
}
