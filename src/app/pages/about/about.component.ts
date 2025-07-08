import { Component, inject, signal } from '@angular/core';
import { TranslocoModule, TranslocoService } from '@jsverse/transloco';
import { CommonModule } from '@angular/common';
import { PageWrapper } from '../../shared/components/page-wrapper/page-wrapper.component';
import { AboutTabs } from '../../shared/components/about-tabs/about-tabs.component';
import { SubsectionComponent } from '../../shared/components/subsection/subsection.component';
import { ICard } from '../../shared/components/item-card/item-card.component';
import { toSignal } from '@angular/core/rxjs-interop';
import { CustomICard } from '../../shared/components/custom-item-card/custom-item-card.component';

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
    CustomICard
  ],
  templateUrl: './about.component.html',
  styleUrl: './about.component.css'
})
export class AboutPage {
  private transloco = inject(TranslocoService);

  tabTitles = ['education.title', 'experience.title', 'skills.title', 'references.title'];
  selectedTab = signal(this.tabTitles[0]);

  // Se seleccionan los objetos de traducción como observables reactivos y se convierten en signals con un valor inicial vacío
  education = toSignal(this.transloco.selectTranslateObject('education'), { initialValue: {} });
  experience = toSignal(this.transloco.selectTranslateObject('experience'), { initialValue: {} });
  skills = toSignal(this.transloco.selectTranslateObject('skills'), { initialValue: {} });
  training = toSignal(this.transloco.selectTranslateObject('training'), { initialValue: {} });
  references = toSignal(this.transloco.selectTranslateObject('references'), { initialValue: {} });

  selectTab(tab: string) {
    this.selectedTab.set(tab);
  }
}
