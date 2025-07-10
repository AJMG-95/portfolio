import { CommonModule } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';

import { AboutTabs } from '../../shared/components/about-tabs/about-tabs.component';
import { CertificationCard } from '../../shared/components/certifications/certification-card/certification-card.component';
import { CustomICard } from '../../shared/components/custom-item-card/custom-item-card.component';
import { ICard } from '../../shared/components/item-card/item-card.component';
import { PageWrapper } from '../../shared/components/page-wrapper/page-wrapper.component';
import { SubsectionComponent } from '../../shared/components/subsection/subsection.component';
import { TranslocoModule, TranslocoService } from '@jsverse/transloco';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [
    CommonModule,
    TranslocoModule,
    PageWrapper,
    AboutTabs,
    SubsectionComponent,
    ICard,
    CustomICard,
    CertificationCard
  ],
  templateUrl: './about.component.html',
  styleUrl: './about.component.css'
})
export class AboutPage {
  private transloco = inject(TranslocoService);

  tabTitles = ['education.title', 'certifications.title', 'experience.title', 'skills.title', 'references.title'];
  selectedTab = signal(this.tabTitles[0]);
  activeCardId: number | null = null;

  // Se seleccionan los objetos de traducción como observables reactivos y se convierten en signals con un valor inicial vacío
  education = toSignal(this.transloco.selectTranslateObject('education'), { initialValue: {} });
  certifications = toSignal(this.transloco.selectTranslateObject('certifications'), { initialValue: {} });
  experience = toSignal(this.transloco.selectTranslateObject('experience'), { initialValue: {} });
  skills = toSignal(this.transloco.selectTranslateObject('skills'), { initialValue: {} });
  training = toSignal(this.transloco.selectTranslateObject('training'), { initialValue: {} });
  references = toSignal(this.transloco.selectTranslateObject('references'), { initialValue: {} });

  setActiveCard(id: number) {
    this.activeCardId = id;
  }

  clearActiveCard() {
    this.activeCardId = null;
  }

  selectTab(tab: string) {
    this.selectedTab.set(tab);
    this.activeCardId = null;
  }
}
