import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  HostListener,
  ViewChild,
  computed,
  inject,
  signal,
} from '@angular/core';
import { ActivatedRoute, Router, RouterLink, RouterLinkActive, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
import { TranslocoPipe } from '@jsverse/transloco';
import { ToggleThemeComponent } from '../toggle-theme/toggle-theme.component';
import { LangSwicherComponent } from '../ lang-swicher/lang-swicher.component';

type NavRoute = {
  titleKey: string;
  path: string;
  url: string;
  commands: any[];
  exact: boolean;
};

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, TranslocoPipe, LangSwicherComponent, ToggleThemeComponent],
  templateUrl: './app-navbar.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppNavbarComponent {
  #router = inject(Router);
  #route = inject(ActivatedRoute);

  // estado del desplegable móvil
  isOpen = signal(false);

  @ViewChild('mobileDropdown', { static: false }) ddRef?: ElementRef<HTMLElement>;
  @ViewChild('mobileTrigger', { static: false }) triggerRef?: ElementRef<HTMLButtonElement>;

  constructor() {
    // Cierra el menú en cada navegación
    this.#router.events
      .pipe(filter((e): e is NavigationEnd => e instanceof NavigationEnd))
      .subscribe(() => this.closeMenu());
  }

  navLinks = computed<NavRoute[]>(() => {
    const children = this.#route.routeConfig?.children ?? [];
    return children
      .filter(r => r.path !== '**')
      .filter(r => !!r.loadComponent)
      .map(r => {
        const path = r.path ?? '';
        const rawTitle = (r.title as string) ?? '';
        const titleKey = rawTitle ? `nav.${rawTitle}` : 'nav.home';
        const commands = path === '' ? ['./'] : [path];
        const tree = this.#router.createUrlTree(commands, { relativeTo: this.#route });
        const url = this.#router.serializeUrl(tree);
        return { titleKey, path, url, commands, exact: true };
      });
  });

  toggleMenu() {
    this.isOpen.update(v => !v);
  }

  closeMenu() {
    if (this.isOpen()) {
      this.isOpen.set(false);
      // quita foco del botón para que daisyUI no reabra por focus
      this.triggerRef?.nativeElement?.blur();
    }
  }

  onLinkClick() {
    this.closeMenu();
  }

  // Cierra al hacer click fuera
  @HostListener('document:click', ['$event'])
  onDocClick(ev: MouseEvent) {
    if (!this.isOpen()) return;
    const root = this.ddRef?.nativeElement;
    if (!root) return;
    const target = ev.target as Node | null;
    if (target && !root.contains(target)) {
      this.closeMenu();
    }
  }

  // Cierra con ESC
  @HostListener('document:keydown.escape')
  onEsc() { this.closeMenu(); }
}
