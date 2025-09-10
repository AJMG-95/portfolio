import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-contact-info',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './contact-info.component.html',
  styleUrl: './contact-info.component.css'
})
export class ContactInfo {
  @Input() type!: 'email' | 'phone' | 'link';
  @Input() value!: string;
  @Input() label: string = '';
  @Input() external: boolean = false;
  @Input() subject: string = '';
  @Input() body: string = '';

  @Output() hovered = new EventEmitter<string>();

  get href(): string {
    switch (this.type) {
      case 'email': {
        const encodedSubject = encodeURIComponent(this.subject);
        const formattedBody = this.body.replace(/\n/g, '\r\n');
        const encodedBody = encodeURIComponent(formattedBody);
        return `mailto:${this.value}?subject=${encodedSubject}&body=${encodedBody}`;
      }
      case 'phone':
        return `tel:${this.value}`;
      case 'link':
        return this.value;
      default:
        return '#';
    }
  }

  get displayText(): string {
    return  this.value;
  }
/*   get displayText(): string {
    return this.type === 'link' ? this.label : this.value;
  } */

  /** Para accesibilidad del botón icon-only */
  get ariaLabel(): string {
    return this.label || this.displayText || this.type;
  }
}
