import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { LanguageService } from '@core/services/language.service';


@Component({
  selector: 'toggle-lang',
  standalone: true,
  templateUrl: './toggle-lang.component.html',
  styleUrl: './toggle-lang.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ToggleLangComponent {
  #lang = inject(LanguageService);
  isEnglish = computed(() => this.#lang.lang() === 'en');
  onToggle() { this.#lang.toggle(); }
}
