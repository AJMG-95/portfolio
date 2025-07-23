// src/app/core/services/technology-assets.service.ts
import { Injectable } from '@angular/core';

interface TechnologyAsset {
  logo: string;
  color: string;       // color principal (fuerte) con soporte para dark mode
  lightColor: string;  // versión suave con soporte para dark mode
}

@Injectable({ providedIn: 'root' })
export class TechnologyAssetsService {
  private techMap: Record<string, TechnologyAsset> = {
    angular: {
      logo: 'assets/images/logos/angular_logo.webp',
      color: 'bg-red-600 dark:bg-red-300',
      lightColor: 'bg-red-200 dark:bg-red-100',
    },
    typescript: {
      logo: 'assets/images/logos/ts_logo.webp',
      color: 'bg-[#3178c6] dark:bg-[#c5def3]',
      lightColor: 'bg-[#c5def3] dark:bg-[#e3f0fb]',
    },
    tailwind: {
      logo: 'assets/images/logos/tailwind_logo.webp',
      color: 'bg-[#38bdf8] dark:bg-[#c6ecfc]',
      lightColor: 'bg-[#c6ecfc] dark:bg-[#e1f6fd]',
    },
    "tailwind css": {
      logo: 'assets/images/logos/tailwind_logo.webp',
      color: 'bg-[#38bdf8] dark:bg-[#c6ecfc]',
      lightColor: 'bg-[#c6ecfc] dark:bg-[#e1f6fd]',
    },
    primeng: {
      logo: 'assets/images/logos/primeng_logo.webp',
      color: 'bg-[#3f51b5] dark:bg-[#c3c7f3]',
      lightColor: 'bg-[#c3c7f3] dark:bg-[#e0e2f8]',
    },
    localstorage: {
      logo: 'assets/images/logos/storage_logo.webp',
      color: 'bg-yellow-600 dark:bg-yellow-300',
      lightColor: 'bg-yellow-200 dark:bg-yellow-100',
    },
    firebase: {
      logo: 'assets/images/technologies/firebase.svg',
      color: 'bg-[#ffca28] dark:bg-[#fff2c1]',
      lightColor: 'bg-[#fff2c1] dark:bg-[#fff8e3]',
    },
    javascript: {
      logo: 'assets/images/technologies/javascript_logo.webp',
      color: 'bg-yellow-400 dark:bg-yellow-200',
      lightColor: 'bg-yellow-100 dark:bg-yellow-50',
    },
    html5: {
      logo: 'assets/images/logos/html_logo.webp',
      color: 'bg-orange-500 dark:bg-orange-300',
      lightColor: 'bg-orange-200 dark:bg-orange-100',
    },
    css3: {
      logo: 'assets/images/logos/css_logo.webp',
      color: 'bg-blue-500 dark:bg-blue-300',
      lightColor: 'bg-blue-200 dark:bg-blue-100',
    },
    node: {
      logo: 'assets/images/technologies/node.svg',
      color: 'bg-green-600 dark:bg-green-300',
      lightColor: 'bg-green-200 dark:bg-green-100',
    },
    java: {
      logo: 'assets/images/logos/java_logo.webp',
      color: 'bg-red-500 dark:bg-red-300',
      lightColor: 'bg-red-200 dark:bg-red-100',
    },
    python: {
      logo: 'assets/images/logos/python_logo.webp',
      color: 'bg-[#306998] dark:bg-[#c7dff5]',
      lightColor: 'bg-[#c7dff5] dark:bg-[#e4f1fa]',
    },
    php: {
      logo: 'assets/images/logos/php_logo.webp',
      color: 'bg-[#8993be] dark:bg-[#d7d9eb]',
      lightColor: 'bg-[#d7d9eb] dark:bg-[#eceef7]',
    },
    react: {
      logo: 'assets/images/logos/react_logo.webp',
      color: 'bg-cyan-500 dark:bg-cyan-300',
      lightColor: 'bg-cyan-200 dark:bg-cyan-100',
    },
    flutter: {
      logo: 'assets/images/logos/flutter_logo.webp',
      color: 'bg-sky-500 dark:bg-sky-300',
      lightColor: 'bg-sky-200 dark:bg-sky-100',
    },
    laravel: {
      logo: 'assets/images/logos/laravel_logo.webp',
      color: 'bg-[#ff2d20] dark:bg-[#ffcccc]',
      lightColor: 'bg-[#ffcccc] dark:bg-[#ffe5e5]',
    },
    bootstrap: {
      logo: 'assets/images/logos/bootstrap_logo.webp',
      color: 'bg-[#7952b3] dark:bg-[#d6c6e9]',
      lightColor: 'bg-[#d6c6e9] dark:bg-[#eee7f6]',
    },
    git: {
      logo: 'assets/images/logos/git_logo.webp',
      color: 'bg-orange-600 dark:bg-orange-300',
      lightColor: 'bg-orange-200 dark:bg-orange-100',
    },
    github: {
      logo: 'assets/images/logos/github_logo.webp',
      color: 'bg-gray-800 dark:bg-gray-300',
      lightColor: 'bg-gray-300 dark:bg-gray-200',
    },
    postgresql: {
      logo: 'assets/images/logos/postgresql_logo.webp',
      color: 'bg-[#336791] dark:bg-[#c8d9ec]',
      lightColor: 'bg-[#c8d9ec] dark:bg-[#e3edf7]',
    },
    asana: {
      logo: 'assets/images/logos/asana_logo.webp',
      color: 'bg-pink-400 dark:bg-pink-200',
      lightColor: 'bg-pink-200 dark:bg-pink-100',
    },
    monday: {
      logo: 'assets/images/logos/monday_logo.webp',
      color: 'bg-teal-400 dark:bg-teal-200',
      lightColor: 'bg-teal-200 dark:bg-teal-100',
    },
    'arquitectura limpia': {
      logo: 'assets/images/icons/architecture.webp',
      color: 'bg-yellow-500 dark:bg-yellow-300',
      lightColor: 'bg-yellow-200 dark:bg-yellow-100',
    },
    'accesibilidad web': {
      logo: 'assets/images/icons/accessibility.webp',
      color: 'bg-yellow-500 dark:bg-yellow-300',
      lightColor: 'bg-yellow-200 dark:bg-yellow-100',
    },
    'diseño responsive': {
      logo: 'assets/images/icons/responsive.webp',
      color: 'bg-yellow-500 dark:bg-yellow-300',
      lightColor: 'bg-yellow-200 dark:bg-yellow-100',
    },
  };

  getLogo(tech: string): string | undefined {
    return this.techMap[tech.toLowerCase()]?.logo;
  }

  getColor(tech: string): string | undefined {
    return this.techMap[tech.toLowerCase()]?.color;
  }

  getLightColor(tech: string): string | undefined {
    return this.techMap[tech.toLowerCase()]?.lightColor;
  }

  getAsset(tech: string): TechnologyAsset | undefined {
    return this.techMap[tech.toLowerCase()];
  }
}
