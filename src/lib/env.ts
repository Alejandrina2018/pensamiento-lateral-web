/**
 * Contact helpers driven by env vars (CLAUDE.md #21) — never hardcode the
 * WhatsApp number or email in components.
 */

const WHATSAPP_MESSAGE =
  "Hola, llegué desde la web de Pensamiento Lateral y quería conversar sobre un proyecto.";

export function getWhatsAppLink(): string | null {
  const number = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER;
  if (!number) return null;

  const digits = number.replace(/[^\d]/g, "");
  return `https://wa.me/${digits}?text=${encodeURIComponent(WHATSAPP_MESSAGE)}`;
}

export function getContactEmail(): string | null {
  return process.env.NEXT_PUBLIC_CONTACT_EMAIL ?? null;
}
