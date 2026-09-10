import type { Metadata } from "next";
import { PageHero } from "@/components/ui/PageHero";
import VerificarCertificado from "@/components/verificar/VerificarCertificado";

export const metadata: Metadata = {
  title: "Verificar Certificado",
  description:
    "Valida la autenticidad de certificados emitidos por SEMTA y Casa SEMTA mediante su código QR.",
};

export default function VerificarCertificadoPage() {
  return (
    <>
      <PageHero
        crumbs={[{ label: "Inicio", href: "/" }, { label: "Verificar Certificado", href: "/verificar-certificado" }]}
        badge={{ icono: "verified_user", text: "Autenticación Institucional" }}
        titulo={
          <>
            Verificar un{" "}
            <span className="text-primary-fixed">certificado SEMTA</span>
          </>
        }
        descripcion="Comprueba en segundos que un certificado fue emitido por nuestras unidades de formación y programas de campo."
      />

      <section className="bg-background py-16">
        <div className="mx-auto w-full max-w-container-semta px-gutter-desktop">
          <VerificarCertificado />
        </div>
      </section>
    </>
  );
}