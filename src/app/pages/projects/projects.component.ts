// src/app/pages/projects/projects.component.ts

import { Component, computed, inject } from '@angular/core';
import { TranslocoModule, TranslocoService } from '@jsverse/transloco';
import { toSignal } from '@angular/core/rxjs-interop';

import { PageWrapper } from '../../components/shared/page-wrapper/page-wrapper.component';
import { NgFor } from '@angular/common';
import { ProjectCardComponent } from '../../components/proyects/project-card/project-card.component';
import { ProjectsService } from '../../core/services/proyects-data.service';

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [PageWrapper, TranslocoModule, ProjectCardComponent, NgFor],
  templateUrl: './projects.component.html',
  styleUrl: './projects.component.css',
})
export class ProjectsPage {
  private transloco = inject(TranslocoService);
  private projectsService = inject(ProjectsService);

  // Traducciones de estado
  translations = toSignal(this.transloco.selectTranslateObject('myProjects'), { initialValue: {} });
  statusLabels = computed(() => this.translations()?.status ?? {});

  // Proyectos reales del servicio
  projects = computed(() => this.projectsService.getAll());
}
