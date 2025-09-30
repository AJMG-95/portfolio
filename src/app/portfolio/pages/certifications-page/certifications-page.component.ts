import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { TranslocoPipe } from '@jsverse/transloco';

import { CertificationsService } from '@service/certifications.service';
import type { Certification } from '@data/certifications.data';

import { CertCardComponent } from '@component/certifications/cert-card/cert-card.component';
import { CardsCarouselSliderComponent } from 'app/portfolio/shared/components/cards-carousel-slider/cards-carousel-slider.component';

@Component({
  selector: 'app-certifications-page',
  standalone: true,
  imports: [TranslocoPipe, CertCardComponent, CardsCarouselSliderComponent],
  templateUrl: './certifications-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class CertificationsPageComponent {
  #certSvc = inject(CertificationsService);

  // 4 listas como signals (síncronas, in-memory)
  itFrontend = signal<Certification[]>(this.#certSvc.getITFrontend());
  itMovile = signal<Certification[]>(this.#certSvc.getITMovile());
  itBackend = signal<Certification[]>(this.#certSvc.getITBackend());
  languages = signal<Certification[]>(this.#certSvc.getAllLanguages());
  others = signal<Certification[]>(this.#certSvc.getAllOther());

  trackById = (_: number, c: Certification) => c.id;
}
