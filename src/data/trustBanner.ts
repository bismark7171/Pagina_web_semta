import type { ITrustBanner } from '@/types';

export const trustBanner: ITrustBanner = {
  titulo: 'Rendición de Cuentas y Transparencia',
  descripcion: 'Accede libremente a nuestras memorias anuales institucionales y estados financieros auditados.',
  botones: [
    { text: 'Memoria 2024 (PDF)', path: '/biblioteca', icono: 'download', tipo: 'outline' },
    { text: 'Estatutos y Acreditaciones', path: '/nosotros', icono: 'visibility', tipo: 'solid' },
  ],
};

export const trustPartners: string[] = [
  'OPEC Fund',
  'AECID',
  'COSUDE',
  'Acción contra el Hambre',
  'UNICEF Bolivia',
  'Gobierno Municipal de La Paz',
  'Fondo Mundial',
];