import { getWhatsAppLink } from "@/lib/env";
import Button from "./Button";

type WhatsAppButtonProps = {
  label: string;
  className?: string;
};

/** WhatsApp CTA (CLAUDE.md #21, #37). Renders nothing if
 * NEXT_PUBLIC_WHATSAPP_NUMBER isn't configured, rather than a dead link. */
export default function WhatsAppButton({ label, className }: WhatsAppButtonProps) {
  const href = getWhatsAppLink();
  if (!href) return null;

  return (
    <Button href={href} target="_blank" rel="noopener noreferrer" className={className}>
      {label}
    </Button>
  );
}
