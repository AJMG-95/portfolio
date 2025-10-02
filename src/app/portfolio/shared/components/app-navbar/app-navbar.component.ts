import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  ViewChild,
  computed,
  inject,
  signal,
  HostListener,
} from '@angular/core';
import {
  ActivatedRoute,
  Router,
  RouterLink,
  RouterLinkActive,
  NavigationEnd,
} from '@angular/router';
import { filter } from 'rxjs';
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

  // Estado del dropdown móvil
  isOpen = signal(false);

  // Referencias al contenedor y al botón del dropdown
  @ViewChild('mobileDropdown', { static: false }) ddRef?: ElementRef<HTMLElement>;
  @ViewChild('mobileTrigger', { static: false }) triggerRef?: ElementRef<HTMLButtonElement>;

  constructor() {
    // Cerrar también si se navega desde cualquier otro punto de la app
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

        // Para home ('') usamos './' para que routerLinkActive funcione bien
        const commands = path === '' ? ['./'] : [path];

        const tree = this.#router.createUrlTree(commands, { relativeTo: this.#route });
        const url = this.#router.serializeUrl(tree);

        return { titleKey, path, url, commands, exact: true };
      });
  });

  // Toggle del dropdown móvil
  toggleMenu() {
    this.isOpen.update(v => !v);
  }

  // Cierra el dropdown
  closeMenu() {
    if (this.isOpen()) {
      this.isOpen.set(false);
      this.triggerRef?.nativeElement?.blur();
    }
  }

  // Navega programáticamente y cierra el menú al terminar
  navigate(link: NavRoute, ev: MouseEvent) {
    ev.preventDefault();
    this.#router.navigate(link.commands, { relativeTo: this.#route })
      .finally(() => this.closeMenu());
  }

  // Click fuera → cerrar
  @HostListener('document:click', ['$event'])
  onDocClick(ev: MouseEvent) {
    if (!this.isOpen()) return;
    const root = this.ddRef?.nativeElement;
    const target = ev.target as Node | null;
    if (root && target && !root.contains(target)) this.closeMenu();
  }

  // Esc → cerrar
  @HostListener('document:keydown.escape')
  onEsc() {
    this.closeMenu();
  }
}
