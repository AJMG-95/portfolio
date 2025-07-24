import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChipComponent } from '../../shared/chip/chip.component';
import { TechnologyAssetsService } from '../../../core/services/technology-assets.service';



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

  constructor(private techAssets: TechnologyAssetsService) { }

  getTechLogo(tech: string): string | undefined {
    return this.techAssets.getLogo(tech);
  }

  getTechColor(tech: string): string | undefined {
    return this.techAssets.getLightColor(tech);
  }
}
