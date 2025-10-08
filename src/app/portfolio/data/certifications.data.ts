import { TechRefs } from "../interfaces/technologies.interface";

// =====================
// Modelos / Tipado
// =====================

/** Institución emisora (catálogo) — solo datos técnicos + clave de traducción */
export interface CertInstitution {
  id: number;
  key: string; // i18n key: ej. 'institutions.cambridge' | 'institutions.udemy'
  url?: string;
  logo?: string;
}

export interface Certification {
  id: number,
  type: 'it' | 'lng' | 'other' // certificado tecnologico, de idioma u otro tipo
  track?: 'frontend' | 'backend' | 'mobile',
  institutionId: number, // id de la institucion que expide el certificado
  titleKey: string, // clabe para transloco (i18n)
  levelKey?: string // (i18n) Para definir el nivel de la certificación
  logoUrl?: string // url al logo de la tecnologia u habilidad (principal) tranajada en la certificacion
  durationHours?: string // durancon'h:m' de la certificacion
  completionPercentage?: number // porcentaje de progreso en el curso
  certificateId?: string, // id de la certificacion si es que dismpone
  certificationImage?: string // url a la foto del certificado
  certUrl?: string // url al ccertificado
  courseUrl?: string // url al curos/plataforma
  techRefs?: TechRefs // array de id's de las tecnologias y metodologias trabajadas en el curso
  date?: string // año de obtenmcion
  principles?: string[] // array de ids de los principio de la programacion
}


// =====================
// Catálogo de instituciones (ampliable)
// =====================

export const certInstitutions: CertInstitution[] = [
  {
    id: 1,
    key: 'institutions.cambridge',
    url: 'https://www.cambridgeenglish.org/',
    logo: 'assets/images/companies/logos/university_of_cambridge_logo.webp',
  },
  {
    id: 2,
    key: 'institutions.udemy',
    url: 'https://www.udemy.com/',
    logo: 'assets/images/companies/udemy_logo.webp',
  },
  {
    id: 3,
    key: 'institutions.openwebinars',
    url: 'https://openwebinars.net/',
    logo: 'assets/images/companies/openwebinars_logo.webp',
  },
  {
    id: 4,
    key: 'institutions.uca',
    url: 'https://www.uca.es/',
    logo: 'assets/images/companies/logo_uca_facutad_ccma_3.webp',
  },
];

// =====================
// Certificaciones TECH - FRONTEND
// =====================

