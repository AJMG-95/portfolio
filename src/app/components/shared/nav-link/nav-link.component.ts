import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
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



}
