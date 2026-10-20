import { MaterialIcon } from "@/components/ui/MaterialIcon";

interface GoogleSearchItem {
  title: string;
  link: string;
  snippet: string;
  pagemap?: {
    cse_image?: Array<{ src: string }>;
  };
}

interface GoogleSearchResponse {
  items?: GoogleSearchItem[];
  error?: {
    message: string;
  };
}

const FALLBACK_NEWS: GoogleSearchItem[] = [
  {
    title: "Innovaciones en Cosecha de Agua en Comunidades del Altiplano Boliviano",
    link: "/noticias/cosecha-agua-comunidades",
    snippet:
      "Experiencias demostrativas sobre atajados familiares y microriego presurizado logran optimizar el recurso hídrico ante periodos prolongados de sequía.",
    pagemap: {
      cse_image: [
        {
          src: "https://images.unsplash.com/photo-1500937386664-56d1dfef3854?auto=format&fit=crop&w=800&q=80",
        },
      ],
    },
  },
  {
    title: "Transición Agroecológica y Soberanía Alimentaria en los Valles Interandinos",
    link: "/noticias/semillas-nativas-conservacion",
    snippet:
      "Redes de productores y asociaciones comunitarias multiplican bioinsumos locales y rescatan ecotipos de maíz y papa frente al cambio climático.",
    pagemap: {
      cse_image: [
        {
          src: "https://images.unsplash.com/photo-1574943320219-553eb213f72d?auto=format&fit=crop&w=800&q=80",
        },
      ],
    },
  },
  {
    title: "Energías Renovables y Deshidratado Solar de Hortalizas en Comunidades Indígenas",
    link: "/noticias/feria-agroecologica-anual",
    snippet:
      "Secadores solares de tecnología apropiada agregan valor a los excedentes agrícolas de familias campesinas con impacto económico directo.",
    pagemap: {
      cse_image: [
        {
          src: "https://images.unsplash.com/photo-1464226184884-fa280b87c399?auto=format&fit=crop&w=800&q=80",
        },
      ],
    },
  },
];

export async function GoogleNewsSection() {
  const apiKey = process.env.GOOGLE_SEARCH_API_KEY;
  const searchEngineId = process.env.GOOGLE_SEARCH_ENGINE_ID;

  let news: GoogleSearchItem[] = FALLBACK_NEWS;

  if (apiKey && searchEngineId) {
    try {
      const url = new URL("https://www.googleapis.com/customsearch/v1");
      url.searchParams.append("key", apiKey);
      url.searchParams.append("cx", searchEngineId);
      url.searchParams.append("q", 'agroecologia OR "agricultura sostenible" Bolivia');
      url.searchParams.append("num", "3");
      url.searchParams.append("sort", "date");

      const response = await fetch(url.toString(), { next: { revalidate: 3600 } });

      if (response.ok) {
        const data: GoogleSearchResponse = await response.json();
        if (data.items && data.items.length > 0) {
          news = data.items;
        }
      } else {
        // En caso de Rate Exceeded (429) o cuota superada, usamos las noticias locales verificadas sin alertar error
        console.warn(
          `Google Search API status ${response.status}. Usando noticias agroecológicas territoriales de respaldo.`,
        );
      }
    } catch (error) {
      console.warn(
        "Fallo en consulta externa Google News, recurriendo a contenido local verificado:",
        error,
      );
    }
  }

  return (
    <section className="bg-surface-container-lowest py-16 border-t border-outline-variant/30">
      <div className="mx-auto w-full max-w-container-semta px-gutter-desktop">
        <div className="flex items-center gap-3 mb-8">
          <MaterialIcon name="language" className="text-3xl text-primary" />
          <h2 className="font-headline-lg text-on-surface">
            Actualidad Agroecológica en Territorio
          </h2>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {news.map((item, index) => {
            const imageSrc = item.pagemap?.cse_image?.[0]?.src;

            return (
              <a
                key={index}
                href={item.link}
                target={item.link.startsWith("http") ? "_blank" : undefined}
                rel={item.link.startsWith("http") ? "noopener noreferrer" : undefined}
                className="group flex flex-col overflow-hidden rounded-3xl border border-outline-variant bg-surface-container transition-all duration-300 hover:-translate-y-1 hover:shadow-card-semta"
              >
                {imageSrc ? (
                  <div className="relative aspect-[16/10] w-full overflow-hidden bg-surface-container-highest">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={imageSrc}
                      alt={item.title}
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                      loading="lazy"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                ) : (
                  <div className="flex aspect-[16/10] w-full items-center justify-center bg-surface-container-highest text-on-surface-variant/50">
                    <MaterialIcon name="article" className="text-5xl" />
                  </div>
                )}
                <div className="flex flex-1 flex-col p-6">
                  <span className="mb-2 flex items-center gap-1 text-label-xs uppercase tracking-wider text-primary">
                    <MaterialIcon name="newspaper" className="text-[14px]" />
                    SEMTA Actualidad
                  </span>
                  <h3 className="font-headline-sm leading-snug text-on-surface group-hover:text-primary transition-colors line-clamp-2">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-body-sm text-on-surface-variant line-clamp-3">
                    {item.snippet}
                  </p>
                </div>
              </a>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default GoogleNewsSection;
