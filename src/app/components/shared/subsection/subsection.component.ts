import { Component, Input } from '@angular/core';
import { TranslocoModule } from '@jsverse/transloco';

@Component({
  selector: 'app-subsection',
  standalone: true,
  imports: [TranslocoModule],
  templateUrl: './subsection.component.html',
  styleUrl: './subsection.component.css'
})
export class SubsectionComponent {
  @Input() titleKey!: string;
}
