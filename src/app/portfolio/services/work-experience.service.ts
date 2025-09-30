import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';

import {
  WorkExperience,
  workExperiences,
} from '../../portfolio/data/work-experience.data';

export interface WorkFilters {
  /** p.ej. 'companies.controlnet' */
  companyKey?: string;
  /** p.ej. 'work.titles.frontend_developer' */
  roleTitleKey?: string;
}

@Injectable({ providedIn: 'root' })
export class WorkExperienceService {

  /**
   * Lista de experiencias (ordenadas: más recientes primero).
   * Filtros opcionales por empresa (companyKey) y/o rol (titleKey).
   */
  getExperiences(filters?: WorkFilters): Observable<WorkExperience[]> {
    const sorted = [...workExperiences].sort((a, b) => {
      // Orden por start DESC y luego end DESC (string ISO-like)
      const aStart = a.dates.start ?? '';
      const bStart = b.dates.start ?? '';
      if (aStart !== bStart) return bStart.localeCompare(aStart);

      const aEnd = a.dates.end ?? '';
      const bEnd = b.dates.end ?? '';
      return (bEnd || '').localeCompare(aEnd || '');
    });

    if (!filters) return of(sorted);

    const { companyKey, roleTitleKey } = filters;
    const filtered = sorted.filter(exp => {
      const okCompany = companyKey ? exp.companyKey === companyKey : true;
      const okRole = roleTitleKey ? exp.titleKey === roleTitleKey : true;
      return okCompany && okRole;
    });

    return of(filtered);
  }

  /** Una experiencia por id */
  getExperienceById(id: number): Observable<WorkExperience | undefined> {
    return of(workExperiences.find(w => w.id === id));
  }

  /** Las claves i18n de responsabilidades de una experiencia concreta */
  getResponsibilityKeysById(id: number): Observable<string[]> {
    return this.getExperienceById(id).pipe(
      map(exp => exp?.responsibilityKeys ?? [])
    );
  }
}
