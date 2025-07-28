// src/app/pages/index.ts


export const loadHomePage = () =>
  import('./home/home.component').then((m) => m.HomePage);

export const loadAboutPage = () =>
  import('./about/about.component').then((m) => m.AboutPage);

export const loadProjectsPage = () =>
  import('./projects/projects.component').then((m) => m.ProjectsPage);

export const loadCoursesPage = () =>
  import('./courses/courses.component').then((m) => m.CoursesPage);

export const loadContactPage = () =>
  import('./contact/contact.component').then((m) => m.ContactPage);

export const loadReferencesPage = () =>
  import('./references/references.component').then((m) => m.ReferencesPage);
