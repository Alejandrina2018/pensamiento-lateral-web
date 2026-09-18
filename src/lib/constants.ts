/**
 * Site navigation and metadata, per CLAUDE.md #9 (routes) and #10 (nav).
 * Structural only — no marketing copy lives here.
 */

export const SITE_NAME = "Pensamiento Lateral";

export type NavLink = {
  label: string;
  href: string;
};

export type NavItem = NavLink & {
  children?: NavLink[];
};

/** Main nav — desktop and mobile share this list. Pymes is deliberately excluded (CLAUDE.md #10, #20). */
export const MAIN_NAV: NavItem[] = [
  { label: "Quiénes somos", href: "/quienes-somos" },
  {
    label: "Servicios",
    href: "/investigacion",
    children: [
      { label: "Investigación", href: "/investigacion" },
      { label: "Datos", href: "/datos" },
      { label: "Automatizaciones e IA", href: "/automatizaciones-ia" },
    ],
  },
  { label: "Instituciones", href: "/instituciones" },
  { label: "Empresas", href: "/empresas" },
  { label: "Casos", href: "/casos" },
  { label: "Insights", href: "/insights" },
  { label: "Contacto", href: "/contacto" },
];

/** Footer-only links (CLAUDE.md #10, #20). */
export const FOOTER_NAV: NavLink[] = [
  { label: "Servicios para Pymes", href: "/servicios-para-pymes" },
];
