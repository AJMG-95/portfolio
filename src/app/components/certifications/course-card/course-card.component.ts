import { NgClass, NgFor, NgIf } from '@angular/common';
import { Component, Input } from '@angular/core';
import { ChipComponent } from '../../shared/chip/chip.component';
import { TranslocoModule } from '@jsverse/transloco';
import { BannerComponent } from '../../shared/banner/banner.component';
import { VisualAssetsService } from '../../../core/services/visual-assets.service';

@Component({
  selector: 'course-card',
  standalone: true,
  imports: [NgClass, NgIf, NgFor, ChipComponent, TranslocoModule, BannerComponent],
  templateUrl: './course-card.component.html',
  styleUrl: './course-card.component.css'
})
export class CourseCardComponent {
  // === Datos del curso ===
  @Input() cardId!: number;
  @Input() technology?: number;
  @Input() headerImageUrl!: string;
  @Input() certificationUrl?: string
  @Input() cornerImageUrl?: string;
  @Input() title!: string;
  @Input() issuer?: string;
  @Input() type?: string;
  @Input() language?: string;
  @Input() date?: string;
  @Input() durationHours?: number;
  @Input() certificateId?: string;
  @Input() collaborators?: string[];
  @Input() url?: string;
  @Input() completionPercentage?: number;

  // === Estado visual interno ===
  isFlipped = false;
  showModal = false;

  constructor(private logoService: VisualAssetsService) { }

  cardClicked() {
    this.isFlipped = true;
    setTimeout(() => {
      this.showModal = true;
    }, 500);
  }

  closeModal() {
    this.showModal = false;
    setTimeout(() => {
      this.isFlipped = false;
    }, 300);
  }

  get statusChipClass(): string {
    const percentage = this.completionPercentage ?? 0;

    if (percentage === 100) {
      return 'bg-green-500 text-white';
    } else if (percentage >= 75) {
      return 'bg-blue-500 text-white';
    } else if (percentage >= 50) {
      return 'bg-yellow-500 text-black';
    } else if (percentage >= 25) {
      return 'bg-orange-500 text-white';
    } else {
      return 'bg-red-500 text-white';
    }
  }

  get techLogo(): string | undefined {
    const logo = this.technology ? this.logoService.getLogo(this.technology) : undefined;
    return logo;
  }

  get techName(): string {
    const name = this.technology ? this.logoService.getName(this.technology) : undefined;
    return name ?? '';
  }

}
