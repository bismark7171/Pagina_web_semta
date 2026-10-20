import { describe, it, expect } from "vitest";
import { formatBytes } from "@/lib/canvasCropper";

describe("canvasCropper utility unit tests", () => {
  it("formatBytes formatea 0 bytes correctamente", () => {
    expect(formatBytes(0)).toBe("0 B");
  });

  it("formatBytes formatea kilobytes adecuadamente", () => {
    expect(formatBytes(1024)).toBe("1 KB");
    expect(formatBytes(2048)).toBe("2 KB");
  });

  it("formatBytes formatea megabytes adecuadamente", () => {
    expect(formatBytes(1024 * 1024)).toBe("1 MB");
    expect(formatBytes(5 * 1024 * 1024)).toBe("5 MB");
  });
});
