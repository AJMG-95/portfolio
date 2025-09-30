import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  HostListener,
  ViewChild,
  AfterViewInit,
  input,
  signal,
  effect,
} from '@angular/core';
import { TranslocoPipe } from '@jsverse/transloco';
import type { WorkExperience } from '@data/work-experience.data';

@Component({
  selector: 'exp-modal-card',
  standalone: true,
  imports: [TranslocoPipe],
  templateUrl: './experience-modal-card.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ExperienceModalCardComponent implements AfterViewInit {
  experience = input.required<WorkExperience>();

  readonly show = signal(false);
  readonly hasInteracted = signal(false);
  readonly isReady = signal(false);


  @ViewChild('dlg', { static: false }) dialogRef?: ElementRef<HTMLDialogElement>;

  private readonly syncDialogEffect = effect(() => {
    const ready = this.isReady();
    const visible = this.show();
    if (!ready) return;

    const dlg = this.dialogRef?.nativeElement;
    if (!dlg) return;

    if (visible) {
      if (!dlg.open) dlg.showModal();
    } else {
      if (dlg.open) dlg.close();
    }
  });

  ngAfterViewInit() {
    this.isReady.set(true);
  }

  open() {
    if (!this.hasInteracted()) this.hasInteracted.set(true);
    this.show.set(true);
  }

  close() {
    this.show.set(false);
  }

  /** Click en backdrop (sobre el propio <dialog>) */
  onDialogClick(ev: MouseEvent) {
    const dlg = this.dialogRef?.nativeElement;
    if (ev.target === dlg) this.close();
  }

  /** Sincroniza cuando el <dialog> se cierra de forma nativa (backdrop/ESC) */
  onNativeClose() {
    if (this.show()) this.show.set(false);
  }

  /** ESC lanza 'cancel': no bloquees el cierre; solo sincroniza señal */
  @HostListener('document:cancel', ['$event'])
  onCancel(ev: Event) {
    const dlg = this.dialogRef?.nativeElement;
    if (ev.target === dlg) {
      // NO preventDefault: deja que se cierre
      this.show.set(false);
    }
  }
}
