"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { MaterialIcon } from "@/components/ui/MaterialIcon";
import { useImageViewer } from "@/components/ui/ImageViewerContext";

export interface ZoomableImageProps {
  src: string;
  alt: string;
  caption?: string;
  fill?: boolean;
  width?: number;
  height?: number;
  sizes?: string;
  priority?: boolean;
  aspectRatioClass?: string;
  className?: string;
  imageClassName?: string;
  gallery?: Array<{ imagen: string; alt: string; caption?: string }>;
  galleryIndex?: number;
  clickToOpen?: boolean;
  showHoverButton?: boolean;
  badge?: React.ReactNode;
  children?: React.ReactNode;
  onError?: (e: React.SyntheticEvent<HTMLImageElement, Event>) => void;
}

export function ZoomableImage({
  src,
  alt,
  caption,
  fill = true,
  width,
  height,
  sizes = "(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw",
  priority = false,
  aspectRatioClass = "aspect-[16/10]",
  className = "",
  imageClassName = "",
  gallery,
  galleryIndex = 0,
  clickToOpen = true,
  showHoverButton = true,
  badge,
  children,
  onError,
}: ZoomableImageProps) {
  const { openViewer } = useImageViewer();
  const [imgSrc, setImgSrc] = useState(src);

  useEffect(() => {
    setImgSrc(src);
  }, [src]);

  const handleOpen = (e?: React.MouseEvent) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    const fotos = gallery && gallery.length > 0 ? gallery : [{ imagen: imgSrc, alt, caption }];

    openViewer({
      fotos,
      indiceInicial: galleryIndex,
    });
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      handleOpen();
    }
  };

  return (
    <div
      className={`group/zoom relative overflow-hidden bg-surface-container-high ${aspectRatioClass} ${className}`}
      style={{ position: "relative" }}
    >
      <Image
        src={imgSrc}
        alt={alt}
        fill={fill}
        width={fill ? undefined : width}
        height={fill ? undefined : height}
        sizes={sizes}
        priority={priority}
        className={`object-cover transition-transform duration-500 group-hover/zoom:scale-105 ${imageClassName}`}
        onError={(e) => {
          if (onError) {
            onError(e);
          }
        }}
      />

      {/* Badges o elementos hijos en la esquina superior */}
      {badge && <div className="absolute left-3 top-3 z-10">{badge}</div>}
      {children && <div className="relative z-10">{children}</div>}

      {/* Botón flotante accesible de Ampliar / Zoom */}
      {showHoverButton && (
        <button
          type="button"
          onClick={handleOpen}
          onKeyDown={handleKeyDown}
          aria-label={`Ampliar foto: ${alt}`}
          title="Ver en alta resolución con zoom y recorte"
          className="absolute bottom-3 right-3 z-20 inline-flex items-center gap-1.5 rounded-full bg-black/60 px-3 py-1.5 text-label-xs font-semibold text-white shadow-md backdrop-blur-md transition-all duration-200 hover:scale-105 hover:bg-black/80 focus-visible:ring-2 focus-visible:ring-primary opacity-90 sm:opacity-0 sm:group-hover/zoom:opacity-100"
        >
          <MaterialIcon name="zoom_in" className="text-[16px] text-primary-fixed" />
          <span>Zoom</span>
        </button>
      )}

      {/* Capa de clic general si clickToOpen está activo */}
      {clickToOpen && (
        <button
          type="button"
          onClick={handleOpen}
          aria-label={`Ver imagen: ${alt}`}
          className="absolute inset-0 z-0 size-full cursor-zoom-in border-0 bg-transparent p-0 text-transparent focus:outline-none"
          tabIndex={-1}
        />
      )}
    </div>
  );
}
