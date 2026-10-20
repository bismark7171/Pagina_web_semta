/**
 * src/lib/images.ts
 * Constantes y utilidades para manejo de imágenes y fallbacks.
 */

export const FALLBACK_IMAGE =
  "https://images.unsplash.com/photo-1625246333195-78d9c38ad449?auto=format&fit=crop&w=1200&q=80";

export const PLACEHOLDER_AVATAR =
  "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80";

/** Hosts cuya URL se sirve tal cual (solo se valida el hostname). */
export const ALLOWED_IMAGE_HOSTS = ["lh3.googleusercontent.com", "firebasestorage.googleapis.com"];

/**
 * Normaliza una URL de imagen:
 * - null/undefined/vacío o no-URL → FALLBACK_IMAGE
 * - Google Drive (/file/d/{id}, /open?id=, /uc?...id=) → lh3 directo
 * - hosts permitidos → sin cambios
 * - cualquier otro host → FALLBACK_IMAGE
 */
export function normalizeImageUrl(src: string | null | undefined): string {
  if (!src) return FALLBACK_IMAGE;

  const driveFile = src.match(/drive\.google\.com\/file\/d\/([^/?#]+)/);
  if (driveFile) return `https://lh3.googleusercontent.com/d/${driveFile[1]}`;

  const driveId = src.match(/drive\.google\.com\/\S*[?&]id=([^&#]+)/);
  if (driveId) return `https://lh3.googleusercontent.com/d/${driveId[1]}`;

  try {
    const url = new URL(src);
    if (ALLOWED_IMAGE_HOSTS.includes(url.hostname)) return src;
  } catch {
    /* no es URL válida → fallback */
  }
  return FALLBACK_IMAGE;
}
