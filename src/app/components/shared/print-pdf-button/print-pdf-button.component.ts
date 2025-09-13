import { Component } from '@angular/core';
import { TranslocoModule } from '@jsverse/transloco';

@Component({
  selector: 'print-pdf-button',
  standalone: true,
  imports: [TranslocoModule],
  templateUrl: './print-pdf-button.component.html',
})
export class PrintPdfButton {
  print() {
    setTimeout(() => window.print(), 100);
  }

}
