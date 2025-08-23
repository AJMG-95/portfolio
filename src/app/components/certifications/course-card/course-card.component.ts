// src\app\components\certifications\course-card\course-card.component.ts

import { NgClass, NgFor, NgIf, NgTemplateOutlet } from '@angular/common';
import { Component, input } from '@angular/core';
import { TranslocoModule } from '@jsverse/transloco';
import { CertificationViewModel } from '../../../core/models/certification-view.model';
import { BannerComponent } from '../../shared/banner/banner.component';
import { ChipComponent } from '../../shared/chip/chip.component';
import { ProgressPillComponent } from '../progress-pill/progress-pill.component';
import { CompletionLabelPipe } from '../../../core/pipes/CompletionLabelPipe.pipe';

@Component({
  selector: 'course-card',
  standalone: true,
  imports: [
    NgClass,
    NgIf,
    NgFor,
    ChipComponent,
    TranslocoModule,
    BannerComponent,
    NgTemplateOutlet,
    ProgressPillComponent,
    CompletionLabelPipe

  ],
  templateUrl: './course-card.component.html',
  styleUrl: './course-card.component.css'
})
export class CourseCardComponent {
  course = input.required<CertificationViewModel>();

  isFlipped = false;
  showModal = false;
  hasInteracted = false;


  cardClicked() {
    this.hasInteracted = true;     // ← activa animaciones a partir de ahora
    this.isFlipped = true;
    setTimeout(() => this.showModal = true, 500);
  }

  closeModal() {
    this.showModal = false;
    setTimeout(() => this.isFlipped = false, 300);
  }

  get statusChipClass(): string {
    const percentage = this.course().completionPercentage ?? 0;
    if (percentage === 100) return 'bg-green-700 text-white';
    if (percentage >= 75) return 'bg-blue-600 text-white';
    if (percentage >= 50) return 'bg-yellow-300 text-black';
    if (percentage >= 25) return 'bg-orange-400 text-white';
    return 'bg-red-500 text-white';
  }

  get techLogo(): string | undefined {
    return this.course().logo;
  }

  get techName(): string {
    return this.course().techName ?? '';
  }
}
