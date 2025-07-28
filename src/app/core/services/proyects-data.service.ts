// src\app\core\services\proyects-data.service.ts

import { Injectable } from '@angular/core';

export enum ProjectStatus {
  NotStarted = 'notStarted',
  InProgress = 'inProgress',
  Testing = 'testing',
  Completed = 'completed',
  OnHold = 'onHold',
}

export interface ProjectData {
  id: number;
  name: string;
  status: ProjectStatus;
  shortDescription: string;
  longDescription: string;
  technologyIds: number[];
  technologyVersions?: Record<number, string>;
  headerImageUrl: string;
  cornerImageUrl?: string;
  githubUrl: string;
  liveUrl?: string;
  galleryImages: string[];
}

@Injectable({ providedIn: 'root' })
export class ProjectsService {
  private projects: ProjectData[] = [
    {
      id: 1,
      name: 'TodoApp',
      status: ProjectStatus.InProgress,
      shortDescription: 'Gestor de tareas moderno con soporte para subtareas.',
      longDescription:
        'Aplicación web desarrollada en Angular 18 que permite gestionar tareas personales. Incorpora almacenamiento local, soporte para subtareas y un diseño moderno.',
      technologyIds: [1, 3, 4, 5], // Angular, Tailwind, PrimeNG, LocalStorage
      technologyVersions: {
        1: '18.2.13', // Angular
        3: '3.4.17',  // Tailwind
        4: '18.0.2',  // PrimeNG
        // 5 (LocalStorage) no tiene versión
      },
      headerImageUrl: 'assets/images/proyects/todo_app/main.png',
      cornerImageUrl: 'https://avatars.githubusercontent.com/u/139426?v=4',
      githubUrl: 'https://github.com/AJMG-95/todo-app',
      liveUrl: 'https://ajmg-95.github.io/todo-app/todo',
      galleryImages: [
        'assets/images/proyects/todo_app/main.png',
        'assets/images/proyects/todo_app/tasks.png',
      ],
    },
    // Puedes añadir más proyectos aquí
  ];

  getAll(): ProjectData[] {
    return this.projects;
  }

  getById(id: number): ProjectData | undefined {
    return this.projects.find((p) => p.id === id);
  }

  getByStatus(status: ProjectStatus): ProjectData[] {
    return this.projects.filter((p) => p.status === status);
  }

  getByTechnology(techId: number): ProjectData[] {
    return this.projects.filter((p) => p.technologyIds.includes(techId));
  }

  getByTechnologies(techIds: number[]): ProjectData[] {
    return this.projects.filter((p) =>
      techIds.some((id) => p.technologyIds.includes(id))
    );
  }
}
