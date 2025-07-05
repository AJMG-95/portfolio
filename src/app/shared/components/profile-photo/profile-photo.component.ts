import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'profile-photo',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './profile-photo.component.html',
})
export class ProfilePhoto {
  @Input() src!: string;
  @Input() alt: string = 'Foto de perfil';
  @Input() rounded: string = 'rounded-full';
  @Input() border: boolean = false;
  @Input() borderClass: string = 'border-2 border-primary';
  @Input() fallback: string = 'assets/images/fallback-profile.png';
  @Input() size: string = 'w-64 h-64'; // Valor predeterminado más grande que w-32 h-32


  currentSrc!: string;

  ngOnInit() {
    this.currentSrc = this.src;
  }

  onError() {
    this.currentSrc = this.fallback;
  }
}
