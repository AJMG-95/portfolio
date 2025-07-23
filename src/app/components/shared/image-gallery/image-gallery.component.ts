import { Component, Input } from '@angular/core';
import { CommonModule, NgFor, NgIf } from '@angular/common';

@Component({
  selector: 'image-gallery',
  standalone: true,
  imports: [NgFor, NgIf, CommonModule],
  templateUrl: './image-gallery.component.html',
  styleUrls: ['./image-gallery.component.css']
})
export class ImageGalleryComponent {
  @Input() images: string[] = [];
  selectedImageIndex = 0;

  selectImage(index: number) {
    this.selectedImageIndex = index;
  }
}
