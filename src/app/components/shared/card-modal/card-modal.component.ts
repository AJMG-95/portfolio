import { Component, HostListener, Input } from '@angular/core';
import { NgClass, NgIf } from '@angular/common';

@Component({
  selector: 'card-modal',
  standalone: true,
  imports: [NgClass, NgIf],
  templateUrl: './card-modal.component.html',
  styleUrls: ['./card-modal.component.css'],
})
export class CardModal {
  @Input() headerImageUrl!: string; // imagen principal (obligatoria)
  @Input() cornerImageUrl?: string; // imagen esquina superior (opcional)
  @Input() title!: string;
  @Input() subtitle?: string;

  isFlipped = false;
  showModal = false;

  cardClicked() {
    this.isFlipped = true;
    setTimeout(() => {
      this.showModal = true;
    }, 500);
  }

  closeModal() {
    this.showModal = false;
    setTimeout(() => {
      this.isFlipped = false;
    }, 300);
  }

  // Detecta clics fuera del modal para cerrarlo
  @HostListener('document:click', ['$event'])
  onOutsideClick(event: MouseEvent) {
    const modal = document.getElementById('modal-content');
    if (this.showModal && modal && !modal.contains(event.target as Node)) {
      this.closeModal();
    }
  }
}
