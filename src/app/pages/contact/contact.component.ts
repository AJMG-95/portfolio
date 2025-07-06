import { Component } from '@angular/core';
import { PageWrapper } from '../../shared/components/page-wrapper/page-wrapper.component';
import { TranslocoModule } from '@jsverse/transloco';
import { ContactInfo } from '../../shared/components/contact-info/contact-info.component';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [PageWrapper, ContactInfo, TranslocoModule,],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.css'
})
export class ContactPage {

}
