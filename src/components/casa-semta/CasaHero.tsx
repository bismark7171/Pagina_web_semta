import Image from "next/image";
import { casaSemtaHero, casaSemtaMetrics } from "@/data/casaSemta";
import { Button } from "@/components/ui/Button";
import { MaterialIcon } from "@/components/ui/MaterialIcon";

export default function CasaHero() {
  return (
    <section className="relative min-h-[80vh] overflow-hidden bg-bosque">
      <Image
        src={casaSemtaHero.imagen}
        alt={casaSemtaHero.alt}
        fill
        priority
        sizes="100vw"
        className="object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/55 to-black/25" />
      <div className="absolute inset-x-0 bottom-0 h-64 bg-gradient-to-t from-bosque/95 to-transparent" />

      <div className="relative z-10 mx-auto flex min-h-[80vh] w-full max-w-container-semta flex-col justify-end px-gutter-desktop pb-24 pt-32">
        <span className="inline-flex w-fit items-center gap-2 rounded-full border border-white/25 bg-white/10 px-4 py-1.5 text-label-md font-semibold uppercase tracking-wider text-white backdrop-blur">
          <MaterialIcon name="storefront" className="text-[1.1em] text-primary-fixed" />
          Casa SEMTA · Sopocachi
        </span>

        <h1 className="mt-5 max-w-3xl font-display-lg text-[42px] font-extrabold leading-[1.06] tracking-tight text-white sm:text-[56px]">
          Un corazón <span className="text-primary-fixed">agroecológico</span>{" "}
          en La Paz
        </h1>
        <p className="mt-4 max-w-xl text-body-lg leading-relaxed text-white/80">
          Espacios bioclimáticos para talleres y eventos, tienda de bio-insumos
          campesinos y programas de capacitación abiertos a la ciudadanía.
        </p>

        <div className="mt-7 flex flex-wrap items-center gap-3 text-label-md text-white/85">
          <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 backdrop-blur">
            <MaterialIcon name="location_on" className="text-primary-fixed" />
            {casaSemtaHero.direccion}
          </span>
          <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 backdrop-blur">
            <MaterialIcon name="schedule" className="text-primary-fixed" />
            {casaSemtaHero.horario}
          </span>
        </div>

        <div className="mt-8 flex flex-wrap gap-4">
          <Button href="/reservar" variant="solid" icono="event" className="text-white shadow-lg">
            Reservar Espacio
          </Button>
          <Button href="/agenda" variant="ghost" icono="calendar_month" className="text-white hover:bg-white/10">
            Agenda de Talleres
          </Button>
        </div>
      </div>

      <div className="relative z-10 border-t border-white/10 bg-bosque/60 backdrop-blur">
        <div className="mx-auto grid w-full max-w-container-semta grid-cols-2 gap-x-6 gap-y-8 px-gutter-desktop py-8 lg:grid-cols-4">
          {casaSemtaMetrics.map((m) => (
            <div key={m.titulo} className="flex items-start gap-3">
              <span
                className={`grid size-11 shrink-0 place-items-center rounded-xl bg-white/10 ${m.color}`}
              >
                <MaterialIcon name={m.icono} className="text-[24px]" />
              </span>
              <div>
                <p className="font-display-lg text-[28px] font-extrabold tracking-tight text-white">
                  {m.valor}
                </p>
                <p className="text-label-lg font-semibold text-white/85">
                  {m.titulo}
                </p>
                <p className="text-body-sm text-white/60">{m.descripcion}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}