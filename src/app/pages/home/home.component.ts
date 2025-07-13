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
    ChipComponent
  ],
})
export class HomePage {
  private transloco = inject(TranslocoService);

  greeting = signal('');
  description = signal('');
  claim = signal('');
  projectsBtn = signal('');
  contactBtn = signal('');
  typewriterKey = signal(0);

  typing1Done = false;
  typing2Started = false;
  showTypewriters = signal(true);

  // ✅ Acceso a todas las skills como objeto, igual que en AboutPage
  skills = toSignal(this.transloco.selectTranslateObject('skills'), { initialValue: {} });

  constructor() {
    this.loadTranslations();

    this.transloco.langChanges$.subscribe(() => {
      this.typing1Done = false;
      this.typing2Started = false;
      this.showTypewriters.set(false);
      setTimeout(() => {
        this.loadTranslations();
        this.showTypewriters.set(true);
      });
    });
  }

  ngOnInit(): void {
    const updateTexts = () => {
      this.greeting.set(`👋 ${this.transloco.translate('home.greeting')}`);
      this.description.set(this.transloco.translate('home.description'));
      this.claim.set(this.transloco.translate('home.claim'));
      this.projectsBtn.set(this.transloco.translate('home.projectsBtn'));
      this.contactBtn.set(this.transloco.translate('home.contactBtn'));
      this.typing1Done = false;
      this.typing2Started = false;
      this.typewriterKey.set(this.typewriterKey() + 1);
    };

    updateTexts();

    this.transloco.langChanges$.subscribe(() => {
      updateTexts();
    });
  }

  loadTranslations() {
    this.transloco.selectTranslate('home.greeting').subscribe(t => this.greeting.set(`👋 ${t}`));
    this.transloco.selectTranslate('home.description').subscribe(t => this.description.set(t));
    this.transloco.selectTranslate('home.claim').subscribe(t => this.claim.set(t));
    this.transloco.selectTranslate('home.projectsBtn').subscribe(t => this.projectsBtn.set(t));
    this.transloco.selectTranslate('home.contactBtn').subscribe(t => this.contactBtn.set(t));
  }

  onFirstTypingFinish(): void {
    this.typing1Done = true;
    this.typing2Started = true;
  }

  onChipClick(id: string): void {
    console.log('Chip clicked:', id);
    // Aquí podrías navegar, filtrar, mostrar info, etc.
  }
}
