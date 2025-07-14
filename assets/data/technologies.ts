export interface Technology {
  name: string;
  logo: string;
}

export const technologies = {
  frontendLanguages: [
    { name: 'TypeScript', logo: 'assets/logos/typescript.svg' },
    { name: 'JavaScript', logo: 'assets/logos/javascript.svg' },
    { name: 'HTML5', logo: 'assets/logos/html5.svg' },
    { name: 'CSS3', logo: 'assets/logos/css3.svg' },
  ],
  backendLanguages: [
    { name: 'Java', logo: 'assets/logos/java.svg' },
    { name: 'Python', logo: 'assets/logos/python.svg' },
    { name: 'PHP', logo: 'assets/logos/php.svg' },
  ],
  frameworks: [
    { name: 'Angular', logo: 'assets/logos/angular.svg' },
    { name: 'React', logo: 'assets/logos/react.svg' },
    { name: 'Flutter', logo: 'assets/logos/flutter.svg' },
    { name: 'Laravel', logo: 'assets/logos/laravel.svg' },
    { name: 'Tailwind CSS', logo: 'assets/logos/tailwindcss.svg' },
    { name: 'Bootstrap', logo: 'assets/logos/bootstrap.svg' },
  ],
  tools: [
    { name: 'Git', logo: 'assets/logos/git.svg' },
    { name: 'GitHub', logo: 'assets/logos/github.svg' },
    { name: 'PostgreSQL', logo: 'assets/logos/postgresql.svg' },
  ],
  management: [
    { name: 'Asana', logo: 'assets/logos/asana.svg' },
    { name: 'Monday', logo: 'assets/logos/monday.svg' },
  ],
};
