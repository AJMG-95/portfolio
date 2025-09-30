import { ChangeDetectionStrategy, Component, computed, input, signal, effect, inject } from '@angular/core';
import { TranslocoPipe } from '@jsverse/transloco';

export type SocialType = 'link' | 'email' | 'phone';

@Component({
  selector: 'social-button',
  standalone: true,
  imports: [TranslocoPipe],
  templateUrl: './social-button.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SocialButtonComponent {
  // Inputs
  labelKey = input<string>('');        // ej. 'hero.social.linkedin'
  value = input.required<string>(); // link o dato (url/email/teléfono)
  iconUrl = input<string>();          // opcional: icono
  type = input<SocialType>();      // opcional: forzar tipo

  // Estado de "copiado"
  readonly copied = signal(false);
  #timer?: number;

  // Detección de tipo si no se fuerza
  readonly kind = computed<SocialType>(() => {
    const forced = this.type();
    if (forced) return forced;

    const raw = (this.value() || '').trim();

    if (/^mailto:/i.test(raw) || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(raw)) return 'email';
    if (/^tel:/i.test(raw) || /^\+?[0-9][0-9\s\-().]{3,}$/.test(raw)) return 'phone';
    return 'link';
  });

  // href final al que navegar
  readonly href = computed<string>(() => {
    const v = (this.value() || '').trim();
    const k = this.kind();

    if (k === 'email') {
      return v.startsWith('mailto:') ? v : `mailto:${v}`;
    }
    if (k === 'phone') {
      // Normalizar a tel:+34... (mantiene símbolos válidos)
      return v.startsWith('tel:') ? v : `tel:${v.replace(/\s+/g, '')}`;
    }
    // link
    return v;
  });

  // target/rel sólo para enlaces web
  readonly target = computed<string | null>(() => (this.kind() === 'link' ? '_blank' : null));
  readonly rel = computed<string | null>(() => (this.kind() === 'link' ? 'noopener' : null));

  // Texto tooltip por defecto
  tooltip(): string {
    const k = this.kind();
    if (k === 'email') return 'Email · click para copiar y abrir';
    if (k === 'phone') return 'Teléfono · click para copiar y llamar';
    return 'Enlace · click para copiar y abrir';
  }

  // Click: copiar + navegar
  async onClick(ev: MouseEvent) {
    ev.preventDefault();

    const valueToCopy = this.kind() === 'link' ? this.value() : this.href(); // para mailto/tel copiamos el raw útil
    await this.copyToClipboard(valueToCopy);

    // toast 1.5s
    this.showCopiedToast();

    // Navegar después de copiar
    const href = this.href();
    const k = this.kind();
    if (k === 'link') {
      window.open(href, '_blank', 'noopener');
    } else {
      // para mailto/tel cambiamos location para invocar el handler del sistema
      window.location.href = href;
    }
  }

  private async copyToClipboard(text: string) {
    try {
      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(text);
        return;
      }
    } catch { }
    // Fallback
    const ta = document.createElement('textarea');
    ta.value = text;
    ta.setAttribute('readonly', '');
    ta.style.position = 'fixed';
    ta.style.opacity = '0';
    document.body.appendChild(ta);
    ta.select();
    try { document.execCommand('copy'); } catch { }
    document.body.removeChild(ta);
  }

  private showCopiedToast() {
    this.copied.set(true);
    window.clearTimeout(this.#timer);
    this.#timer = window.setTimeout(() => this.copied.set(false), 1500);
  }
}
