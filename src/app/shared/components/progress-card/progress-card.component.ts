import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-progress-card',
  standalone: true,
  imports: [],
  templateUrl: './progress-card.component.html',
  styleUrl: './progress-card.component.css'
})
export class ProgressCardComponent {
  @Input() imageUrl!: string;
  @Input() title!: string;
  @Input() author!: string;
  @Input() totalVideos!: number;
  @Input() lastWatchedVideo!: number;

  get completionPercentage(): number {
    if (!this.totalVideos || this.totalVideos === 0) return 0;
    const percentage = (this.lastWatchedVideo / this.totalVideos) * 100;
    return Math.min(100, Math.round(percentage));
  }
}
