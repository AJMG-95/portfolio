// src/app/components/proyects/project-card/project-card.component.ts

import { Component, HostListener, inject, Input } from '@angular/core';
import { NgClass, NgIf, NgFor, NgTemplateOutlet } from '@angular/common';
import { ImageGalleryComponent } from '../../shared/image-gallery/image-gallery.component';
import { ChipComponent } from '../../shared/chip/chip.component';
import { VisualAssetsService } from '../../../core/services/visual-assets.service';
import { ProjectStatus } from '../../../core/services/proyects-data.service';

@Component({
  selector: 'project-card',
  standalone: true,
  imports: [
    NgClass,
    NgIf,
    NgFor,
    ImageGalleryComponent,
    ChipComponent,
    NgTemplateOutlet
  ],
  templateUrl: './project-card.component.html',
  styleUrls: ['./project-card.component.css'],
})
export class ProjectCardComponent {

  private techAssets = inject(VisualAssetsService);

  @Input() headerImageUrl!: string;
  @Input() cornerImageUrl?: string;
  @Input() title!: string;
  @Input() subtitle?: string;
  @Input() shortDescription!: string;
  @Input() longDescription!: string;

  /** IDs de tecnologías */
  @Input() technologyIds: number[] = [];

  @Input() githubUrl!: string;
  @Input() liveUrl?: string;
  @Input() status!: ProjectStatus;
  @Input() statusLabels: Record<string, string> = {
    notStarted: 'No iniciado',
    inProgress: 'En progreso',
    testing: 'En pruebas',
    completed: 'Terminado',
    onHold: 'Pausado',
  };
  @Input() galleryImages: string[] = [];

  isFlipped = false;
  showModal = false;
  hasInteracted = false;


  cardClicked() {
    this.hasInteracted = true;     // ← activa animaciones a partir de ahora
    this.isFlipped = true;
    setTimeout(() => this.showModal = true, 500);
  }

  closeModal() {
    this.showModal = false;
    setTimeout(() => this.isFlipped = false, 300);
  }

  @HostListener('document:click', ['$event'])
  onOutsideClick(event: MouseEvent) {
    const modal = document.getElementById('modal-content');
    if (this.showModal && modal && !modal.contains(event.target as Node)) {
      this.closeModal();
    }
  }

  get statusChipClass(): string {
    switch (this.status) {
      case ProjectStatus.NotStarted:
        return 'bg-gray-500 text-white';
      case ProjectStatus.InProgress:
        return 'bg-blue-500 text-white';
      case ProjectStatus.Testing:
        return 'bg-orange-500 text-white';
      case ProjectStatus.Completed:
        return 'bg-green-500 text-white';
      case ProjectStatus.OnHold:
        return 'bg-yellow-600 text-white';
      default:
        return 'bg-gray-300 text-white';
    }
  }

  get techChips(): { label: string; icon?: string; color?: string }[] {
    return this.technologyIds.map(id => ({
      label: this.techAssets.getName(id) || `ID ${id}`,
      icon: this.techAssets.getLogo(id),
      color: this.techAssets.getLightColor(id),
    }));
  }
}
