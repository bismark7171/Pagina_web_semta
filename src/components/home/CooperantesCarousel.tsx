import { cooperantes } from "@/data/cooperantes";

function CooperanteItem({ nombre }: { nombre: string }) {
  return (
    <li className="flex shrink-0 items-center gap-3 px-6">
      <span className="size-2 rounded-full bg-primary-fixed" aria-hidden="true" />
      <span className="whitespace-nowrap font-headline-md font-semibold text-on-surface-variant">
        {nombre}
      </span>
    </li>
  );
}

export default function CooperantesCarousel() {
  return (
    <section
      className="border-y border-outline-variant bg-surface-container-low py-10"
      aria-label="Instituciones cooperantes"
    >
      <div className="mx-auto w-full max-w-container-semta px-gutter-desktop">
        <p className="text-center text-label-caps uppercase tracking-wider text-on-surface-variant">
          Con el apoyo de la cooperación internacional
        </p>
      </div>
      <div
        className="mt-6 overflow-hidden"
        style={{
          maskImage: "linear-gradient(to right, transparent, black 12%, black 88%, transparent)",
        }}
      >
        <ul className="animate-marquee flex w-max items-center">
          {[...cooperantes, ...cooperantes].map((nombre, i) => (
            <CooperanteItem key={`${nombre}-${i}`} nombre={nombre} />
          ))}
        </ul>
      </div>
    </section>
  );
}
