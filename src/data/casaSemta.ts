import type { IServicioCasa, ICasaMetrica, ICasaFaq, ICasaPhoto } from '@/types';

export const casaSemtaHero = { imagen: "https://lh3.googleusercontent.com/aida-public/AB6AXuDnFxJCiypqFi8coopdsLhtIiCW4b-1w6dSuRk3nOK-iMqPDTD_hVDq5lnqfnBSCdTZPyr1el0qmxZXKL4ddNVAoK1lZlhodxMS1KGczL6YsbZN-1FSA04F17Zi9BQR0nSazo_T571Qc61xRPMpJ9fDYIdfhpUN7sUJEMfuFQGRGxdGTvsbjTGLR7oPVezJ6oYqQF7cGRutKyQZGsXn8qD0lYfgFZj1GWtj-1BJvuzLFPSaoNubLw", alt: "Warm sunlight illuminating the ecological courtyard of Casa SEMTA in Sopocachi La Paz Bolivia, showcasing adobe accents, native Andean flower beds, community wooden benches, lush greenhouse corners, and a polished sustainable architecture atmosphere.", titulo: 'Casa SEMTA', ubicacion: 'Sopocachi · La Paz, Bolivia', direccion: 'Calle Alfredo Ascarrunz N° 2675, Sopocachi', horario: 'Lun a Vie: 08:30 - 18:00' };

export const casaSemtaMetrics: ICasaMetrica[] = [
  { valor: "80", titulo: "Capacidad Máxima", descripcion: "Auditorio bioclimático multifuncional", icono: "groups", color: "text-primary-container" },
  { valor: "12+", titulo: "Bioinsumos Propios", descripcion: "Microorganismos, abonos y biol", icono: "local_florist", color: "text-secondary" },
  { valor: "45", titulo: "Talleres Anuales", descripcion: "Formación práctica abierta a la ciudadanía", icono: "model_training", color: "text-tertiary" },
  { valor: "100%", titulo: "Retorno Social", descripcion: "Ingresos reinvertidos en proyectos comunales", icono: "recycling", color: "text-primary" },
];

