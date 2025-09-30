import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AppNavbarComponent } from 'app/portfolio/shared/components/app-navbar/app-navbar.component';

@Component({
  selector: 'app-portfolio-layout',
  imports: [RouterOutlet, AppNavbarComponent],
  templateUrl: './portfolio-layout.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PortfolioLayoutComponent {}
