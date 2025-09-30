// src/app/portfolio/components/skills/soft-skills-grid/soft-skills-grid.component.ts
import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { TranslocoPipe } from '@jsverse/transloco';
import type { SoftSkill } from '@data/soft-skills.data';

@Component({
  selector: 'soft-skills-grid',
  standalone: true,
  imports: [TranslocoPipe],
  templateUrl: './soft-skills-grid.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SoftSkillsGridComponent {
  items = input.required<SoftSkill[]>();
}
