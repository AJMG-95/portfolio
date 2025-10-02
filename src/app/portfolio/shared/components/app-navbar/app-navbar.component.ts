import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { ActivatedRoute, Router, RouterLink, RouterLinkActive } from '@angular/router';
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

  // 👇 Cierra el dropdown móvil al pulsar un enlace
  closeMobileDropdown() {
    // Solo en móvil (lg:hidden activo)
    if (matchMedia('(min-width: 1024px)').matches) return;
    const el = document.activeElement as HTMLElement | null;
    el?.blur(); // al perder el foco, daisyUI cierra el dropdown
  }
}
