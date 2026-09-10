import type { IProject, ProjectEstado, ProjectTipo } from '@/types';

export const proyectoEstados: Record<ProjectEstado, { label: string; color: string; tint: string }> = {
  'Planificado': { label: 'Planificado', color: '#1565C0', tint: '#E3F2FD' },
  'En Ejecución': { label: 'En Ejecución', color: '#FF6F00', tint: '#FFF3E0' },
  'Concluido': { label: 'Concluido', color: '#2E7D32', tint: '#E8F5E9' },
  'Suspendido': { label: 'Suspendido', color: '#E65100', tint: '#FBE9E7' },
  'Cancelado': { label: 'Cancelado', color: '#D32F2F', tint: '#FFEBEE' },
};

export const proyectoEstadosOrden: ProjectEstado[] = [
  'En Ejecución',
  'Planificado',
  'Concluido',
  'Suspendido',
  'Cancelado',
];

export const projects: IProject[] = [
  {
    id: "PRJ-2023-01", estado: "Concluido", tipo: "Agua y Riego", municipio: "Batallas", financiador: "COSUDE", search: "Cosecha de Agua y Microriego en 4 Comunidades de Batallas La Paz Agencia Suiza para el Desarrollo COSUDE riego parcelario represas",
    titulo: "Cosecha de Agua y Microriego en 4 Comunidades de Batallas", descripcion: "Construcción de atajados comunales, instalación de 32 km de tubería para aspersión y fortalecimiento del comité de regantes.", gestion: "2022 - 2024", ubicacion: "Batallas, La Paz", cooperante: "Agencia Suiza para el Desarrollo (COSUDE)", beneficiarios: "420 Familias Originarias", boton: "Ficha Técnica",
    imagen: "https://lh3.googleusercontent.com/aida-public/AB6AXuDQyStKTb-XgoNOq3Q0HjukV2RanRJU-4OjLvVa_IoErbnRn5b9ZbWL0APMjcYx4g9f9xTjUto_iazCjDplAeiwXiNNH6FuVlS2iOl6zMclcofbBHFLZorzV5e02-vMO0s1Yq7IVMXb8aUshNVHrZ-S7RGtcvgC5ag8VBG91mXYtPHCHCuS9K_HZwhkrb1n5Ja17cEEYyzzbZfRT25ei9YtxM8Epy8M1DNJSPwIgNmQJY_sldVWxg", alt: "Andean highland micro-irrigation system in Batallas Bolivia, local Quechua Aymara community farmers inspecting stone and geomembrane water reservoir against snow-capped mountains, documentary photography, crisp morning sunlight, earth tones, institutional quality.", codigo: "ID: PRJ-2023-01",
  },
  {
    id: "PRJ-2024-04", estado: "En Ejecución", tipo: "Agroecología", municipio: "Achacachi", financiador: "Unión Europea", search: "Transición Agroecológica y Bioinsumos en Tierras Altas Achacachi Unión Europea fertilización orgánica semillas nativas",
    titulo: "Transición Agroecológica y Bioinsumos en Tierras Altas", descripcion: "Montaje de 6 biofábricas comunitarias para producción de biol y microorganismos benéficos, reduciendo en un 80% la compra de agroquímicos.", gestion: "2024 - 2026", ubicacion: "Achacachi, La Paz", cooperante: "Unión Europea (Comisión DEVCO)", beneficiarios: "650 Productores Orgánicos", boton: "Ficha Técnica",
    imagen: "https://lh3.googleusercontent.com/aida-public/AB6AXuB5AkQY2G0xwVms4ddkm7f0B0oiR13T1HyckHnFhPfnsebKf9eLjOVPonAT0m15KTEJtglEwFbt-g6mA2zRXSohnKa6ilZxkGBOZnMryvU2mkBPFzoClGnHfA7jtXxkJ5WrpUQRaTSaPVCNIFOsmFmRVyFkNan0LvWACnSBX5XmacVbxs9SIXEygvukc35a2m2goknqvEq63hndDMr9VJEl8exJGhrMkT50_ME3Hf9-H4I-MI20oA", alt: "Bolivian Aymara women in traditional polleras tending to an organic community greenhouse bio-factory, handling natural biol fertilizer containers, soft ambient natural mountain light, documentary photo with earthy green and ochre tones.", codigo: "ID: PRJ-2024-04",
  },
  {
    id: "PRJ-2025-02", estado: "Planificado", tipo: "Tecnologías Solares", municipio: "Patacamaya", financiador: "Pan para el Mundo", search: "Electrificación Solar y Bombeo Fotovoltaico Patacamaya Pan para el Mundo paneles energía limpia pozos",
    titulo: "Bombeo Solar Fotovoltaico para Pozos Profundos", descripcion: "Diseño de sistemas de extracción con energía solar fotovoltaica para 8 comunidades dispersas afectadas por sequías prolongadas.", gestion: "2025 - 2026", ubicacion: "Patacamaya, La Paz", cooperante: "Pan para el Mundo (Brot für die Welt)", beneficiarios: "310 Familias Rurales", boton: "Ficha Técnica",
    imagen: "https://lh3.googleusercontent.com/aida-public/AB6AXuD0qhNna7mp5bAYfhOw6tJzTsKT4Qo2Vqn7OvLbGkNloaXDb_AcnYxGMlO_j6TQTy5ohIiIe8Esz9ryAVmHe2R3-lv1SxDQo9q2YJxLxCiBQ7MQcoK9xxIZYax_GHYWKtLuqdx4fr8wjKBgx-xWgs54U4DgFhd7vCikYC3i7JfuNthakVH5JSUGrw7kV6wUhUB_PPrd0JHQ_P_sefzyBVGl9sYYnwtWou7P8StNiQWz-w8ouPsFtQ", alt: "Rural solar pumping station in high altitude Bolivian Andean plateau near Patacamaya, sleek photovoltaic panels set against vast puna landscape and deep blue sky, technical humanitarian development photography.", codigo: "ID: PRJ-2025-02",
  },
  {
    id: "PRJ-2024-11", estado: "En Ejecución", tipo: "Liderazgo de Mujeres", municipio: "Tiwanaku", financiador: "FOS Bélgica", search: "Autonomía Económica y Soberanía Alimentaria de Mujeres Originarias Tiwanaku FOS Bélgica huertos solares transformación quinua",
    titulo: "Autonomía Económica y Liderazgo de Mujeres Bartolina Sisa", descripcion: "Fortalecimiento de 12 asociaciones productivas de mujeres, gestión contable comunitaria y canales directos de comercialización urbana.", gestion: "2024 - 2025", ubicacion: "Tiwanaku, La Paz", cooperante: "FOS Bélgica (Fonds voor Ontwikkelingssamenwerking)", beneficiarios: "280 Mujeres Lideresas", boton: "Ficha Técnica",
    imagen: "https://lh3.googleusercontent.com/aida-public/AB6AXuCJDKRfYnmjgMd-tgUzPaB9V6O1tXfQmLYthuUfGSW3RIU3SuL5nZXSApPHofEvog7csSlmag-rp2BpQbPrruHaC1pgclOnvyust2TryHtzfKxD6tcooeiEUD9q9X_4l8F2IliI-2oIxZHtyljVYrf2m7tTkqoD5g838CxyhDcDCmANQKF39wtmZ1SbWqsPgNCuf3cK5d8waoNDr8iPW8R_znUC4aYJqK_pq4x1SV-pjmyBitcsYg", alt: "Group of indigenous Bolivian women in Tiwanaku collaboratively working on value-added quinoa and potato transformation in a clean rustic agro-processing facility, warm tones, high focus on empowerment and technical training.", codigo: "ID: PRJ-2024-11",
  },
  {
    id: "PRJ-2023-09", estado: "Concluido", tipo: "Manejo de Bofedales", municipio: "Colomi", financiador: "Misereor", search: "Restauración de Cuencas y Manejo Integral de Bofedales Colomi Cochabamba Misereor pasturas nativas forraje alpaca",
    titulo: "Restauración de Humedales Altoandinos y Forrajes", descripcion: "Clausuras temporales de pastoreo, reintroducción de festucas nativas y zanjas de infiltración para recarga del acuífero local.", gestion: "2021 - 2023", ubicacion: "Colomi, Cochabamba", cooperante: "Misereor (Alemania)", beneficiarios: "510 Familias Ganaderas", boton: "Ficha Técnica",
    imagen: "https://lh3.googleusercontent.com/aida-public/AB6AXuAZekrRZc9nX0fLpJ50ftC0RbVwNs-fLBn7xdWm7Dip73xjRBzJ6C3Q_tliXR2L_RiT7efU0fxAaGgaTaLSw5qKF930DdcGq5Ihf1RjY7oPNPI3cXMFZ-tDZUxcuZyGF4YqDX37iDfLQIaOPXrMudUuc4CPwv_LGYmxNll-8tPMY6FL2fpRDqarRW7MY3Ca197BCXanWgNnGG1fubNlaQCc4esVr8Se5DJIkwjTKZCLn6XtZMT_Fg", alt: "Lush high-altitude Andean bofedal wetland in Colomi Bolivia, clear stream meandering through peatland cushion vegetation, llamas and sheep grazing sustainably, vibrant green and blue hues, editorial environmental photography.", codigo: "ID: PRJ-2023-09",
  },
  {
    id: "PRJ-2024-18", estado: "Suspendido", tipo: "Tecnologías Solares", municipio: "Torotoro", financiador: "COSUDE", search: "Secadores Solares de Alimentos y Hornos Ecológicos Torotoro Potosí COSUDE deshidratación fruta cañón",
    titulo: "Deshidratación Solar de Granos y Frutales en Valles Secos", descripcion: "Instalación de 45 secadores solares familiares. Operación pausada temporalmente por bloqueo de caminos y reestructuración comunal.", gestion: "2024 - En pausa", ubicacion: "Torotoro, Potosí", cooperante: "Agencia Suiza para el Desarrollo (COSUDE)", beneficiarios: "190 Familias en Pausa", boton: "Ficha Técnica",
    imagen: "https://lh3.googleusercontent.com/aida-public/AB6AXuDKuQzD-9zblxfs3LpgHWcLSZfZNwXozldf3akl0fELMjpnktw5yk4qSTqyE9KdNUO4NQhbV9ndEONBL_pU0PTbRDkV_XQjAboRLGl-wncejLZdDeyl2JCHvV1uUQK-0a7lR-rLIPz2Vcad13KKEuZUqDJqOVocNFXe8y9IHsSCmHeDTVWaRW58atGbjCq-sOUahDqwcJKNKUBH9BVjFdyTG8ua9pDL7cyO2X2_z8pIpU2uaft_ew", alt: "Solar food dehydration equipment in the valley canyons of Torotoro Bolivia, rustic wooden solar dryers with transparent polycarbonate tops drying corn and fruits, warm sunlight, rugged Andean geological landscape in background.", codigo: "ID: PRJ-2024-18",
  },
  {
    id: "PRJ-2022-15", estado: "Cancelado", tipo: "Agroecología", municipio: "Batallas", financiador: "Pan para el Mundo", search: "Piscicultura Andina en Lagunas Glaciares Batallas La Paz Pan para el Mundo truchas cancelación licencia ambiental",
    titulo: "Acuaponía y Piscicultura en Lagunas de Altura", descripcion: "Cancelado durante fase de factibilidad ambiental previa para evitar impacto sobre microfauna bentónica en bofedal protegido.", gestion: "2022 (No ejecutado)", ubicacion: "Batallas, La Paz", cooperante: "Pan para el Mundo", beneficiarios: "Auditoría de Cumplimiento", boton: "Dictamen Cierre",
    imagen: "https://lh3.googleusercontent.com/aida-public/AB6AXuCtkD3XyynbaNnFLNNtDe2W1Wm9IbWccUf-06d8q3h4R5AbBtMQJZcbCZKf6nLFuWH96T-RzYGxvlbXAzwI4FvKABCI8dJiLYiTlaMfhr2Lfw6iQqaJ3brtQrCBZQOZi32RpHLZfl0a47V0thi2Y0XZ8zjFrdFHEzqzCBjFXUq0b9wxxF9N4AN5H2FksCKyLaisALDSQub6YA3JuT50LXO4khJIY9xFSmU6prHJj_nqScW1AmVgIw", alt: "High altitude glacier lagoon in the Cordillera Real near Batallas Bolivia, cold crystal water surrounded by granite peaks and tussock grass, quiet atmospheric scene, institutional technical view.", codigo: "ID: PRJ-2022-15",
  },
  {
    id: "PRJ-2025-07", estado: "Planificado", tipo: "Agua y Riego", municipio: "Achacachi", financiador: "Misereor", search: "Manejo Integral de la Subcuenca Keka Achacachi Omasuyos Misereor riego presas defensivos gaviones",
    titulo: "Manejo Integral de la Subcuenca del Río Keka", descripcion: "Construcción de defensivos con gaviones, forestación de riberas con queñua y tecnificación del riego para forrajeras nativas.", gestion: "2025 - 2027", ubicacion: "Achacachi, La Paz", cooperante: "Misereor (Cooperación Católica Alemana)", beneficiarios: "890 Familias Originarias", boton: "Ficha Técnica",
    imagen: "https://lh3.googleusercontent.com/aida-public/AB6AXuA4KzCoeI1eR03OixNSdYZ_Ovk_S2ZWkie0eR2cbourJNv44Cb6LgrM-53VuJXMOzVnKXppdLK8V1CIgRQilsir5ROi3kBM2tmboiOcHw0B1csvM-1_nQKZoUI4i0hKuKvcZeezlA0Yt5z935BH5mxvKuh7Jc9l4j-eVcxTVp2gG3QIhu1Y9s7cTsTrByw7AopqQJ2-F4vNEmyKHR4pfRDB8x4EH-rkDT3mKa6IPgE3sg5seiaKvg", alt: "Riverbank protection and stone gabion structures along the Keka river near Achacachi, broad views of the Lake Titicaca plateau, clear sunny day, engineering and soil conservation layout.", codigo: "ID: PRJ-2025-07",
  },
];

export const tiposProyecto: ProjectTipo[] = ['Agua y Riego', 'Agroecología', 'Manejo de Bofedales', 'Liderazgo de Mujeres', 'Tecnologías Solares'];
export const municipiosProyecto = ['Batallas', 'Achacachi', 'Patacamaya', 'Tiwanaku', 'Colomi', 'Torotoro'];
