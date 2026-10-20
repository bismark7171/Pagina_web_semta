/**
 * src/lib/canvasCropper.ts
 * Utilidades de manipulación de imagen y recorte basadas en Canvas 2D nativo (100% open source).
 * Sin librerías pesadas externas, compatible con browsers móviles y de escritorio.
 */

export interface CropArea {
  x: number; // porcentaje 0..1 o píxeles relativos
  y: number;
  width: number;
  height: number;
}

export interface CropResult {
  dataUrl: string;
  blob: Blob;
  width: number;
  height: number;
  sizeBytes: number;
}

/**
 * Recorta y optimiza una imagen usando Canvas nativo.
 * Puede redimensionar a un ancho/alto máximo para ahorrar ancho de banda y memoria.
 */
export async function cropAndOptimizeImage(
  imageSource: HTMLImageElement | ImageBitmap,
  crop: CropArea,
  options: {
    maxWidth?: number;
    maxHeight?: number;
    format?: "image/webp" | "image/jpeg" | "image/png";
    quality?: number;
  } = {},
): Promise<CropResult> {
  const { maxWidth = 1200, maxHeight = 1200, format = "image/webp", quality = 0.88 } = options;

  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");
  if (!ctx) {
    throw new Error("No se pudo obtener el contexto 2D del Canvas.");
  }

  // Dimensiones del recorte
  const srcW = Math.max(1, crop.width);
  const srcH = Math.max(1, crop.height);

  // Calcular tamaño final preservando proporción
  let destW = srcW;
  let destH = srcH;

  if (destW > maxWidth) {
    destH = Math.round((destH * maxWidth) / destW);
    destW = maxWidth;
  }
  if (destH > maxHeight) {
    destW = Math.round((destW * maxHeight) / destH);
    destH = maxHeight;
  }

  canvas.width = destW;
  canvas.height = destH;

  // Renderizado nítido
  ctx.imageSmoothingEnabled = true;
  ctx.imageSmoothingQuality = "high";

  ctx.drawImage(imageSource, crop.x, crop.y, crop.width, crop.height, 0, 0, destW, destH);

  return new Promise((resolve, reject) => {
    canvas.toBlob(
      (blob) => {
        if (!blob) {
          reject(new Error("Error al exportar el Blob del Canvas."));
          return;
        }
        const dataUrl = canvas.toDataURL(format, quality);
        resolve({
          dataUrl,
          blob,
          width: destW,
          height: destH,
          sizeBytes: blob.size,
        });
      },
      format,
      quality,
    );
  });
}

/**
 * Carga un archivo File o URL en un elemento HTMLImageElement.
 */
export function loadImageElement(source: File | string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.onload = () => resolve(img);
    img.onerror = () => reject(new Error("No se pudo cargar la imagen para procesarla."));

    if (typeof source === "string") {
      img.src = source;
    } else {
      const url = URL.createObjectURL(source);
      img.src = url;
    }
  });
}

/**
 * Formatea bytes en cadena legible (ej. 145 KB)
 */
export function formatBytes(bytes: number): string {
  if (bytes === 0) return "0 B";
  const k = 1024;
  const sizes = ["B", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(1))} ${sizes[i]}`;
}
