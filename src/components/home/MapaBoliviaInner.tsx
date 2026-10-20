"use client";

import React, { useEffect, useState } from "react";
import "leaflet/dist/leaflet.css";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";

export interface MunicipioMapa {
  id: string;
  nombre: string;
  cantidadProyectos: number;
  ubicacion?: {
    lat?: number;
    lng?: number;
  };
}

// Coordenadas referenciales de municipios bolivianos
const COORDENADAS_MUNICIPIOS: Record<string, [number, number]> = {
  batallas: [-16.301, -68.533],
  achacachi: [-16.046, -68.685],
  patacamaya: [-17.238, -67.922],
  tiwanaku: [-16.555, -68.678],
  viacha: [-16.653, -68.301],
  "curahuara de carangas": [-17.868, -68.435],
  sajama: [-18.134, -68.966],
  luribay: [-17.033, -67.683],
  "la paz": [-16.489, -68.119],
  oruro: [-17.964, -67.106],
  pucarani: [-16.402, -68.485],
  coroico: [-16.188, -67.728],
  sorata: [-15.773, -68.649],
};

function createPinIcon(count: number) {
  return L.divIcon({
    className: "semta-map-marker",
    html: `
      <div style="
        background: #0d631b;
        color: white;
        border: 2px solid white;
        border-radius: 50%;
        width: 32px;
        height: 32px;
        display: flex;
        align-items: center;
        justify-content: center;
        font-weight: bold;
        font-size: 13px;
        box-shadow: 0 4px 10px rgba(0,0,0,0.3);
      ">
        ${count}
      </div>
    `,
    iconSize: [32, 32],
    iconAnchor: [16, 16],
    popupAnchor: [0, -16],
  });
}

export default function MapaBoliviaInner({ municipios }: { municipios: MunicipioMapa[] }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="flex h-[420px] w-full items-center justify-center rounded-2xl bg-surface-container">
        <p className="text-body-sm text-on-surface-variant">Inicializando mapa...</p>
      </div>
    );
  }

  // Centro de Bolivia (Altiplano / Valles)
  const defaultCenter: [number, number] = [-16.7, -68.2];

  return (
    <div className="h-[420px] w-full">
      <MapContainer
        center={defaultCenter}
        zoom={7}
        scrollWheelZoom={false}
        className="h-full w-full rounded-2xl z-0"
        style={{ height: "420px", width: "100%" }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {municipios.map((m) => {
          let lat = m.ubicacion?.lat;
          let lng = m.ubicacion?.lng;

          if (lat === undefined || lng === undefined) {
            const key = m.nombre.toLowerCase().trim();
            const fallbackCoord = COORDENADAS_MUNICIPIOS[key];
            if (fallbackCoord) {
              [lat, lng] = fallbackCoord;
            } else {
              // Si no tiene coordenadas conocidas, dispersar levemente sobre el altiplano
              lat = -16.5 + Math.sin(m.nombre.length) * 0.8;
              lng = -68.3 + Math.cos(m.nombre.length) * 0.8;
            }
          }

          return (
            <Marker key={m.id} position={[lat, lng]} icon={createPinIcon(m.cantidadProyectos)}>
              <Popup>
                <div className="p-1">
                  <h4 className="font-bold text-gray-900">{m.nombre}</h4>
                  <p className="text-xs text-gray-600 mt-1">
                    {m.cantidadProyectos} proyecto{m.cantidadProyectos !== 1 ? "s" : ""} SEMTA
                  </p>
                  <a
                    href={`/proyectos?municipio=${encodeURIComponent(m.nombre)}`}
                    className="mt-2 inline-block text-xs font-semibold text-[#0d631b] hover:underline"
                  >
                    Ver proyectos &rarr;
                  </a>
                </div>
              </Popup>
            </Marker>
          );
        })}
      </MapContainer>
    </div>
  );
}
