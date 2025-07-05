import { Component, Input } from '@angular/core';

@Component({
  selector: 'section-card',
  standalone: true,
  templateUrl: './section-card.component.html',
  styleUrls: ['./section-card.component.css'],
})
export class SectionCard {
  @Input() title!: string;

  get sectionId(): string {
    return 'section-' + this.title.toLowerCase().replace(/[^a-z0-9]+/g, '-');
  }
}
