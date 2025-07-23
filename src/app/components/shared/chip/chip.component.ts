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

  get contrastTextColor(): string {
    // Muy básico: si fondo es claro (ej: yellow, blanco o valores hex claros), texto negro
    if (
      this.addClasses.includes('yellow') ||
      this.addClasses.includes('bg-white') ||
      /\[\#(f|e|d)/i.test(this.addClasses)
    ) {
      return 'text-black';
    }
    return 'text-white';
  }

  get combinedClasses(): string {
    return `${this.addClasses} ${this.contrastTextColor}`.trim();
  }

  handleClick(): void {
    if (this.clickable && this.id) this.clicked.emit(this.id);
  }

  handleMouseEnter(): void {
    if (this.clickable && this.id) this.hovered.emit(this.id);
  }
}
