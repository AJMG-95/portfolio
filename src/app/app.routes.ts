import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', redirectTo: 'ajmg/portfolio', pathMatch: 'full' },

  {
    path: 'ajmg',
    children: [
      {
        path: 'portfolio',
        loadChildren: () =>
          import('./portfolio/portfolio.routes').then(m => m.default),
      },

      // 404 standalone (fuera del layout)
      {
        path: '404',
        loadComponent: () =>
          import('@page/not-found-page/not-found-page.component').then(m => m.default),
      },

      // cualquier otra ruta dentro de /ajmg → 404
      { path: '**', redirectTo: '404' },
    ],
  },

  // cualquier otra ruta global → 404 global
  { path: '**', redirectTo: 'ajmg/404' },
];
