# Pensamiento Lateral — Web 2026

Ver `CLAUDE.md` para el brief estratégico y técnico completo.

## Stack

- Next.js (App Router) + TypeScript
- Tailwind CSS v4 (tokens en `src/styles/tokens.css`)
- CMS: Sanity (fase posterior, no integrado todavía)

## Desarrollo local

```bash
npm install
cp .env.local.example .env.local   # completar NEXT_PUBLIC_WHATSAPP_NUMBER y NEXT_PUBLIC_CONTACT_EMAIL
npm run dev
```

Abrir [http://localhost:3000](http://localhost:3000).

Otros comandos:

```bash
npm run lint    # ESLint
npm run build   # build de producción + type-check
```

## Estructura

```
src/
  app/          rutas (App Router), layout raíz, globals.css
  components/
    layout/     Header, Footer, MobileMenu
    ui/         primitivas reutilizables (Container, Button, WhatsAppButton)
  sections/     secciones de página con copy real (pendiente de content/final-copy.md)
  lib/          constantes (nav) y helpers (env vars de contacto)
  styles/       design tokens (colores, tipografía, radios, motion)
  types/        tipos de contenido, alineados a los futuros schemas de Sanity
content/
  final-copy.md  copy aprobado por el cliente (pendiente de agregar)
```

## Estado actual

Fase 1 en curso: proyecto, tokens, Header/Footer estructurales y sistema de
componentes listos. Las secciones de contenido de la Home están pendientes
de `content/final-copy.md` (ver `CLAUDE.md` #34 y #40).
