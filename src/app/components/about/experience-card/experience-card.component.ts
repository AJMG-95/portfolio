// src\app\components\about\experience-card\experience-card.component.ts

import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChipComponent } from '../../shared/chip/chip.component';
import { VisualAssetsService } from '../../../core/services/visual-assets.service';

interface TechDisplay {
  label: string;
  icon?: string;
  color?: string;
}

@Component({
  selector: 'experience-card',
  standalone: true,
  imports: [CommonModule, ChipComponent],
  templateUrl: './experience-card.component.html',
})
export class ExperienceCard implements OnChanges {
  @Input() title!: string;
  @Input() titleLink?: string;
  @Input() imageUrl?: string;
  @Input() altText: string = 'Logo de empresa';
  @Input() role!: string;
  @Input() dates!: string;
  @Input() tasks!: string[];
  @Input() technologyIds?: number[];

  technologies: TechDisplay[] = [];

  constructor(private techAssets: VisualAssetsService) { }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['technologyIds']) {
      this.technologies = (this.technologyIds || []).map(id => ({
        label: this.techAssets.getName(id) || 'Desconocido',
        icon: this.techAssets.getLogo(id),
        color: this.techAssets.getLightColor(id),
      }));
    }
  }
}
