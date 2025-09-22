// src/app/pages/projects/projects.component.ts

import { Component, computed, inject } from '@angular/core';
import { TranslocoModule, TranslocoService } from '@jsverse/transloco';
import { toSignal } from '@angular/core/rxjs-interop';
import { ProjectsService } from '@core/services/proyects-data.service';
import { PageWrapper } from '@shared/page-wrapper/page-wrapper.component';
import { ProjectCardComponent } from '@project/project-card/project-card.component';



@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [PageWrapper, TranslocoModule, ProjectCardComponent, ],
  templateUrl: './projects.component.html',
  styleUrl: './projects.component.css',
})
export class ProjectsPage {
  #transloco = inject(TranslocoService);
  #projectsService = inject(ProjectsService);

  // Traducciones de estado
  translations = toSignal(this.#transloco.selectTranslateObject('myProjects'), { initialValue: {} });
  statusLabels = computed(() => this.translations()?.status ?? {});

  // Proyectos reales del servicio
  projects = computed(() => {
    const translated = this.translations()?.projects ?? [];
    const technical = this.#projectsService.getAll();

    return technical.map((project) => {
      const match = translated.find((t: any) => t.id === project.id);
      return {
        ...project,
        name: match?.name ?? 'Sin nombre',
        shortDescription: match?.shortDescription ?? '',
        longDescription: match?.longDescription ?? '',
      };
    });
  });

}
