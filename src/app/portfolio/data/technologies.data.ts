// Tipos base
export type TechType =
  | 'language'
  | 'framework'
  | 'ui'
  | 'database'
  | 'embedded-db'
  | 'client-storage'
  | 'version-control'
  | 'project-management'
  | 'baas'          // plataforma BaaS (Firebase, Supabase…)
  | 'baas-service'  // servicio dentro de una BaaS (Auth, FCM…)
  | 'cloud'
  | 'design-system';

export type TrackLanguage = 'frontend' | 'backend' | 'mobile';
export type TrackDatabase = 'sql' | 'nosql' | 'embedded';
export type TrackUI = 'library' | 'design-systems' | 'language' | 'framework';


export interface Tech {
  id: number;
  name: string;
  logoUrl: string;
  color: string;     // clase tailwind o hex (modo claro)
  darkColor: string; // clase tailwind o hex (modo oscuro)
  type: TechType;
  org?: string;
  url?: string;
  platformId?: number; // para vincular servicios a su plataforma (p.ej. Firebase)
}

// Categorías con atributos propios
export interface Language extends Tech {
  type: 'language';
  track: TrackLanguage;
  frameworkIds?: number[]; // frameworks compatibles (relleno automático si no lo defines)
}

export interface Framework extends Tech {
  type: 'framework';
  track: TrackLanguage;
  languageIds?: number[]; // lenguajes compatibles (relleno automático si no lo defines)
}

export interface Database extends Tech {
  type: 'database';
  track: TrackDatabase;
}

export interface UITechnology extends Tech {
  type: 'ui';
  track: TrackUI;
}

// =====================
// Datos por categoría
// (IDs simples; unicidad sólo dentro de su categoría)
// =====================

// Languages
export const languages: Language[] = [
  {
    id: 1,
    name: 'TypeScript',
    logoUrl: 'assets/images/technologies/ts_logo.webp',
    color: 'bg-[#D6ECFF]',
    darkColor: 'bg-[#3178c6]',
    type: 'language',
    track: 'frontend',
  },
  {
    id: 2,
    name: 'JavaScript',
    logoUrl: 'assets/images/technologies/javascript_logo.webp',
    color: 'bg-yellow-100',
    darkColor: 'bg-yellow-400',
    type: 'language',
    track: 'frontend',
  },
  {
    id: 3,
    name: 'Dart',
    logoUrl: 'assets/images/technologies/Dart_logo.webp',
    color: 'bg-[#D6ECFF]',
    darkColor: 'bg-[#0175C2]',
    type: 'language',
    track: 'mobile',
  },

  // Backend
  {
    id: 5,
    name: 'PHP',
    logoUrl: 'assets/images/technologies/php_logo.webp',
    color: 'bg-[#d7d9eb]',
    darkColor: 'bg-[#8993be]',
    type: 'language',
    track: 'backend',
  },
  {
    id: 6,
    name: 'Java',
    logoUrl: 'assets/images/technologies/java_logo.webp',
    color: 'bg-red-200',
    darkColor: 'bg-red-500',
    type: 'language',
    track: 'backend',
  },
/*   {
    id: 7,
    name: 'NodeJs',
    logoUrl: 'assets/images/technologies/nodejs_logo.webp',
    color: 'bg-green-200',
    darkColor: 'bg-green-600',
    type: 'language',
    track: 'backend',
  }, */
  {
    id: 8,
    name: 'Python',
    logoUrl: 'assets/images/technologies/python_logo.webp',
    color: 'bg-[#c7dff5]',
    darkColor: 'bg-[#306998]',
    type: 'language',
    track: 'backend',
  },
];

// Frameworks
export const frameworks: Framework[] = [
  {
    id: 1,
    name: 'Angular',
    logoUrl: 'assets/images/technologies/angular_logo.webp',
    color: 'bg-red-200',
    darkColor: 'bg-red-600',
    type: 'framework',
    track: 'frontend',
    languageIds: [1, 2], // TS, JS
  },
  {
    id: 2,
    name: 'React',
    logoUrl: 'assets/images/technologies/react_logo.webp',
    color: 'bg-cyan-200',
    darkColor: 'bg-cyan-500',
    type: 'framework',
    track: 'frontend',
    languageIds: [1, 2], // TS, JS
  },
  {
    id: 3,
    name: 'Flutter',
    logoUrl: 'assets/images/technologies/flutter_logo.webp',
    color: 'bg-sky-200',
    darkColor: 'bg-sky-500',
    type: 'framework',
    track: 'mobile',
    languageIds: [3], // Dart
  },
  {
    id: 4,
    name: 'Laravel',
    logoUrl: 'assets/images/technologies/laravel_logo.webp',
    color: 'bg-[#ffcccc]',
    darkColor: 'bg-[#ff2d20]',
    type: 'framework',
    track: 'backend',
    languageIds: [5], // PHP
  },
];

