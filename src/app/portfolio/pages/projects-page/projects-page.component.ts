import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ProjectCardComponent } from '@component/projects/project-card/project-card.component';
import { TranslocoPipe } from '@jsverse/transloco';
import { ProjectsService } from '@service/projects.service';
import { CardsCarouselSliderComponent } from 'app/portfolio/shared/components/cards-carousel-slider/cards-carousel-slider.component';

@Component({
  selector: 'app-projects-page',
  standalone: true,
  imports: [TranslocoPipe, ProjectCardComponent, CardsCarouselSliderComponent],
  templateUrl: './projects-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class ProjectsPageComponent {
  #ProjectsSvc = inject(ProjectsService);

  frontProjects$ = toSignal(this.#ProjectsSvc.getProjects({ category: 'frontend', size: 'standard' }));
  miniFrontProjects$ = toSignal(this.#ProjectsSvc.getProjects({ category: 'frontend', size: 'mini' }));
}
