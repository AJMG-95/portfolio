// src\app\components\shared\item - card\item - card.component.ts

import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'i-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './item-card.component.html',
  styleUrls: ['./item-card.component.css'],
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
