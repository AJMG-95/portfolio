// ============================================================
// HERO: tipado + datos (con claves i18n para Transloco)
// ============================================================

export interface SocialLink {
  kind: 'linkedin' | 'github' | 'x' | 'website' | 'mail' | 'phone';
  url: string;
  labelKey?: string; // ej: 'hero.social.linkedin'
  icon?: string;     // ruta a icono si quieres (opcional)
}

export interface ContactMethod {
  kind: 'email' | 'phone' | 'whatsapp' | 'telegram';
  value: string;           // ej: email o teléfono
  display?: string;        // cómo mostrarlo si difiere de value
  ariaLabelKey?: string;   // i18n para accesibilidad
}

export interface HeroProfile {
  /** Nombre completo (no traducible normalmente) */
  name: string;

  /** Claves i18n */
  titleKey: string;        // ej: 'hero.title' -> "Frontend Developer"
  taglineKey?: string;     // ej: 'hero.tagline'
  locationKey?: string;    // ej: 'hero.location'
  statusKey?: string;      // ej: 'hero.status.open_to_work'

  /** Datos de contacto básicos */
  email?: string;
  phone?: string;

  /** Redes sociales / enlaces relevantes */
  social: SocialLink[];

  /** Foto/Avatar principal */
  photo?: string;

  /** Botones principales (CTA) */
  ctas?: Array<{
    key: string;     // ej: 'hero.cta.contact_me'
    href?: string;   // link externo
    download?: boolean; // para CV
  }>;

  /** CV */
  resumeUrl?: string;   // PDF o Drive

  /** Destacados breves (bullets) -> claves i18n */
  highlightsKeys?: string[]; // ['hero.highlights.0', 'hero.highlights.1', ...]

  /** Datos rápidos (con i18n para etiqueta y valor opcional) */
  quickStats?: Array<{
    labelKey: string;     // ej: 'hero.stats.experience'
    valueKey?: string;    // ej: 'hero.stats.experience_value'
    value?: string | number; // si prefieres un literal en vez de valueKey
  }>;

  /** Métodos de contacto directos (para menús rápidos, aria, etc.) */
  contactMethods?: ContactMethod[];
}

export const Hero: HeroProfile = {
  name: 'Antonio Jesús Marchena Guerrero',

  // i18n
  titleKey: 'hero.title',
  taglineKey: 'hero.tagline',
  locationKey: 'hero.location',
  statusKey: 'hero.status.open_to_work',

  // contacto básico
  email: 'antonioj.marchena.dev@gmail.com',
  phone: '+34 634 81 76 19',

  // redes
  social: [
    {
      kind: 'linkedin',
      url: 'https://linkedin.com/in/aj-marchena',
      labelKey: 'hero.social.linkedin',
      icon: 'assets/images/more-icons/linkedIn.webp',
    },
    {
      kind: 'github',
      url: 'https://github.com/AJMG-95',
      labelKey: 'hero.social.github',
      icon: 'assets/images/technologies/github_logo.webp',
    },
    {
      kind: 'mail',
      url: 'mailto:antonioj.marchena.dev@gmail.com',
      labelKey: 'hero.social.email',
      icon: 'assets/images/more-icons/email.webp',
    },
    {
      kind: 'phone',
      url: 'tel:+34634817619',
      labelKey: 'hero.social.phone',
      icon: 'assets/images/more-icons/phone.webp',
    },
  ],

  photo: 'assets/images/me/photos/meSuitPhoto.webp',

  // CTA principales
  ctas: [
    { key: 'hero.cta.contact_me', href: 'mailto:antonioj.marchena.dev@gmail.com' },
    { key: 'hero.cta.download_cv', href: 'assets/docs/Antonio_Marchena_CV.pdf', download: true },
  ],

  // CV directo (por si quieres usar un botón único)
  resumeUrl: 'assets/docs/Antonio_Marchena_CV.pdf',

  // destacados (claves i18n)
  highlightsKeys: [
    'hero.highlights.0',
    'hero.highlights.1',
    'hero.highlights.2',
  ],

  // métricas rápidas (usa valueKey o value literal)
  quickStats: [
    { labelKey: 'hero.stats.experience', valueKey: 'hero.stats.experience_value' },
   /*  { labelKey: 'hero.stats.projects', valueKey: 'hero.stats.projects_value' }, */
  ],

  // métodos de contacto (útiles para menús contextuales y aria)
  contactMethods: [
    {
      kind: 'email',
      value: 'antonioj.marchena.dev@gmail.com',
      ariaLabelKey: 'hero.aria.email_me',
    },
    {
      kind: 'phone',
      value: '+34 634 81 76 19',
      display: '+34 634 81 76 19',
      ariaLabelKey: 'hero.aria.call_me',
    },
  ],
};
