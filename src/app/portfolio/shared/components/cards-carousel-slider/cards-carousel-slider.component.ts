import { ChangeDetectionStrategy, Component, Directive, ElementRef, HostListener, Input, ViewChild } from '@angular/core';

@Directive({
  selector: '[carouselItem]',
  standalone: true
})
export class CarouselItemDirective {
  constructor(el: ElementRef<HTMLElement>) {
    const node = el.nativeElement;
    node.classList.add('shrink-0', 'snap-start');
  }
}

@Component({
  selector: 'cards-carousel',
  standalone: true,
  imports: [],
  templateUrl: './cards-carousel-slider.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CardsCarouselSliderComponent {
  @ViewChild('viewport', { static: true }) viewport!: ElementRef<HTMLElement>;
  @Input() ariaLabel = 'Cards carousel';

  /** Estilo del scrollbar: 'auto' (nativo), 'thin' (fino), 'hidden' (oculto) */
  @Input() scrollbar: 'auto' | 'thin' | 'hidden' = 'thin';

  private get el(): HTMLElement { return this.viewport.nativeElement; }

  next() {
    this.el.scrollBy({ left: this.el.clientWidth * 0.9, behavior: 'smooth' });
  }
  prev() {
    this.el.scrollBy({ left: -this.el.clientWidth * 0.9, behavior: 'smooth' });
  }

  // Navegación con teclado cuando el viewport tiene foco
  @HostListener('keydown', ['$event'])
  onKey(ev: KeyboardEvent) {
    if (document.activeElement !== this.el) return;
    if (ev.key === 'ArrowRight') { ev.preventDefault(); this.next(); }
    if (ev.key === 'ArrowLeft') { ev.preventDefault(); this.prev(); }
  }
}
