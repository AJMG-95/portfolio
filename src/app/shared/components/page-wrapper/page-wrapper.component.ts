import { Component, Input } from '@angular/core';

@Component({
  selector: 'page-wrapper',
  standalone: true,
  imports: [],
  templateUrl: './page-wrapper.component.html',
  styleUrl: './page-wrapper.component.css'
})
export class PageWrapper {
  @Input() addClasses = '';
}
