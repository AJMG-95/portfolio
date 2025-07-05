import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { LanguageSwitcher } from '../language-switcher/language-switcher.component';
import { ThemeToggle } from '../theme-toggle/theme-toggle.component';
import { NavLinkComponent } from '../nav-link/nav-link.component';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterModule, LanguageSwitcher, ThemeToggle, NavLinkComponent],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent { }
