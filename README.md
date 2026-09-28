# Pensamiento Lateral — Web 2026

Ver `CLAUDE.md` para el brief estratégico y técnico completo.

## Stack

- Next.js (App Router) + TypeScript
- Tailwind CSS v4 (tokens en `src/styles/tokens.css`)
- CMS: Sanity — Studio embebido (`/studio`) y **conectado al frontend
  público** para Insights, Casos, Autores y Prensa; ver "Sanity CMS" más
  abajo

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
                "Sanity CMS") — las páginas públicas leen de acá para
                Insights, Casos, Autores y Prensa
  styles/       design tokens (colores, tipografía, radios, motion)
  types/        tipos de contenido
content/
  final-copy.md  copy aprobado por el cliente — fuente de verdad del copy
sanity.config.ts   config del Studio (raíz del repo, convención de Sanity)
sanity.cli.ts      config del CLI de Sanity
```

## Estado actual

Las 15 páginas públicas están construidas, aprobadas y **congeladas**
(ver `CLAUDE.md`). Insights, Casos, Autores y Prensa leen de Sanity en
producción (ver "Sanity CMS"); el resto del contenido sigue siendo
estático en código, a propósito — ver el detalle en esa misma sección.

**Decisión de producto (pre-lanzamiento): Insights es teaser-only.** No
existe página `/insights/[slug]` en `src/app/(site)/insights`, y no se va
a construir para este lanzamiento — queda para una fase futura. El
listado de Insights, Home's `FeaturedInsights` y las cinco secciones
"Artículos relacionados" muestran siempre título, bajada y autor/categoría,
nunca un link a `/insights/<slug>`: ese link solo se arma cuando
`isInsightPublished(insight)` (definida en `src/lib/data/insights.ts`,
`Boolean(insight.body)`) es verdadero, y `toInsightPreviewData`
(`src/sanity/lib/insightPreview.ts`) fija `body: undefined` en el mapeo
desde Sanity para todo Insight, sin excepción, sea cual sea el valor de
`hasArticle` en el documento — así que ese link nunca se renderiza hoy en
ningún lugar del sitio, verificado en `InsightPreview.tsx` y
`RelatedArticles.tsx`, los dos únicos componentes que lo generarían. Si en
el futuro se decide publicar artículos completos, esa ruta y el flujo que
la habilita quedan explícitamente fuera del alcance actual.

## Sanity CMS

Gestiona únicamente **Insights, Casos, Autores y Prensa** — el resto del
sitio (Home institucional, los tres servicios, Empresas, Instituciones,
Pymes, Contacto) sigue estático en código, a propósito.

**Studio:** `/studio` (embebido, requiere las variables `NEXT_PUBLIC_SANITY_*`).

**El frontend público sí lee de Sanity.** Las páginas de `/casos`,
`/casos/[slug]`, `/insights`, el equipo en `/quienes-somos` y "PL en la
prensa" en `/quienes-somos#prensa` consultan `src/sanity/lib/queries.ts`
a través de `sanityFetch` (`src/sanity/lib/fetch.ts`), con cache tags por
tipo de contenido (`src/sanity/lib/tags.ts`) invalidados por el webhook de
revalidación. Home's `FeaturedInsights` y las cinco secciones
"Artículos relacionados" (`/investigacion`, `/datos`,
`/automatizaciones-ia`, `/empresas`, `/instituciones`) también resuelven
sus Insights desde Sanity.

**Lo único que sigue fijo en código, a propósito:** Home's `FeaturedCases`
(ver `src/lib/data/cases.ts`) — una curaduría editorial de 3 casos con su
propio copy y agrupamiento ("Sector público" combina GCBA + Impacto
Cercano bajo un solo bloque, con su CTA a `/instituciones` en vez de a un
caso individual), aprobada así por el cliente y no derivable
automáticamente de la lista plana de `caseStudy` en Sanity. No es un
resabio de la migración: es la curaduría vigente de esa sección, y no se
tocó en esta rutina de correcciones. El resto del contenido no listado
arriba (Home institucional, los tres servicios, Empresas, Instituciones,
Pymes, Contacto) tampoco pasó nunca por Sanity — es copy aprobado y
congelado, sin necesidad de CMS.

Los datos estáticos legacy en `src/lib/data/casos/*.ts`, `insights.ts` y
`authors.ts` se conservan sobre todo como fuente del script de migración
(`src/sanity/migrate/migrate.ts`) y para rollback — con tres excepciones
puntuales, ninguna es el contenido migrado en sí:

- `FeaturedCases` en Home usa `src/lib/data/cases.ts` (no
  `casos/*.ts`) para su curaduría fija, como se explica arriba.
- `/casos/page.tsx` importa `CASOS_INTRO` de `src/lib/data/casos/index.ts`
  — es el copy fijo de intro de esa página (título + bajada), no un caso;
  el listado de casos en sí (`CASOS_LISTING`, en ese mismo archivo) ya no
  se usa fuera de la migración.
- `RelatedArticles`/`InsightPreview` importan `isInsightPublished` de
  `src/lib/data/insights.ts` como parte del gate que mantiene Insights
  teaser-only (ver "Estado actual" más arriba).

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
