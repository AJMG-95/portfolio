// ============================================================
// SOFT SKILLS: tipado + datos (i18n con Transloco) + colores
// Solo datos: sin helpers ni lógica de negocio
// ============================================================

export type SoftSkillLevel = 1 | 2 | 3 | 4 | 5;

/** Categorías sugeridas para agrupación/tematizado */
export type SoftSkillTag =
  | 'team'        // trabajo en equipo
  | 'comms'       // comunicación/presentación
  | 'ownership'   // responsabilidad/propiedad
  | 'growth'      // mentalidad de aprendizaje
  | 'ux';         // empatía / enfoque usuario

export interface SoftSkill {
  id: number;
  /** Clave i18n, p. ej. 'soft_skills.communication' */
  key: string;
  /** Icono opcional (ruta a imagen/SVG) */
  icon?: string;
  /** Nivel opcional (1..5) */
  level?: SoftSkillLevel;
  /** Tags opcionales para agrupar/estilizar */
  tags?: SoftSkillTag[] | string[];

  /** Branding (igual patrón que tecnologías) */
  color?: string;      // clases Tailwind para modo claro/oscuro
  lightColor?: string; // variante suave para superficies claras
}

export const softSkills: SoftSkill[] = [
  {
    id: 1,
    key: 'soft_skills.communication',
    icon: 'assets/images/icons/communication.webp',
    level: 5,
    tags: ['comms'],
    color: 'bg-blue-500 dark:bg-blue-300',
    lightColor: 'bg-blue-200 dark:bg-blue-100',
  },
  {
    id: 2,
    key: 'soft_skills.teamwork',
    icon: 'assets/images/icons/teamwork.webp',
    level: 5,
    tags: ['team'],
    color: 'bg-emerald-600 dark:bg-emerald-300',
    lightColor: 'bg-emerald-200 dark:bg-emerald-100',
  },
  {
    id: 3,
    key: 'soft_skills.problem_solving',
    icon: 'assets/images/icons/problem_solving.webp',
    level: 4,
    // sin tag específico: puedes asignar uno si luego creas categoría
    color: 'bg-amber-500 dark:bg-amber-300',
    lightColor: 'bg-amber-200 dark:bg-amber-100',
  },
  {
    id: 4,
    key: 'soft_skills.adaptability',
    icon: 'assets/images/icons/adaptability.webp',
    level: 4,
    color: 'bg-sky-500 dark:bg-sky-300',
    lightColor: 'bg-sky-200 dark:bg-sky-100',
  },
  {
    id: 5,
    key: 'soft_skills.time_management',
    icon: 'assets/images/icons/time.webp',
    level: 4,
    color: 'bg-indigo-600 dark:bg-indigo-300',
    lightColor: 'bg-indigo-200 dark:bg-indigo-100',
  },
  {
    id: 6,
    key: 'soft_skills.proactivity',
    icon: 'assets/images/icons/proactivity.webp',
    level: 5,
    tags: ['ownership'],
    color: 'bg-lime-600 dark:bg-lime-300',
    lightColor: 'bg-lime-200 dark:bg-lime-100',
  },
  {
    id: 7,
    key: 'soft_skills.critical_thinking',
    icon: 'assets/images/icons/critical.webp',
    level: 4,
    color: 'bg-violet-600 dark:bg-violet-300',
    lightColor: 'bg-violet-200 dark:bg-violet-100',
  },
  {
    id: 8,
    key: 'soft_skills.empathy',
    icon: 'assets/images/icons/empathy.webp',
    level: 4,
    tags: ['ux'],
    color: 'bg-rose-500 dark:bg-rose-300',
    lightColor: 'bg-rose-200 dark:bg-rose-100',
  },
  {
    id: 9,
    key: 'soft_skills.learning_mindset',
    icon: 'assets/images/icons/learning.webp',
    level: 5,
    tags: ['growth'],
    color: 'bg-cyan-500 dark:bg-cyan-300',
    lightColor: 'bg-cyan-200 dark:bg-cyan-100',
  },
  {
    id: 10,
    key: 'soft_skills.accountability',
    icon: 'assets/images/icons/accountability.webp',
    level: 5,
    tags: ['ownership'],
    color: 'bg-orange-600 dark:bg-orange-300',
    lightColor: 'bg-orange-200 dark:bg-orange-100',
  },
  {
    id: 11,
    key: 'soft_skills.stress_management',
    icon: 'assets/images/icons/stress.webp',
    level: 4,
    color: 'bg-teal-600 dark:bg-teal-300',
    lightColor: 'bg-teal-200 dark:bg-teal-100',
  },
  {
    id: 12,
    key: 'soft_skills.presentation',
    icon: 'assets/images/icons/presentation.webp',
    level: 4,
    tags: ['comms'],
    color: 'bg-fuchsia-600 dark:bg-fuchsia-300',
    lightColor: 'bg-fuchsia-200 dark:bg-fuchsia-100',
  },
];
