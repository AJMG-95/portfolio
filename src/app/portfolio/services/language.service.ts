import { Injectable, signal, computed, effect, inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { TranslocoService } from '@jsverse/transloco';

export type Lang = 'es' | 'en';
const STORAGE_KEY = 'lang';
const RTL_LANGS: ReadonlyArray<string> = []; // ['ar','he',...]

@Injectable({ providedIn: 'root' })
export class LanguageService {
  readonly #platformId = inject<object>(PLATFORM_ID);
  readonly #transloco = inject(TranslocoService);

  /** Idiomas soportados (tuple readonly) */
  readonly availableLangs = ['es', 'en'] as const;

  /** Estado principal */
  readonly lang = signal<Lang>(this.#getInitial());

  /** Derivados */
  readonly isEnglish = computed(() => this.lang() === 'en');

  constructor() {
    // Aplica efectos colaterales cuando cambie el idioma
    effect(() => {
      const l = this.lang();

      // 1) Transloco
      this.#transloco.setActiveLang(l);

      if (this.#isBrowser()) {
        // 2) Atributos del documento
        document.documentElement.setAttribute('lang', l);
        document.documentElement.setAttribute('dir', RTL_LANGS.includes(l) ? 'rtl' : 'ltr');

        // 3) Persistencia
        try {
          localStorage.setItem(STORAGE_KEY, l);
        } catch { /* noop */ }
      }
    });

    // 🔁 Sincroniza cambios de idioma entre pestañas
    if (this.#isBrowser()) {
      window.addEventListener('storage', (e) => {
        if (e.key === STORAGE_KEY && (e.newValue === 'es' || e.newValue === 'en')) {
          if (this.lang() !== e.newValue) this.lang.set(e.newValue as Lang);
        }
      });
    }
  }

  /** API pública */
  set(lang: Lang) {
    if (!this.availableLangs.includes(lang)) return; // seguridad
    if (this.lang() !== lang) this.lang.set(lang);
  }

  toggle() {
    this.set(this.lang() === 'es' ? 'en' : 'es');
  }

  /** Helpers */
  #getInitial(): Lang {
    // En SSR: por defecto ES
    if (!this.#isBrowser()) return 'es';

    // 1) Preferencia guardada tiene prioridad
    try {
      const saved = localStorage.getItem(STORAGE_KEY) as Lang | null;
      if (saved === 'es' || saved === 'en') return saved;
    } catch {
      // Si localStorage falla, seguimos con la detección
    }

    // 2) Detección por navegador: sólo forzamos EN si empieza por 'en'.
    //    En cualquier otro caso, por defecto ES.
    const nav = navigator.language?.toLowerCase() ?? '';
    return nav.startsWith('en') ? 'en' : 'es';
  }

  #isBrowser() {
    return isPlatformBrowser(this.#platformId);
  }
}
