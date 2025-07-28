import { Component } from '@angular/core';
import { TranslocoModule } from '@jsverse/transloco';
import { PageWrapper } from '../../components/shared/page-wrapper/page-wrapper.component';
import { ContactInfo } from '../../components/contact/contact-info/contact-info.component';
import { PersonalDataService } from '../../core/services/personal-data.service';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [PageWrapper, ContactInfo, TranslocoModule],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.css'
})
export class ContactPage {
  fullName!: string;
  email!: string;
  phone!: string;
  linkedin!: string;
  github!: string;
  emailSubject = 'Contacto desde el portfolio';
  emailBody!: string;

  constructor(private personal: PersonalDataService) {
    this.fullName = personal.fullName;
    this.email = personal.email;
    this.phone = personal.phone;
    this.linkedin = personal.linkedin;
    this.github = personal.github;

    this.emailBody = `Hola ${this.fullName},\n\nHe visto tu portfolio y me gustaría ponerme en contacto contigo.`;
  }
}
