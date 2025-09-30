import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { LanguageService, Lang } from '@service/language.service';

@Component({
  selector: 'lang-swicher',
  standalone: true,
  templateUrl: './lang-swicher.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LangSwicherComponent {
  #lang = inject(LanguageService);

  // Estado reactivo del idioma activo
  activeLang = computed<Lang>(() => (this.#lang.isEnglish() ? 'en' : 'es'));

  setLang(lang: Lang) {
    if (lang !== this.activeLang()) this.#lang.set(lang);
  }

  // Accesibilidad con teclado
  onKeydown(e: KeyboardEvent) {
    if (e.key === 'ArrowLeft' || e.key === 'ArrowRight') {
      this.setLang(this.activeLang() === 'es' ? 'en' : 'es');
      e.preventDefault();
    }
  }
}
