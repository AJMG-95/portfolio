import { CommonModule } from '@angular/common';
import { Component, computed, inject, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { TranslocoModule, TranslocoService } from '@jsverse/transloco';

import { AboutTabs } from '../../components/about/about-tabs/about-tabs.component';
import { ExperienceCard } from '../../components/about/experience-card/experience-card.component';
import { ChipComponent } from '../../components/shared/chip/chip.component';
import { ICard } from '../../components/shared/item-card/item-card.component';
import { PageWrapper } from '../../components/shared/page-wrapper/page-wrapper.component';
import { SubsectionComponent } from '../../components/shared/subsection/subsection.component';

import { ExperienceService } from '../../core/services/experience-data.service';
import { EducationService } from '../../core/services/education-data.service';
import { VisualAssetsService } from '../../core/services/visual-assets.service';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [
    AboutTabs,
    ChipComponent,
    CommonModule,
    ExperienceCard,
    ICard,
    PageWrapper,
    SubsectionComponent,
    TranslocoModule,
  ],
  templateUrl: './about.component.html',
  styleUrl: './about.component.css',
})
export class AboutPage {
  private transloco = inject(TranslocoService);
  private expService = inject(ExperienceService);
  private educationService = inject(EducationService);
  private techAssets = inject(VisualAssetsService);

  tabTitles = ['education.title', 'experience.title', 'skills.title'];
  selectedTab = signal(this.tabTitles[0]);
  activeCardId: number | null = null;

  education = toSignal(this.transloco.selectTranslateObject('education'), { initialValue: { items: [] } });
  skillsT = toSignal(this.transloco.selectTranslateObject('skills'), { initialValue: {} });
  languages = toSignal(this.transloco.selectTranslateObject('languages'), { initialValue: { items: [] } });
  experienceT = toSignal(this.transloco.selectTranslateObject('experience'), { initialValue: { items: [] } });

  educationData = computed(() => {
    const items = this.education().items;
    return {
      items: items.map((item: any) => {
        const data = this.educationService.getById(item.id);
        return {
          ...item,
          dates: data?.dates ?? '',
          image: data?.image ?? '',
          institutionUrl: data?.institutionUrl ?? '',
        };
      }),
    };
  });

  experience = computed(() => {
    const translated = this.experienceT().items;
    const technical = this.expService.getAll();

    return {
      items: technical.map((item) => {
        const match = translated.find((i: any) => i.id === item.id);
        return {
          ...item,
          role: match?.role || 'Sin rol',
          tasks: match?.tasks || [],
        };
      }),
    };
  });

  skills = computed(() => {
    const raw = this.skillsT().technical;
    return {
      frontendLanguages: raw?.frontendLanguages?.map((id: number) => this.toAsset(id)) || [],
      backendLanguages: raw?.backendLanguages?.map((id: number) => this.toAsset(id)) || [],
      frameworks: raw?.frameworks?.map((id: number) => this.toAsset(id)) || [],
      tools: raw?.tools?.map((id: number) => this.toAsset(id)) || [],
      management: raw?.management?.map((id: number) => this.toAsset(id)) || [],
      principles: raw?.principles
        ? Object.entries(raw.principles).map(([id, label]) => ({
          label: label as string,
          icon: this.techAssets.getLogo(+id),
          color: this.techAssets.getLightColor(+id),
        }))
        : [],
    };
  });

  softSkills = computed(() => this.skillsT().soft?.items || []);

  toAsset(id: number) {
    const asset = this.techAssets.getAsset(id);
    return asset
      ? {
        label: asset.name,
        icon: asset.logo,
        color: asset.lightColor,
      }
      : { label: 'Unknown', icon: '', color: '' };
  }

  setActiveCard(id: number) {
    this.activeCardId = id;
  }

  clearActiveCard() {
    this.activeCardId = null;
  }

  selectTab(tab: string) {
    this.selectedTab.set(tab);
    this.clearActiveCard();
  }
}
