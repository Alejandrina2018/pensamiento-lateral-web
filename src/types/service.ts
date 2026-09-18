/** Shapes for the /investigacion, /datos, /automatizaciones-ia,
 * /empresas and /instituciones pages. */

export interface CapabilityItem {
  name: string;
  /** Optional — the "Cómo podemos acompañarte" capability summaries
   * (Empresas/Instituciones) are name + tags only, no body. */
  body?: string;
  tags?: string[];
}
