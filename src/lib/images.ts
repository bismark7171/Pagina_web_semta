/**
 * images.ts
 * Utilidades para saneamiento de URLs de imágenes antes de pasarlas a next/image.
 *
 * Motivo: los proyectos reales en Firestore guardan algunas imágenes como
 * links de Google Drive ("https://drive.google.com/file/d/.../view"),
 * lo que rompe next/image en runtime. Aquí se convierten a la URL directa
 * de contenido (lh3.googleusercontent.com) que ya está en remotePatterns.
 */

export const FALLBACK_IMAGE =
  "https://lh3.googleusercontent.com/aida-public/AB6AXuAQK5n6LW2ug_oRYK5IdsciuHh4IGzYPamNMQftWe2uDHCGiFRaenQy_906-80zMpEthY3DQqSKjB8qZNAIRbm9UkSd-jzV0DgyJHG3fJMgdZiJS_Ug4k6qxfpB_AvCh7ZtRNY0DaC4RpubslxGgmno6Lf569s6CH13a5VrOLJJ4sWS4ZkEnWIKCOkeYnM_hAZmUBnHB029RLPFhW6JMaQltvrrXFE4gw5uFbrL5XxTJkM2MBN9Nw";

// Hosts permitidos por next.config.mjs → images.remotePatterns
const ALLOWED_IMAGE_HOSTS = new Set([
  "lh3.googleusercontent.com",
  "firebasestorage.googleapis.com",
]);

/** Extrae el ID de archivo de cualquier URL de Google Drive conocida. */
function extractDriveFileId(url: string): string | null {
  // https://drive.google.com/file/d/{ID}/view?usp=drive_link
  const fileMatch = url.match(/\/file\/d\/([^/?]+)/);
  if (fileMatch) return fileMatch[1];
  // https://drive.google.com/open?id={ID}  |  /uc?export=view&id={ID}  |  /thumbnail?id={ID}
  const idMatch = url.match(/[?&]id=([^&#]+)/);
  if (idMatch) return idMatch[1];
  return null;
}

/**
 * Normaliza una URL de imagen para next/image:
 * - Convierte links de Google Drive a la URL directa de contenido.
 * - Si el host no está en remotePatterns (o la URL es basura), devuelve un placeholder.
 */
export function normalizeImageUrl(src: string | null | undefined): string {
  if (!src) return FALLBACK_IMAGE;
  try {
    const u = new URL(src);
    if (u.hostname === "drive.google.com") {
      const id = extractDriveFileId(src);
      return id ? `https://lh3.googleusercontent.com/d/${id}` : FALLBACK_IMAGE;
    }
    if (ALLOWED_IMAGE_HOSTS.has(u.hostname)) return src;
  } catch {
    // URL no parseable
  }
  return FALLBACK_IMAGE;
}
