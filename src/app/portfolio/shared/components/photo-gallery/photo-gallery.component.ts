import { ChangeDetectionStrategy, Component, ElementRef, ViewChild, input, signal } from '@angular/core';

@Component({
  selector: 'photo-gallery',
  standalone: true,
  templateUrl: './photo-gallery.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PhotoGalleryComponent {
  images = input.required<string[]>();
  title = input<string>('');
  startIndex = input<number>(0);

  idx = signal(0);

  @ViewChild('viewport', { static: false }) viewport?: ElementRef<HTMLDivElement>;

  ngOnInit() {
    const i = this.startIndex();
    if (i > 0) this.idx.set(Math.min(i, (this.images()?.length ?? 1) - 1));
  }

  prev() { if (this.images()?.length) this.idx.update(i => (i - 1 + this.images()!.length) % this.images()!.length); }
  next() { if (this.images()?.length) this.idx.update(i => (i + 1) % this.images()!.length); }

  select(i: number) { this.idx.set(i); }
}
