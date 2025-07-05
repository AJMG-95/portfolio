import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { NgIf, NgSwitch, NgSwitchCase } from '@angular/common'; // 👈 importa esto

@Component({
  selector: 'typewriter-text',
  standalone: true,
  imports: [NgIf, NgSwitch, NgSwitchCase], // 👈 aquí lo añades
  templateUrl: './typewriter.component.html',
  styleUrls: ['./typewriter.component.css'],
})
export class Typewriter implements OnChanges {
  @Input() text: string = '';
  @Input() delay: number = 0;
  @Input() class: string = '';
  @Input() start: boolean = false;
  @Input() tag: 'h1' | 'h2' | 'p' = 'h1';
  @Input() onFinish?: () => void;

  visibleText = '';
  showCursor = true;
  private alreadyTyped = false;

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['start']?.currentValue === true && !this.alreadyTyped) {
      setTimeout(() => this.typeText(), this.delay);
    }
  }

  private typeText(): void {
    this.alreadyTyped = true;
    let index = 0;
    const length = this.text.length;

    const interval = setInterval(() => {
      this.visibleText += this.text[index];
      index++;

      if (index >= length) {
        clearInterval(interval);
        this.showCursor = false;
        this.onFinish?.();
      }
    }, 60);
  }
}
