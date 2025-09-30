// src/app/portfolio/services/technologies.service.ts
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

import {
  // Tipos
  type Tech, type Language, type Framework, type Database,
  type TrackLanguage, type TrackDatabase, type TrackUI, type UITechnology,
  // Datos
  languages, frameworks, databases,
  uiLibraries, baasPlatforms, baasServices,
  cloudPlatforms, versionControlTools,
  projectManagementTools,
  clientStorage,
} from '../../portfolio/data/technologies.data';

@Injectable({ providedIn: 'root' })
export class TechnologiesService {
  // ===== Índices por id (por categoría) =====
  private readonly langById = new Map<number, Language>(languages.map(l => [l.id, l]));
  private readonly fwById = new Map<number, Framework>(frameworks.map(f => [f.id, f]));
  private readonly dbById = new Map<number, Database>(databases.map(d => [d.id, d]));

  // ===== Índices por track =====
  private readonly langsByTrack = this.indexByTrack(languages, l => l.track);
  private readonly fwsByTrack = this.indexByTrack(frameworks, f => f.track);
  private readonly dbsByTrack = this.indexByTrack(databases, d => d.track);

  // ===== Relaciones framework ↔ language (autocompletadas) =====
  private readonly fwToLangs = new Map<number, Language[]>();
  private readonly langToFws = new Map<number, Framework[]>();

  constructor() {
    // 1) A partir de frameworks.languageIds
    for (const f of frameworks) {
      const langs = (f.languageIds ?? [])
        .map(id => this.langById.get(id))
        .filter(Boolean) as Language[];
      this.fwToLangs.set(f.id, langs);
      // Completa el lado inverso
      for (const l of langs) {
        if (!l.frameworkIds) l.frameworkIds = [];
        if (!l.frameworkIds.includes(f.id)) l.frameworkIds.push(f.id);
      }
    }
    // 2) A partir de languages.frameworkIds
    for (const l of languages) {
      const fws = (l.frameworkIds ?? [])
        .map(id => this.fwById.get(id))
        .filter(Boolean) as Framework[];
      this.langToFws.set(l.id, fws);
      // Completa el lado inverso
      for (const f of fws) {
        if (!f.languageIds) f.languageIds = [];
        if (!f.languageIds.includes(l.id)) f.languageIds.push(l.id);
      }
    }
    // Asegura arrays vacíos
    for (const f of frameworks) if (!this.fwToLangs.has(f.id)) this.fwToLangs.set(f.id, []);
    for (const l of languages) if (!this.langToFws.has(l.id)) this.langToFws.set(l.id, []);
  }

  // =======================
  // Getters SÍNCRONOS base
  // =======================
  getLanguages(): Language[] { return languages; }
  getFrameworks(): Framework[] { return frameworks; }
  getDatabases(): Database[] { return databases; }

  getUiLibrariesSync(): UITechnology[] { return uiLibraries; }

  /** Compatibilidad con AboutPage: ahora son los UI con track 'design-systems' */
  getDesignSystemsSync(): UITechnology[] {
    return uiLibraries.filter(u => u.track === 'design-systems');
  }

  /** Filtro genérico por track de UI */
  getUiByTrackSync(track: TrackUI): UITechnology[] {
    return uiLibraries.filter(u => u.track === track);
  }

  getProjectManagementToolsSync(): Tech[] { return projectManagementTools; }
  getVersionControlToolsSync(): Tech[] { return versionControlTools; }
  getBaaSPlatformsSync(): Tech[] { return baasPlatforms; }
  getBaaSServicesSync(): Tech[] { return baasServices; }
  getCloudPlatformsSync(): Tech[] { return cloudPlatforms; }
  getClientStorageSync(): Tech[] { return clientStorage; }

  getLanguageById(id: number): Language | undefined { return this.langById.get(id); }
  getFrameworkById(id: number): Framework | undefined { return this.fwById.get(id); }
  getDatabaseById(id: number): Database | undefined { return this.dbById.get(id); }

