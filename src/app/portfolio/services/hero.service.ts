// src/app/portfolio/services/hero.service.ts
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

// Importa tipos y datos
import {
  Hero,
  HeroProfile,
  SocialLink,
  ContactMethod,
} from '@data/hero.data';

type HeroCTA = NonNullable<HeroProfile['ctas']>[number];
type HeroQuickStat = NonNullable<HeroProfile['quickStats']>[number];

@Injectable({ providedIn: 'root' })
export class HeroService {

  /** Devuelve el perfil completo */
  getHero(): Observable<HeroProfile> {
    return of(Hero);
  }

  /** Enlaces sociales */
  getSocialLinks(): Observable<SocialLink[]> {
    return of(Hero.social ?? []);
  }

  /** Métodos de contacto (útiles para menús rápidos/aria) */
  getContactMethods(): Observable<ContactMethod[]> {
    return of(Hero.contactMethods ?? []);
  }

  /** CTAs configurados (contacto, descargar CV, etc.) */
  getCTAs(): Observable<HeroCTA[]> {
    return of(Hero.ctas ?? []);
  }

  /** Métricas rápidas (labels/value via i18n keys) */
  getQuickStats(): Observable<HeroQuickStat[]> {
    return of(Hero.quickStats ?? []);
  }
}
