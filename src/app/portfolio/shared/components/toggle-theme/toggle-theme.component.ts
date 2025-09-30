import { isPlatformBrowser } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, effect, inject, PLATFORM_ID, signal } from '@angular/core';

type Theme = 'light' | 'dark';
const STORAGE_KEY = 'theme';

@Component({
  selector: 'toggle-theme',
  standalone: true,
  templateUrl: './toggle-theme.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ToggleThemeComponent {
  private readonly platformId = inject(PLATFORM_ID);
  private readonly isBrowser = isPlatformBrowser(this.platformId);

  readonly theme = signal<Theme>(this.getInitialTheme());
  readonly isDark = computed(() => this.theme() === 'dark');

  constructor() {
    effect(() => {
      if (!this.isBrowser) return;
      const t = this.theme();
      document.documentElement.setAttribute('data-theme', t);
      try { localStorage.setItem(STORAGE_KEY, t); } catch { }
    });

    if (this.isBrowser && !localStorage.getItem(STORAGE_KEY)) {
      const mq = window.matchMedia('(prefers-color-scheme: dark)');
      const handler = (e: MediaQueryListEvent) => this.theme.set(e.matches ? 'dark' : 'light');
      try { mq.addEventListener('change', handler); } catch { mq.addListener(handler); }
    }
  }

  toggleTheme() { this.theme.update(t => (t === 'light' ? 'dark' : 'light')); }

  private getInitialTheme(): Theme {
    if (!this.isBrowser) return 'light';
    try {
      const saved = localStorage.getItem(STORAGE_KEY) as Theme | null;
      if (saved === 'light' || saved === 'dark') return saved;
    } catch { }
    return window.matchMedia?.('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }
}
