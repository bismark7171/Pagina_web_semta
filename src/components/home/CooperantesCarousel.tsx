import { cooperantes } from "@/data/cooperantes";

function CooperanteItem({ nombre }: { nombre: string }) {
  return (
    <li className="flex shrink-0 items-center justify-center rounded-full border border-white/20 px-6 py-2 transition-colors hover:bg-white/10">
      <span className="whitespace-nowrap text-label-md font-bold text-white">{nombre}</span>
    </li>
  );
}

export default function CooperantesCarousel() {
  return (
    <section className="bg-bosque py-16" aria-label="Instituciones cooperantes">
      <div className="mx-auto w-full max-w-container-semta px-gutter-desktop">
        <p className="text-label-caps uppercase tracking-wider text-primary-fixed font-bold mb-8">
          Cooperantes y Aliados Internacionales
        </p>

        <div className="flex flex-wrap gap-4">
          {cooperantes.map((nombre, i) => (
            <CooperanteItem key={`${nombre}-${i}`} nombre={nombre} />
          ))}
        </div>
      </div>
    </section>
  );
}
