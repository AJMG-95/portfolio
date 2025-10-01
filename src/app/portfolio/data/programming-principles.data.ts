// src/app/portfolio/data/programming-principles.data.ts

export type PrincipleScope = 'frontend' | 'backend' | 'mobile' | 'fullstack';
export type PrincipleCategory =
  | 'arquitectura'
  | 'estado'
  | 'calidad'
  | 'testing'
  | 'seguridad'
  | 'renderizado'
  | 'construccion';

export interface ProgrammingPrinciple {
  id: number;
  nameKey: string; // ej. 'principles.solid'
  descriptionKey?: string; // ej. 'principles.solid_desc'
  category: PrincipleCategory;
  appliesTo: PrincipleScope[];
}

export const programmingPrinciples: ProgrammingPrinciple[] = [
  {
    id: 1,
    nameKey: 'principles.solid',
    descriptionKey: 'principles.solid_desc',
    category: 'arquitectura',
    appliesTo: ['fullstack', 'frontend', 'backend', 'mobile'],
  },
  {
    id: 2,
    nameKey: 'principles.dry',
    descriptionKey: 'principles.dry_desc',
    category: 'calidad',
    appliesTo: ['fullstack', 'frontend', 'backend', 'mobile'],
  },
  {
    id: 3,
    nameKey: 'principles.clean_code',
    descriptionKey: 'principles.clean_code_desc',
    category: 'calidad',
    appliesTo: ['fullstack', 'frontend', 'backend', 'mobile'],
  },
  {
    id: 4,
    nameKey: 'principles.ddd',
    descriptionKey: 'principles.ddd_desc',
    category: 'arquitectura',
    appliesTo: ['fullstack', 'frontend', 'backend', 'mobile'],
  },
  {
    id: 5,
    nameKey: 'principles.soc',
    descriptionKey: 'principles.soc_desc',
    category: 'arquitectura',
    appliesTo: ['fullstack', 'frontend', 'backend', 'mobile'],
  },
  {
    id: 6,
    nameKey: 'principles.state_mgmt',
    descriptionKey: 'principles.state_mgmt_desc',
    category: 'estado',
    appliesTo: ['frontend', 'mobile', 'fullstack'],
  },
  {
    id: 7,
    nameKey: 'principles.ssr_ssg_seo',
    descriptionKey: 'principles.ssr_ssg_seo_desc',
    category: 'renderizado',
    appliesTo: ['frontend'],
  },
  {
    id: 8,
    nameKey: 'principles.i18n',
    descriptionKey: 'principles.i18n_desc',
    category: 'calidad',
    appliesTo: ['frontend', 'mobile', 'fullstack'],
  },
  {
    id: 9,
    nameKey: 'principles.testing',
    descriptionKey: 'principles.testing_desc',
    category: 'testing',
    appliesTo: ['fullstack', 'frontend', 'backend', 'mobile'],
  },
  {
    id: 10,
    nameKey: 'principles.authz',
    descriptionKey: 'principles.authz_desc',
    category: 'seguridad',
    appliesTo: ['fullstack', 'frontend', 'backend', 'mobile'],
  },
  {
    id: 11,
    nameKey: 'principles.modularity',
    descriptionKey: 'principles.modularity_desc',
    category: 'construccion',
    appliesTo: ['fullstack', 'frontend', 'backend', 'mobile'],
  },
  {
    id: 12,
    nameKey: 'principles.observability',
    descriptionKey: 'principles.observability_desc',
    category: 'calidad',
    appliesTo: ['fullstack', 'frontend', 'backend', 'mobile'],
  },
];
