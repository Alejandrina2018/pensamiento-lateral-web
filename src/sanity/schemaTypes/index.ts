import type { SchemaTypeDefinition } from "sanity";

import imageWithAlt from "./objects/imageWithAlt";
import namedBlock from "./objects/namedBlock";
import author from "./documents/author";
import insight from "./documents/insight";
import caseStudy from "./documents/caseStudy";
import pressItem from "./documents/pressItem";

// Only the 4 types approved for the CMS (CLAUDE.md #17 + the approved
// Sanity architecture). Home/Investigación/Datos/Automatizaciones e IA/
// Empresas/Instituciones/Pymes/Contacto stay static in code — never add
// a schema for them without an explicit decision to do so.
export const schemaTypes: SchemaTypeDefinition[] = [
  // Objects first (documents reference them)
  imageWithAlt,
  namedBlock,
  // Documents
  author,
  insight,
  caseStudy,
  pressItem,
];
