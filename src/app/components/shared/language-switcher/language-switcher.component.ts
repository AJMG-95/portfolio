import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslocoService } from '@jsverse/transloco';

@Component({
  selector: 'language-switcher',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './language-switcher.component.html',
  styleUrls: ['./language-switcher.component.css'],
})
export class LanguageSwitcher {
  activeLang: 'es' | 'en';

  constructor(private translocoService: TranslocoService) {
    this.activeLang = (this.translocoService.getActiveLang() as 'es' | 'en') ?? 'es';
  }

  setLang(lang: 'es' | 'en') {
    if (lang !== this.activeLang) {
      this.translocoService.setActiveLang(lang);
      this.activeLang = lang;
    }
  }
}
