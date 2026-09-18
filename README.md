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

## Required production configuration

El sitio no tiene **ninguna vía de contacto funcional** sin estas dos
variables configuradas en el entorno de producción (Vercel):

- `NEXT_PUBLIC_WHATSAPP_NUMBER`
- `NEXT_PUBLIC_CONTACT_EMAIL`

Por diseño, si una de las dos falta, el CTA correspondiente (botón de
WhatsApp o "Escribinos") no se renderiza — nunca como link roto, pero
tampoco se muestra ningún canal alternativo. Si **ambas** faltan,
`/contacto` y el bloque de contacto de Home quedan solo con título y
texto, sin ningún botón de acción.

No incluir valores reales en este repositorio. Completar `.env.local`
(desarrollo, gitignorado) a partir de `.env.local.example`, y configurar
las mismas variables en el proyecto de Vercel antes de lanzar.

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
