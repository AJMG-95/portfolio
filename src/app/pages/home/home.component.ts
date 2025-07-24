// src\app\pages\home\home.component.ts

import { Component, inject, signal } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TranslocoModule, TranslocoService } from '@jsverse/transloco';
import { CommonModule, NgIf } from '@angular/common';
import { toSignal } from '@angular/core/rxjs-interop';
import { technologies } from '../../../assets/data/technologies';
import { ButtonComponent } from '../../components/shared/button/button.component';
import { ProfilePhoto } from '../../components/shared/profile-photo/profile-photo.component';
import { ButtonMenu } from '../../components/shared/button-menu/button-menu.component';
import { ChipComponent } from '../../components/shared/chip/chip.component';
import { PageWrapper } from '../../components/shared/page-wrapper/page-wrapper.component';
import { Typewriter } from '../../components/shared/typewriter/typewriter.component';
import { TechnologyAssetsService } from '../../core/services/technology-assets.service';



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
  private techAssets = inject(TechnologyAssetsService);

  typing1Done = false;
  typing2Started = false;

  techFrontend = technologies.frontendLanguages.map(t => ({
    label: t.name,
    icon: this.techAssets.getLogo(t.name),
    color: this.techAssets.getLightColor(t.name)
  }));
  techBackend = technologies.backendLanguages.map(t => ({
    label: t.name,
    icon: this.techAssets.getLogo(t.name),
    color: this.techAssets.getLightColor(t.name)
  }));
  techFrameworks = technologies.frameworks.map(t => ({
    label: t.name,
    icon: this.techAssets.getLogo(t.name),
    color: this.techAssets.getLightColor(t.name)
  }));
  techTools = technologies.tools.map(t => ({
    label: t.name,
    icon: this.techAssets.getLogo(t.name),
    color: this.techAssets.getLightColor(t.name)
  }));
  techManagement = technologies.management.map(t => ({
    label: t.name,
    icon: this.techAssets.getLogo(t.name),
    color: this.techAssets.getLightColor(t.name)
  }));




  greeting = toSignal(this.transloco.selectTranslateObject('home.greeting'), { initialValue: {} });
  description = toSignal(this.transloco.selectTranslateObject('home.description'), {initialValue: {}});
  claim = toSignal(this.transloco.selectTranslateObject('home.claim'), {initialValue: {}});
  projectsBtn = toSignal(this.transloco.selectTranslateObject('home.projectsBtn'), {initialValue: {}});
  contactBtn = toSignal(this.transloco.selectTranslateObject('home.contactBtn'), {initialValue: {}});
  skills = toSignal(this.transloco.selectTranslateObject('skills'), { initialValue: {} })
    ;
  techPrinciples = this.skills().technical?.principles.map((p: string) => ({
    label: p,
    icon: this.techAssets.getLogo(p),
    color: this.techAssets.getLightColor(p)
  }));


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
    });
  }

  ngOnInit(): void {
    const updateTexts = () => {
      this.typing1Done = false;
      this.typing2Started = false;
      this.typewriterKey.set(this.typewriterKey() + 1);
    };

    updateTexts();

    this.transloco.langChanges$.subscribe(() => {
      updateTexts();
    });
  }


  onFirstTypingFinish(): void {
    this.typing1Done = true;
    this.typing2Started = true;
  }

}
