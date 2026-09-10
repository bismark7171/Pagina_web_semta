import type { Metadata } from "next";
import { PageHero } from "@/components/ui/PageHero";
import { SectionLabel } from "@/components/ui/SectionLabel";

export const metadata: Metadata = {
  title: "Política de Privacidad",
  description:
    "Cómo SEMTA protege tus datos personales en nuestra web y canales de contacto.",
};

const bloques = [
  {
    titulo: "Datos que recopilamos",
    cuerpo:
      "Únicamente los datos que nos proporcionás voluntariamente a través de formularios de contacto, reserva o verificación de certificados: nombre, correo electrónico, teléfono y mensaje. No utilizamos cookies de seguimiento publicitario ni perfiles con fines comerciales.",
  },
  {
    titulo: "Finalidad del tratamiento",
    cuerpo:
      "Tus datos se usan exclusivamente para responder consultas, gestionar reservas de espacios, coordinar pasantías y validar la autenticidad de certificados institucionales. Nunca se venderán ni cederán a terceros sin tu consentimiento.",
  },
  {
    titulo: "Base legal y conservación",
    cuerpo:
      "Tratamos la información bajo el Art. 320 del Código Procesal Civil Boliviano y la Ley 1413 de Protección de Datos Personales. Conservamos los datos solo durante el tiempo necesario para la gestión que los originó.",
  },
  {
    titulo: "Tus derechos",
    cuerpo:
      "Podés solicitar acceso, rectificación, cancelación u oposición de tus datos escribiendo a info@semta.org.bo con el asunto «Datos Personales». Respondemos dentro de los 10 días hábiles.",
  },
  {
    titulo: "Seguridad",
    cuerpo:
      "La base de datos está protegida con control de acceso institucional y nuestras páginas circulan por conexión cifrada (HTTPS). Contiene enlaces a terceros solo con fines de transparencia y cooperación.",
  },
];

export default function PrivacidadPage() {
  return (
    <>
      <PageHero
        crumbs={[{ label: "Inicio", href: "/" }, { label: "Privacidad", href: "/privacidad" }]}
        badge={{ icono: "privacy_tip", text: "Legal" }}
        titulo={
          <>
            Política de <span className="text-primary-fixed">privacidad</span>
          </>
        }
        descripcion="Tu confianza es la base de nuestra relación institucional. Así protegemos tus datos personales en semta.org.bo."
      />

      <section className="bg-background py-16">
        <div className="mx-auto max-w-3xl w-full max-w-container-semta px-gutter-desktop">
          <SectionLabel icono="shield">Compromiso de confidencialidad</SectionLabel>
          <div className="mt-8 space-y-6">
            {bloques.map((b) => (
              <article
                key={b.titulo}
                className="rounded-3xl border border-outline-variant bg-surface-container-lowest p-7"
              >
                <h2 className="font-headline-md text-on-surface">{b.titulo}</h2>
                <p className="mt-3 text-body-md leading-relaxed text-on-surface-variant">
                  {b.cuerpo}
                </p>
              </article>
            ))}
          </div>
          <p className="mt-8 text-body-sm text-on-surface-variant">
            Última actualización: septiembre de 2026. Este sitio cumple la Ley
            General de Derechos Humanos del Pueblo Boliviano y la normativa de
            protección de datos personales.
          </p>
        </div>
      </section>
    </>
  );
}