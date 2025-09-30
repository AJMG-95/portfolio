export interface Principle {
  id: number;
  name: string;            // si usas i18n, puedes omitirlo y traducir por id
  logo: string;
  color?: string;
  lightColor?: string;
  tags?: string[];
}

export const principles: Principle[] = [
  {
    id: 1,
    name: 'Clean Architecture',
    logo: 'assets/images/icons/architecture.webp',
    color: 'bg-yellow-500 dark:bg-yellow-300',
    lightColor: 'bg-yellow-200 dark:bg-yellow-100',
    tags: ['architecture'],
  },
  {
    id: 2,
    name: 'Web Accessibility',
    logo: 'assets/images/icons/accessibility.webp',
    color: 'bg-yellow-500 dark:bg-yellow-300',
    lightColor: 'bg-yellow-200 dark:bg-yellow-100',
    tags: ['a11y', 'wcag'],
  },
  {
    id: 3,
    name: 'Responsive Design',
    logo: 'assets/images/icons/responsive.webp',
    color: 'bg-yellow-500 dark:bg-yellow-300',
    lightColor: 'bg-yellow-200 dark:bg-yellow-100',
    tags: ['ui', 'css'],
  },
  {
    id: 4,
    name: 'SOLID',
    logo: 'assets/images/icons/solid.webp', // crea el asset si no existe
    color: 'bg-indigo-600 dark:bg-indigo-300',
    lightColor: 'bg-indigo-200 dark:bg-indigo-100',
    tags: ['oop', 'design-principles'],
  },
  {
    id: 5,
    name: 'DDD',
    logo: 'assets/images/icons/architecture.webp',
    color: 'bg-yellow-500 dark:bg-yellow-300',
    lightColor: 'bg-yellow-200 dark:bg-yellow-100',
    tags: ['architecture', 'domain'],
  },
  {
    id: 6,
    name: 'Testing',
    logo: 'assets/images/icons/testing.webp',
    color: 'bg-emerald-600 dark:bg-emerald-300',
    lightColor: 'bg-emerald-200 dark:bg-emerald-100',
    tags: ['quality', 'tests'],
  },
  {
    id: 7,
    name: 'DRY',
    logo: 'assets/images/icons/dry.webp', // crea el asset si no existe
    color: 'bg-violet-600 dark:bg-violet-300',
    lightColor: 'bg-violet-200 dark:bg-violet-100',
    tags: ['clean-code'],
  },
];
