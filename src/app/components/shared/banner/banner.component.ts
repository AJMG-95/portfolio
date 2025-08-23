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

  // Genera URLs absolutas correctas respetando <base href> (GitHub Pages)
  readonly techBannerUrl = new URL('assets/images/shared/techbanner.webp', document.baseURI).toString();
  readonly nonTechBannerUrl = new URL('assets/images/shared/nonTechbanner.webp', document.baseURI).toString();
}
