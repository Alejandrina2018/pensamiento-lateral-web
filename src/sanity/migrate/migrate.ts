/**
 * One-time migration: reads the current static TS data files directly
 * (no re-typing) and writes the equivalent Sanity documents.
 *
 * Usage:
 *   npx tsx src/sanity/migrate/migrate.ts --dry-run   (prints the plan, writes nothing)
 *   npx tsx src/sanity/migrate/migrate.ts             (writes for real, via createOrReplace)
 *
 * Idempotent by construction (point 13.A): every document ID is derived
 * deterministically from its type + slug (see ids.ts), and every write
 * uses `createOrReplace`, so running this script again just re-applies
 * the same documents instead of duplicating them.
 *
 * Requires (server-only, never NEXT_PUBLIC_):
 *   NEXT_PUBLIC_SANITY_PROJECT_ID
 *   NEXT_PUBLIC_SANITY_DATASET
 *   SANITY_API_WRITE_TOKEN
 */
import { config as loadEnv } from "dotenv";
import { createClient, type IdentifiedSanityDocumentStub } from "@sanity/client";

// This project's convention is .env.local (see README.md), not the
// dotenv default of .env — load that explicitly so the script picks up
// the same variables `next dev`/`next start` would.
loadEnv({ path: ".env.local" });

import { AUTHORS } from "@/lib/data/authors";
import { INSIGHTS } from "@/lib/data/insights";
import { CASOS_LISTING } from "@/lib/data/casos";
import { ZURICH_CASE } from "@/lib/data/casos/zurich";
import { SUONO_CASE } from "@/lib/data/casos/suono";
import { IMPACTO_CERCANO_CASE } from "@/lib/data/casos/impacto-cercano";
import { GCBA_VIOLENCIA_GENERO_CASE } from "@/lib/data/casos/gcba-violencia-genero";
import { BANCO_PROVINCIA_CASE } from "@/lib/data/casos/banco-provincia";
import { QUIENES_SOMOS_PRESS } from "@/lib/data/quienes-somos";
import type { CaseStudy, CaseWhatWeDid, PressItem } from "@/types/content";

import { documentId } from "./ids";
import { paragraphsToBlocks, textToBlock } from "./portableText";

const DRY_RUN = process.argv.includes("--dry-run");

