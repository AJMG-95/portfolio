import { CommonModule } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { TranslocoModule, TranslocoService } from '@jsverse/transloco';
import { AboutTabs } from '../../components/about/about-tabs/about-tabs.component';
import { ExperienceCard } from '../../components/about/experience-card/experience-card.component';
import { CertificationCard } from '../../components/certifications/certification-card/certification-card.component';
import { CertificateModal } from '../../components/certifications/certification-modal/certificate-modal.component';
import { ChipComponent } from '../../components/shared/chip/chip.component';
import { ICard } from '../../components/shared/item-card/item-card.component';
import { PageWrapper } from '../../components/shared/page-wrapper/page-wrapper.component';
import { SubsectionComponent } from '../../components/shared/subsection/subsection.component';


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
