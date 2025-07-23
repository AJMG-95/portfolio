// src/app/core/services/technology-assets.service.ts
import { Injectable } from '@angular/core';

interface TechnologyAsset {
  logo: string;
  color: string;       // color principal (fuerte)
  lightColor: string;  // versión más suave para chips o fondos
}

@Injectable({ providedIn: 'root' })
export class TechnologyAssetsService {
  private techMap: Record<string, TechnologyAsset> = {
    angular: {
      logo: 'assets/images/logos/angular_logo.webp',
      color: 'bg-red-600',
      lightColor: 'bg-red-200',
    },
    typescript: {
      logo: 'assets/images/logos/ts_logo.webp',
      color: 'bg-[#3178c6]',
      lightColor: 'bg-[#c5def3]',
    },
    tailwind: {
      logo: 'assets/images/logos/tailwind_logo.webp',
      color: 'bg-[#38bdf8]',
      lightColor: 'bg-[#c6ecfc]',
    },
    primeng: {
      logo: 'assets/images/logos/primeng_logo.webp',
      color: 'bg-[#3f51b5]',
      lightColor: 'bg-[#c3c7f3]',
    },
    localstorage: {
      logo: 'assets/images/logos/storage_logo.webp',
      color: 'bg-yellow-600',
      lightColor: 'bg-yellow-200',
    },
    firebase: {
      logo: 'assets/images/technologies/firebase.svg',
      color: 'bg-[#ffca28]',
      lightColor: 'bg-[#fff2c1]',
    },
    javascript: {
      logo: 'assets/images/technologies/javascript.svg',
      color: 'bg-yellow-400',
      lightColor: 'bg-yellow-100',
    },
    html: {
      logo: 'assets/images/technologies/html.svg',
      color: 'bg-orange-500',
      lightColor: 'bg-orange-200',
    },
    css: {
      logo: 'assets/images/technologies/css.svg',
      color: 'bg-blue-500',
      lightColor: 'bg-blue-200',
    },
    node: {
      logo: 'assets/images/technologies/node.svg',
      color: 'bg-green-600',
      lightColor: 'bg-green-200',
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
