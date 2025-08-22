import { NgClass, NgIf } from '@angular/common';
import { Component, computed, input } from '@angular/core';

@Component({
  selector: 'progress-pill',
  standalone: true,
  imports: [NgClass, NgIf],
  templateUrl: './progress-pill.component.html',
  styleUrl: './progress-pill.component.css'
})
export class ProgressPillComponent {
  // Inputs (Angular 16/20 signals)
  percentage = input(0);
  label = input<string>('');          // Texto dentro de la barra (Transloco desde el padre)
  compact = input<boolean>(false);    // Para tamaños reducidos en la cara trasera

  clamped = computed(() => {
    const n = Number(this.percentage());
    if (isNaN(n)) return 0;
    return Math.max(0, Math.min(100, Math.round(n)));
  });

  barClass = computed(() => {
    const p = this.clamped();
    if (p === 100) return 'bg-green-600';
    if (p >= 75) return 'bg-blue-600';
    if (p >= 50) return 'bg-yellow-300';
    if (p >= 25) return 'bg-orange-500';
    return 'bg-red-500';
  });
}
