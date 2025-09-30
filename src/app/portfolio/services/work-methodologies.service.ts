import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

import {
  WorkMethodology,
  workMethodologies,
} from '../../portfolio/data/work-methodologies.data';

export interface MethodologyFilters {
  /** Filtra por tags (ej. ['agile', 'sprints']) */
  tags?: string[];
  /** Coincidencia de tags: 'any' (por defecto) o 'all' */
  match?: 'any' | 'all';
}

@Injectable({ providedIn: 'root' })
export class WorkMethodologiesService {
  /** Todas las metodologías (con filtro opcional por tags) */
  getMethodologies(filters?: MethodologyFilters): Observable<WorkMethodology[]> {
    if (!filters?.tags?.length) return of([...workMethodologies]);

    const { tags, match = 'any' } = filters;
    const res = workMethodologies.filter(m => {
      if (!m.tags?.length) return false;
      return match === 'all'
        ? tags.every(t => m.tags!.includes(t))
        : tags.some(t => m.tags!.includes(t));
    });
    return of(res);
  }

  /** Una metodología por id */
  getMethodologyById(id: number): Observable<WorkMethodology | undefined> {
    return of(workMethodologies.find(m => m.id === id));
  }
}
