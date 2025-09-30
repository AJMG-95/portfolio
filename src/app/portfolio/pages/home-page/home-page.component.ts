import { AsyncPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { TranslocoPipe } from '@jsverse/transloco';
import { HeroService } from '@service/hero.service';
import { LanguageService } from '@service/language.service';
import { SocialButtonComponent } from 'app/portfolio/shared/components/social-button/social-button.component';

@Component({
  selector: 'app-home-page',
  imports: [TranslocoPipe, AsyncPipe, SocialButtonComponent],
  templateUrl: './home-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class HomePageComponent {
  #heroSvc = inject(HeroService);
  #langSvc = inject(LanguageService);

  hero$ = this.#heroSvc.getHero();
  social$ = this.#heroSvc.getSocialLinks();
  ctas$ = this.#heroSvc.getCTAs();
  stats$ = this.#heroSvc.getQuickStats();

  cvUrl = computed(() =>
    this.#langSvc.isEnglish()
      ? 'assets/docs/Resume_AntonioJesusMarchena.pdf'     // EN
      : 'assets/docs/CV_AntonioJesusMarchena.pdf'         // ES
  );
 }
