import { CommonModule } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { TranslocoModule, TranslocoService } from '@jsverse/transloco';

import { AboutTabs } from '../../shared/components/about-tabs/about-tabs.component';
import { CertificateModal } from '../../shared/components/certifications/certification-modal/certificate-modal.component';
import { CertificationCard } from '../../shared/components/certifications/certification-card/certification-card.component';
import { ChipComponent } from '../../shared/components/chip/chip.component';
import { ExperienceCard } from '../../shared/components/experience-card/experience-card.component';
import { ICard } from '../../shared/components/item-card/item-card.component';
import { PageWrapper } from '../../shared/components/page-wrapper/page-wrapper.component';
import { SubsectionComponent } from '../../shared/components/subsection/subsection.component';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [
    AboutTabs,
    CertificateModal,
    CertificationCard,
    ChipComponent,
    CommonModule,
    ExperienceCard,
    ICard,
    PageWrapper,
    SubsectionComponent,
    TranslocoModule,
  ],
  templateUrl: './about.component.html',
  styleUrl: './about.component.css'
})
export class AboutPage {
  private transloco = inject(TranslocoService);

  tabTitles = [
    'education.title',
    'certifications.title',
    'experience.title',
    'skills.title',
  ];

  selectedTab = signal(this.tabTitles[0]);
  activeCardId: number | null = null;

  modalVisible = false;
  selectedCertificate: any = null;


  education = toSignal(this.transloco.selectTranslateObject('education'), {
    initialValue: { items: [] }
  });

  certifications = toSignal(this.transloco.selectTranslateObject('certifications'), {
    initialValue: { items: [] }
  });

  experience = toSignal(this.transloco.selectTranslateObject('experience'), {
    initialValue: { items: [] }
  });

  skills = toSignal(this.transloco.selectTranslateObject('skills'), {
    initialValue: {}
  });

  languages = toSignal(this.transloco.selectTranslateObject('languages'), {
    initialValue: { items: [] }
  });

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

  getTechLogo(tech: string): string {
    return `assets/icons/tech/${tech.toLowerCase().replace(/ /g, '-')}.svg`;
  }

  openModal(cert: any, index: number) {
    this.activeCardId = index;
    this.selectedCertificate = cert;
    this.modalVisible = true;
  }

  closeModal() {
    this.modalVisible = false;
    this.activeCardId = null;
    this.selectedCertificate = null;
  }
}
