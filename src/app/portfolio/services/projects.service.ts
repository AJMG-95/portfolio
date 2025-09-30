import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import {
  Project,
  ProjectCategory,
  ProjectSize,
  projects,
} from '../../portfolio/data/projects.data';

// Filtro META requerido
export interface ProjectMetaFilter {
  category: ProjectCategory; // 'frontend' | 'backend'
  size: ProjectSize; // 'standard' | 'mini'
}

// Modo de coincidencia cuando se envían lenguaje y framework
export type MatchMode = 'any' | 'all';

// Filtros opcionales de tecnología.
// NOTA: según la category (frontend/backend) se usarán los campos correspondientes.
export interface ProjectTechFilter {
  // FRONT
  frontFrameworkIds?: number[] | number;
  frontLanguageIds?: number[] | number;

  // BACK
  backFrameworkIds?: number[] | number;
  backLanguageIds?: number[] | number;

  // 'any' -> basta uno (language o framework) si ambos se pasan
  // 'all' -> exige ambos (si ambos se pasan)
  match?: MatchMode; // default: 'any'
}

@Injectable({ providedIn: 'root' })
export class ProjectsService {
  /** 1) Lista de proyectos filtrados por category + size y, opcionalmente, por tech */
  getProjects(meta: ProjectMetaFilter, tech?: ProjectTechFilter): Observable<Project[]> {
    const list = projects.filter((p) => {
      // Meta obligatoria
      if (p.category !== meta.category) return false;
      if (p.size !== meta.size) return false;

      // Sin tech -> pasa
      if (!tech) return true;

      // Selecciona los ids a verificar según la categoría
      const { fwWanted, langWanted, match } = this.pickWantedIds(meta.category, tech);

      // Si no se pasan filtros de lenguaje/framework -> acepta
      if (fwWanted.length === 0 && langWanted.length === 0) return true;

      // Extrae ids del proyecto (según category)
      const projFwIds = this.getProjectFrameworkIdsByCategory(p, meta.category);
      const projLangIds = this.getProjectLanguageIdsByCategory(p, meta.category);

      const fwMatch = fwWanted.length > 0 ? fwWanted.some((id) => projFwIds.includes(id)) : false;
      const langMatch =
        langWanted.length > 0 ? langWanted.some((id) => projLangIds.includes(id)) : false;

      // Lógica de coincidencia
      const mode: MatchMode = match ?? 'any';
      if (mode === 'all') {
        // Si envió ambos, exige ambos; si envió solo uno, exige ese.
        if (fwWanted.length > 0 && langWanted.length > 0) return fwMatch && langMatch;
        if (fwWanted.length > 0) return fwMatch;
        if (langWanted.length > 0) return langMatch;
        return true;
      } else {
        // 'any'
        const checks: boolean[] = [];
        if (fwWanted.length > 0) checks.push(fwMatch);
        if (langWanted.length > 0) checks.push(langMatch);
        return checks.some(Boolean);
      }
    });

    return of([...list]); // clon para evitar mutaciones desde UI
  }

  /** 2) Obtener un proyecto por id */
  getProjectById(id: number): Observable<Project | undefined> {
    return of(projects.find((p) => p.id === id));
  }

  // ======================
  // Helpers privados
  // ======================

  private normalizeIds(ids?: number[] | number): number[] {
    if (ids === undefined) return [];
    return Array.isArray(ids) ? ids : [ids];
  }

  private pickWantedIds(
    category: ProjectCategory,
    tech: ProjectTechFilter
  ): {
    fwWanted: number[];
    langWanted: number[];
    match: MatchMode | undefined;
  } {
    if (category === 'frontend') {
      return {
        fwWanted: this.normalizeIds(tech.frontFrameworkIds),
        langWanted: this.normalizeIds(tech.frontLanguageIds),
        match: tech.match,
      };
    }
    // backend
    return {
      fwWanted: this.normalizeIds(tech.backFrameworkIds),
      langWanted: this.normalizeIds(tech.backLanguageIds),
      match: tech.match,
    };
  }

  private getProjectFrameworkIdsByCategory(p: Project, category: ProjectCategory): number[] {
    return category === 'frontend'
      ? p.techRefs.frontFrameworkIds ?? []
      : p.techRefs.backFrameworkIds ?? [];
  }

  private getProjectLanguageIdsByCategory(p: Project, category: ProjectCategory): number[] {
    return category === 'frontend'
      ? p.techRefs.frontLanguageIds ?? []
      : p.techRefs.backLanguageIds ?? [];
  }
}
