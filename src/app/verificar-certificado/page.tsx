import type { Metadata } from "next";
import VerificarCertificado from "@/components/verificar/VerificarCertificado";

export const metadata: Metadata = {
  title: "Verificación de Certificados Oficiales",
  description:
    "Sistema de validación pública de certificados emitidos por SEMTA para cursos, talleres y programas de especialización.",
};

export default function VerificarCertificadoPage() {
  return (
    <div className="py-16 bg-background min-h-screen">
      <div className="mx-auto w-full max-w-container-semta px-gutter-desktop">
        <VerificarCertificado />
      </div>
    </div>
  );
}
