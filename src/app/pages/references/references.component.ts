import { Component, inject } from '@angular/core';
import { TranslocoModule, TranslocoService } from '@jsverse/transloco';
import { toSignal } from '@angular/core/rxjs-interop';
import { CommonModule } from '@angular/common';
import { ContactInfo } from '../../components/contact/contact-info/contact-info.component';
import { PageWrapper } from '../../components/shared/page-wrapper/page-wrapper.component';


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
