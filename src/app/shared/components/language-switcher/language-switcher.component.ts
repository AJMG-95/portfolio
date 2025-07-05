import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslocoService } from '@jsverse/transloco';

@Component({
  selector: 'language-switcher',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './language-switcher.component.html',
  styleUrls: ['./language-switcher.component.css']
})
export class LanguageSwitcher {
  availableLangs = ['es', 'en'];
  activeLang: string;

  constructor(private translocoService: TranslocoService) { // ✅ 2. Tipo correcto
    this.activeLang = this.translocoService.getActiveLang(); // ✅ 3. Idioma actual
  }

  onLangChange(event: Event) {
    const selectElement = event.target as HTMLSelectElement;
    const lang = selectElement.value;
    this.translocoService.setActiveLang(lang); // ✅ 4. Cambia idioma
    this.activeLang = lang;
  }
}
