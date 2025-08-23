// src\app\core\models\certification-view.model.ts
export interface CertificationViewModel {
  id: number;
  title: string;
  issuer?: string;
  type?: string;
  language?: string;
  date?: string;

  certificationImage?: string;
  url?: string;
  certificationUrl?: string;

  durationHours?: number;
  certificateId?: string;
  collaborators?: string[];
  completionPercentage?: number;

  logo?: string;
  techName?: string;

  isTechCourse: boolean;
}
