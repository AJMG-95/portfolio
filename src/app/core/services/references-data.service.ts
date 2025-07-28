// src/app/core/services/references.service.ts

import { Injectable } from '@angular/core';

export interface ReferenceItem {
  id: number;
  name: string;
  linkedin: string;
}

export interface RecommendationLetter {
  url: string;
}

@Injectable({ providedIn: 'root' })
export class ReferencesService {
  private references: ReferenceItem[] = [
    {
      id: 1,
      name: 'Francisco Romero-Haupold',
      linkedin: 'https://linkedin.com/in/francisco-romero-haupold-b63740278/',
    },
    {
      id: 2,
      name: 'Ricardo Pina',
      linkedin: 'https://www.linkedin.com/in/rpinac/',
    },
  ];

  private recommendationLetter: RecommendationLetter = {
    url: 'https://drive.google.com/file/d/1gZKFeNZZyPN-d-fDjA8DGZZuv0tqF76P/view',
  };

  getReferences(): ReferenceItem[] {
    return this.references;
  }

  getLetter(): RecommendationLetter {
    return this.recommendationLetter;
  }
}
