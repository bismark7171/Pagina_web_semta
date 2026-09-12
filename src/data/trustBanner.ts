import type { ITrustBanner } from "@/types";

export const trustBanner: ITrustBanner = {
  titulo: "Rendición de Cuentas y Transparencia",
  descripcion:
    "Accede libremente a nuestras memorias anuales institucionales y estados financieros auditados.",
  botones: [
    { text: "Memoria 2024 (PDF)", path: "/biblioteca", icono: "download", tipo: "outline" },
    { text: "Datos y Auditorías", path: "/transparencia", icono: "data_table", tipo: "solid" },
    { text: "Estatutos y Acreditaciones", path: "/nosotros", icono: "visibility", tipo: "outline" },
  ],
};
