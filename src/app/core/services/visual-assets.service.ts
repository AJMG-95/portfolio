// src\app\core\services\visual-assets.service.ts

import { Injectable } from '@angular/core';

export interface TechnologyAsset {
  name: string;
  logo: string;
  color: string;
  lightColor: string;
}

@Injectable({ providedIn: 'root' })
export class VisualAssetsService {
  // 🌐 Tecnologías frontend
  private frontend: Record<number, TechnologyAsset> = {
    1: {
      name: 'Angular',
      logo: 'assets/images/logos/angular_logo.webp',
      color: 'bg-red-600 dark:bg-red-300',
      lightColor: 'bg-red-200 dark:bg-red-100',
    },
    2: {
      name: 'TypeScript',
      logo: 'assets/images/logos/ts_logo.webp',
      color: 'bg-[#3178c6] dark:bg-[#c5def3]',
      lightColor: 'bg-[#c5def3] dark:bg-[#e3f0fb]',
    },
    3: {
      name: 'Tailwind CSS',
      logo: 'assets/images/logos/tailwind_logo.webp',
      color: 'bg-[#38bdf8] dark:bg-[#c6ecfc]',
      lightColor: 'bg-[#c6ecfc] dark:bg-[#e1f6fd]',
    },
    4: {
      name: 'PrimeNG',
      logo: 'assets/images/logos/primeng_logo.webp',
      color: 'bg-[#3f51b5] dark:bg-[#c3c7f3]',
      lightColor: 'bg-[#c3c7f3] dark:bg-[#e0e2f8]',
    },
    7: {
      name: 'JavaScript',
      logo: 'assets/images/logos/javascript_logo.webp',
      color: 'bg-yellow-400 dark:bg-yellow-200',
      lightColor: 'bg-yellow-100 dark:bg-yellow-50',
    },
    8: {
      name: 'HTML5',
      logo: 'assets/images/logos/html_logo.webp',
      color: 'bg-orange-500 dark:bg-orange-300',
      lightColor: 'bg-orange-200 dark:bg-orange-100',
    },
    9: {
      name: 'CSS3',
      logo: 'assets/images/logos/css_logo.webp',
      color: 'bg-blue-500 dark:bg-blue-300',
      lightColor: 'bg-blue-200 dark:bg-blue-100',
    },
    14: {
      name: 'React',
      logo: 'assets/images/logos/react_logo.webp',
      color: 'bg-cyan-500 dark:bg-cyan-300',
      lightColor: 'bg-cyan-200 dark:bg-cyan-100',
    },
    15: {
      name: 'Flutter',
      logo: 'assets/images/logos/flutter_logo.webp',
      color: 'bg-sky-500 dark:bg-sky-300',
      lightColor: 'bg-sky-200 dark:bg-sky-100',
    },
    17: {
      name: 'Bootstrap',
      logo: 'assets/images/logos/bootstrap_logo.webp',
      color: 'bg-[#7952b3] dark:bg-[#d6c6e9]',
      lightColor: 'bg-[#d6c6e9] dark:bg-[#eee7f6]',
    },
  };

  // 🖥️ Tecnologías backend
  private backend: Record<number, TechnologyAsset> = {
    10: {
      name: 'Node.js',
      logo: 'assets/images/technologies/node_logo.webp',
      color: 'bg-green-600 dark:bg-green-300',
      lightColor: 'bg-green-200 dark:bg-green-100',
    },
    11: {
      name: 'Java',
      logo: 'assets/images/logos/java_logo.webp',
      color: 'bg-red-500 dark:bg-red-300',
      lightColor: 'bg-red-200 dark:bg-red-100',
    },
    12: {
      name: 'Python',
      logo: 'assets/images/logos/python_logo.webp',
      color: 'bg-[#306998] dark:bg-[#c7dff5]',
      lightColor: 'bg-[#c7dff5] dark:bg-[#e4f1fa]',
    },
    13: {
      name: 'PHP',
      logo: 'assets/images/logos/php_logo.webp',
      color: 'bg-[#8993be] dark:bg-[#d7d9eb]',
      lightColor: 'bg-[#d7d9eb] dark:bg-[#eceef7]',
    },
    16: {
      name: 'Laravel',
      logo: 'assets/images/logos/laravel_logo.webp',
      color: 'bg-[#ff2d20] dark:bg-[#ffcccc]',
      lightColor: 'bg-[#ffcccc] dark:bg-[#ffe5e5]',
    },
  };

