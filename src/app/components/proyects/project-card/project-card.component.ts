import { Component, HostListener, Input } from '@angular/core';
import { NgClass, NgIf, NgFor } from '@angular/common';
import { ImageGalleryComponent } from '../../shared/image-gallery/image-gallery.component';
import { ChipComponent } from '../../shared/chip/chip.component';
import { TechnologyAssetsService } from '../../../core/services/technology-assets.service';

@Component({
  selector: 'project-card',
  standalone: true,
  imports: [NgClass, NgIf, NgFor, ImageGalleryComponent, ChipComponent],
  templateUrl: './project-card.component.html',
  styleUrls: ['./project-card.component.css'],
})
export class ProjectCardComponent {
  @Input() headerImageUrl!: string;
  @Input() cornerImageUrl?: string;
  @Input() title!: string;
  @Input() subtitle?: string;
  @Input() shortDescription!: string;
  @Input() longDescription!: string;
  @Input() technologies: string[] = [];
  @Input() githubUrl!: string;
  @Input() liveUrl?: string;
  @Input() status!: 'not-started' | 'in-progress' | 'testing' | 'completed' | 'on-hold';
  @Input() statusLabels: Record<string, string> = {
    'not-started': 'Not started',
    'in-progress': 'In progress',
    'testing': 'Testing',
    'completed': 'Completed',
    'on-hold': 'On hold',
  };
  @Input() galleryImages: string[] = [];

  isFlipped = false;
  showModal = false;


  constructor(private techAssets: TechnologyAssetsService) { }

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

  @HostListener('document:click', ['$event'])
  onOutsideClick(event: MouseEvent) {
    const modal = document.getElementById('modal-content');
    if (this.showModal && modal && !modal.contains(event.target as Node)) {
      this.closeModal();
    }
  }

  get statusChipClass(): string {
    switch (this.status) {
      case 'not-started':
        return 'bg-gray-500 text-white';
      case 'in-progress':
        return 'bg-blue-500 text-white';
      case 'testing':
        return 'bg-orange-500 text-white';
      case 'completed':
        return 'bg-green-500 text-white';
      case 'on-hold':
        return 'bg-yellow-600 text-white';
      default:
        return 'bg-gray-300 text-white';
    }
  }

  get techChips(): { label: string; icon?: string; color?: string }[] {
    return this.technologies.map(tech => ({
      label: tech,
      icon: this.techAssets.getLogo(tech),
      color: this.techAssets.getLightColor(tech), // ← usa color más suave
    }));
  }

}
