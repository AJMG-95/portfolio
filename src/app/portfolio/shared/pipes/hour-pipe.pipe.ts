import { Pipe, type PipeTransform } from '@angular/core';
import { isEmpty } from 'rxjs';

@Pipe({
  name: 'appHourPipe',
})
export class HourPipePipe implements PipeTransform {

  transform(value: string): string {
    if (!value.trim()) return '';
    if (value.trim().includes(':')) {
      const array = value.trim().split(':');
      const h = array[0].trim();
      const min = array[1].trim();
      return `${h}h ${min}min`;
    }
    return `${value}h`;

  }

}
