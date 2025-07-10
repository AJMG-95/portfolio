import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'i-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './item-card.component.html',
  styleUrls: ['./item-card.component.css'], // opcional si usas Tailwind directamente
})
export class ICard {
  @Input() title!: string;
  @Input() subtitle?: string;
  @Input() date?: string;
  @Input() imageUrl?: string;
  @Input() altText: string = 'Logo';

  @Input() footerText?: string;
  @Input() footerLink?: string; // si no se pasa, el footerText será un texto plano
  @Input() titleLink?: string;
}
