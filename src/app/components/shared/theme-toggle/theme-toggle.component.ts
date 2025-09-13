import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslocoModule } from '@jsverse/transloco';

@Component({
  selector: 'theme-toggle',
  standalone: true,
  templateUrl: './theme-toggle.component.html',
  imports: [CommonModule, TranslocoModule],
})
export class ThemeToggle implements OnInit {
  isDark = false;

  ngOnInit(): void {
    const stored = localStorage.getItem('theme');
    if (stored === 'dark') {
      this.enableDark();
    } else if (stored === 'light') {
      this.disableDark();
    } else {
      if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
        this.enableDark();
      }
    }
  }

  toggleTheme(): void {
    this.isDark ? this.disableDark() : this.enableDark();
  }

  enableDark() {
    document.documentElement.classList.add('dark');
    localStorage.setItem('theme', 'dark');
    this.isDark = true;
  }

  disableDark() {
    document.documentElement.classList.remove('dark');
    localStorage.setItem('theme', 'light');
    this.isDark = false;
  }
}
