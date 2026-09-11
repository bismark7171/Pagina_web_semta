/**
 * test/lib/utils.test.ts
 * Tests de utilidades puras: cn() y materialIconName()
 */

import { describe, it, expect } from "vitest";
import { cn, materialIconName } from "@/lib/utils";

describe("cn", () => {
  it("une múltiples clases en un string", () => {
    expect(cn("a", "b", "c")).toBe("a b c");
  });

  it("filtra valores falsy", () => {
    expect(cn("a", undefined, null, false, "b")).toBe("a b");
  });

  it("filtra el cero (falsy) igual que clsx", () => {
    expect(cn("px-4", 0, "flex")).toBe("px-4 flex");
  });

  it("maneja array vacío", () => {
    expect(cn([])).toBe("");
  });
});

describe("materialIconName", () => {
  it("mantiene nombres de iconos válidos", () => {
    expect(materialIconName("home")).toBe("home");
    expect(materialIconName("arrow_forward")).toBe("arrow_forward");
    expect(materialIconName("check_circle")).toBe("check_circle");
  });

  it("remueve caracteres no alfanuméricos ni underscore", () => {
    // El regex [^a-z0-9_] con flags gi conserva letras ASCII y quita símbolos/tildes
    expect(materialIconName("Mi Ícono! →")).toBe("Micono");
  });

  it("remueve espacios y símbolos", () => {
    expect(materialIconName("a b-c.d")).toBe("abcd");
  });
});
