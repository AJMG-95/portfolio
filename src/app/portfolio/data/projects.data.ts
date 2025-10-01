// ============================================================
// PROJECTS: modelos + datos
// - name traducible via Transloco (nameKey)
// - shortDescriptionKey / longDescriptionKey (ambas traducibles)
// - Tecnologías con 'techRefs' (mismo patrón que certifications/work)
// - Versions por CATEGORÍA para evitar colisiones de IDs
// - Categorización: category ('frontend' | 'backend') y size ('standard' | 'mini')
// - Listas derivadas: frontProjects, backProjects, miniFrontProjects, miniBackProjects
// ============================================================

import { TechRefs } from "../interfaces/technologies.interface";



// ===== Versionado por categoría (FIRME) =====
type VersionMap = Record<number, string>;

export interface TechnologyVersionsByCategory {
  frontLanguages?: VersionMap;
  backLanguages?: VersionMap;
  frontFrameworks?: VersionMap;
  backFrameworks?: VersionMap;
  uiLibraries?: VersionMap;
  versionControlTools?: VersionMap;
  databases?: VersionMap;
  embeddedDatabases?: VersionMap;
  clientStorage?: VersionMap; // rara vez tendrán versión (puedes omitirla)
  baasPlatforms?: VersionMap;
  cloudPlatforms?: VersionMap;
  dataTech?: VersionMap; // p.ej. SQL
}

export enum ProjectStatus {
  Draft = 'draft',
  InProgress = 'in_progress',
  Testing = 'testing',
  Released = 'released',
  Finished = 'finished',
  Archived = 'archived',
  FixingBugs = 'fixing_bugs',
}

export type ProjectCategory = 'frontend' | 'backend';
export type ProjectSize = 'standard' | 'mini';

export interface ProjectLinks {
  githubUrl?: string;
  liveUrl?: string;
  docsUrl?: string;
}

export interface ProjectImages {
  headerImageUrl?: string;
  cornerImageUrl?: string; // avatar/logo en la tarjeta
  galleryImages?: string[];
}

export interface Project {
  id: number;

  /** Metadatos de clasificación */
  category: ProjectCategory; // 'frontend' | 'backend'
  size: ProjectSize; // 'standard' | 'mini'

  /** Clave i18n del nombre del proyecto (p.ej. 'projects.todoapp.name') */
  nameKey: string;

  /** Descripciones traducibles */
  shortDescriptionKey?: string; // p.ej. 'projects.todoapp.short'
  longDescriptionKey?: string; // p.ej. 'projects.todoapp.long'

  /** Estado del proyecto */
  status: ProjectStatus;

  /** Tecnologías usadas (IDs hacia tu catálogo global) */
  techRefs: TechRefs;

  /** Versiones por CATEGORÍA para evitar colisiones de ids entre tablas */
  technologyVersions?: TechnologyVersionsByCategory;

  /** Imágenes y enlaces */
  images?: ProjectImages;
  links?: ProjectLinks;

  /** (Opcional) Bullets/Highlights traducibles */
  highlightsKeys?: string[]; // ['projects.todoapp.points.x', ...]
}

// ===== Datos (source of truth) =====
// Mapas (según tus catálogos):
// frontFrameworks: Angular(1), React(2), Flutter(3), Tailwind(4), Bootstrap(5)
// uiLibraries: PrimeNG(1)
// clientStorage: LocalStorage(1)

