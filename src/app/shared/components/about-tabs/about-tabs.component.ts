import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslocoModule } from '@jsverse/transloco';

@Component({
  selector: 'about-tabs',
  standalone: true,
  imports: [CommonModule, TranslocoModule],
templateUrl: './about-tabs.component.html'
})
export class AboutTabs {
  @Input() tabs: string[] = [];
  @Input() selectedTab!: string;
  @Output() selectedTabChange = new EventEmitter<string>();

  selectTab(tab: string) {
    this.selectedTabChange.emit(tab);
  }
}
