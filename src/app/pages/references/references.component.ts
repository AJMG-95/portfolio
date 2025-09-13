// src/app/pages/references/references.component.ts

import { Component, computed, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslocoModule, TranslocoService } from '@jsverse/transloco';
import { toSignal } from '@angular/core/rxjs-interop';
import { PageWrapper } from '@shared/page-wrapper/page-wrapper.component';
import { ContactInfo } from '@contact/contact-info/contact-info.component';
import { ReferencesService } from '@core/services/references-data.service';



@Component({
  selector: 'app-references',
  standalone: true,
  imports: [
    CommonModule,
    PageWrapper,
    TranslocoModule,
    ContactInfo,
  ],
  templateUrl: './references.component.html',
  styleUrl: './references.component.css',
})
export class ReferencesPage {
  private transloco = inject(TranslocoService);
  private referencesService = inject(ReferencesService);

  // Traducciones
  referencesText = toSignal(this.transloco.selectTranslateObject('references'), {
    initialValue: { items: [], letter: null },
  });

  // Datos técnicos desde servicio
  references = this.referencesService.getReferences();
  letter = this.referencesService.getLetter();

  // Combinar datos traducibles con técnicos
  combinedReferences = computed(() =>
    this.references.map((ref, index) => {
      const textData = this.referencesText().items?.[index] || {};
      return {
        ...ref,
        role: textData.role ?? '',
        contact: textData.contact ?? '',
      };
    })
  );
}
