import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

import {
  type CertInstitution,
  type Certification,
  certInstitutions,
  // OJO: este array contiene TODAS las certificaciones (IT/LNG/Other)
  techCertificationsFrontend as certifications,
} from '../../portfolio/data/certifications.data';

@Injectable({ providedIn: 'root' })
export class CertificationsService {
  // ==========================================
  // Índices en memoria (O(1) lookups)
  // ==========================================
  private readonly instById = new Map<number, CertInstitution>(
    certInstitutions.map(i => [i.id, i])
  );

  private readonly certById = new Map<number, Certification>(
    certifications.map(c => [c.id, c])
  );

  // ==========================================
  // Métodos SÍNCRONOS (recomendados)
  // ==========================================

  /** Todas las certificaciones (IT + LNG + Other). */
  getAll(): Certification[] {
    return certifications;
  }

  /** Todas las certificaciones de tipo IT. */
  getAllIT(): Certification[] {
    return certifications.filter(c => c.type === 'it');
  }

  /** Todas las certificaciones de tipo Language (LNG). */
  getAllLanguages(): Certification[] {
    return certifications.filter(c => c.type === 'lng');
  }

  /** Todas las certificaciones de tipo Other. */
  getAllOther(): Certification[] {
    return certifications.filter(c => c.type === 'other');
  }

  /** Certificaciones IT con track 'frontend'. */
  getITFrontend(): Certification[] {
    return certifications.filter(c => c.type === 'it' && c.track === 'frontend');
  }

  /** Certificaciones IT con track 'movile'. */
  getITMovile(): Certification[] {
    return certifications.filter(c => c.type === 'it' && c.track === 'mobile');
  }

  /** Certificaciones IT con track 'backend'. */
  getITBackend(): Certification[] {
    return certifications.filter(c => c.type === 'it' && c.track === 'backend');
  }

  /** Todas las instituciones. */
  getInstitutions(): CertInstitution[] {
    return certInstitutions;
  }

  /** Institución por id. */
  getInstitutionById(id: number): CertInstitution | undefined {
    return this.instById.get(id);
  }

  /** Certificación por id. */
  getById(id: number): Certification | undefined {
    return this.certById.get(id);
  }

  // ==========================================
  // Wrappers con Observable (compatibilidad)
  // ==========================================

  getAll$(): Observable<Certification[]> {
    return of(this.getAll());
  }
  getAllIT$(): Observable<Certification[]> {
    return of(this.getAllIT());
  }
  getAllLanguages$(): Observable<Certification[]> {
    return of(this.getAllLanguages());
  }
  getAllOther$(): Observable<Certification[]> {
    return of(this.getAllOther());
  }
  getITFrontend$(): Observable<Certification[]> {
    return of(this.getITFrontend());
  }
  getITBackend$(): Observable<Certification[]> {
    return of(this.getITBackend());
  }
  getInstitutions$(): Observable<CertInstitution[]> {
    return of(this.getInstitutions());
  }
  getInstitutionById$(id: number): Observable<CertInstitution | undefined> {
    return of(this.getInstitutionById(id));
  }
  getById$(id: number): Observable<Certification | undefined> {
    return of(this.getById(id));
  }
}
