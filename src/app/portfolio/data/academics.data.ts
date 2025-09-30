// === MODELOS ===
export interface Institution {
  id: number;
  key: string;   // i18n key, ej: 'institutions.uca'
  logo?: string;
  color?: string;
  lightColor?: string;
  url?: string;
}

export type StudyType = 'university' | 'institute';

export interface Study {
  id: number;
  institutionId: number;  // FK -> Institution.id
  type: StudyType;
  titleKey: string;       // ej: 'studies.programs.msc_integrated_water_management'
  fieldKey?: string;      // ej: 'fields.water_management'
  dates: { start: string; end: string }; // años ISO como strings
  pageUrl?: string;
  image?: string;
}

// === INSTITUCIONES (IDs reiniciados) ===
export const institutions: Institution[] = [
  {
    id: 1,
    key: 'institutions.uca',
    logo: 'assets/images/companies/logos/logo_uca_facutad_ccma.webp',
    color: 'bg-yellow-500 dark:bg-yellow-300',
    lightColor: 'bg-yellow-200 dark:bg-yellow-100',
    url: 'https://www.uca.es/',
  },
  {
    id: 2,
    key: 'institutions.iesDonana',
    logo: 'assets/images/companies/logos/logo_IESDonana.webp',
    color: 'bg-yellow-500 dark:bg-yellow-300',
    lightColor: 'bg-yellow-200 dark:bg-yellow-100',
    url: 'https://iesdonana.org/',
  },
];

// === ESTUDIOS (sin certificaciones, IDs reiniciados) ===
// Orden reciente → antiguo (puedes ordenar en UI si prefieres)
export const studies: Study[] = [

  {
    id: 1,
    institutionId: 2,                  // IES Doñana
    type: 'institute',
    titleKey: 'studies.programs.hnd_web_app_development',
    fieldKey: 'fields.software_development',
    dates: { start: '2021', end: '2024' },
    pageUrl:
      'https://iesdonana.org/oferta-educativa/ciclos-formativos-de-grado-superior/desarrollo-de-aplicaciones-web/',
    image: 'assets/images/companies/logos/logos/logo_IESDonana.webp',
  },
  {
    id: 2,
    institutionId: 1,                  // UCA
    type: 'university',
    titleKey: 'studies.programs.msc_integrated_water_management',
    fieldKey: 'fields.water_management',
    dates: { start: '2019', end: '2021' },
    pageUrl: 'https://ccmaryambientales.uca.es/grado-en-ciencias-ambientales/',
    image: 'assets/images/companies/logos/logos/logo_uca_facutad_ccma.webp',
  },
  {
    id: 3,
    institutionId: 1,                  // UCA
    type: 'university',
    titleKey: 'studies.programs.bsc_environmental_sciences',
    fieldKey: 'fields.environmental_sciences',
    dates: { start: '2014', end: '2019' },
    pageUrl: 'https://ccmaryambientales.uca.es/grado-en-ciencias-ambientales/',
    image: 'assets/images/companies/logos/logos/logo_uca_facutad_ccma.webp',
  },
];
