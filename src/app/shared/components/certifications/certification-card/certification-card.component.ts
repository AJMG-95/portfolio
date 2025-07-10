import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslocoModule } from '@jsverse/transloco';
import { CertificateModal } from '../certification-modal/certificate-modal.component';

@Component({
  selector: 'certification-card',
  standalone: true,
  imports: [CommonModule, TranslocoModule, CertificateModal],
  templateUrl: './certification-card.component.html',
  styleUrls: ['./certification-card.component.css']
})
export class CertificationCard {
  @Output() activate = new EventEmitter<number>();
  @Output() deactivate = new EventEmitter<void>();

  @Input() cardId!: number;
  @Input() activeCardId!: number | null;
  @Input() imageUrl!: string;
  @Input() title!: string;
  @Input() issuer?: string;
  @Input() type?: string;
  @Input() language?: string;
  @Input() date?: string;
  @Input() durationHours?: number;
  @Input() certificateId?: string;
  @Input() collaborators?: string[];
  @Input() url?: string;

  modalVisible = false;

  get isActive(): boolean {
    return this.cardId === this.activeCardId;
  }

  openModal() {
    this.activate.emit(this.cardId); // <- ahora el hijo notifica al padre
    this.modalVisible = true;
  }

  closeModal() {
    this.modalVisible = false;
    this.deactivate.emit(); // <- notifica que debe desactivarse
  }
}
