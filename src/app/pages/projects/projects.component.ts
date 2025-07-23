import { Component, computed, inject } from '@angular/core';
import { TranslocoModule, TranslocoService } from '@jsverse/transloco';
import { toSignal } from '@angular/core/rxjs-interop';

import { PageWrapper } from '../../components/shared/page-wrapper/page-wrapper.component';

import { NgFor } from '@angular/common';
import { ProjectCardComponent } from '../../components/proyects/project-card/project-card.component';

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [PageWrapper, TranslocoModule, ProjectCardComponent, NgFor],
  templateUrl: './projects.component.html',
  styleUrl: './projects.component.css'
})
export class ProjectsPage {
  private transloco = inject(TranslocoService);

  translations = toSignal(this.transloco.selectTranslateObject('myProjects'), { initialValue: {} });

  projects = computed(() => this.translations()?.projects ?? []);
  statusLabels = computed(() => this.translations()?.status ?? {});
}
