import { ChangeDetectionStrategy, Component, computed, effect, input, output, signal } from '@angular/core';
import { TranslocoPipe } from '@jsverse/transloco';

@Component({
  selector: 'about-tabs',
  imports: [TranslocoPipe],
  templateUrl: './about-tabs.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AboutTabsComponent {
  tabs = input<string[]>()
  activeIndexChange = output<number>();


  #_activeIndex = signal(0);

  activeIndex = computed(() => this.#_activeIndex());

  constructor() {
    // Si cambia la lista de tabs y el índice no es válido, volvemos a 0
    effect(() => {
      const t = this.tabs();
      if (!t?.length || this.#_activeIndex() > t.length - 1) {
        this.#_activeIndex.set(0);
      }
    });
  }

  select(i: number) {
    if (i !== this.#_activeIndex()) {
      this.#_activeIndex.set(i);
      this.activeIndexChange.emit(i);
    }
  }

  hoverColorClasses = [
    'hover:bg-primary/10 hover:border-primary ',
    'hover:bg-info/10 hover:border-info',
    'hover:bg-accent/10 hover:border-accent',
  ];

  activeColorClasses = [
    'shadow-md shadow-primary/10 border-primary',
    'shadow-md shadow-info/10  border-info',
    'shadow-md shadow-accent/10  border-accent',
  ];

  // Base común a todos los tabs (sin colores)
  private readonly baseTab =
    'rounded-xl px-3 py-2 transition duration-300 shadow-md ' +
    'active:animate-bounce-scale active:scale-85 ' +
    'hover:border-t-0 hover:border-l-0 hover:border-r hover:border-b';

  // Devuelve todas las clases para el tab i (sin usar ngClass)
  tabClasses(i: number): string {
    const base = this.baseTab;
    const hover = this.hoverColorClasses[i] ?? '';
    const isActive = this.activeIndex() === i;

    const activeCommon = isActive ? ' border-t border-l font-semibold scale-105' : '';
    const activeColor = isActive ? (this.activeColorClasses[i] ?? '') : '';

    return [base, hover, activeCommon, activeColor].join(' ').trim();
  }
 }
