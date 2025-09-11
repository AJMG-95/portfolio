import { ChangeDetectionStrategy, Component, computed } from '@angular/core';
import { ThemeService } from '../../../core/theme.service';

@Component({
  selector: 'toggle-theme',
  imports: [],
  templateUrl: './toggle-theme.component.html',
  styleUrl: './toggle-theme.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ToggleThemeComponent {
  isDark = computed(() => this.theme.theme() === 'dark');
  constructor(private theme: ThemeService) { }
  onToggle() { this.theme.toggle(); }
 }