export const casaSemtaServicios: IServicioCasa[] = [
  {
    titulo: "Alquiler de Espacios y Salas", descripcion: "Infraestructura cálida, sostenible y equipada para talleres, asambleas, proyecciones y eventos corporativos con compromiso ambiental en La Paz.", imagen: "https://lh3.googleusercontent.com/aida-public/AB6AXuAFYSIUbfZP6Hc5QmZ_I3NEoBb4PAcjsWqX6kxnG3uH_Ib3Wo1DL94XVETIHZTdUrDkX4eg6uUcbMkEITcrmgkbCEPtEyjc1qVWN_yK2nm66j7qQmbSBnAaJny4HgLXWnnPlMF7qHehjaaSGFc6LbUqvG7OQAv5yB8PkEZmSeZf3lJAA6mAdtjPMBewb0b9Ph2MmFaQjihuRGFSIdK-wiLxpT5yTVaGjgDB6wBb1myduQWP8xQWhg", alt: "Modern rustic auditorium at Casa SEMTA Sopocachi filled with natural light, warm timber ceiling beams, ergonomic conference chairs, multimedia projector presentation, and indoor potted Andean native plants creating an inviting eco-conference venue.",
    badgeIcono: "apartment", badgeTexto: "Espacios & Aulas", modalidadLabel: "Modalidad", modalidad: "Por hora o jornada completa",
    checks: ["Auditorio para 80 personas", "Salas de talleres modulares", "Patio ecológico abierto", "Cañón multimedia & audio", "Conexión Wi-Fi de alta velocidad", "Catering agroecológico propio"],
  },
  {
    titulo: "Productos Agroecológicos y Bioinsumos", descripcion: "Insumos directos de nuestros módulos experimentales y asociaciones campesinas aliadas, elaborados sin pesticidas ni químicos sintéticos.", imagen: "https://lh3.googleusercontent.com/aida-public/AB6AXuCxeYoFtjMBpH1fe52Ck_E1m2MibCRpZHLS3alvhAFb88EjRpj5y1szNmsWUsDCXb05NlNsoNBpN8QOtS_xsR5W5IM4_nu_hIIWA3K4WpKRDVc3Bhjxhf95bMeuM5wxNJwGKzhMsETaaS_wd_1eFJL8OFIzlQR9peaIZGBpJ3dvAFBn1VpKouGhl6ZScILsjELEdwytx99mkxhn4Tjw5N62EE2IpTq317Z1MNWsq36TBdiOeGjUoA", alt: "Close up artisanal display of enriched organic compost bags, glass jars of amber valley wild honey, labelled biofertilizer bottles, seed envelopes and vibrant vegetable seedlings in peat pots on an eco-friendly wooden counter at Casa SEMTA.",
    badgeIcono: "eco", badgeTexto: "Tienda Agroecológica", modalidadLabel: "Disponibilidad", modalidad: "Stock Permanente en Sopocachi",
    checks: ["Compost orgánico enriquecido", "Biol foliar fermentado", "Plántulas nativas y aromáticas", "Semillas certificadas agroecológicas", "Miel pura de valles interandinos", "Microorganismos de montaña"],
  },
  {
    titulo: "Capacitaciones y Talleres Prácticos", descripcion: "Metodología participativa para familias, técnicos y entusiastas del hábitat sustentable con entrega de manuales técnicos y certificado SEMTA.", imagen: "https://lh3.googleusercontent.com/aida-public/AB6AXuAzAaMT1uy0LAqSyDEbFbfq_YtMaKz1Ue0dfamk5FZUfGhtB1O8FhwI__6M7Ij95Tx8WWtTdc90_M5GWj7yKJrobX3TffCPUPAnlCurBg4Pu-TzP-luoFOR3R5k7psFnz2CbJS97MaFZ6sshwm390p4RgaBtvY_duw2n3XLvI6mm62kdrFf_29gC37qPeIcSZsBjduio3tQGw1qhNd_Ye_QP8WKjjVZqulJn_99X64l2mVxH2A7JA", alt: "Hands-on community gardening workshop in La Paz, participants learning biointensive raised bed planting, installing drip hoses, wearing rustic aprons under Andean sunlight with Casa SEMTA instructors guiding.",
    badgeIcono: "school", badgeTexto: "Aprender Haciendo", modalidadLabel: "Ciclo Actual", modalidad: "Inscripciones Abiertas",
    checks: ["Huertos urbanos biointensivos", "Hidroponía familiar y automatizada", "Bioconstrucción con tierra y adobe", "Elaboración artesanal de conservas", "Multiplicación de semillas nativas", "Certificación digital verificable"],
  },
  {
    titulo: "Servicios Técnicos y Consultoría", descripcion: "Soluciones de ingeniería apropiada y diseño de proyectos hídrico-productivos adaptados a la topografía andina y valles interandinos.", imagen: "https://lh3.googleusercontent.com/aida-public/AB6AXuDQqyJ3bfZ81CL_bFRTmRZyvP--zWWIpgkBqPD5_uhzQOB5Q_y2c39Tc-x1gfFQw9OiBWVgID5FrxiR3El91wRxIORbETf5Ygr0WBotaKmRAYGaYQICyg5BehZe7nip9LBORvfF0RIVBjGNfORybZLAC1eYd1TwZjGMUiOoLU4WiV_2i4u3bStX0EKg7wWWlL5q1BdNdmhpcurVUvYX7tUJqV7nhowPdsxgYiUaHuCCpYbM5MebIg", alt: "Agricultural engineer inspecting micro-irrigation system schematics alongside topographic contour maps and solar cooker prototypes on a design office table in Sopocachi La Paz Bolivia.",
    badgeIcono: "engineering", badgeTexto: "Ingeniería & Territorio", modalidadLabel: "Enfoque", modalidad: "Tecnología Apropiada",
    checks: ["Diseño y cálculo de microriego", "Manejo y estudios de microcuencas", "Análisis de suelo campesino in situ", "Cocinas solares y secadores parabólicos", "Biodigestores continuos tubulares", "Planes maestros de resiliencia hídrica"],
  },
];

export const casaSemtaFaq: ICasaFaq[] = [
  { pregunta: "¿Se puede ingresar catering externo?", respuesta: "Sí. Aunque disponemos de servicio agroecológico local, las organizaciones pueden coordinar el ingreso de sus propios refrigerios previa notificación.", icono: "help_outline", color: "text-[20px]" },
  { pregunta: "¿Hacen envíos de bioinsumos?", respuesta: "Entregamos pedidos a granel en el área metropolitana de La Paz y El Alto para huertos comunitarios, colegios y fincas agroproductivas.", icono: "local_shipping", color: "text-[20px]" },
  { pregunta: "¿Los talleres emiten certificados?", respuesta: "Todos nuestros talleres incluyen certificación avalada por SEMTA, registrable y verificable digitalmente con código QR institucional.", icono: "verified", color: "text-[20px]" },
];

