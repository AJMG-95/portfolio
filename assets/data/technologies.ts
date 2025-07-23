export interface Technology {
  name: string;
  logo: string;
}

export const technologies = {
  frontendLanguages: [
    { name: 'TypeScript' },
    { name: 'JavaScript' },
    { name: 'HTML5' },
    { name: 'CSS3' },
  ],
  backendLanguages: [
    { name: 'Java' },
    { name: 'Python' },
    { name: 'PHP' },
  ],
  frameworks: [
    { name: 'Angular' },
    { name: 'React'},
    { name: 'Flutter'},
    { name: 'Laravel'},
    { name: 'Tailwind CSS' },
    { name: 'Bootstrap' },
  ],
  tools: [
    { name: 'Git' },
    { name: 'GitHub' },
    { name: 'PostgreSQL' },
  ],
  management: [
    { name: 'Asana' },
    { name: 'Monday' },
  ],
};
