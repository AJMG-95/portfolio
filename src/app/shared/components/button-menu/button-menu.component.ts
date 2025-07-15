import { Component, ElementRef, HostListener, Input, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslocoModule, TranslocoService } from '@jsverse/transloco';

@Component({
  selector: 'button-menu',
  standalone: true,
  imports: [CommonModule, TranslocoModule],
  templateUrl: './button-menu.component.html',
  styleUrl: './button-menu.component.css'
})
export class ButtonMenu {
  private transloco = inject(TranslocoService);
  private elementRef = inject(ElementRef);

  @Input() addClasses: string = ''; // 👈 Clases externas

  isOpen = signal(false);
  lang = this.transloco.getActiveLang();

  toggleMenu() {
    this.isOpen.update(open => !open);
  }

  closeMenu() {
    this.isOpen.set(false);
  }

  @HostListener('document:click', ['$event'])
  onClickOutside(event: MouseEvent) {
    if (!this.elementRef.nativeElement.contains(event.target)) {
      this.closeMenu();
    }
  }

  get links() {
    const isSpanish = this.transloco.getActiveLang() === 'es';
    return {
      view: isSpanish
        ? 'https://drive.google.com/file/d/1tEEznRzJhaS4FfxltYyxLJf19K5FHWmJ/view?usp=drive_link'
        : 'https://drive.google.com/file/d/10-OYS_q8MvGLZ_vixaPy2_8J6GfqxVDr/view?usp=drive_link',
      download: isSpanish
        ? 'assets/docs/CV_Antonio_Marchena_ES.pdf'
        : 'assets/docs/CV_Antonio_Marchena_EN.pdf'
    };
  }
}
