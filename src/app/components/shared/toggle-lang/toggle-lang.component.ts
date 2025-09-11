import { ChangeDetectionStrategy, Component, computed } from '@angular/core';
import { LanguageService } from '../../../core/services/language.service';

@Component({
  selector: 'toggle-lang',
  standalone: true,
  templateUrl: './toggle-lang.component.html',
  styleUrl: './toggle-lang.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ToggleLangComponent {
  constructor(private lang: LanguageService) { }
  isEnglish = computed(() => this.lang.lang() === 'en');
  onToggle() { this.lang.toggle(); }
}
