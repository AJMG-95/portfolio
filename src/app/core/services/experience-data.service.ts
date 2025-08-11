//src\app\core\services\experience-data.service.ts

import { Injectable } from '@angular/core';

export interface ExperienceData {
  id: number;
  company: string;
  companyUrl: string;
  companyLogo: string;
  dates: string; // texto estático (no traducido)
  technologyIds: number[];
}

@Injectable({ providedIn: 'root' })
export class ExperienceService {
  private experiences: ExperienceData[] = [
    {
      id: 1,
      company: 'Controlnet S.L.',
      companyUrl: 'https://controlnet.es/',
      companyLogo: 'assets/images/companies-logo/controlnetspain_logo_3.webp',
      dates: 'Marzo 2024 - Julio 2025',
      technologyIds: [15, 1, 14, 3, 17], // Flutter, Angular, React, Tailwind, Bootstrap
    },
    {
      id: 2,
      company: 'Controlnet S.L.',
      companyUrl: 'https://controlnet.es/',
      companyLogo: 'assets/images/companies-logo/controlnetspain_logo_3.webp',
      dates: 'Octubre 2023 - Enero 2024',
      technologyIds: [1, 17], // Angular, Bootstrap
    },
  ];

  getAll(): ExperienceData[] {
    return this.experiences;
  }

  getById(id: number): ExperienceData | undefined {
    return this.experiences.find((exp) => exp.id === id);
  }
}
