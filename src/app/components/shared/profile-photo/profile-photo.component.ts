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
  @Input() fallback: string = 'assets/images/fallback-profile.png';
  @Input() class: string = ''; // nuevas clases externas


  currentSrc!: string;

  ngOnInit() {
    this.currentSrc = this.src;
  }

  onError() {
    this.currentSrc = this.fallback;
  }
}
