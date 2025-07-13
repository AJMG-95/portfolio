// src/app/app.routes.ts

import { Routes } from '@angular/router';
import {
  loadHomePage,
  loadAboutPage,
  loadProjectsPage,
  loadContactPage,
  loadReferencesPage,
} from './pages/pages';

export const routes: Routes = [
  { path: '', loadComponent: loadHomePage },
  { path: 'about', loadComponent: loadAboutPage },
  { path: 'projects', loadComponent: loadProjectsPage },
  { path: 'contact', loadComponent: loadContactPage },
  { path: 'references', loadComponent: loadReferencesPage },
  { path: '**', redirectTo: '', pathMatch: 'full' },
];
