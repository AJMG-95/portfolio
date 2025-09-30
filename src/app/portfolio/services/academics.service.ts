// src/app/portfolio/services/academics.service.ts
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';

// Modelos y datos estáticos
import {
  Institution,
  Study,
  institutions,
  studies,
} from '../../portfolio/data/academics.data';

export interface StudyVM {
  study: Study;
  institution: Institution | undefined;
}

export interface AcademicsPayload {
  studies: Study[];                                   // lista de estudios (ordenada)
  institutionsById: Record<number, Institution>;      // mapa id -> institución
  studyVMs: StudyVM[];                                // estudio + institución
}

@Injectable({ providedIn: 'root' })
export class AcademicsService {

  // ===== Helpers internos =====
  private sortByDatesDesc(list: Study[]): Study[] {
    return [...list].sort((a, b) => {
      if (a.dates.end !== b.dates.end) return b.dates.end.localeCompare(a.dates.end);
      return b.dates.start.localeCompare(a.dates.start);
    });
  }

  // ===== Métodos  =====
  getStudies(): Observable<Study[]> {
    return of(this.sortByDatesDesc(studies));
  }

  getInstitutionById(id: number): Observable<Institution | undefined> {
    return of(institutions.find(i => i.id === id));
  }

  // ===== View Models (estudio + institución) =====
  getStudyVMs(): Observable<StudyVM[]> {
    return this.getStudies().pipe(
      map(list =>
        list.map(study => ({
          study,
          institution: institutions.find(i => i.id === study.institutionId),
        }))
      )
    );
  }

  // ===== Todo en una sola llamada =====
  getAcademics(): Observable<AcademicsPayload> {
    const sortedStudies = this.sortByDatesDesc(studies);

    const institutionsById = institutions.reduce<Record<number, Institution>>((acc, inst) => {
      acc[inst.id] = inst;
      return acc;
    }, {});

    const studyVMs: StudyVM[] = sortedStudies.map(study => ({
      study,
      institution: institutionsById[study.institutionId],
    }));

    return of({ studies: sortedStudies, institutionsById, studyVMs });
  }
}
