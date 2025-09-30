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
 }