export const projects: Project[] = [
  {
    id: 1,
    category: 'frontend',
    size: 'mini', // Este TodoApp parece "mini"; cámbialo a 'standard' si lo prefieres
    nameKey: 'projects.todoapp.name', // "TodoApp"
    shortDescriptionKey: 'projects.todoapp.short',
    longDescriptionKey: 'projects.todoapp.long',
    status: ProjectStatus.Testing,
    techRefs: {
      frontFrameworkIds: [1], // Angular
      uiLibraryIds: [1, 3], // PrimeNG
      clientStorageIds: [1], // LocalStorage
      frontLanguageIds: [1], // TypeScript, JavaScript
    },
    technologyVersions: {
      frontFrameworks: {
        1: '18.2.13', // Angular (id 1 en frontFrameworks)
      },
      uiLibraries: {
        1: '18.0.2', // PrimeNG (id 1 en uiLibraries)
        3: '3.4.17'
      },
    },
    images: {
      headerImageUrl: 'assets/images/projects/todo_app/main.webp',
      cornerImageUrl: 'https://avatars.githubusercontent.com/u/139426?v=4',
      galleryImages: [
        'assets/images/projects/todo_app/main.webp',
        'assets/images/projects/todo_app/tasks.webp',
        'assets/images/projects/todo_app/task_filter.webp',
        'assets/images/projects/todo_app/statistics.webp'
      ],
    },
    links: {
      githubUrl: 'https://github.com/AJMG-95/todo-app',
      liveUrl: 'https://ajmg-95.github.io/todo-app/todo',
    },
    highlightsKeys: [
      'projects.todoapp.points.offline_storage',
      'projects.todoapp.points.filters',
      'projects.todoapp.points.accessibility',
    ],
  },
  {
    id: 2,
    category: 'frontend',
    size: 'standard',
    nameKey: 'projects.cineverse.name',
    shortDescriptionKey: 'projects.cineverse.short',
    longDescriptionKey: 'projects.cineverse.long',
    status: ProjectStatus.InProgress, // aún en construcción
    techRefs: {
      frontFrameworkIds: [1], // Angular, Tailwind CSS
      uiLibraryIds: [2, 3], // daisyUI
      frontLanguageIds: [1], // TypeScript
      clientStorageIds: [1], // LocalStorage
    },
    technologyVersions: {
      frontFrameworks: {
        1: '20', // Angular 20
      },
      uiLibraries: {
        2: '5.1', // daisyUI 5.1
        3: '4.1', // Tailwind 4.1
      },
    },
    // Aún sin imágenes; se podrán añadir más tarde
    images: {
      headerImageUrl: 'assets/images/projects/cineverse/init.webp',
      cornerImageUrl: 'https://avatars.githubusercontent.com/u/139426?v=4',
      galleryImages: [
        'assets/images/projects/cineverse/init.webp',
        'assets/images/projects/cineverse/movie_init_1.webp',
        'assets/images/projects/cineverse/movie_init_2.webp',
        'assets/images/projects/cineverse/movie_search.webp',
        'assets/images/projects/cineverse/movie_favorites.webp',
        'assets/images/projects/cineverse/movie_detail.webp'

      ],
    },
    links: {
      githubUrl: 'https://github.com/AJMG-95/CineVerse',
      // liveUrl: 'https://tu-dominio/cineverse',
    },
    highlightsKeys: [
      'projects.cineverse.points.tmdb_api',
      'projects.cineverse.points.sections_movies', // populares, upcoming, now_playing, etc.
      'projects.cineverse.points.sections_series', // análogos para series
      'projects.cineverse.points.local_lists', // favoritas, vistas, mi_lista
      'projects.cineverse.points.responsive_a11y',
    ],
  },
  {
    id: 3,
    category: 'frontend',
    size: 'mini',
    nameKey: 'projects.zoneless_calculator.name',
    shortDescriptionKey: 'projects.zoneless_calculator.short',
    longDescriptionKey: 'projects.zoneless_calculator.long',
    status: ProjectStatus.Finished, // proyecto terminado
    techRefs: {
      frontFrameworkIds: [1], // Angular
      frontLanguageIds: [1],     // TypeScript
      uiLibraryIds: [3]         // (no usa daisyUI)
    },
    technologyVersions: {
      frontFrameworks: {
        1: '20',   // Angular 20
      },
      uiLibraries: {
        3: '4.1'
      }
    },
    images: {
      // sin headerImageUrl de momento
      headerImageUrl: 'assets/images/projects/zoneless_calculator/main.webp',
      galleryImages: [
        'assets/images/projects/zoneless_calculator/main.webp',
        'assets/images/projects/zoneless_calculator/operation.webp',
        'assets/images/projects/zoneless_calculator/result.webp',
      ],
      cornerImageUrl: 'https://avatars.githubusercontent.com/u/139426?v=4',
    },
    links: {
      githubUrl: 'https://github.com/AJMG-95/ZonelessCalculator'
      // sin liveUrl
    },
    highlightsKeys: [
      'projects.zoneless_calculator.points.zoneless',
      'projects.zoneless_calculator.points.testing',
      'projects.zoneless_calculator.points.tailwind'
    ]
  }


  // === ejemplos futuros ===
  // {
  //   id: 2,
  //   category: 'backend',
  //   size: 'standard',
  //   nameKey: 'projects.api_store.name',
  //   shortDescriptionKey: 'projects.api_store.short',
  //   longDescriptionKey: 'projects.api_store.long',
  //   status: ProjectStatus.InProgress,
  //   techRefs: {
  //     backFrameworkIds: [1],     // Laravel
  //     backLanguageIds: [4],      // PHP
  //     databaseIds: [1],          // PostgreSQL
  //     versionControlToolIds: [2] // GitHub
  //   },
  //   images: { headerImageUrl: 'assets/images/projects/api_store/header.png' },
  //   links: { githubUrl: 'https://github.com/...' }
  // },
];
