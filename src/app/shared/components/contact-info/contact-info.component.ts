import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-contact-info',
  standalone: true,
  imports: [CommonModule], // ✅ Esto incluye NgSwitch, NgIf, etc.
  templateUrl: './contact-info.component.html',
  styleUrl: './contact-info.component.css'
})
export class ContactInfo {
  @Input() type!: 'email' | 'phone' | 'link';
  @Input() value!: string;
  @Input() label!: string;
  @Input() iconPath!: string;
  @Input() external: boolean = false;
}