  // 📊 Gestores de bases de datos
  private databases: Record<number, TechnologyAsset> = {
    20: {
      name: 'PostgreSQL',
      logo: 'assets/images/logos/postgresql_logo.webp',
      color: 'bg-[#336791] dark:bg-[#c8d9ec]',
      lightColor: 'bg-[#c8d9ec] dark:bg-[#e3edf7]',
    },
    26: {
      name: 'MySQL',
      logo: 'assets/images/logos/mysql_logo.webp',
      color: 'bg-[#00758f] dark:bg-[#66b8cc]',
      lightColor: 'bg-[#cfeaf0] dark:bg-[#e6f5f8]',
    },
  };

  // 🔃 Herramientas de desarrollo
  private devTools: Record<number, TechnologyAsset> = {
    5: {
      name: 'LocalStorage',
      logo: 'assets/images/logos/storage_logo.webp',
      color: 'bg-yellow-600 dark:bg-yellow-300',
      lightColor: 'bg-yellow-200 dark:bg-yellow-100',
    },
    6: {
      name: 'Firebase',
      logo: 'assets/images/logos/firebase.webp',
      color: 'bg-[#ffca28] dark:bg-[#fff2c1]',
      lightColor: 'bg-[#fff2c1] dark:bg-[#fff8e3]',
    },
  };


  // 📋 Herramientas de gestión de trabajo
  private workflowTools: Record<number, TechnologyAsset> = {
    21: {
      name: 'Asana',
      logo: 'assets/images/logos/asana_logo.webp',
      color: 'bg-pink-400 dark:bg-pink-200',
      lightColor: 'bg-pink-200 dark:bg-pink-100',
    },
    22: {
      name: 'Monday',
      logo: 'assets/images/logos/monday_logo.webp',
      color: 'bg-teal-400 dark:bg-teal-200',
      lightColor: 'bg-teal-200 dark:bg-teal-100',
    },
  };

  // 🔃 Control de versiones
  private versionControl: Record<number, TechnologyAsset> = {
    18: {
      name: 'Git',
      logo: 'assets/images/logos/git_logo.webp',
      color: 'bg-orange-600 dark:bg-orange-300',
      lightColor: 'bg-orange-200 dark:bg-orange-100',
    },
    19: {
      name: 'GitHub',
      logo: 'assets/images/logos/github_logo.webp',
      color: 'bg-gray-800 dark:bg-gray-300',
      lightColor: 'bg-gray-300 dark:bg-gray-200',
    },
  };

  // ✅ Buenas prácticas
  private principles: Record<number, TechnologyAsset> = {
    23: {
      name: 'Clean Architecture',
      logo: 'assets/images/icons/architecture.webp',
      color: 'bg-yellow-500 dark:bg-yellow-300',
      lightColor: 'bg-yellow-200 dark:bg-yellow-100',
    },
    24: {
      name: 'Web Accessibility',
      logo: 'assets/images/icons/accessibility.webp',
      color: 'bg-yellow-500 dark:bg-yellow-300',
      lightColor: 'bg-yellow-200 dark:bg-yellow-100',
    },
    25: {
      name: 'Responsive Design',
      logo: 'assets/images/icons/responsive.webp',
      color: 'bg-yellow-500 dark:bg-yellow-300',
      lightColor: 'bg-yellow-200 dark:bg-yellow-100',
    },
  };

  private misc: Record<number, TechnologyAsset> = {
    101: {
      name: 'Cambridge',
      logo: 'assets/images/companies-logo/university_of_cambridge_logo.webp',
      color: 'bg-yellow-500 dark:bg-yellow-300',
      lightColor: 'bg-yellow-200 dark:bg-yellow-100',
    },
    102: {
      name: 'UCA',
      logo: 'assets/images/companies-logo/logo_uca_facutad_ccma_3.webp',
      color: 'bg-yellow-500 dark:bg-yellow-300',
      lightColor: 'bg-yellow-200 dark:bg-yellow-100',
    },
  }

  // 🧩 Mapa combinado
  private techMap: Record<number, TechnologyAsset> = Object.assign(
    {},
    this.frontend,
    this.backend,
    this.databases,
    this.devTools,
    this.workflowTools,
    this.versionControl,
    this.principles,
    this.misc
  );

  getAsset(id: number): TechnologyAsset | undefined {
    return this.techMap[id];
  }

  getLogo(id: number): string | undefined {
    return this.techMap[id]?.logo;
  }

  getColor(id: number): string | undefined {
    return this.techMap[id]?.color;
  }

  getLightColor(id: number): string | undefined {
    return this.techMap[id]?.lightColor;
  }

  getName(id: number): string | undefined {
    return this.techMap[id]?.name;
  }
}