function slugify(value: string): string {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

// --- Authors ---------------------------------------------------------
// Order preserved exactly as listed in Quiénes somos (Alejandrina, then
// Ángeles) — not left to `_createdAt` (point 6).
const AUTHOR_ORDER: Array<{ key: keyof typeof AUTHORS; order: number }> = [
  { key: "alejandrina", order: 1 },
  { key: "angeles", order: 2 },
];

const authorDocs: IdentifiedSanityDocumentStub[] = AUTHOR_ORDER.map(({ key, order }) => {
  const author = AUTHORS[key];
  const slug = slugify(author.name);
  return {
    _id: documentId.author(slug),
    _type: "author",
    name: author.name,
    slug: { _type: "slug", current: slug },
    role: author.role,
    bio: author.bio,
    linkedin: author.linkedin,
    order,
  };
});

function authorRefByName(name: string) {
  const slug = slugify(name);
  return { _type: "reference", _ref: documentId.author(slug) };
}

// --- Insights ----------------------------------------------------------
// None have `body` yet — every migrated Insight starts as a teaser,
// exactly matching what's live today (point 4).
const insightDocs: IdentifiedSanityDocumentStub[] = INSIGHTS.map((insight) => ({
  _id: documentId.insight(insight.slug),
  _type: "insight",
  title: insight.title,
  slug: { _type: "slug", current: insight.slug },
  excerpt: insight.excerpt,
  author: authorRefByName(insight.author.name),
  displayCategory: insight.displayCategory,
  filterCategories: insight.filterCategories,
  // body intentionally omitted — no approved article bodies exist yet.
}));

// --- Case studies --------------------------------------------------------
const CASE_STUDIES: CaseStudy[] = [ZURICH_CASE, SUONO_CASE, IMPACTO_CERCANO_CASE, GCBA_VIOLENCIA_GENERO_CASE, BANCO_PROVINCIA_CASE];

function whatWeDidToSanity(ww: CaseWhatWeDid, keyPrefix: string) {
  if (ww.kind === "paragraphs") {
    return paragraphsToBlocks(ww.items, keyPrefix);
  }
  return ww.items.map((item, i) => ({
    _type: "namedBlock",
    _key: `${keyPrefix}-n${i}`,
    title: item.title,
    body: [textToBlock(item.body, `${keyPrefix}-n${i}-b`)],
  }));
}

const caseStudyDocs: IdentifiedSanityDocumentStub[] = CASE_STUDIES.map((caseStudy, index) => {
  const listing = CASOS_LISTING.find((item) => item.href === `/casos/${caseStudy.slug}`);
  if (!listing) {
    throw new Error(`No matching CASOS_LISTING entry for slug "${caseStudy.slug}" — check casos/index.ts`);
  }

  return {
    _id: documentId.caseStudy(caseStudy.slug),
    _type: "caseStudy",
    client: caseStudy.client,
    slug: { _type: "slug", current: caseStudy.slug },
    listingHeadline: listing.tagline,
    listingExcerpt: Array.isArray(listing.body) ? listing.body.join(" ") : (listing.body ?? ""),
    detailHeadline: caseStudy.title,
    challenge: paragraphsToBlocks(caseStudy.challenge, `${caseStudy.slug}-challenge`),
    approach: paragraphsToBlocks(caseStudy.approach, `${caseStudy.slug}-approach`),
    whatWeDid: whatWeDidToSanity(caseStudy.whatWeDid, `${caseStudy.slug}-whatwedid`),
    evidence: paragraphsToBlocks(caseStudy.evidence, `${caseStudy.slug}-evidence`),
    finalQuestion: caseStudy.finalQuestion,
    finalBody: caseStudy.finalBody,
    ctaLabel: caseStudy.ctaLabel,
    ctaHref: caseStudy.ctaHref,
    // order preserved exactly as the current CASOS_LISTING array order
    // (Zurich, Suono, Impacto Cercano, GCBA, Banco Provincia) — point 7.
    order: index + 1,
  };
});

// --- Press items -----------------------------------------------------
// final-copy.md only gives "Septiembre 2026" (month + year, no day) —
// stored as the 1st of that month since the `date` field needs a real
// date value. Flagged in the migration report; the frontend will need
// to format it back to "Septiembre 2026" style, not a numeric date,
// once this type cuts over.
function monthYearToIsoDate(value: string): string {
  const months: Record<string, string> = {
    enero: "01", febrero: "02", marzo: "03", abril: "04", mayo: "05", junio: "06",
    julio: "07", agosto: "08", septiembre: "09", octubre: "10", noviembre: "11", diciembre: "12",
  };
  const [monthName, year] = value.toLowerCase().split(" ");
  const month = months[monthName];
  if (!month || !year) throw new Error(`Cannot parse press date "${value}" — expected "<mes> <año>"`);
  return `${year}-${month}-01`;
}

const PRESS_ITEMS: PressItem[] = QUIENES_SOMOS_PRESS.items;

const pressItemDocs: IdentifiedSanityDocumentStub[] = PRESS_ITEMS.map((item, index) => ({
  _id: documentId.pressItem(item.title),
  _type: "pressItem",
  title: item.title,
  publication: item.publication,
  date: monthYearToIsoDate(item.date),
  excerpt: item.excerpt,
  url: item.externalUrl,
  // order preserved exactly as listed in final-copy.md.
  order: index + 1,
}));

// --- Run ---------------------------------------------------------------
async function main() {
  const allDocs = [...authorDocs, ...insightDocs, ...caseStudyDocs, ...pressItemDocs];

  console.log(`Plan: ${authorDocs.length} authors, ${insightDocs.length} insights, ${caseStudyDocs.length} case studies, ${pressItemDocs.length} press items.\n`);
  for (const doc of allDocs) {
    const label = (doc as Record<string, unknown>).title ?? (doc as Record<string, unknown>).name ?? (doc as Record<string, unknown>).listingHeadline;
    console.log(`  [${doc._type}] ${doc._id}${label ? ` — ${label}` : ""}`);
  }

  if (DRY_RUN) {
    console.log("\n--dry-run: nothing written. Remove the flag to migrate for real.");
    return;
  }

  const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
  const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET;
  const token = process.env.SANITY_API_WRITE_TOKEN;
  if (!projectId || !dataset || !token) {
    throw new Error("Missing NEXT_PUBLIC_SANITY_PROJECT_ID, NEXT_PUBLIC_SANITY_DATASET or SANITY_API_WRITE_TOKEN.");
  }

  const client = createClient({ projectId, dataset, apiVersion: "2024-01-01", token, useCdn: false });

  console.log("\nWriting (createOrReplace, safe to re-run)...");
  const transaction = client.transaction();
  for (const doc of allDocs) {
    transaction.createOrReplace(doc);
  }
  const result = await transaction.commit();
  console.log(`Done. ${result.results.length} documents written.`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