export const casaSemtaPhotogrid: ICasaPhoto[] = [
  { imagen: "https://lh3.googleusercontent.com/aida-public/AB6AXuDnFxJCiypqFi8coopdsLhtIiCW4b-1w6dSuRk3nOK-iMqPDTD_hVDq5lnqfnBSCdTZPyr1el0qmxZXKL4ddNVAoK1lZlhodxMS1KGczL6YsbZN-1FSA04F17Zi9BQR0nSazo_T571Qc61xRPMpJ9fDYIdfhpUN7sUJEMfuFQGRGxdGTvsbjTGLR7oPVezJ6oYqQF7cGRutKyQZGsXn8qD0lYfgFZj1GWtj-1BJvuzLFPSaoNubLw", alt: "Warm sunlight illuminating the ecological courtyard of Casa SEMTA in Sopocachi La Paz Bolivia, showcasing adobe accents, native Andean flower beds, community wooden benches, lush greenhouse corners, and a polished sustainable architecture atmosphere." },
  { imagen: "https://lh3.googleusercontent.com/aida-public/AB6AXuD4ACmqh4_kpm6TOic1i8JYi5Ajr4EmLUvXFslpgoCPAuKErcaXpKPy4odd08Wb-yWAn7sP9v9z7IndJfhEavT0ALxIo31k6Hrj1p_Rs661Ei4VIDeTef9ZxTNQDCXRNoK-yC6vrxg0oxvRgKcbSbcHvsFypLN1BFF6Q2eXcu2AOaj2ZRsNTu5dB_qBl9Ow1ER-rDB0-QmrPxx_Xj2lzK3dqZycDWGYiprMf3IyTtp0Tghvz_XDBA", alt: "Close up of thriving organic urban garden beds with lettuces and chard under clean drip irrigation lines at Casa SEMTA Sopocachi La Paz." },
  { imagen: "https://lh3.googleusercontent.com/aida-public/AB6AXuB6EEFU9ga-qY0ixjNM9zZoHjVSJjlZ1OMr2FR7ElbrNA-J1eh_eO_AQyrQL3S92IUrNKUQM1mhiX5Q2GDzEP84IfO3fEThoojsFXUsx3EeH-icsL-YgRKXYcFdZ9PNrMPsONS47Yd3D4EXIjlnf4j_y0gGCXlYBFfSH0_9d8xsuzhRaKpHg8BY4JvH_1jdFNhm4nBrU2Vw8KQQ-IhW2Hri3tPl2UWG6g46eiciLqPDgtSCZgxsmQ", alt: "Parabolic solar cooker demonstrative prototype reflecting afternoon sunlight in a stone patio of Casa SEMTA." },
  { imagen: "https://lh3.googleusercontent.com/aida-public/AB6AXuAv6AiDEaUughX0QZiZqjGqGhCCBth8PHJ9kjBh1e5I5Lpa-TFg33J7ki4GA6xD2fiSyXQNOsAmNJBILD4v3YrYbLcTMB3kMi8UBk6tZuRtJdaK2M_T1f1aYE_TLo9v12CpdrIfhf5uSrcZ1OnieLX3OI1vxgnO4VrZsvIMoVlaiHKC5VaTS6zYMQhNDyLmCCWyeS6KiA-vqC0LiVe4y2rgo3WFOaHj5h1Yatuy-GhnGIjOb6-MVg", alt: "Glass jars with botanical insect pest control macerations and organic liquid fertilizers arranged neatly on shelves." },
  { imagen: "https://lh3.googleusercontent.com/aida-public/AB6AXuCMQhJ4YOxIxysv7_h40OsPhQ8lYkVJeShNH-n1YVWHyb-nPt9Y7Yvo9V8FcVxqUw5HWAgRzbpfDBF8z4HM2rTXjv5i7esCkKQ4Td_dJMDg9nJjuXdR7sLxDygcf9qokVZKK8S6sy0Jezp3m3ttHlQekpdhVAtHYS3ur8UWbHc31xjxat6IjFdshhic2luEZcOsuC23qcUNVDTgzZ4u7nFEOyFLVs5xhLmXvJQeKv_1cp2ylTJ4jQ", alt: "Community gathering in Casa SEMTA courtyard, people tasting local teas and seasonal produce from Bolivian valleys." },
];