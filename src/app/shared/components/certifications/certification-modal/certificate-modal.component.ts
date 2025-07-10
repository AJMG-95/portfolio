import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { TranslocoModule } from '@jsverse/transloco';

@Component({
  selector: 'certificate-modal',
  standalone: true,
  imports: [CommonModule, TranslocoModule],
  templateUrl: './certificate-modal.component.html',
  styleUrl: './certificate-modal.component.css'
})
export class CertificateModal {
  @Input() imageUrl!: string;
  @Input() title?: string;
  @Output() close = new EventEmitter<void>();

  onClose() {
    this.close.emit();
  }
}
