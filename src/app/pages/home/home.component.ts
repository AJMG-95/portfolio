import { Component, inject, signal } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TranslocoModule, TranslocoService } from '@jsverse/transloco';
import { ButtonComponent } from '../../shared/components/button/button.component';
import { ProfilePhoto } from '../../shared/components/profile-photo/profile-photo.component';
import { Typewriter } from '../../shared/components/typewriter/typewriter.component';
import { CommonModule, NgIf } from '@angular/common';
import { PageWrapper } from '../../shared/components/page-wrapper/page-wrapper.component';
import { ChipComponent } from '../../shared/components/chip/chip.component';
import { toSignal } from '@angular/core/rxjs-interop';
import { technologies } from '../../../assets/data/technologies';
import { ButtonMenu } from '../../shared/components/button-menu/button-menu.component';


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

  typing1Done = false;
  typing2Started = false;

  techFrontend = technologies.frontendLanguages;
  techBackend = technologies.backendLanguages;
  techFrameworks = technologies.frameworks;
  techTools = technologies.tools;
  techManagement = technologies.management;


  greeting = toSignal(this.transloco.selectTranslateObject('home.greeting'), { initialValue: {} });
  description = toSignal(this.transloco.selectTranslateObject('home.description'), {initialValue: {}});
  claim = toSignal(this.transloco.selectTranslateObject('home.claim'), {initialValue: {}});
  projectsBtn = toSignal(this.transloco.selectTranslateObject('home.projectsBtn'), {initialValue: {}});
  contactBtn = toSignal(this.transloco.selectTranslateObject('home.contactBtn'), {initialValue: {}});
  skills = toSignal(this.transloco.selectTranslateObject('skills'), { initialValue: {} });

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

  onChipClick(id: string): void {
    console.log('Chip clicked:', id);
    //
  }
}
