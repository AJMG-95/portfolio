import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TranslocoModule } from '@jsverse/transloco';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [RouterModule, TranslocoModule],
  templateUrl: './footer.component.html',
})
export class FooterComponent {
  public currentYear = new Date().getFullYear();
}
