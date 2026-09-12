"use client";

/**
 * MapaBoliviaInner.tsx
 * Componente interno del mapa — solo se carga en el cliente via next/dynamic.
 * Leaflet usa `window` y no funciona en SSR → import dinámico obligatorio.
 *
 * Espejo de semta/lib/features/public/landing_map_section.dart
 *
 * - OpenStreetMap tiles (gratuito, sin API key)
 * - Marcadores con tooltip: nombre del municipio + cantidad de proyectos
 * - Scroll de página NO bloqueado: scrollWheelZoom desactivado
 * - En táctil: un dedo scrollea la página, dos dedos mueven el mapa
 */

import { useEffect } from "react";
import { MapContainer, TileLayer, Marker, Tooltip, ZoomControl } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { getMunicipioCoords } from "@/data/municipioCoords";
import { MaterialIcon } from "@/components/ui/MaterialIcon";

// ─── Fix icono de Leaflet en Next.js ─────────────────────────────────────────
// Leaflet resuelve iconos con rutas relativas que rompen en bundlers.
// Se reemplaza con una URL de CDN o icono SVG inline.
function createPinIcon(count: number) {
  const size = count > 3 ? 40 : 34;
  const color = "#0d631b"; // primary SEMTA
  const svgContent = `
    <svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 24 24" fill="${color}">
      <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z"/>
      <circle cx="12" cy="9" r="2.5" fill="white"/>
    </svg>
  `;
  return L.divIcon({
    html: svgContent,
    className: "",
    iconSize: [size, size],
    iconAnchor: [size / 2, size],
    tooltipAnchor: [0, -size],
  });
}

// ─── Tipos ────────────────────────────────────────────────────────────────────

export interface MunicipioMapa {
  id: string;
  nombre: string;
  cantidadProyectos: number;
  ubicacion?: { lat?: number; lng?: number };
}

interface Props {
  municipios: MunicipioMapa[];
}

// ─── Componente ───────────────────────────────────────────────────────────────

export default function MapaBoliviaInner({ municipios }: Props) {
  // Leaflet necesita que el CSS esté inyectado en el DOM
  useEffect(() => {
    // Parchar icono por defecto de Leaflet (problema conocido con webpack/next)
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    delete (L.Icon.Default.prototype as any)._getIconUrl;
    L.Icon.Default.mergeOptions({
      iconRetinaUrl:
        "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png",
      iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png",
      shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png",
    });
  }, []);

  // Construir marcadores solo para municipios con coordenadas conocidas
  const marcadores = municipios
    .map((m) => ({
      ...m,
      coords: getMunicipioCoords(m.id, m.ubicacion),
    }))
    .filter((m) => m.coords !== null);

  if (marcadores.length === 0) {
    return (
      <div className="flex h-[400px] items-center justify-center rounded-2xl bg-surface-container">
        <div className="text-center">
          <MaterialIcon name="map" className="text-[40px] text-on-surface-variant/40" />
          <p className="mt-2 text-body-sm text-on-surface-variant">
            Mapa de cobertura en preparación
          </p>
        </div>
      </div>
    );
  }

  return (
    <MapContainer
      center={[-17.0, -67.5]}
      zoom={6}
      style={{ height: "420px", width: "100%", borderRadius: "16px" }}
      scrollWheelZoom={false} // NO captura el scroll de la página
      zoomControl={false} // Lo reubicamos abajo-derecha
    >
      {/* Tiles OpenStreetMap — gratuito, sin API key */}
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        maxZoom={18}
      />

      {/* Zoom control — abajo derecha */}
      <ZoomControl position="bottomright" />

      {/* Marcadores */}
      {marcadores.map((m) => (
        <Marker
          key={m.id}
          position={[m.coords!.lat, m.coords!.lng]}
          icon={createPinIcon(m.cantidadProyectos)}
        >
          {/* Tooltip siempre visible en desktop, click en móvil */}
          <Tooltip direction="top" offset={[0, -30]} opacity={1} className="semta-map-tooltip">
            <div className="min-w-[140px] text-center">
              <p className="font-semibold text-on-surface">{m.nombre}</p>
              <p className="text-label-md text-primary">
                {m.cantidadProyectos} {m.cantidadProyectos === 1 ? "proyecto" : "proyectos"}
              </p>
            </div>
          </Tooltip>
        </Marker>
      ))}
    </MapContainer>
  );
}
