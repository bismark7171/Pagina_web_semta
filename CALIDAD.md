# SEMTA Web — Sistema de Calidad y Guardarraíles

## Cómo funciona la protección antes de producción

```
ESCRIBES CÓDIGO
      │
      ▼
[git commit]
      │
      ├─ 🔍 pre-commit (Husky + lint-staged)
      │     • Prettier formatea archivos staged
      │     • ESLint corrige errores en archivos staged
      │     • tsc --noEmit verifica tipos TypeScript
      │     Tiempo: ~5s  |  Bloquea: tipos rotos, ESLint errors
      │
      ▼
[git push]
      │
      ├─ 🧪 pre-push (Husky)
      │     • npm test → 177 tests (lógica + componentes + a11y)
      │     • npm build → build de producción Next.js
      │     Tiempo: ~2min  |  Bloquea: tests fallidos, "use client" faltante,
      │                               imports rotos, CSS inválido
      │
      ▼
[GitHub → rama main]
      │
      ├─ ⚙️ GitHub Actions CI (4 jobs paralelos)
      │     ① tsc --noEmit    → TypeScript
      │     ② next lint       → ESLint
      │     ③ vitest run      → 177 tests
      │     ④ next build      → build en servidor limpio
      │     Tiempo: ~2min  |  Bloquea: merge si cualquier job falla
      │
      ▼
[Vercel Deploy]  ← Solo llega código que pasó todo lo anterior
```

---

## Scripts disponibles

| Comando | Qué hace | Cuándo usarlo |
|---|---|---|
| `npm run dev` | Servidor de desarrollo local | Día a día |
| `npm run build` | Build de producción | Antes de deploy manual |
| `npm run lint` | ESLint en todo el proyecto | Revisar problemas |
| `npm run lint:fix` | ESLint + auto-corrección | Limpiar errores |
| `npm run format` | Prettier en `src/**` | Formatear todo |
| `npm run format:check` | Prettier sin modificar | Verificar formato |
| `npm run typecheck` | TypeScript sin compilar | Verificar tipos |
| `npm test` | 177 tests, una sola vez | Antes de push |
| `npm run test:watch` | Tests en modo interactivo | Durante desarrollo |
| `npm run test:coverage` | Tests + reporte de cobertura | Auditoría de calidad |
| `npm run validate` | typecheck + lint + test | Verificación completa manual |

---

## Estructura de tests

```
test/
├── setup.tsx                    # Mocks globales (next/image, firebase, framer-motion)
├── lib/
│   ├── images.test.ts           # normalizeImageUrl — URLs de Drive, lh3, fallback
│   └── projectAdapter.test.ts  # Firestore → IProject: estados, tipos, imágenes
├── components/
│   ├── ProjectCard.test.tsx     # Renderizado, estados, proyectos reales de BD
│   ├── ProjectsFilter.test.tsx  # Chips, selects, búsqueda, callbacks
│   ├── ProjectsExplorer.test.tsx # Filtros combinados, modal, municipios dinámicos
│   ├── ContactoForm.test.tsx    # Campos, validación, envío, reset, props
│   └── VerificarCertificado.test.tsx # Estados: vacío/válido/inválido, UX
├── pages/
│   └── smoke.test.tsx           # ¿Renderiza sin explotar? — todos los componentes
└── accessibility/
    └── a11y.test.tsx            # axe-core: labels, alts, ARIA, estructura semántica
```

**Total: 177 tests en 9 archivos.**

---

## Qué detecta cada capa

| Bug | pre-commit | pre-push | CI |
|---|---|---|---|
| Error de TypeScript | ✅ | ✅ | ✅ |
| `"use client"` faltante | ✅ (tsc) | ✅ (build) | ✅ (build) |
| ESLint error | ✅ | — | ✅ |
| Test fallido | — | ✅ | ✅ |
| Build roto | — | ✅ | ✅ |
| Import inexistente | ✅ (tsc) | ✅ (build) | ✅ (build) |
| Componente no renderiza | — | ✅ | ✅ |
| Violación de accesibilidad | — | ✅ | ✅ |

---

## Para nuevos desarrolladores

```bash
# 1. Clonar e instalar (Husky se activa automáticamente via "prepare")
npm install

# 2. Los hooks git quedan activos solos — no hay nada más que configurar

# 3. Flujo de trabajo normal
npm run dev          # desarrollar
git add .
git commit -m "..."  # pre-commit corre automáticamente
git push             # pre-push corre automáticamente
```

Si necesitas saltarte un hook puntualmente (emergencia):
```bash
git commit --no-verify -m "hotfix urgente"
git push --no-verify
```
⚠️ Úsalo solo en emergencias reales — el CI de GitHub igual va a correr.
