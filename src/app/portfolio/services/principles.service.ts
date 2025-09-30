import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Principle, principles } from '../../portfolio/data/principles.data';

@Injectable({ providedIn: 'root' })
export class PrinciplesService {
  /** Devuelve todos los principios (clonado para evitar mutaciones en UI) */
  getPrinciples(): Observable<Principle[]> {
    return of([...principles]);
  }

  /** Devuelve un principio por id */
  getPrincipleById(id: number): Observable<Principle | undefined> {
    return of(principles.find(p => p.id === id));
  }

  /** (Opcional) Filtra por tag, p. ej. 'a11y', 'architecture', 'clean-code' */
  getPrinciplesByTag(tag: string): Observable<Principle[]> {
    return of(principles.filter(p => p.tags?.includes(tag)));
  }
}
