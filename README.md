# Pensamiento Lateral — Web 2026

Ver `CLAUDE.md` para el brief estratégico y técnico completo.

## Stack

- Next.js (App Router) + TypeScript
- Tailwind CSS v4 (tokens en `src/styles/tokens.css`)
- CMS: Sanity — schemas y Studio listos (`/studio`), **todavía no
  conectado al frontend público**; ver "Sanity CMS" más abajo

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
  app/
    (site)/     todas las rutas públicas (Home, servicios, casos, etc.) —
                envueltas por su propio layout con Header/Footer
    studio/     Studio de Sanity embebido en /studio, fuera de (site)
                (sin Header/Footer)
    api/        draft, disable-draft, revalidate (ver "Sanity CMS")
    layout.tsx  layout raíz mínimo (html/body/fuente) — el Header/Footer
                vive en app/(site)/layout.tsx, no acá
  components/
    layout/     Header, Footer, MobileMenu
    ui/         primitivas reutilizables (Container, Button, WhatsAppButton)
  sections/     secciones de Home con copy real
  lib/          constantes (nav), helpers (env vars de contacto), datos
                estáticos de página (src/lib/data) — ver nota de Sanity
  sanity/       schemas, clientes, queries y script de migración (ver
                "Sanity CMS") — nada de esto se lee todavía en producción
  styles/       design tokens (colores, tipografía, radios, motion)
  types/        tipos de contenido
content/
  final-copy.md  copy aprobado por el cliente — fuente de verdad del copy
sanity.config.ts   config del Studio (raíz del repo, convención de Sanity)
sanity.cli.ts      config del CLI de Sanity
```

## Estado actual

Las 15 páginas públicas están construidas, aprobadas y **congeladas**
(ver `CLAUDE.md`). Contenido de Insights/Casos/Autores/Prensa sigue
siendo estático en `src/lib/data/*.ts` — la integración de Sanity está en
curso (schemas y Studio listos, sin conectar al frontend todavía; ver
"Sanity CMS").

## Sanity CMS

Gestiona únicamente **Insights, Casos, Autores y Prensa** — el resto del
sitio (Home institucional, los tres servicios, Empresas, Instituciones,
Pymes, Contacto) sigue estático en código, a propósito.

**Studio:** `/studio` (embebido, requiere las variables `NEXT_PUBLIC_SANITY_*`).

**El frontend público NO lee de Sanity todavía.** `src/sanity/` contiene
schemas, clientes (`published`/`drafts`), queries y el script de
migración, pero ninguna página de `src/app/(site)` fue modificada para
usarlos — siguen leyendo `src/lib/data/*.ts`, sin excepción, hasta el
corte de datos aprobado.

**Migración** (una vez configuradas las variables de Sanity):

```bash
npm run migrate:sanity:dry   # imprime el plan, no escribe nada
npm run migrate:sanity       # escribe (createOrReplace — seguro re-ejecutarlo)
```

**Webhook de revalidación:** configurar en el proyecto de Sanity (Manage
→ API → Webhooks) apuntando a `/api/revalidate`, disparado en
create/update/delete de `insight`, `caseStudy`, `author` y `pressItem`,
con esta proyección GROQ como payload:

```groq
{ "_type": _type, "_id": _id, "slug": slug.current }
```

y el secret del webhook copiado a `SANITY_REVALIDATE_SECRET`.
