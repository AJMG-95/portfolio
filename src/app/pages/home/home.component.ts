import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TranslocoModule } from '@jsverse/transloco';
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
export class HomePage implements AfterViewInit {
  @ViewChild('heading') heading!: ElementRef<HTMLElement>;
  typingDone = false;
  typing1Done = false;
  typing2Started = false;

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.typingDone = true;
    }, 3000); // ⚠️ asegúrate de que coincide exactamente con 'typing 3s'
  }



  onFirstTypingFinish(): void {
    this.typing1Done = true;
    this.typing2Started = true;
  }
}