export const techCertificationsFrontend: Certification[] = [
  {
    id: 1,
    type: 'it',
    track: 'mobile',
    institutionId: 2, // Udemy
    titleKey: 'certs.tech.flutter.from_zero_to_expert',
    logoUrl: 'assets/images/technologies/flutter_logo.webp',
    durationHours: '50:30',
    completionPercentage: 100,
    certificateId: 'UC-d31dec52-7b2b-47d9-87f0-ff14b391dd39',
    courseUrl: 'https://www.udemy.com/course/flutter-cero-a-experto/?couponCode=KEEPLEARNING',
    certificationImage: 'assets/images/certifications/Flutter-Movi-lDeCeroAExperto_FernandoHerrera.webp',
    techRefs: {
      frontFrameworkIds: [3], // Flutter
      frontLanguageIds: [3],  // Dart
    },
    date: '2025',
    principles: ['1', '2', '5', '6', '8', '10'], // SOLID, DRY, SoC, SRP, Clean Architecture, DDD
  },
  {
    id: 2,
    type: 'it',
    track: 'frontend',
    institutionId: 2, // Udemy
    titleKey: 'certs.tech.angular.from_zero_to_expert',
    logoUrl: 'assets/images/technologies/angular_logo.webp',
    durationHours: '33:32',
    completionPercentage: 100,
    certificateId: ' UC-0ae0bd63-ad6b-4122-96f0-cefad184aeaf',
    certificationImage:
      'assets/images/certifications/certificado_Angular_De_cero_a experto_Edición_2025.webp',
    courseUrl: 'https://www.udemy.com/course/angular-fernando-herrera/?couponCode=MT180825G1',
    techRefs: {
      frontFrameworkIds: [1], // Angular
      frontLanguageIds: [1],  // TypeScript
      uiLibraryIds: [2, 3],   // daisyUI, Tailwind
      clientStorageIds: [1],
    },
    date: '2025',
    principles: ['1', '2', '3', '5', '6'], // SOLID, DRY, KISS, SoC, SRP
  },
  {
    id: 3,
    type: 'it',
    track: 'frontend',
    institutionId: 2, // Udemy
    titleKey: 'certs.tech.angular.pro_next_level',
    logoUrl: 'assets/images/technologies/angular_logo.webp',
    durationHours: '16:15',
    completionPercentage: 36.1,
    certificationImage: 'assets/images/certifications/not_certificated_yet.webp',
    courseUrl: 'https://www.udemy.com/course/angular-pro-siguiente-nivel',
    techRefs: {
      frontFrameworkIds: [1], // Angular
      frontLanguageIds: [1],  // TypeScript
      uiLibraryIds: [3],      // Tailwind
    },
    date: '2025',
    principles: ['16', '18', '19', '5'], // Performance Awareness, i18n, SEO, SoC
  },
  {
    id: 4,
    type: 'it',
    track: 'backend',
    institutionId: 3, // OpenWebinars
    titleKey: 'certs.tech.laravel.crud_lab_tdd',
    logoUrl: 'assets/images/technologies/laravel_logo.webp',
    durationHours: '6',
    completionPercentage: 100,
    certUrl: 'https://openwebinars.net/cert/yAnB',
    certificationImage:
      'assets/images/certifications/certificado_laboratorio_crud_en_laravel_9_con_test-driven_development_(tdd).webp',
    techRefs: {
      backFrameworkIds: [1], // Laravel
      backLanguageIds: [4],  // PHP
      methodologyIds: [23],
    },
    principles: ['9', '8', '2', '6', '5'], // TDD, Clean Architecture, DRY, SRP, SoC
  },
  {
    id: 5,
    type: 'it',
    track: 'backend',
    institutionId: 3, // OpenWebinars
    titleKey: 'certs.tech.php.extending_concepts',
    logoUrl: 'assets/images/technologies/php_logo.webp',
    durationHours: '8',
    completionPercentage: 100,
    certificationImage:
      'assets/images/certifications/certificado_curso_de_php__ampliando_conceptos.webp',
    techRefs: {
      backLanguageIds: [4], // PHP
    },
    principles: ['2', '3', '6'], // DRY, KISS, SRP
  },
  {
    id: 6,
    type: 'it',
    track: 'backend',
    institutionId: 3, // OpenWebinars
    titleKey: 'certs.tech.laravel.tdd',
    logoUrl: 'assets/images/technologies/laravel_logo.webp',
    durationHours: '1',
    completionPercentage: 100,
    certUrl: 'https://openwebinars.net/cert/r3aKQ',
    certificationImage:
      'assets/images/certifications/certificado_test-driven_development_en_laravel.webp',
    techRefs: {
      backFrameworkIds: [1], // Laravel
      backLanguageIds: [4],  // PHP
      methodologyIds: [23],
    },
    principles: ['9', '8', '2', '6'], // TDD, Clean Architecture, DRY, SRP
  },
  {
    id: 7,
    type: 'it',
    track: 'backend',
    institutionId: 3, // OpenWebinars
    titleKey: 'certs.tech.php.tdd_fundamentals',
    logoUrl: 'assets/images/technologies/php_logo.webp',
    durationHours: '1',
    completionPercentage: 100,
    certificationImage:
      'assets/images/certifications/certificado_fundamentos_de_test-driven_development.webp',
    techRefs: {
      backLanguageIds: [4], // PHP
      methodologyIds: [1],
    },
    principles: ['9', '2', '3', '6'], // TDD, DRY, KISS, SRP
  },
  {
    id: 8,
    type: 'it',
    track: 'backend',
    institutionId: 3, // OpenWebinars
    titleKey: 'certs.tech.php.beginners',
    logoUrl: 'assets/images/technologies/php_logo.webp',
    durationHours: '9',
    completionPercentage: 100,
    certificationImage:
      'assets/images/certifications/certificado_curso_de_php_para_principiantes.webp',
    techRefs: {
      backLanguageIds: [4], // PHP
    },
    principles: ['2', '3'], // DRY, KISS
  },
  {
    id: 9,
    type: 'it',
    track: 'backend',
    institutionId: 3, // OpenWebinars
    titleKey: 'certs.tech.sql.from_zero',
    logoUrl: 'assets/images/technologies/sql_logo.webp',
    durationHours: '7',
    completionPercentage: 100,
    certificationImage:
      'assets/images/certifications/certificado_curso_de_sql_desde_cero.webp',
    techRefs: {
      dataTechIds: [26], // SQL
    },
    principles: ['15'], // Consistency (consistencia de datos/modelado)
  },
  {
    id: 10,
    type: 'it',
    track: 'backend',
    institutionId: 2, // Udemy
    titleKey: 'certs.tech.node.from_zero_to_expert',
    logoUrl: 'assets/images/technologies/nodejs_logo.webp',
    durationHours: '37:30',
    completionPercentage: 12.34,
    certificationImage: 'assets/images/certifications/not_certificated_yet.webp',
    courseUrl: 'https://www.udemy.com/course/nodejs-de-cero-a-experto/?couponCode=MT180825G1',
    techRefs: {
      backLanguageIds: [2], // NodeJs (runtime)
      methodologyIds: [23],
    },
    principles: ['2', '6', '8', '12', '14'], // DRY, SRP, Clean Architecture, Defensive Prog., Error Handling
  },
  {
    id: 11,
    type: 'lng',
    institutionId: 1, // Cambridge
    titleKey: 'certs.language.english.title',
    levelKey: 'certs.language.level.b1',
    logoUrl: 'assets/images/companies/logos/university_of_cambridge_logo.webp',
    certificateId: '211ES0013059',
    certificationImage: 'assets/images/certifications/english-B1-cambridget.webp',
    date: '2014',
  },
  {
    id: 12,
    type: 'lng',
    institutionId: 1, // Cambridge
    titleKey: 'certs.language.english.title',
    levelKey: 'certs.language.level.b2',
    logoUrl: 'assets/images/companies/logos/university_of_cambridge_logo.webp',
    certificateId: '211ES0015302',
    certificationImage: 'assets/images/certifications/english-B2-cambridget.webp',
    date: '2019',
  },
  {
    id: 13,
    type: 'other',
    institutionId: 4, // UCA
    titleKey: 'certs.entrepreneurship_program',
    logoUrl: 'assets/images/companies/logos/logo_uca_facutad_ccma.webp',
    durationHours: '24',
    completionPercentage: 100,
    certificationImage: 'assets/images/certifications/curso-emprendimiento.webp',
    date: '2018',
  },
];
