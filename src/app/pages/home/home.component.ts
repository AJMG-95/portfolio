// src/app/pages/home/home.component.ts

import { Component, inject, signal } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule, NgIf } from '@angular/common';
import { TranslocoModule, TranslocoService } from '@jsverse/transloco';
import { toSignal } from '@angular/core/rxjs-interop';

import { ButtonComponent } from '../../components/shared/button/button.component';
import { ProfilePhoto } from '../../components/shared/profile-photo/profile-photo.component';
import { ButtonMenu } from '../../components/shared/button-menu/button-menu.component';
import { ChipComponent } from '../../components/shared/chip/chip.component';
import { PageWrapper } from '../../components/shared/page-wrapper/page-wrapper.component';
import { Typewriter } from '../../components/shared/typewriter/typewriter.component';

import { VisualAssetsService } from '../../core/services/visual-assets.service';
import { PersonalDataService } from '../../core/services/personal-data.service';

@Component({
  selector: 'app-home-page',
  standalone: true,
  templateUrl: './home.component.html',
  imports: [
    CommonModule,
    RouterModule,
    TranslocoModule,
    ButtonComponent,
    ProfilePhoto,
    Typewriter,
    NgIf,
    PageWrapper,
    ChipComponent,
    ButtonMenu
  ],
})
export class HomePage {
  private transloco = inject(TranslocoService);
  private techAssets = inject(VisualAssetsService);

  typing1Done = false;
  typing2Started = false;

  // Traducciones dinámicas
  greeting = toSignal(this.transloco.selectTranslateObject('home.greeting'), { initialValue: '' });
  description = toSignal(this.transloco.selectTranslateObject('home.description'), { initialValue: '' });
  claim = toSignal(this.transloco.selectTranslateObject('home.claim'), { initialValue: '' });
  projectsBtn = toSignal(this.transloco.selectTranslate('home.buttons.projects'), { initialValue: '' });
  contactBtn = toSignal(this.transloco.selectTranslate('home.buttons.contact'), { initialValue: '' });
  resumeBtn = toSignal(this.transloco.selectTranslate('home.buttons.resume'), { initialValue: '' });

  // Skills traducibles (incluye principles con ID)
  skills = toSignal(this.transloco.selectTranslateObject('skills'), { initialValue: {} });

  // Chips tecnológicos
  techFrontend = signal(this.mapIdsToAssets(this.skills().technical?.frontendLanguages || []));
  techBackend = signal(this.mapIdsToAssets(this.skills().technical?.backendLanguages || []));
  techFrameworks = signal(this.mapIdsToAssets(this.skills().technical?.frameworks || []));
  techTools = signal(this.mapIdsToAssets(this.skills().technical?.tools || []));
  techManagement = signal(this.mapIdsToAssets(this.skills().technical?.management || []));

  // Principios con ID
  techPrinciples = signal(
    this.mapPrinciples(this.skills().technical?.principles || {})
  );

  // Control de animación de máquina de escribir
  typewriterKey = signal(0);
  showTypewriters = signal(true);

  constructor() {
    this.transloco.langChanges$.subscribe(() => {
      this.typing1Done = false;
      this.typing2Started = false;
      this.showTypewriters.set(false);
      setTimeout(() => {
        this.showTypewriters.set(true);
      });
      this.refreshTechLists();
    });
  }

  ngOnInit(): void {
    this.refreshTechLists();
  }

  private refreshTechLists() {
    const tech = this.skills().technical || {};

    this.techFrontend.set(this.mapIdsToAssets(tech.frontendLanguages || []));
    this.techBackend.set(this.mapIdsToAssets(tech.backendLanguages || []));
    this.techFrameworks.set(this.mapIdsToAssets(tech.frameworks || []));
    this.techTools.set(this.mapIdsToAssets(tech.tools || []));
    this.techManagement.set(this.mapIdsToAssets(tech.management || []));
    this.techPrinciples.set(this.mapPrinciples(tech.principles || {}));
  }

  private mapIdsToAssets(ids: number[]) {
    return ids
      .map(id => {
        const label = this.techAssets.getName(id);
        if (!label) return null;

        return {
          label,
          icon: this.techAssets.getLogo(id),
          color: this.techAssets.getLightColor(id),
        };
      })
      .filter((item): item is { label: string; icon: string | undefined; color: string | undefined } => !!item);
  }


  private mapPrinciples(principles: Record<string, unknown>) {
    return Object.entries(principles).map(([id, label]) => ({
      label: label as string,
      icon: this.techAssets.getLogo(+id),
      color: this.techAssets.getLightColor(+id),
    }));
  }

  onFirstTypingFinish(): void {
    this.typing1Done = true;
    this.typing2Started = true;
  }
}
