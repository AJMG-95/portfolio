// src/app/app.routes.ts

import { Routes } from '@angular/router';
import {
  loadHomePage,
  loadAboutPage,
  loadProjectsPage,
  loadCoursesPage,
  loadContactPage,
  loadReferencesPage,
} from './pages/pages';

export const routes: Routes = [
  { path: '', loadComponent: loadHomePage },
  { path: 'about', loadComponent: loadAboutPage },
  { path: 'projects', loadComponent: loadProjectsPage },
  { path: 'courses', loadComponent: loadCoursesPage },
  { path: 'contact', loadComponent: loadContactPage },
  { path: 'references', loadComponent: loadReferencesPage },
  { path: '**', redirectTo: '', pathMatch: 'full' },
];
