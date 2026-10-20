"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { MaterialIcon } from "@/components/ui/MaterialIcon";
import { CanvasCropper } from "@/components/ui/CanvasCropper";

export interface LightboxFoto {
  imagen: string;
  alt: string;
  caption?: string;
}

export interface LightboxProps {
  fotos: LightboxFoto[];
  indiceInicial: number;
  onClose: () => void;
  enableCropper?: boolean;
}

export function Lightbox({ fotos, indiceInicial, onClose, enableCropper = true }: LightboxProps) {
  const [indice, setIndice] = useState(indiceInicial);
  const [zoom, setZoom] = useState(1);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const [isPanning, setIsPanning] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0, panX: 0, panY: 0 });
  const [isCropping, setIsCropping] = useState(false);
  const imageContainerRef = useRef<HTMLDivElement>(null);

  const foto = fotos[indice];

  // Restablecer zoom y recorte al cambiar de foto
  const resetZoom = useCallback(() => {
    setZoom(1);
    setPan({ x: 0, y: 0 });
  }, []);

  const prev = useCallback(() => {
    resetZoom();
    setIsCropping(false);
    setIndice((i) => (i - 1 + fotos.length) % fotos.length);
  }, [fotos.length, resetZoom]);

  const next = useCallback(() => {
    resetZoom();
    setIsCropping(false);
    setIndice((i) => (i + 1) % fotos.length);
  }, [fotos.length, resetZoom]);

  const handleZoomIn = useCallback(() => {
    setZoom((z) => Math.min(4, Number((z + 0.5).toFixed(1))));
  }, []);

  const handleZoomOut = useCallback(() => {
    setZoom((z) => {
      const newZ = Math.max(1, Number((z - 0.5).toFixed(1)));
      if (newZ === 1) {
        setPan({ x: 0, y: 0 });
      }
      return newZ;
    });
  }, []);

  const toggleZoom = useCallback(() => {
    if (zoom > 1) {
      resetZoom();
    } else {
      setZoom(2);
    }
  }, [zoom, resetZoom]);

  // Teclado
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        if (isCropping) {
          setIsCropping(false);
          return;
        }
        if (zoom > 1) {
          resetZoom();
          return;
        }
        onClose();
      }
      if (!isCropping) {
        if (e.key === "ArrowLeft" && zoom === 1) prev();
        if (e.key === "ArrowRight" && zoom === 1) next();
        if (e.key === "+" || e.key === "=") handleZoomIn();
        if (e.key === "-") handleZoomOut();
        if (e.key === "0") resetZoom();
      }
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [onClose, prev, next, isCropping, zoom, resetZoom, handleZoomIn, handleZoomOut]);

  // Manejo de rueda del ratón para zoom suave
  const handleWheel = (e: React.WheelEvent) => {
    if (isCropping) return;
    e.stopPropagation();
    if (e.deltaY < 0) {
      setZoom((z) => Math.min(4, Number((z + 0.25).toFixed(2))));
    } else {
      setZoom((z) => {
        const newZ = Math.max(1, Number((z - 0.25).toFixed(2)));
        if (newZ <= 1) setPan({ x: 0, y: 0 });
        return newZ;
      });
    }
  };

  // Arrastre táctil y mouse cuando zoom > 1
  const handlePointerDown = (e: React.PointerEvent) => {
    if (zoom <= 1 || isCropping) return;
    setIsPanning(true);
    setDragStart({
      x: e.clientX,
      y: e.clientY,
      panX: pan.x,
      panY: pan.y,
    });
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isPanning || zoom <= 1) return;
    const deltaX = e.clientX - dragStart.x;
    const deltaY = e.clientY - dragStart.y;
    // Limitar el arrastre proporcional al nivel de zoom
    const maxBound = 300 * (zoom - 1);
    const newX = Math.max(-maxBound, Math.min(maxBound, dragStart.panX + deltaX));
    const newY = Math.max(-maxBound, Math.min(maxBound, dragStart.panY + deltaY));
    setPan({ x: newX, y: newY });
  };

  const handlePointerUp = (e: React.PointerEvent) => {
    if (isPanning) {
      setIsPanning(false);
      try {
        (e.currentTarget as HTMLElement).releasePointerCapture(e.pointerId);
      } catch {}
    }
  };

  const handleDownloadOriginal = () => {
    if (!foto) return;
    const a = document.createElement("a");
    a.href = foto.imagen;
    a.download = `semta-foto-${indice + 1}.jpg`;
    a.target = "_blank";
    a.rel = "noopener noreferrer";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  if (!foto) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={`Imagen ${indice + 1} de ${fotos.length}`}
      className="fixed inset-0 z-[80] flex flex-col bg-black/95 backdrop-blur-sm select-none"
      onClick={onClose}
    >
      {/* Barra de herramientas superior */}
      <div
        className="flex flex-wrap items-center justify-between gap-3 border-b border-white/10 bg-black/60 px-4 py-3 sm:px-6"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center gap-3">
          <span className="rounded-full bg-white/10 px-3 py-1 text-label-xs font-semibold text-white/90">
            {indice + 1} / {fotos.length}
          </span>
          <span className="hidden text-body-xs text-white/60 sm:inline">
            Usa rueda de ratón o botones para zoom · Doble clic para 2x
          </span>
        </div>

        {/* Controles de zoom, cropper y acciones */}
        <div className="flex items-center gap-1.5 sm:gap-2">
          {/* Controles de Zoom */}
          <div className="flex items-center rounded-full bg-white/10 p-0.5">
            <button
              type="button"
              onClick={handleZoomOut}
              disabled={zoom <= 1}
              aria-label="Alejar zoom"
              title="Alejar zoom (-)"
              className="rounded-full p-2 text-white/80 transition-colors hover:bg-white/15 hover:text-white disabled:opacity-40"
            >
              <MaterialIcon name="zoom_out" className="text-[20px]" />
            </button>

            <button
              type="button"
              onClick={resetZoom}
              aria-label="Restablecer zoom"
              title="Restablecer a 100% (0)"
              className="px-2.5 py-1 text-label-xs font-semibold text-white/90 transition-colors hover:text-primary-fixed"
            >
              {Math.round(zoom * 100)}%
            </button>

            <button
              type="button"
              onClick={handleZoomIn}
              disabled={zoom >= 4}
              aria-label="Acercar zoom"
              title="Acercar zoom (+)"
              className="rounded-full p-2 text-white/80 transition-colors hover:bg-white/15 hover:text-white disabled:opacity-40"
            >
              <MaterialIcon name="zoom_in" className="text-[20px]" />
            </button>
          </div>

          {/* Botón de Recorte (Canvas Cropper) */}
          {enableCropper && (
            <button
              type="button"
              onClick={() => setIsCropping((v) => !v)}
              aria-label="Recortar y optimizar"
              title={isCropping ? "Ver imagen completa" : "Abrir herramienta de recorte"}
              className={`flex items-center gap-1.5 rounded-full px-3 py-2 text-label-xs font-semibold transition-colors ${
                isCropping
                  ? "bg-primary text-on-primary"
                  : "bg-white/10 text-white/90 hover:bg-white/20"
              }`}
            >
              <MaterialIcon name="crop" className="text-[18px]" />
              <span className="hidden md:inline">{isCropping ? "Cerrar recorte" : "Recortar"}</span>
            </button>
          )}

          {/* Descargar original */}
          <button
            type="button"
            onClick={handleDownloadOriginal}
            aria-label="Descargar imagen"
            title="Descargar fotografía original"
            className="rounded-full p-2 text-white/80 transition-colors hover:bg-white/15 hover:text-white"
          >
            <MaterialIcon name="download" className="text-[20px]" />
          </button>

          {/* Cerrar visor */}
          <button
            type="button"
            onClick={onClose}
            aria-label="Cerrar visor"
            title="Cerrar visor (Esc)"
            className="rounded-full p-2 text-white transition-colors hover:bg-white/20"
          >
            <MaterialIcon name="close" className="text-[22px]" />
          </button>
        </div>
      </div>

      {/* Área central interactiva */}
      <div
        ref={imageContainerRef}
        className="relative flex flex-1 items-center justify-center overflow-hidden p-4"
        onClick={(e) => {
          if (zoom > 1) {
            e.stopPropagation();
          }
        }}
        onWheel={handleWheel}
      >
        {isCropping ? (
          <div
            className="w-full max-w-2xl max-h-[85vh] overflow-y-auto p-2"
            onClick={(e) => e.stopPropagation()}
          >
            <CanvasCropper initialImage={foto.imagen} onCancel={() => setIsCropping(false)} />
          </div>
        ) : (
          <div
            className={`relative size-full flex items-center justify-center transition-transform ${
              isPanning ? "cursor-grabbing" : zoom > 1 ? "cursor-grab" : "cursor-zoom-in"
            }`}
            style={{
              position: "relative",
              width: "100%",
              height: "100%",
              transform: `translate3d(${pan.x}px, ${pan.y}px, 0) scale(${zoom})`,
              transition: isPanning ? "none" : "transform 0.2s ease-out",
            }}
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={handlePointerUp}
            onPointerCancel={handlePointerUp}
            onDoubleClick={(e) => {
              e.stopPropagation();
              toggleZoom();
            }}
            onClick={(e) => {
              e.stopPropagation();
            }}
          >
            <Image
              src={foto.imagen}
              alt={foto.alt}
              fill
              sizes="100vw"
              priority
              className="object-contain pointer-events-none"
            />
          </div>
        )}

        {/* Botones flotantes de navegación previa / siguiente */}
        {!isCropping && fotos.length > 1 && (
          <>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                prev();
              }}
              aria-label="Imagen anterior"
              className="absolute left-4 top-1/2 -translate-y-1/2 rounded-full bg-black/50 p-3 text-white backdrop-blur-sm transition-all hover:scale-110 hover:bg-black/80 focus-visible:ring-2 focus-visible:ring-primary"
            >
              <MaterialIcon name="chevron_right" className="rotate-180 text-[26px]" />
            </button>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                next();
              }}
              aria-label="Imagen siguiente"
              className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full bg-black/50 p-3 text-white backdrop-blur-sm transition-all hover:scale-110 hover:bg-black/80 focus-visible:ring-2 focus-visible:ring-primary"
            >
              <MaterialIcon name="chevron_right" className="text-[26px]" />
            </button>
          </>
        )}
      </div>

      {/* Barra inferior informativa */}
      <div
        className="flex items-center justify-center border-t border-white/10 bg-black/60 px-6 py-3.5"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex-1 text-center">
          <p className="line-clamp-2 max-w-2xl mx-auto text-body-sm text-white/90 font-medium">
            {foto.alt}
          </p>
          {foto.caption && (
            <p className="mt-0.5 line-clamp-1 text-body-xs text-white/60">{foto.caption}</p>
          )}
        </div>
      </div>
    </div>
  );
}
