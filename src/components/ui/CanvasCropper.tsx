"use client";

import React, { useRef, useState, useEffect, useCallback } from "react";
import { MaterialIcon } from "@/components/ui/MaterialIcon";
import { Button } from "@/components/ui/Button";
import {
  cropAndOptimizeImage,
  loadImageElement,
  formatBytes,
  type CropResult,
} from "@/lib/canvasCropper";

export interface CanvasCropperProps {
  initialImage?: string | File;
  aspectRatio?: number; // ej. 1 para 1:1, 16/9 para 16:9, o undefined para libre
  onCropComplete?: (result: CropResult) => void;
  onCancel?: () => void;
  className?: string;
}

const ASPECT_RATIO_PRESETS = [
  { label: "1:1 Cuadrado", value: 1 },
  { label: "16:9 Panorámico", value: 16 / 9 },
  { label: "4:3 Estándar", value: 4 / 3 },
  { label: "Libre", value: undefined },
];

export function CanvasCropper({
  initialImage,
  aspectRatio = 1,
  onCropComplete,
  onCancel,
  className = "",
}: CanvasCropperProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [imgElement, setImgElement] = useState<HTMLImageElement | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [currentAspect, setCurrentAspect] = useState<number | undefined>(aspectRatio);

  // Estados de recorte en coordenadas relativas a la imagen original (píxeles reales)
  const [crop, setCrop] = useState({ x: 0, y: 0, width: 200, height: 200 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0, cropX: 0, cropY: 0 });
  const [previewResult, setPreviewResult] = useState<CropResult | null>(null);
  const [zoomScale, setZoomScale] = useState(0.8);

  const recalculateCrop = useCallback(
    (img: HTMLImageElement, aspect?: number, pct: number = 0.8) => {
      const nw = img.naturalWidth;
      const nh = img.naturalHeight;
      const baseDim = Math.min(nw, nh);
      let cropW = Math.round(baseDim * pct);
      let cropH = aspect ? Math.round(cropW / aspect) : cropW;

      if (cropH > nh) {
        cropH = Math.round(nh * 0.9);
        cropW = aspect ? Math.round(cropH * aspect) : cropH;
      }
      if (cropW > nw) {
        cropW = Math.round(nw * 0.9);
        cropH = aspect ? Math.round(cropW / aspect) : cropW;
      }

      setCrop({
        x: Math.max(0, Math.round((nw - cropW) / 2)),
        y: Math.max(0, Math.round((nh - cropH) / 2)),
        width: Math.max(10, Math.round(cropW)),
        height: Math.max(10, Math.round(cropH)),
      });
    },
    [],
  );

  // Cargar imagen
  useEffect(() => {
    if (!initialImage) return;
    setLoading(true);
    setError(null);

    loadImageElement(initialImage)
      .then((img) => {
        setImgElement(img);
        recalculateCrop(img, currentAspect, zoomScale);
      })
      .catch((err) => {
        setError(err.message || "Error al cargar la imagen");
      })
      .finally(() => setLoading(false));
  }, [initialImage, recalculateCrop, currentAspect, zoomScale]);

  const handleAspectChange = (aspect?: number) => {
    setCurrentAspect(aspect);
    if (imgElement) {
      recalculateCrop(imgElement, aspect, zoomScale);
    }
  };

  // Dibujar en el canvas con el visor y la máscara de recorte
  const drawViewer = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas || !imgElement) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Ajustar canvas al contenedor
    const container = containerRef.current;
    const containerW = container ? Math.max(260, container.clientWidth - 24) : 400;
    const maxH = 340;
    const scale = Math.min(
      containerW / imgElement.naturalWidth,
      maxH / imgElement.naturalHeight,
      1,
    );

    const displayW = Math.max(1, Math.round(imgElement.naturalWidth * scale));
    const displayH = Math.max(1, Math.round(imgElement.naturalHeight * scale));

    canvas.width = displayW;
    canvas.height = displayH;

    // 1. Dibujar imagen
    ctx.drawImage(imgElement, 0, 0, displayW, displayH);

    // 2. Máscara oscura semitransparente
    ctx.fillStyle = "rgba(0, 0, 0, 0.6)";
    ctx.fillRect(0, 0, displayW, displayH);

    // 3. Recorte visible claro
    const vx = crop.x * scale;
    const vy = crop.y * scale;
    const vw = crop.width * scale;
    const vh = crop.height * scale;

    ctx.save();
    ctx.beginPath();
    ctx.rect(vx, vy, vw, vh);
    ctx.clip();
    ctx.drawImage(imgElement, 0, 0, displayW, displayH);
    ctx.restore();

    // 4. Borde y guías de regla de tercios
    ctx.strokeStyle = "#0d631b"; // Verde SEMTA
    ctx.lineWidth = 2;
    ctx.strokeRect(vx, vy, vw, vh);

    ctx.strokeStyle = "rgba(255, 255, 255, 0.4)";
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(vx + vw / 3, vy);
    ctx.lineTo(vx + vw / 3, vy + vh);
    ctx.moveTo(vx + (2 * vw) / 3, vy);
    ctx.lineTo(vx + (2 * vw) / 3, vy + vh);
    ctx.moveTo(vx, vy + vh / 3);
    ctx.lineTo(vx + vw, vy + vh / 3);
    ctx.moveTo(vx, vy + (2 * vh) / 3);
    ctx.lineTo(vx + vw, vy + (2 * vh) / 3);
    ctx.stroke();
  }, [imgElement, crop]);

  useEffect(() => {
    drawViewer();
  }, [drawViewer]);

  // Manejadores de arrastre táctil y mouse
  const handlePointerDown = (e: React.PointerEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas || !imgElement) return;
    const rect = canvas.getBoundingClientRect();
    const scale = canvas.width / imgElement.naturalWidth;
    const clickX = (e.clientX - rect.left) / scale;
    const clickY = (e.clientY - rect.top) / scale;

    if (
      clickX >= crop.x &&
      clickX <= crop.x + crop.width &&
      clickY >= crop.y &&
      clickY <= crop.y + crop.height
    ) {
      setIsDragging(true);
      setDragStart({
        x: e.clientX,
        y: e.clientY,
        cropX: crop.x,
        cropY: crop.y,
      });
      (e.target as HTMLElement).setPointerCapture(e.pointerId);
    }
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (!isDragging || !imgElement || !canvasRef.current) return;
    const scale = canvasRef.current.width / imgElement.naturalWidth;
    const deltaX = (e.clientX - dragStart.x) / scale;
    const deltaY = (e.clientY - dragStart.y) / scale;

    const maxX = Math.max(0, imgElement.naturalWidth - crop.width);
    const maxY = Math.max(0, imgElement.naturalHeight - crop.height);

    const newX = Math.max(0, Math.min(maxX, Math.round(dragStart.cropX + deltaX)));
    const newY = Math.max(0, Math.min(maxY, Math.round(dragStart.cropY + deltaY)));

    setCrop((prev) => ({ ...prev, x: newX, y: newY }));
  };

  const handlePointerUp = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (isDragging) {
      setIsDragging(false);
      try {
        (e.target as HTMLElement).releasePointerCapture(e.pointerId);
      } catch {}
    }
  };

  // Zoom / escala del área de recorte
  const handleZoomChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!imgElement) return;
    const pct = parseFloat(e.target.value);
    setZoomScale(pct);
    recalculateCrop(imgElement, currentAspect, pct);
  };

  // Procesar recorte y optimizar a WebP/JPEG
  const handleProcess = async () => {
    if (!imgElement) return;
    setLoading(true);
    try {
      const res = await cropAndOptimizeImage(imgElement, crop, {
        maxWidth: 900,
        maxHeight: 900,
        format: "image/webp",
        quality: 0.88,
      });
      setPreviewResult(res);
      if (onCropComplete) {
        onCropComplete(res);
      }
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Error al procesar el recorte";
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  const handleDownload = () => {
    if (!previewResult) return;
    const link = document.createElement("a");
    link.href = previewResult.dataUrl;
    link.download = `recorte-semta-${Date.now()}.webp`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div
      className={`flex flex-col gap-4 rounded-3xl border border-outline-variant bg-surface-container-lowest p-5 sm:p-6 text-on-surface ${className}`}
    >
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-outline-variant pb-3">
        <div className="flex items-center gap-2.5">
          <span className="grid size-9 place-items-center rounded-xl bg-primary/10 text-primary">
            <MaterialIcon name="crop" className="text-[20px]" />
          </span>
          <div>
            <h4 className="font-headline-sm text-on-surface">
              Herramienta de Recorte y Optimización
            </h4>
            <p className="text-body-xs text-on-surface-variant">
              Arrastra el recuadro para encuadrar y optimizar en WebP sin salir del navegador
            </p>
          </div>
        </div>

        {previewResult && (
          <span className="rounded-full bg-primary/15 px-3 py-1 text-label-xs font-semibold text-primary">
            WebP optimizado: {formatBytes(previewResult.sizeBytes)} ({previewResult.width}×
            {previewResult.height}px)
          </span>
        )}
      </div>

      {error && (
        <div className="rounded-2xl border border-error/30 bg-error-container/20 p-3 text-body-sm text-error">
          {error}
        </div>
      )}

      {/* Selector de proporción de aspecto */}
      <div className="flex flex-wrap items-center gap-2">
        <span className="text-label-sm font-medium text-on-surface-variant">Proporción:</span>
        {ASPECT_RATIO_PRESETS.map((preset) => {
          const isActive = currentAspect === preset.value;
          return (
            <button
              key={preset.label}
              type="button"
              onClick={() => handleAspectChange(preset.value)}
              className={`rounded-full px-3 py-1 text-label-xs font-semibold transition-colors ${
                isActive
                  ? "bg-primary text-on-primary"
                  : "bg-surface-container text-on-surface-variant hover:bg-surface-container-high"
              }`}
            >
              {preset.label}
            </button>
          );
        })}
      </div>

      {/* Contenedor del Canvas interactivo */}
      <div
        ref={containerRef}
        className="relative flex min-h-[260px] items-center justify-center overflow-hidden rounded-2xl bg-surface-container/60 p-2 select-none"
      >
        {loading && !imgElement ? (
          <div className="flex flex-col items-center gap-2 text-on-surface-variant">
            <MaterialIcon name="sync" className="animate-spin text-[32px] text-primary" />
            <p className="text-body-sm">Cargando imagen en el lienzo...</p>
          </div>
        ) : (
          <canvas
            ref={canvasRef}
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={handlePointerUp}
            onPointerCancel={handlePointerUp}
            className="cursor-move touch-none rounded-lg shadow-sm"
          />
        )}
      </div>

      {/* Controles de ajuste y acciones */}
      {imgElement && (
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between pt-1">
          <div className="flex items-center gap-3">
            <MaterialIcon name="zoom_in" className="text-[20px] text-on-surface-variant" />
            <label
              htmlFor="crop-zoom"
              className="text-label-sm text-on-surface-variant font-medium"
            >
              Zoom de encuadre:
            </label>
            <input
              id="crop-zoom"
              type="range"
              min="0.2"
              max="1"
              step="0.05"
              value={zoomScale}
              onChange={handleZoomChange}
              className="accent-primary cursor-pointer h-1.5 w-28 sm:w-36 rounded-lg bg-surface-container"
            />
          </div>

          <div className="flex flex-wrap items-center justify-end gap-2">
            {onCancel && (
              <Button variant="ghost" size="sm" onClick={onCancel} type="button">
                Cerrar recorte
              </Button>
            )}

            {previewResult && (
              <Button
                variant="secondary"
                size="sm"
                icono="download"
                onClick={handleDownload}
                type="button"
              >
                Descargar WebP
              </Button>
            )}

            <Button
              variant="primary"
              size="sm"
              icono="check_circle"
              onClick={handleProcess}
              disabled={loading}
              type="button"
            >
              {loading ? "Procesando..." : "Aplicar y Optimizar"}
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
