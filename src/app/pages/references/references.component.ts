import { Component, inject } from '@angular/core';
import { PageWrapper } from '../../shared/components/page-wrapper/page-wrapper.component';
import { TranslocoModule, TranslocoService } from '@jsverse/transloco';
import { toSignal } from '@angular/core/rxjs-interop';
import { SubsectionComponent } from '../../shared/components/subsection/subsection.component';
import { CommonModule } from '@angular/common';
import { ContactInfo } from '../../shared/components/contact-info/contact-info.component';

@Component({
  selector: 'app-references',
  standalone: true,
  imports: [
    PageWrapper,
    TranslocoModule,
    CommonModule,
    ContactInfo
  ],
  templateUrl: './references.component.html',
  styleUrl: './references.component.css'
})
export class ReferencesPage {
  private transloco = inject(TranslocoService);

  references = toSignal(this.transloco.selectTranslateObject('references'), { initialValue: {} });

}
