import type { Metadata } from "next";
import CTASection from "@/components/ui/CTASection";
import Button from "@/components/ui/Button";
import WhatsAppButton from "@/components/ui/WhatsAppButton";
import ChatBubbles from "@/components/visualizations/ChatBubbles";
import { getContactEmail } from "@/lib/env";

// TODO: dedicated SEO copy is pending (content/final-copy.md's "CONTENIDO
// PENDIENTE").
export const metadata: Metadata = {
  title: "Contacto — Pensamiento Lateral",
  description: "Contanos cómo podemos ayudar a tu equipo.",
};

// Verbatim from content/final-copy.md — <!-- ROUTE: /contacto -->
export default function ContactoPage() {
  const email = getContactEmail();

  return (
    <CTASection
      title="Hablemos"
      headingLevel="h1"
      body="Contanos cómo podemos ayudar a tu equipo."
      spacious
      inverted
      visual={<ChatBubbles className="mx-auto h-auto w-full max-w-[280px] md:max-w-none" />}
      primaryAction={<WhatsAppButton label="WhatsApp" className="px-9 py-4 text-base md:text-lg" />}
      secondaryAction={
        email ? (
          <Button href={`mailto:${email}`} variant="secondary-inverted">
            Escribinos
          </Button>
        ) : null
      }
    />
  );
}
