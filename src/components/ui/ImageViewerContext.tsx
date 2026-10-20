"use client";

import React, { createContext, useContext, useState, useCallback, useMemo } from "react";
import { Lightbox, type LightboxFoto } from "./Lightbox";

export interface OpenViewerOptions {
  fotos: LightboxFoto[];
  indiceInicial?: number;
  enableCropper?: boolean;
}

interface ImageViewerContextType {
  openViewer: (options: OpenViewerOptions) => void;
  closeViewer: () => void;
  isOpen: boolean;
}

const ImageViewerContext = createContext<ImageViewerContextType | undefined>(undefined);

export function ImageViewerProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [fotos, setFotos] = useState<LightboxFoto[]>([]);
  const [indice, setIndice] = useState(0);

  const openViewer = useCallback(({ fotos: nuevasFotos, indiceInicial = 0 }: OpenViewerOptions) => {
    if (!nuevasFotos || nuevasFotos.length === 0) return;
    setFotos(nuevasFotos);
    setIndice(Math.max(0, Math.min(indiceInicial, nuevasFotos.length - 1)));
    setIsOpen(true);
  }, []);

  const closeViewer = useCallback(() => {
    setIsOpen(false);
  }, []);

  const value = useMemo(
    () => ({ openViewer, closeViewer, isOpen }),
    [openViewer, closeViewer, isOpen],
  );

  return (
    <ImageViewerContext.Provider value={value}>
      {children}
      {isOpen && fotos.length > 0 && (
        <Lightbox fotos={fotos} indiceInicial={indice} onClose={closeViewer} />
      )}
    </ImageViewerContext.Provider>
  );
}

export function useImageViewer() {
  const context = useContext(ImageViewerContext);
  if (!context) {
    return {
      openViewer: () => {},
      closeViewer: () => {},
      isOpen: false,
    };
  }
  return context;
}
