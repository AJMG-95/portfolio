// ============================================================
// RECOMMENDATIONS: modelos + datos
// - Referencias con nombre + LinkedIn (+campos opcionales traducibles vía i18n)
// - Cartas de recomendación (pueden ser links a Drive, PDFs, imágenes…)
// ============================================================

/** Persona de referencia */
export interface ReferenceItem {
  id: number;

  /** Nombre de la referencia (propio, normalmente NO se traduce) */
  name: string;

  /** URL al perfil de LinkedIn (opcional) */
  linkedin?: string;

  /** Empresa/organización (texto libre o clave i18n si lo quieres traducir) */
  company?: string;
  companyKey?: string; // ej. 'companies.controlnet'

  /** Cargo/rol de la referencia (mejor como i18n para ES/EN) */
  titleKey?: string; // ej. 'references.titles.tech_lead'

  /** Relación contigo (mejor como i18n) */
  relationKey?: string; // ej. 'references.relation.manager'

  /** Avatar/foto opcional (ruta a asset) */
  avatarUrl?: string;

  /** Cualquier nota adicional (i18n) */
  noteKey?: string; // ej. 'references.notes.francisco_intro'

  contactKey?: string;      //clave i18n para “Disponible previa solicitud”
}

/** Carta(s) de recomendación */
export interface RecommendationLetter {
  /** Enlace al recurso (Drive, PDF hosteado, imagen, etc.) */
  imageUrl: string;

  /** Tipo de recurso (informativo, por si renders cambian) */
  fileType?: 'link' | 'pdf' | 'image';

  /** Idioma de la carta, si aplica */
  language?: 'es' | 'en';

  /** Fecha (ISO parcial) si aplica */
  date?: string; // 'YYYY' | 'YYYY-MM' | 'YYYY-MM-DD'

  /** Título traducible para mostrar en UI */
  titleKey?: string; // ej. 'references.letter.title'

  companyKey?: string;
}

/** Lista de personas de referencia */
export const references: ReferenceItem[] = [
  {
    id: 1,
    name: 'Francisco Romero-Haupold',
    linkedin: 'https://linkedin.com/in/francisco-romero-haupold-b63740278/',
    companyKey: 'companies.controlnet',
    titleKey: 'references.titles.coo',                 // COO en Controlnet S.L.
    contactKey: 'references.contact.on_request',       // Disponible previa solicitud
  },
  {
    id: 2,
    name: 'Ricardo Pina',
    linkedin: 'https://www.linkedin.com/in/rpinac/',
    companyKey: 'companies.controlnet',
    titleKey: 'references.titles.finance_director',    // Dirección financiera
    contactKey: 'references.contact.on_request',       // Disponible previa solicitud
  },
];

/** Cartas de recomendación (puede haber más de una) */
export const recommendationLetters: RecommendationLetter[] = [
  {
    imageUrl: 'assets/images/references/recommendation-thumbnail.png',
    fileType: 'link',
    language: 'es',
    companyKey: 'companies.controlnet',
    date: '2025-07',
    titleKey: 'references.letter.general',
  },
];
