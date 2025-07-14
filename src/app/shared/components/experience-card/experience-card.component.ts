import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChipComponent } from '../chip/chip.component';

@Component({
  selector: 'experience-card',
  standalone: true,
  imports: [CommonModule, ChipComponent],
  templateUrl: './experience-card.component.html',
})
export class ExperienceCard {
  @Input() title!: string; // Nombre de la empresa
  @Input() titleLink?: string; // Enlace a la empresa
  @Input() imageUrl?: string; // Logo
  @Input() altText: string = 'Logo de empresa';
  @Input() role!: string;
  @Input() dates!: string;
  @Input() tasks!: string[];
  @Input() technologies?: string[];

  getTechLogo(tech: string): string {
    return `assets/icons/tech/${tech.toLowerCase().replace(/ /g, '-')}.svg`;
  }
}
