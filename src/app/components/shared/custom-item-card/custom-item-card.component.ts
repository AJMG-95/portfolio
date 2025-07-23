import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'custom-i-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './custom-item-card.component.html',
})
export class CustomICard {
  @Input() title!: string;
  @Input() imageUrl?: string;
  @Input() altText: string = 'Logo';
  @Input() titleLink?: string;

}
