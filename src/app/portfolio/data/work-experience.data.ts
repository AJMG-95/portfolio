// ============================================================
// WORK EXPERIENCE (i18n por empresa+rol + dateLabelKey)
// Convención i18n fechas: work.dates.<companySlug>.<roleSlug>.<n>
// Convención i18n responsabilidades: work.resp.<companySlug>.<roleSlug>.<n>
// ============================================================

import { TechRefs } from "../interfaces/technologies.interface";



export interface BrandedRef { logo?: string; }

export interface WorkDates {
  start: string; // 'YYYY-MM' o 'YYYY'
  end?: string;
}

export interface WorkExperience extends BrandedRef {
  id: number;
  company: string;
  companyKey?: string;      // ej. 'companies.controlnet'
  companyUrl?: string;
  companyLogo?: string;

  titleKey: string;         // ej. 'work.titles.frontend_developer'
  dates: WorkDates;

  /** Clave i18n de la etiqueta de fechas ya compuesta */
  dateLabelKey: string;     // ej. 'work.dates.controlnet.frontend_developer.1'

  techRefs: TechRefs;

  /** Responsabilidades (claves i18n por empresa+rol) */
  responsibilityKeys: string[]; // ej. ['work.resp.controlnet.frontend_developer.1', ...]
}

// Nota de mapeo (IDs frontFrameworks): Angular(1), React(2), Flutter(3), Tailwind(4), Bootstrap(5)
export const workExperiences: WorkExperience[] = [
  {
    id: 1,
    company: 'Controlnet S.L.',
    companyKey: 'companies.controlnet',
    companyUrl: 'https://controlnet.es/',
    companyLogo: 'assets/images/companies/logos/controlnetspain_logo.webp',
    titleKey: 'work.titles.frontend_developer',
    dates: { start: '2024-03', end: '2025-07' },
    dateLabelKey: 'work.dates.controlnet.frontend_developer.1',
    techRefs: {
      frontFrameworkIds: [3, 1, 2, 4, 5], // Flutter, Angular, React, Tailwind, Bootstrap
      frontLanguageIds: [1]
    },
    responsibilityKeys: [
      'work.resp.controlnet.frontend_developer.1',
      'work.resp.controlnet.frontend_developer.2',
      'work.resp.controlnet.frontend_developer.3',
      'work.resp.controlnet.frontend_developer.4',
      'work.resp.controlnet.frontend_developer.5',
    ],
  },
  {
    id: 2,
    company: 'Controlnet S.L.',
    companyKey: 'companies.controlnet',
    companyUrl: 'https://controlnet.es/',
    companyLogo: 'assets/images/companies/logos/controlnetspain_logo.webp',
    titleKey: 'work.titles.intern_frontend_developer',
    dates: { start: '2023-10', end: '2024-01' },
    dateLabelKey: 'work.dates.controlnet.intern_frontend_developer.1',
    techRefs: {
      frontFrameworkIds: [1, 5], // Angular, Bootstrap
      frontLanguageIds: [1]
    },
    responsibilityKeys: [
      'work.resp.controlnet.intern_frontend_developer.1',
      'work.resp.controlnet.intern_frontend_developer.2',
      'work.resp.controlnet.intern_frontend_developer.3',
      'work.resp.controlnet.intern_frontend_developer.4',
    ],
  },
];
