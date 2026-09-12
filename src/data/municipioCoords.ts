/**
 * municipioCoords.ts
 * Coordenadas de respaldo de municipios SEMTA.
 * Espejo exacto de semta/lib/shared/utils/municipio_coords.dart
 *
 * Se usan cuando Firestore no tiene coordenadas para un municipio.
 * La colección municipios de Firestore puede tener coordenadas
 * en el campo ubicacion: { lat, lng } — esas tienen prioridad.
 */

export interface LatLng {
  lat: number;
  lng: number;
}

/** Coordenadas de respaldo por municipioId (clave en minúsculas) */
export const municipioCoordsFallback: Record<string, LatLng> = {
  la_paz: { lat: -16.5, lng: -68.15 },
  licoma: { lat: -16.75, lng: -67.8 },
  cajuata: { lat: -16.8167, lng: -67.75 },
  caranavi: { lat: -15.8333, lng: -67.5667 },
  coroico: { lat: -16.1833, lng: -67.7167 },
  coro_coro: { lat: -17.1667, lng: -68.4667 },
  corocoro: { lat: -17.1667, lng: -68.4667 },
  calacoto: { lat: -17.5, lng: -68.65 },
  inquisivi: { lat: -16.95, lng: -67.2333 },
  la_asunta: { lat: -15.8667, lng: -67.1667 },
  palca: { lat: -16.5667, lng: -68.0 },
  parinacota: { lat: -18.1833, lng: -69.2667 },
  pucarani: { lat: -16.3833, lng: -68.4833 },
  quime: { lat: -16.9833, lng: -67.2167 },
  sorata: { lat: -15.7667, lng: -68.65 },
  teoponte: { lat: -15.3833, lng: -67.8833 },
  viacha: { lat: -16.65, lng: -68.2833 },
  comanche: { lat: -17.0833, lng: -68.3333 },
  oruro: { lat: -17.9833, lng: -67.15 },
  caracollo: { lat: -17.65, lng: -67.2167 },
  challapata: { lat: -18.9, lng: -66.7667 },
  huanuni: { lat: -18.2833, lng: -66.8333 },
  machacamarca: { lat: -18.1667, lng: -67.05 },
  // Cochabamba
  arani: { lat: -17.5833, lng: -65.7667 },
  arque: { lat: -17.8333, lng: -66.3333 },
  ayopaya: { lat: -17.1, lng: -66.7 },
  colomi: { lat: -17.35, lng: -65.9167 },
  // La Paz — más municipios
  batallas: { lat: -16.3167, lng: -68.3667 },
  achacachi: { lat: -16.05, lng: -68.6833 },
  patacamaya: { lat: -17.2333, lng: -67.9333 },
  tiwanaku: { lat: -16.55, lng: -68.6667 },
  // Potosí
  torotoro: { lat: -18.1333, lng: -65.7667 },
};

/**
 * Resuelve las coordenadas de un municipio.
 * Prioriza Firestore — usa fallback si no hay coords en la BD.
 */
export function getMunicipioCoords(
  municipioId: string,
  firestoreUbicacion?: { lat?: number; lng?: number },
): LatLng | null {
  // 1. Coordenadas de Firestore tienen prioridad
  if (firestoreUbicacion?.lat !== undefined && firestoreUbicacion?.lng !== undefined) {
    return { lat: firestoreUbicacion.lat, lng: firestoreUbicacion.lng };
  }
  // 2. Fallback hardcodeado
  const key = municipioId.toLowerCase();
  return municipioCoordsFallback[key] ?? null;
}
