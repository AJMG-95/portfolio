// src/app/portfolio/services/programming-principles.service.ts
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import {
  programmingPrinciples,
  type ProgrammingPrinciple,
  type PrincipleCategory,
  type PrincipleScope,
} from '../../portfolio/data/programming-principles.data';

@Injectable({ providedIn: 'root' })
export class ProgrammingPrinciplesService {
  // Índices rápidos
  private readonly byId = new Map<number, ProgrammingPrinciple>(
    programmingPrinciples.map(p => [p.id, p])
  );

  private readonly byCategory = this.indexBy<PrincipleCategory>(
    programmingPrinciples,
    p => p.category
  );

  constructor() { }

  // ===== Getters síncronos =====
  getAllSync(): ProgrammingPrinciple[] {
    // Devuelve copia superficial para evitar mutaciones accidentales
    return [...programmingPrinciples];
  }

  getByIdSync(id: number): ProgrammingPrinciple | undefined {
    return this.byId.get(id);
  }

  getByCategorySync(category: PrincipleCategory): ProgrammingPrinciple[] {
    return [...(this.byCategory.get(category) ?? [])];
  }

  getByScopeSync(scope: PrincipleScope): ProgrammingPrinciple[] {
    return programmingPrinciples.filter(p => p.appliesTo.includes(scope));
  }

  searchSync(term: string): ProgrammingPrinciple[] {
    const q = term.trim().toLowerCase();
    if (!q) return this.getAllSync();

    // Busca por nameKey y descriptionKey (claves i18n)
    return programmingPrinciples.filter(p =>
      p.nameKey.toLowerCase().includes(q) ||
      (p.descriptionKey?.toLowerCase().includes(q) ?? false)
    );
  }

  // ===== Wrappers Observable =====
  getAll(): Observable<ProgrammingPrinciple[]> {
    return of(this.getAllSync());
  }

  getById(id: number): Observable<ProgrammingPrinciple | undefined> {
    return of(this.getByIdSync(id));
  }

  getByCategory(category: PrincipleCategory): Observable<ProgrammingPrinciple[]> {
    return of(this.getByCategorySync(category));
  }

  getByScope(scope: PrincipleScope): Observable<ProgrammingPrinciple[]> {
    return of(this.getByScopeSync(scope));
  }

  search(term: string): Observable<ProgrammingPrinciple[]> {
    return of(this.searchSync(term));
  }

  // ===== Helper genérico =====
  private indexBy<K extends string>(
    arr: ProgrammingPrinciple[],
    pick: (x: ProgrammingPrinciple) => K
  ): Map<K, ProgrammingPrinciple[]> {
    const map = new Map<K, ProgrammingPrinciple[]>();
    for (const item of arr) {
      const key = pick(item);
      const list = map.get(key) ?? [];
      list.push(item);
      map.set(key, list);
    }
    return map;
  }
}
