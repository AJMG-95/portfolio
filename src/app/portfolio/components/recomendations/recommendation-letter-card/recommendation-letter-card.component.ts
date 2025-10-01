import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { TranslocoPipe } from '@jsverse/transloco';
import type { RecommendationLetter } from '@data/recommendations.data';

@Component({
  selector: 'recommendation-letter-card',
  standalone: true,
  imports: [TranslocoPipe],
  templateUrl: './recommendation-letter-card.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RecommendationLetterCardComponent {
  letter = input.required<RecommendationLetter>();

  letterLangBadge(lang?: string): string {
    switch (lang) {
      case 'es': return 'badge-success';
      case 'en': return 'badge-info';
      default: return 'badge-ghost';
    }
  }

  letterTypeBadge(fileType?: string): string {
    switch (fileType) {
      case 'pdf': return 'badge-primary';
      case 'image': return 'badge-accent';
      case 'link': return 'badge-neutral';
      default: return 'badge-ghost';
    }
  }
}
