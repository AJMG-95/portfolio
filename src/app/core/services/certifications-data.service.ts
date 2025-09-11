import { Injectable } from '@angular/core';

export interface CertificationData {
  id: number;
  technologyIds?: number[];
  logoId: number;
  durationHours?: number;
  completionPercentage?: number;
  certificateId?: string;
  url?: string;
  certificationImage?: string;
  collaborators?: string[];
}

@Injectable({ providedIn: 'root' })
export class CertificationsService {
  private certifications: CertificationData[] = [
    {
      id: 1,
      technologyIds: [15],
      logoId: 15,
      durationHours: 50.5,
      completionPercentage: 100,
      certificateId: 'UC-d31dec52-7b2b-47d9-87f0-ff14b391dd39',
      url: 'https://ude.my/UC-d31dec52-7b2b-47d9-87f0-ff14b391dd39',
      certificationImage:
        'assets/images/courses/certifications/Flutter-Movi-lDeCeroAExperto_FernandoHerrera.png',
    },
    {
      id: 2,
      technologyIds: [16, 13, 23], // Laravel, PHP, Clean Architecture
      logoId: 16,
      durationHours: 6,
      completionPercentage: 100,
      url: 'https://openwebinars.net/cert/yAnB',
      certificationImage:
        'assets/images/courses/certifications/certificado_laboratorio_crud_en_laravel_9_con_test-driven_development_(tdd).png',
    },
    {
      id: 3,
      technologyIds: [13],
      logoId: 13,
      durationHours: 8,
      completionPercentage: 100,
      certificationImage:
        'assets/images/courses/certifications/certificado_curso_de_php__ampliando_conceptos.png',
    },
    {
      id: 4,
      technologyIds: [16, 13, 23],
      logoId: 16,
      durationHours: 1,
      completionPercentage: 100,
      url: 'https://openwebinars.net/cert/r3aKQ',
      certificationImage:
        'assets/images/courses/certifications/certificado_test-driven_development_en_laravel.png',
    },
    {
      id: 5,
      technologyIds: [13, 23],
      logoId: 13,
      durationHours: 1,
      completionPercentage: 100,
      certificationImage:
        'assets/images/courses/certifications/certificado_fundamentos_de_test-driven_development.png',
    },
    {
      id: 6,
      technologyIds: [13],
      logoId: 13,
      durationHours: 9,
      completionPercentage: 100,
      certificationImage:
        'assets/images/courses/certifications/certificado_curso_de_php_para_principiantes.png',
    },
    {
      id: 7,
      technologyIds: [26],
      logoId: 26,
      durationHours: 7,
      completionPercentage: 100,
      certificationImage:
        'assets/images/courses/certifications/certificado_curso_de_sql_desde_cero.png',
    },
    {
      id: 8,
      logoId: 101,
      certificateId: '211ES0015302',
      url: 'https://www.cambridgeenglish.org/',
      certificationImage:
        'assets/images/courses/certifications/english-B2-cambridget.jpeg',
    },
    {
      id: 9,
      logoId: 102,
      durationHours: 24,
      completionPercentage: 100,
      certificationImage:
        'assets/images/courses/certifications/curso-emprendimiento.jpeg',
      collaborators: [
        'Innova Atlas',
        'ERA Cultura',
        'Ayuda T Pymes',
        'Surcontrol',
        'FUECA',
      ],
    },
    {
      id: 10,
      logoId: 101,
      certificateId: '211ES0013059',
      url: 'https://www.cambridgeenglish.org/',
      certificationImage:
        'assets/images/courses/certifications/english-B1-cambridget.jpeg',
    },
    {
      id: 11,
      technologyIds: [1, 2, 18, 19],
      logoId: 1,
      durationHours: 33.32,
      completionPercentage: 70,
      url: 'https://www.udemy.com/course/angular-fernando-herrera/?couponCode=MT180825G1',
    },
    {
      id: 12,
      technologyIds: [10, 23],
      logoId: 10,
      durationHours: 37.5,
      completionPercentage: 8.22,
      url: 'https://www.udemy.com/course/nodejs-de-cero-a-experto/?couponCode=MT180825G1',
    },
  ];
  getAll(): CertificationData[] {
    return this.certifications;
  }

  getById(id: number): CertificationData | undefined {
    return this.certifications.find((cert) => cert.id === id);
  }

  getCompleted(): CertificationData[] {
    return this.certifications.filter(
      (cert) => cert.completionPercentage === 100
    );
  }

  getIncomplete(): CertificationData[] {
    return this.certifications.filter(
      (cert) =>
        cert.completionPercentage !== undefined &&
        cert.completionPercentage < 100
    );
  }

  /**
   * Certificados que usan al menos una de las tecnologías indicadas
   * @param techIds IDs de tecnologías a buscar
   */
  filterByTechnologies(techIds: number[]): CertificationData[] {
    return this.certifications.filter((cert) =>
      cert.technologyIds?.some((id) => techIds.includes(id))
    );
  }

  /**
   * Certificados que contienen todas las tecnologías especificadas
   * (útil para filtros más estrictos)
   */
  filterByAllTechnologies(techIds: number[]): CertificationData[] {
    return this.certifications.filter((cert) =>
      techIds.every((id) => cert.technologyIds?.includes(id))
    );
  }
}
