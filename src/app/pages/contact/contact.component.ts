import { Component } from '@angular/core';
import { TranslocoModule } from '@jsverse/transloco';
import { ContactInfo } from '../../components/contact/contact-info/contact-info.component';
import { PageWrapper } from '../../components/shared/page-wrapper/page-wrapper.component';


@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [PageWrapper, ContactInfo, TranslocoModule,],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.css'
})
export class ContactPage {
  emailBody = `Hola Antonio Jesús,

  He visto tu portfolio y me gustaría ponerme en contacto contigo.`;
}
