import { Component, Input } from '@angular/core';

@Component({
  selector: 'img-card',
  standalone: true,
  imports: [],
  templateUrl: './img-card.component.html',
  styleUrl: './img-card.component.css'
})
export class ImgCardComponent {
  @Input() imageUrl!: string;
  @Input() altText: string = 'Image';
  @Input() text!: string;
}
