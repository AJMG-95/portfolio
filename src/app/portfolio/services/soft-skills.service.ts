// soft-skills.service.ts
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { SoftSkill, softSkills } from '@data/soft-skills.data';

type Tag = 'team' | 'comms' | 'ownership' | 'growth' | 'ux';

const CATEGORY_ICON: Record<Tag, string> = {
  team: 'assets/images/icons/categories/team.webp',
  comms: 'assets/images/icons/categories/comms.webp',
  ownership: 'assets/images/icons/categories/ownership.webp',
  growth: 'assets/images/icons/categories/growth.webp',
  ux: 'assets/images/icons/categories/ux.webp',
};

const CATEGORY_COLOR: Record<Tag, { color: string; lightColor: string }> = {
  team: { color: 'bg-emerald-600 dark:bg-emerald-300', lightColor: 'bg-emerald-200 dark:bg-emerald-100' },
  comms: { color: 'bg-blue-600 dark:bg-blue-300', lightColor: 'bg-blue-200 dark:bg-blue-100' },
  ownership: { color: 'bg-orange-600 dark:bg-orange-300', lightColor: 'bg-orange-200 dark:bg-orange-100' },
  growth: { color: 'bg-cyan-600 dark:bg-cyan-300', lightColor: 'bg-cyan-200 dark:bg-cyan-100' },
  ux: { color: 'bg-rose-600 dark:bg-rose-300', lightColor: 'bg-rose-200 dark:bg-rose-100' },
};

export interface SoftSkillFilter {
  tags?: string[];
  match?: 'any' | 'all';
  orderByKey?: boolean;
  desc?: boolean;
}

@Injectable({ providedIn: 'root' })
export class SoftSkillsService {
  /** Todas sin decorar (tal cual el .data) */
  getAll(): Observable<SoftSkill[]> {
    return of([...softSkills]);
  }

  /** Todas decoradas con icono/colores por categoría si faltan */
  getAllBranded(): Observable<SoftSkill[]> {
    return this.getAll().pipe(map(list => list.map(s => this.applyCategoryBrand(s))));
  }

  getById(id: number): Observable<SoftSkill | undefined> {
    return of(softSkills.find(s => s.id === id));
  }

  filter(params: SoftSkillFilter = {}): Observable<SoftSkill[]> {
    const { tags, match = 'any', orderByKey = false, desc = false } = params;
    let list = [...softSkills];

    if (tags?.length) {
      list = list.filter(s => this.matchesTags(s, tags, match));
    }
    if (orderByKey) list.sort((a, b) => a.key.localeCompare(b.key));
    if (desc) list.reverse();

    // 👉 devuelve decoradas
    return of(list.map(s => this.applyCategoryBrand(s)));
  }

  groupByTag(): Observable<Record<string, SoftSkill[]>> {
    const mapObj: Record<string, SoftSkill[]> = {};
    for (const s of softSkills) {
      if (!s.tags?.length) continue;
      for (const t of s.tags) {
        (mapObj[t] ??= []).push(this.applyCategoryBrand(s));
      }
    }
    return of(mapObj);
  }

  // -------- LÓGICA: aplicar branding por categoría --------
  private applyCategoryBrand(s: SoftSkill): SoftSkill {
    const tag = (s.tags?.[0] as Tag | undefined); // prioriza el primer tag
    const catIcon = tag ? CATEGORY_ICON[tag] : undefined;
    const catColors = tag ? CATEGORY_COLOR[tag] : undefined;

    return {
      ...s,
      icon: s.icon ?? catIcon,
      color: s.color ?? catColors?.color,
      lightColor: s.lightColor ?? catColors?.lightColor,
    };
  }

  // -------- helpers --------
  private matchesTags(skill: SoftSkill, tags: string[], match: 'any' | 'all'): boolean {
    const skillTags = skill.tags ?? [];
    if (!skillTags.length) return false;
    return match === 'all'
      ? tags.every(t => skillTags.includes(t))
      : tags.some(t => skillTags.includes(t));
  }
}
