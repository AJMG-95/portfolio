import { Routes } from '@angular/router';
import { PortfolioLayoutComponent } from './layouts/portfolio-layout/portfolio-layout.component';


export const portfolioRoutes: Routes = [
  {
    path: '',
    component: PortfolioLayoutComponent,
    children: [
      {
        path: '',
        title: 'home',
        loadComponent: () => import('@page/home-page/home-page.component')
      },
      {
        path: 'about',
        title: 'about',
        loadComponent: () => import('@page/about-page/about-page.component')
      },
      {
        path: 'projects',
        title: 'projects',
        loadComponent: () => import('@page/projects-page/projects-page.component'),
      },
      {
        path: 'courses',
        title: 'courses',
        loadComponent: () => import('@page/certifications-page/certifications-page.component'),
      },
/*       {
        path: 'contact',
        title: 'contact',
        loadComponent: () => import('@page/contact-page/contact-page.component')
      }, */
      {
        path: 'references',
        title: 'references',
        loadComponent: () => import('@page/references-page/references-page.component'),
      },
      { path: '**', redirectTo: '' },
    ],
  },
];

export default portfolioRoutes;
