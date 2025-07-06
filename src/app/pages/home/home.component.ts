import { Component, signal } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TranslocoModule, TranslocoService } from '@jsverse/transloco';
import { ButtonComponent } from '../../shared/components/button/button.component';
import { ProfilePhoto } from '../../shared/components/profile-photo/profile-photo.component';
import { Typewriter } from '../../shared/components/typewriter/typewriter.component';
import { NgIf } from '@angular/common';
import { PageWrapper } from '../../shared/components/page-wrapper/page-wrapper.component';

@Component({
  selector: 'app-home-page',
  standalone: true,
  templateUrl: './home.component.html',
  imports: [
    RouterModule,
    TranslocoModule,
    ButtonComponent,
    ProfilePhoto,
    Typewriter,
    NgIf,
    PageWrapper
  ],
})
export class HomePage {
  greeting = signal('');
  description = signal('');
  stack = signal('');
  claim = signal('');
  projectsBtn = signal('');
  contactBtn = signal('');
  typewriterKey = signal(0);

  showPhoto = false;

  typing1Started = false;
  typing1Done = false;
  typing2Started = false;

  showTypewriters = signal(true);

  constructor(private transloco: TranslocoService) {
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
      this.stack.set(this.transloco.translate('home.stack'));
      this.claim.set(this.transloco.translate('home.claim'));
      this.projectsBtn.set(this.transloco.translate('home.projectsBtn'));
      this.contactBtn.set(this.transloco.translate('home.contactBtn'));
      this.typing1Done = false;
      this.typing2Started = false;
      this.typewriterKey.set(this.typewriterKey() + 1);

      // Espera a que acabe animate-fadeIn (1s)
      setTimeout(() => {
        this.typing1Started = true;
        this.showPhoto = true;
      }, 1010); // ⏱ igual que fadeIn
    };

    updateTexts();

    this.transloco.langChanges$.subscribe(() => {
      updateTexts();
    });
  }


  loadTranslations() {
    this.transloco.selectTranslate('home.greeting').subscribe(t => this.greeting.set(`👋 ${t}`));
    this.transloco.selectTranslate('home.description').subscribe(t => this.description.set(t));
    this.transloco.selectTranslate('home.stack').subscribe(t => this.stack.set(t));
    this.transloco.selectTranslate('home.claim').subscribe(t => this.claim.set(t));
    this.transloco.selectTranslate('home.projectsBtn').subscribe(t => this.projectsBtn.set(t));
    this.transloco.selectTranslate('home.contactBtn').subscribe(t => this.contactBtn.set(t));
  }

  onFirstTypingFinish(): void {
    this.typing1Done = true;
    this.typing2Started = true;
    this.showPhoto = true;
  }
}
