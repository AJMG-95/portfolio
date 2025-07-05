import { Component, OnInit, AfterViewInit, ElementRef, ViewChild } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TranslocoModule, TranslocoService } from '@jsverse/transloco';
import { ButtonComponent } from '../../shared/components/button/button.component';
import { ProfilePhoto } from '../../shared/components/profile-photo/profile-photo.component';
import { Typewriter } from '../../shared/components/typewriter/typewriter.component';

@Component({
  selector: 'app-home-page',
  standalone: true,
  templateUrl: './home.component.html',
  imports: [
    RouterModule,
    TranslocoModule,
    ButtonComponent,
    ProfilePhoto,
    Typewriter
  ],
})
export class HomePage implements OnInit, AfterViewInit {
  @ViewChild('heading') heading!: ElementRef<HTMLElement>;
  typingDone = false;
  typing1Done = false;
  typing2Started = false;

  greeting = '';
  description = '';
  stack = '';
  claim = '';
  projectsBtn = '';
  contactBtn = '';

  constructor(private transloco: TranslocoService) { }

  ngOnInit(): void {
    this.greeting = this.transloco.translate('home.greeting');
    this.description = this.transloco.translate('home.description');
    this.stack = this.transloco.translate('home.stack');
    this.claim = this.transloco.translate('home.claim');
    this.projectsBtn = this.transloco.translate('home.projectsBtn');
    this.contactBtn = this.transloco.translate('home.contactBtn');
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.typingDone = true;
    }, 3000);
  }

  onFirstTypingFinish(): void {
    this.typing1Done = true;
    this.typing2Started = true;
  }
}
