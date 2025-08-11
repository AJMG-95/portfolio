// src\app\components\shared\banner\banner.component.ts

import { NgClass, NgIf } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-banner',
  standalone: true,
  imports: [NgIf, NgClass],
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.css']
})
export class BannerComponent {
  @Input() title: string = 'Course Title';
  @Input() iconUrl?: string;
  @Input() isTechCourse: boolean = true;
}