  getLanguagesByTrack(track: TrackLanguage): Language[] {
    return this.langsByTrack.get(track) ?? [];
  }
  getFrameworksByTrack(track: TrackLanguage): Framework[] {
    return this.fwsByTrack.get(track) ?? [];
  }
  getDatabasesByTrack(track: TrackDatabase): Database[] {
    return this.dbsByTrack.get(track) ?? [];
  }

  getLanguagesForFramework(frameworkId: number): Language[] {
    return this.fwToLangs.get(frameworkId) ?? [];
  }
  getFrameworksForLanguage(languageId: number): Framework[] {
    return this.langToFws.get(languageId) ?? [];
  }

  search(term: string): {
    languages: Language[];
    frameworks: Framework[];
    databases: Database[];
  } {
    const q = term.trim().toLowerCase();
    const match = <T extends Tech>(arr: T[]) =>
      q ? arr.filter(t =>
        t.name.toLowerCase().includes(q) ||
        (t.org?.toLowerCase().includes(q) ?? false)
      ) : [...arr];

    return {
      languages: match(languages),
      frameworks: match(frameworks),
      databases: match(databases),
    };
  }

  // =======================
  // Wrappers Observable
  // =======================
  // ---- Compat exacta con tu AboutPage ----
  getFrontLanguages(): Observable<Language[]> {
    return of(this.getLanguagesByTrack('frontend'));
  }
  getBackLanguages(): Observable<Language[]> {
    return of(this.getLanguagesByTrack('backend'));
  }
  getFrontFrameworks(): Observable<Framework[]> {
    return of(this.getFrameworksByTrack('frontend'));
  }
  getBackFrameworks(): Observable<Framework[]> {
    return of(this.getFrameworksByTrack('backend'));
  }

  // ---- Resto de getters usados en AboutPage ----
  getUiLibraries(): Observable<UITechnology[]> { return of(this.getUiLibrariesSync()); }
  getDesignSystems(): Observable<UITechnology[]> { return of(this.getDesignSystemsSync()); }

  // (Opcional útil) Obtener UI por track concreto
  getUiByTrack(track: TrackUI): Observable<UITechnology[]> {
    return of(this.getUiByTrackSync(track));
  }

  getProjectManagementTools(): Observable<Tech[]> { return of(this.getProjectManagementToolsSync()); }
  getVersionControlTools(): Observable<Tech[]> { return of(this.getVersionControlToolsSync()); }

  // === Otros wrappers por si los necesitas ===
  getLanguages$(): Observable<Language[]> { return of(this.getLanguages()); }
  getFrameworks$(): Observable<Framework[]> { return of(this.getFrameworks()); }
  getDatabases$(): Observable<Database[]> { return of(this.getDatabases()); }

  getLanguagesByTrack$(track: TrackLanguage): Observable<Language[]> {
    return of(this.getLanguagesByTrack(track));
  }
  getFrameworksByTrack$(track: TrackLanguage): Observable<Framework[]> {
    return of(this.getFrameworksByTrack(track));
  }
  getDatabasesByTrack$(track: TrackDatabase): Observable<Database[]> {
    return of(this.getDatabasesByTrack(track));
  }

  getLanguagesForFramework$(frameworkId: number): Observable<Language[]> {
    return of(this.getLanguagesForFramework(frameworkId));
  }
  getFrameworksForLanguage$(languageId: number): Observable<Framework[]> {
    return of(this.getFrameworksForLanguage(languageId));
  }

  // =======================
  // Helpers
  // =======================
  private indexByTrack<T, TR extends string>(arr: T[], pick: (x: T) => TR | undefined) {
    const map = new Map<TR, T[]>();
    for (const item of arr) {
      const t = pick(item);
      if (!t) continue;
      const list = map.get(t) ?? [];
      list.push(item);
      map.set(t, list);
    }
    return map;
  }
}
