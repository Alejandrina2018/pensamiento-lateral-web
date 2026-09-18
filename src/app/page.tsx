import Container from "@/components/ui/Container";

// TODO: build the real Home sections once content/final-copy.md is available (CLAUDE.md #34, #40).
export default function Home() {
  return (
    <Container className="py-32 text-center">
      <p className="text-sm uppercase tracking-widest text-slate/50">
        Home en construcción
      </p>
      <p className="mt-4 text-slate/70">
        Pendiente de <code>content/final-copy.md</code> para cargar el copy aprobado.
      </p>
    </Container>
  );
}
