import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { TranslocoPipe } from '@jsverse/transloco';

/**
 * Entrada compatible con los dos esquemas:
 * - Nuevo: logoUrl, color (light), darkColor
 * - Legacy: logo, lightColor
 */
type InputChip = {
  id: number;
  name: string;
  // Nuevo
  logoUrl?: string;
  color?: string;
  darkColor?: string;
  // Legacy (compat)
  logo?: string;
  lightColor?: string;
};

type ViewChip = {
  id: number;
  name: string;
  logoUrl?: string;
  bgClasses: string[]; // por si lo necesitas en otros sitios
  bgClass: string;     // clases listas para [class]
};

@Component({
  selector: 'tech-chips',
  standalone: true,
  imports: [TranslocoPipe],
  templateUrl: './tech-chips.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TechChipsComponent {
  items = input.required<InputChip[]>();
  titleKey = input<string>();

  // Normaliza items a un VM coherente (logo + clases light/dark)
  readonly vm = computed<ViewChip[]>(() => {
    const inItems = this.items() ?? [];
    return inItems.map<ViewChip>((t) => {
      const logoUrl = t.logoUrl ?? t.logo;

      // Construye clases de fondo
      const classes: string[] = [];

      // Legacy: lightColor ya podía incluir dark:...
      if (t.lightColor) classes.push(...splitClasses(t.lightColor));

      // Nuevo: color (light)
      if (t.color) classes.push(...splitClasses(t.color));

      // Nuevo: darkColor → garantiza prefijo dark:
      if (t.darkColor) {
        const darks = splitClasses(t.darkColor).map(c =>
          c.startsWith('dark:') ? c : `dark:${c}`
        );
        classes.push(...darks);
      }

      // Fallback
      if (classes.length === 0) classes.push('bg-base-200');

      const unique = uniqueClasses(classes);
      return {
        id: t.id,
        name: t.name,
        logoUrl,
        bgClasses: unique,
        bgClass: unique.join(' '),
      };
    });
  });
}

// Utils
function splitClasses(s?: string): string[] {
  return (s ?? '').trim().split(/\s+/).filter(Boolean);
}
function uniqueClasses(arr: string[]): string[] {
  return Array.from(new Set(arr));
}
