import { Component, OnDestroy, signal } from '@angular/core';
import { TranslocoModule } from '@jsverse/transloco';
import { PageWrapper } from '../../components/shared/page-wrapper/page-wrapper.component';
import { ContactInfo } from '../../components/contact/contact-info/contact-info.component';
import { PersonalDataService } from '../../core/services/personal-data.service';

type ContactType = 'email' | 'phone' | 'linkedin' | 'github' | '';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [PageWrapper, ContactInfo, TranslocoModule],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.css',
})
export class ContactPage implements OnDestroy {
  fullName!: string;
  email!: string;
  phone!: string;
  linkedin!: string;
  github!: string;
  emailSubject = 'Contacto desde el portfolio';
  emailBody!: string;

  // Línea 1 (clave) y línea 2 (valor o clave)
  hoveredLabelKey = signal<string>('contact.hover.hello');
  hoveredValue = signal<string>('contact.hover.letsTalk');

  private resetTimer?: ReturnType<typeof setTimeout>;
  private isHovering = false;

  constructor(private personal: PersonalDataService) {
    this.fullName = personal.fullName;
    this.email = personal.email;
    this.phone = personal.phone;
    this.linkedin = personal.linkedin;
    this.github = personal.github;

    this.emailBody = `Hola ${this.fullName},\n\nHe visto tu portfolio y me gustaría ponerme en contacto contigo.`;
  }

  /** Se llama AL ENTRAR en hover (o focus). Mantiene el contenido mostrado. */
  onContactHover(value: string) {
    this.isHovering = true;
    if (this.resetTimer) clearTimeout(this.resetTimer); // si estabas fuera, cancela el reset

    const type = this.inferType(value);
    switch (type) {
      case 'email':
        this.hoveredLabelKey.set('contact.hover.emailLabel');
        this.hoveredValue.set(this.email);
        break;
      case 'phone':
        this.hoveredLabelKey.set('contact.hover.phoneLabel');
        this.hoveredValue.set(this.phone);
        break;
      case 'linkedin':
        this.hoveredLabelKey.set('contact.hover.linkedinLabel');
        this.hoveredValue.set(this.linkedin);
        break;
      case 'github':
        this.hoveredLabelKey.set('contact.hover.githubLabel');
        this.hoveredValue.set(this.github);
        break;
      default:
        // Estado por defecto (dos líneas)
        this.hoveredLabelKey.set('contact.hover.hello');
        this.hoveredValue.set('contact.hover.letsTalk');
        break;
    }
  }

  /** Llamar AL SALIR del hover (o blur). Inicia el temporizador de 5 s. */
  onContactLeave() {
    this.isHovering = false;
    if (this.resetTimer) clearTimeout(this.resetTimer);

    this.resetTimer = setTimeout(() => {
      // Solo resetea si sigues fuera (puedes haber vuelto a entrar)
      if (!this.isHovering) {
        this.hoveredLabelKey.set('contact.hover.hello');
        this.hoveredValue.set('contact.hover.letsTalk');
      }
    }, 5000);
  }

  /** Deducción básica del tipo a partir del texto/URL/valor */
  private inferType(value: string): ContactType {
    const v = (value ?? '').toLowerCase();
    if (v.includes('@') || v.endsWith('.com')) return 'email';
    if (v.includes('+34') || /\+?\d{7,}/.test(v)) return 'phone';
    if (v.includes('linkedin')) return 'linkedin';
    if (v.includes('github')) return 'github';
    return '';
  }

  // Opcionales si quieres accesibilidad por teclado en el template
  onContactFocus(value: string) { this.onContactHover(value); }
  onContactBlur() { this.onContactLeave(); }

  ngOnDestroy() {
    if (this.resetTimer) clearTimeout(this.resetTimer);
  }
}
