import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { NgIf, NgSwitch, NgSwitchCase } from '@angular/common';

@Component({
  selector: 'typewriter-text',
  standalone: true,
  imports: [NgIf, NgSwitch, NgSwitchCase],
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
  @Input() key: string | number = '';


  visibleText = '';
  showCursor = true;

  private alreadyTyped = false;

  private typingInterval: any; // guarda la referencia del setInterval

  ngOnChanges(changes: SimpleChanges): void {
    const shouldRestart = changes['key'] || changes['text'] || changes['start'];

    if (this.start && shouldRestart) {
      this.resetTyping();
      setTimeout(() => this.typeText(), this.delay);
    }
  }

  private resetTyping() {
    if (this.typingInterval) {
      clearInterval(this.typingInterval); // 💥 corta el anterior
    }

    this.visibleText = '';
    this.showCursor = true;
    this.alreadyTyped = false;
  }

  private typeText(): void {
    this.alreadyTyped = true;
    let index = 0;
    const length = this.text.length;

    this.typingInterval = setInterval(() => {
      this.visibleText += this.text[index];
      index++;

      if (index >= length) {
        clearInterval(this.typingInterval); // 💥 corta al terminar
        this.showCursor = false;
        this.onFinish?.();
      }
    }, 60);
  }
}
