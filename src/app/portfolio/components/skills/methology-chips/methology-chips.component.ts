// src/app/portfolio/components/skills/methodology-chips/methodology-chips.component.ts
import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { TranslocoPipe } from '@jsverse/transloco';
import type { WorkMethodology } from '@data/work-methodologies.data';

@Component({
  selector: 'methodology-chips',
  standalone: true,
  imports: [TranslocoPipe],
  templateUrl: './methology-chips.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MethodologyChipsComponent {
  items = input.required<WorkMethodology[]>();
}
