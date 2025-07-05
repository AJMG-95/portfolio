import { Component, Input } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { CommonModule, NgIf } from '@angular/common';
import { TranslocoModule } from '@jsverse/transloco';

@Component({
  selector: 'app-nav-link',
  standalone: true,
  imports: [RouterModule, CommonModule, TranslocoModule],
  templateUrl: './nav-link.component.html'
})
export class NavLinkComponent {
  @Input() link!: string;
  @Input() labelKey!: string;

  isActive = false;

  constructor(private router: Router) { }

  navigate(): void {
    this.router.navigate([this.link]);
  }


}
