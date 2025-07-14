import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslocoModule } from '@jsverse/transloco';

@Component({
  selector: 'certification-card',
  standalone: true,
  imports: [CommonModule, TranslocoModule],
  templateUrl: './certification-card.component.html',
  styleUrls: ['./certification-card.component.css']
})
export class CertificationCard {
  @Output() activate = new EventEmitter<number>();
  @Output() deactivate = new EventEmitter<void>();
  @Output() requestOpenModal = new EventEmitter<void>(); // Nuevo output para que el padre abra el modal

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

  get isActive(): boolean {
    return this.cardId === this.activeCardId;
  }

  openModal() {
    this.activate.emit(this.cardId);
    this.requestOpenModal.emit(); // Informa al padre de que debe abrir el modal
  }
}
