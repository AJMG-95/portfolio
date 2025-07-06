import { Component, inject, signal } from '@angular/core';
import { TranslocoModule, TranslocoService } from '@jsverse/transloco';
import { CommonModule } from '@angular/common';
import { PageWrapper } from '../../shared/components/page-wrapper/page-wrapper.component';
import { AboutTabs } from '../../shared/components/about-tabs/about-tabs.component';
import { SubsectionComponent } from '../../shared/components/subsection/subsection.component';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [
    CommonModule,
    TranslocoModule,
    PageWrapper,
    AboutTabs,
    SubsectionComponent
  ],
  templateUrl: './about.component.html',
  styleUrl: './about.component.css'
})
export class AboutPage {
  private transloco = inject(TranslocoService);

  tabTitles = ['education.title', 'experience.title', 'skills.title', 'references.title'];
  selectedTab = signal(this.tabTitles[0]);


  education = this.transloco.translateObject('education');
  experience = this.transloco.translateObject('experience');
  skills = this.transloco.translateObject('skills');
  training = this.transloco.translateObject('training');
  references = this.transloco.translateObject('references');


  selectTab(tab: string) {
    this.selectedTab.set(tab);
  }
}
