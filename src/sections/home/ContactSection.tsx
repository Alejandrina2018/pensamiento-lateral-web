import CTASection from "@/components/ui/CTASection";
import Button from "@/components/ui/Button";
import WhatsAppButton from "@/components/ui/WhatsAppButton";
import { getContactEmail } from "@/lib/env";

// Verbatim from content/final-copy.md — Home / Contacto.
export default function ContactSection() {
  const email = getContactEmail();

  return (
    <CTASection
      id="contacto"
      inverted
      title="¿Hablamos?"
      body="Contanos cómo podemos ayudar a tu equipo."
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
