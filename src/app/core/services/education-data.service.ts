// src\app\core\services\education - data.service.ts

import { Injectable } from '@angular/core';

export interface EducationData {
  id: number;
  institutionUrl: string;
  image: string;
  dates: string; // Solo años (ej. "2020 - 2022")
}

@Injectable({ providedIn: 'root' })
export class EducationService {
  private educationData: EducationData[] = [
    {
      id: 1,
      institutionUrl: 'https://ccmaryambientales.uca.es/grado-en-ciencias-ambientales/',
      image: 'assets/images/companies-logo/logo_uca_facutad_ccma_3.webp',
      dates: '2020 - 2022',
    },
    {
      id: 2,
      institutionUrl: 'https://iesdonana.org/oferta-educativa/ciclos-formativos-de-grado-superior/desarrollo-de-aplicaciones-web/',
      image: 'assets/images/companies-logo/logo_IESDonana_2.webp',
      dates: '2021 - 2024',
    },
    {
      id: 3,
      institutionUrl: 'https://ccmaryambientales.uca.es/grado-en-ciencias-ambientales/',
      image: 'assets/images/companies-logo/logo_uca_facutad_ccma_3.webp',
      dates: '2014 - 2019',
    },
  ];

  getAll(): EducationData[] {
    return this.educationData;
  }

  getById(id: number): EducationData | undefined {
    return this.educationData.find(e => e.id === id);
  }
}
