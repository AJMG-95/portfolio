import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { TranslocoPipe } from '@jsverse/transloco';

import type { RecommendationLetter, ReferenceItem } from '@data/recommendations.data';
import { RecommendationsService } from '@service/recommendations.service';

@Component({
  selector: 'app-references-page',
  standalone: true,
  imports: [TranslocoPipe],
  templateUrl: './references-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class ReferencesPageComponent {
  private readonly svc = inject(RecommendationsService);

  private readonly payload = toSignal(
    this.svc.getRecommendations(),
    { initialValue: { references: [], letters: [] } }
  );

  readonly references = computed<ReferenceItem[]>(() => this.payload().references);
  readonly letters = computed<RecommendationLetter[]>(() => this.payload().letters);

  trackByRef = (_: number, r: ReferenceItem) => r.id;
  trackByLetter = (_: number, l: RecommendationLetter) => l.url;

  // Helpers UI
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

  companyLabel(companyKey?: string, company?: string): string | undefined {
    // Si tienes clave, transloco se encarga en la plantilla; si no, renderizamos el literal
    return company ?? undefined;
  }
}
