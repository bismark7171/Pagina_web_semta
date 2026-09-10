import type { MetadataRoute } from "next";
import { siteDetails } from "@/data/siteDetails";

const rutas = [
  "",
  "proyectos",
  "casa-semta",
  "nosotros",
  "biblioteca",
  "verificar-certificado",
  "contacto",
  "reservar",
  "agenda",
  "privacidad",
  "transparencia",
  "pasantias",
  "noticias",
];

export default function sitemap(): MetadataRoute.Sitemap {
  return rutas.map((ruta) => ({
    url: `${siteDetails.siteUrl}/${ruta}`,
    lastModified: new Date(),
    changeFrequency: ruta === "" || ruta === "noticias" ? "weekly" : "monthly",
    priority: ruta === "" ? 1 : 0.7,
  }));
}