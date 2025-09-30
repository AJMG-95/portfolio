// ============================================================
// WORK METHODOLOGIES (Scrum, Agile, Kanban...)
// ============================================================

export interface WorkMethodology {
  id: number;
  /** Clave i18n, p. ej. 'methodologies.scrum' */
  key: string;
  logo?: string;
  color?: string;
  lightColor?: string;
  tags?: string[];
}

export const workMethodologies: WorkMethodology[] = [
  {
    id: 1,
    key: 'methodologies.scrum',
    logo: 'assets/images/methologies/scrum.webp',
    color: 'bg-blue-600 dark:bg-blue-300',
    lightColor: 'bg-blue-200 dark:bg-blue-100',
    tags: ['agile', 'teams', 'sprints'],
  },
  {
    id: 2,
    key: 'methodologies.agile',
    logo: 'assets/images/methologies/agile.webp',
    color: 'bg-emerald-600 dark:bg-emerald-300',
    lightColor: 'bg-emerald-200 dark:bg-emerald-100',
    tags: ['values', 'principles'],
  },
  {
    id: 3,
    key: 'methodologies.kanban',
    logo: 'assets/images/methologies/kanban.webp',
    color: 'bg-amber-600 dark:bg-amber-300',
    lightColor: 'bg-amber-200 dark:bg-amber-100',
    tags: ['flow', 'wip'],
  },
];
