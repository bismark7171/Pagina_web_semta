/**
 * catalogService.ts
 * Capa de acceso a datos para los catálogos de Firestore.
 * Espejo del catalog_firebase_service.dart de la app Flutter de SEMTA.
 *
 * Colecciones: municipios | comunidades | tipos_proyecto | financiadores
 *              config_estados | config_monedas | config_anios
 */

import {
  collection,
  getDocs,
  getDoc,
  doc,
  query,
  orderBy,
  where,
} from "firebase/firestore";
import { db } from "./config";

// ─── Tipos ────────────────────────────────────────────────────────────────────

export interface FirestoreMunicipio {
  id: string;
  nombre: string;
  provincia: string;
  departamento: string;
  proyectos: string[];
  ubicacion: { lat?: number; lng?: number };
}

export interface FirestoreComunidad {
  id: string;
  nombre: string;
  municipioId: string;
}

export interface FirestoreTipoProyecto {
  id: string;
  nombre: string;
  descripcion: string;
}

export interface FirestoreFinanciador {
  id: string;
  nombre: string;
  pais: string;
  tipo: string;
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

type DocSnap = { id: string; data: () => Record<string, unknown> };

function municipioFromDoc(d: DocSnap): FirestoreMunicipio {
  const data = d.data();
  const ubicacion = (data.ubicacion ?? {}) as Record<string, number>;
  return {
    id:           (data.municipioId as string) ?? d.id,
    nombre:       (data.nombre      as string) ?? "",
    provincia:    (data.provincia   as string) ?? "",
    departamento: (data.departamento as string) ?? "La Paz",
    proyectos:    Array.isArray(data.proyectos) ? (data.proyectos as string[]) : [],
    ubicacion: {
      lat: typeof ubicacion.lat === "number" ? ubicacion.lat : undefined,
      lng: typeof ubicacion.lng === "number" ? ubicacion.lng : undefined,
    },
  };
}

function comunidadFromDoc(d: DocSnap): FirestoreComunidad {
  const data = d.data();
  return {
    id:          (data.comunidadId as string) ?? d.id,
    nombre:      (data.nombre      as string) ?? "",
    municipioId: (data.municipioId as string) ?? "",
  };
}

function tipoFromDoc(d: DocSnap): FirestoreTipoProyecto {
  const data = d.data();
  return {
    id:          (data.tipoProyectoId as string) ?? d.id,
    nombre:      (data.nombre         as string) ?? "",
    descripcion: (data.descripcion    as string) ?? "",
  };
}

function financiadorFromDoc(d: DocSnap): FirestoreFinanciador {
  const data = d.data();
  return {
    id:     (data.financiadorId as string) ?? d.id,
    nombre: (data.nombre        as string) ?? "",
    pais:   (data.pais          as string) ?? "",
    tipo:   (data.tipo          as string) ?? "",
  };
}

// ─── MUNICIPIOS ───────────────────────────────────────────────────────────────

export async function getMunicipios(): Promise<FirestoreMunicipio[]> {
  const snap = await getDocs(query(collection(db, "municipios"), orderBy("nombre")));
  return snap.docs.map(municipioFromDoc);
}

export async function getMunicipioById(id: string): Promise<FirestoreMunicipio | null> {
  const snap = await getDoc(doc(db, "municipios", id));
  if (!snap.exists()) return null;
  return municipioFromDoc(snap);
}

// ─── COMUNIDADES ──────────────────────────────────────────────────────────────

export async function getComunidades(): Promise<FirestoreComunidad[]> {
  const snap = await getDocs(query(collection(db, "comunidades"), orderBy("nombre")));
  return snap.docs.map(comunidadFromDoc);
}

export async function getComunidadesByMunicipio(municipioId: string): Promise<FirestoreComunidad[]> {
  const q = query(
    collection(db, "comunidades"),
    where("municipioId", "==", municipioId),
    orderBy("nombre"),
  );
  const snap = await getDocs(q);
  return snap.docs.map(comunidadFromDoc);
}

// ─── TIPOS DE PROYECTO ────────────────────────────────────────────────────────

export async function getTiposProyecto(): Promise<FirestoreTipoProyecto[]> {
  const snap = await getDocs(query(collection(db, "tipos_proyecto"), orderBy("nombre")));
  return snap.docs.map(tipoFromDoc);
}

export async function getTipoProyectoById(id: string): Promise<FirestoreTipoProyecto | null> {
  const snap = await getDoc(doc(db, "tipos_proyecto", id));
  if (!snap.exists()) return null;
  return tipoFromDoc(snap);
}

// ─── FINANCIADORES ────────────────────────────────────────────────────────────

export async function getFinanciadores(): Promise<FirestoreFinanciador[]> {
  const snap = await getDocs(query(collection(db, "financiadores"), orderBy("nombre")));
  return snap.docs.map(financiadorFromDoc);
}

export async function getFinanciadorById(id: string): Promise<FirestoreFinanciador | null> {
  const snap = await getDoc(doc(db, "financiadores", id));
  if (!snap.exists()) return null;
  return financiadorFromDoc(snap);
}

// ─── CONFIGURACIONES ──────────────────────────────────────────────────────────

export async function getEstadosProyecto(): Promise<string[]> {
  try {
    const snap = await getDocs(query(collection(db, "config_estados"), orderBy("nombre")));
    return snap.docs.map((d) => (d.data().nombre as string) ?? "").filter(Boolean);
  } catch {
    return ["PLANIFICADO", "EN_EJECUCION", "CONCLUIDO", "SUSPENDIDO", "CANCELADO"];
  }
}

export async function getMonedas(): Promise<string[]> {
  try {
    const snap = await getDocs(query(collection(db, "config_monedas"), orderBy("nombre")));
    return snap.docs.map((d) => (d.data().nombre as string) ?? "").filter(Boolean);
  } catch {
    return ["Bs", "USD"];
  }
}

export async function getAnios(): Promise<number[]> {
  try {
    const snap = await getDocs(query(collection(db, "config_anios"), orderBy("anio")));
    return snap.docs.map((d) => d.data().anio as number).filter(Boolean);
  } catch {
    return [];
  }
}
