import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { LanguageSwitcher } from '../language-switcher/language-switcher.component';
import { ThemeToggle } from '../theme-toggle/theme-toggle.component';
import { NavLinkComponent } from '../nav-link/nav-link.component';


@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    LanguageSwitcher,
    ThemeToggle,
    NavLinkComponent
  ],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {

  isMobileMenuOpen = false;
  isSettingsMenuOpen = false;


  toggleMobileMenu(): void {
    this.isMobileMenuOpen = !this.isMobileMenuOpen;
  }


  toggleSettingsMenu(): void {
    this.isSettingsMenuOpen = !this.isSettingsMenuOpen;
  }
}
