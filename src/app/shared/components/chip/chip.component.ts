import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NgClass, NgIf } from '@angular/common';

@Component({
  selector: 'my-chip',
  standalone: true,
  imports: [NgIf, NgClass],
  templateUrl: './chip.component.html',
})
export class ChipComponent {
  @Input() id?: string;
  @Input() label!: string;
  @Input() icon?: string;
  @Input() iconPosition: 'left' | 'right' = 'left';

  @Input() addClasses: string = '';

  @Input() clickable = false;

  @Output() clicked = new EventEmitter<string>();
  @Output() hovered = new EventEmitter<string>();

  handleClick(): void {
    if (this.clickable && this.id) this.clicked.emit(this.id);
  }

  handleMouseEnter(): void {
    if (this.clickable && this.id) this.hovered.emit(this.id);
  }
}