// UI libraries
export const uiLibraries: UITechnology[] = [
  // Libraries
  {
    id: 1,
    name: 'PrimeNG',
    logoUrl: 'assets/images/technologies/primeng_logo.webp',
    color: 'bg-[#c3c7f3]',
    darkColor: 'bg-[#3f51b5]',
    type: 'ui',
    track: 'library',
  },
  {
    id: 2,
    name: 'daisyUI',
    logoUrl: 'assets/images/technologies/daisyui_logo.webp',
    color: 'bg-[#e9ddff]',
    darkColor: 'bg-[#570DF8]',
    type: 'ui',
    track: 'library',
  },

  // Frameworks (UI)
  {
    id: 3,
    name: 'Tailwind CSS',
    logoUrl: 'assets/images/technologies/tailwind_logo.webp',
    color: 'bg-[#c6ecfc]',
    darkColor: 'bg-[#38bdf8]',
    type: 'ui',
    track: 'framework',
  },
  {
    id: 4,
    name: 'Bootstrap',
    logoUrl: 'assets/images/technologies/bootstrap_logo.webp',
    color: 'bg-[#d6c6e9]',
    darkColor: 'bg-[#7952b3]',
    type: 'ui',
    track: 'framework',
  },

  // “Language” (UI)
  {
    id: 5,
    name: 'CSS',
    logoUrl: 'assets/images/technologies/css_logo.webp',
    color: 'bg-blue-200',
    darkColor: 'bg-blue-500',
    type: 'ui',
    track: 'language',
  },

  // Methodology (UI) — también existe en designSystems (para compatibilidad visual)
  {
    id: 6,
    name: 'DESY',
    logoUrl: 'assets/images/technologies/desy_logo.webp',
    color: 'bg-[#ECEFF1]',
    darkColor: 'bg-[#2C3E50]',
    type: 'ui',
    track: 'design-systems',
  },
];


// Databases
export const databases: Database[] = [
  {
    id: 1,
    name: 'PostgreSQL',
    logoUrl: 'assets/images/technologies/postgresql_logo.webp',
    color: 'bg-[#c8d9ec]',
    darkColor: 'bg-[#336791]',
    type: 'database',
    track: 'sql',
  },
  {
    id: 2,
    name: 'MySQL',
    logoUrl: 'assets/images/technologies/mysql_logo.webp',
    color: 'bg-[#cfeaf0]',
    darkColor: 'bg-[#00758f]',
    type: 'database',
    track: 'sql',
  },
/*   {
    id: 3,
    name: 'MongoDB',
    logoUrl: 'assets/images/technologies/mongodb_logo.webp',
    color: 'bg-[#dff1e4]',
    darkColor: 'bg-[#47A248]',
    type: 'database',
    track: 'nosql',
  }, */
];

// BaaS
export const baasPlatforms: Tech[] = [
  {
    id: 1,
    name: 'Firebase',
    logoUrl: 'assets/images/technologies/firebase.webp',
    color: 'bg-[#fff2c1]',
    darkColor: 'bg-[#ffca28]',
    type: 'baas',
  },
];

export const baasServices: Tech[] = [
  {
    id: 1,
    name: 'Cloud Messaging (FCM)',
    logoUrl: 'assets/images/technologies/firebase_fcm_logo.webp',
    color: 'bg-[#fff3cd]',
    darkColor: 'bg-[#FFCA28]',
    type: 'baas-service',
    platformId: 1, // Firebase
  },
];

// Cloud
export const cloudPlatforms: Tech[] = [
  {
    id: 1,
    name: 'Cloudflare',
    logoUrl: 'assets/images/technologies/cloudflare_logo.webp',
    color: 'bg-[#ffe5d1]',
    darkColor: 'bg-[#F38020]',
    type: 'cloud',
  },
];

// Herramientas
export const versionControlTools: Tech[] = [
  {
    id: 1,
    name: 'Git',
    logoUrl: 'assets/images/technologies/git_logo.webp',
    color: 'bg-orange-200',
    darkColor: 'bg-orange-600',
    type: 'version-control',
  },
  {
    id: 2,
    name: 'GitHub',
    logoUrl: 'assets/images/technologies/github_logo.webp',
    color: 'bg-gray-300',
    darkColor: 'bg-gray-800',
    type: 'version-control',
  },
];

export const projectManagementTools: Tech[] = [
  {
    id: 1,
    name: 'Asana',
    logoUrl: 'assets/images/technologies/asana_logo.webp',
    color: 'bg-pink-200',
    darkColor: 'bg-pink-400',
    type: 'project-management',
  },
  {
    id: 2,
    name: 'Monday',
    logoUrl: 'assets/images/technologies/monday_logo.webp',
    color: 'bg-teal-200',
    darkColor: 'bg-teal-400',
    type: 'project-management',
  },
];


// Client storage
export const clientStorage: Tech[] = [
  {
    id: 1,
    name: 'LocalStorage',
    logoUrl: '',
    color: 'bg-gray-100',
    darkColor: 'bg-gray-500',
    type: 'client-storage',
  },
];
