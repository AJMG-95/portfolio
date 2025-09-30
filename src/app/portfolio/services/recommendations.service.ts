import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

import {
  ReferenceItem,
  RecommendationLetter,
  references,
  recommendationLetters,
} from '../../portfolio/data/recommendations.data';

export interface RecommendationsPayload {
  references: ReferenceItem[];
  letters: RecommendationLetter[];
}

@Injectable({ providedIn: 'root' })
export class RecommendationsService {
  /** Lista completa de referencias (clonada para evitar mutaciones desde la UI) */
  getReferences(): Observable<ReferenceItem[]> {
    return of([...references]);
  }

  /** Una referencia por id */
  getReferenceById(id: number): Observable<ReferenceItem | undefined> {
    return of(references.find(r => r.id === id));
  }

  /** Filtrar referencias por companyKey (ej: 'companies.controlnet') */
  getReferencesByCompanyKey(companyKey: string): Observable<ReferenceItem[]> {
    return of(references.filter(r => r.companyKey === companyKey));
  }

  /** Lista completa de cartas de recomendación */
  getRecommendationLetters(): Observable<RecommendationLetter[]> {
    return of([...recommendationLetters]);
  }

  /** Paquete con todo: referencias + cartas (una sola suscripción) */
  getRecommendations(): Observable<RecommendationsPayload> {
    return of({
      references: [...references],
      letters: [...recommendationLetters],
    });
  }
}
