import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'completionLabel', standalone: true })
export class CompletionLabelPipe implements PipeTransform {
  transform(percentage: number | null | undefined): string {
    const value = percentage ?? 0;

    if (value === 100) return 'certifications.completed';
    if (value < 1) return 'certifications.notStarted';
    return 'certifications.inProgress';
  }
}
