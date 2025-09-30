import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  ViewChild,
  input,
  signal,
  effect,
  inject,
  computed,
} from '@angular/core';
import { TranslocoPipe } from '@jsverse/transloco';

import type { Project, ProjectStatus } from '@data/projects.data';
import { TechnologiesService } from '@service/technologies.service';
import { PhotoGalleryComponent } from 'app/portfolio/shared/components/photo-gallery/photo-gallery.component';
import { TechChipsComponent } from '@component/skills/tech-chips/tech-chips.component';

// Estructura que espera tu plantilla (chips por categorías)
interface ResolvedTechs {
  frontFrameworks: any[];
  frontLanguages: any[];
  backFrameworks: any[];
  backLanguages: any[];
  uiLibraries: any[];
  clientStorage: any[];
  databases: any[];
  versionControl: any[];
  baasPlatforms: any[];
  cloudPlatforms: any[];
}

@Component({
  selector: 'project-card',
  standalone: true,
  imports: [TranslocoPipe, PhotoGalleryComponent, TechChipsComponent],
  templateUrl: './project-card.component.html',
  styleUrl: './project-card.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProjectCardComponent {
  // === Input requerido. No lo leemos en constructor/efectos de arranque ===
  project = input.required<Project>();

  // modal state
  readonly show = signal(false);
  readonly isReady = signal(false);

  @ViewChild('dlg', { static: false }) dialogRef?: ElementRef<HTMLDialogElement>;
  private readonly techSvc = inject(TechnologiesService);

  // ========= Resolución SÍNCRONA y PEREZOSA de tecnologías =========
  // No hay suscripciones ni efectos que toquen project() antes de tiempo.
  readonly techs = computed<ResolvedTechs | null>(() => {
    const p = this.project(); // se evalúa cuando el template lee techs()
    if (!p?.techRefs) return null;

    const refs = p.techRefs;

    // Helpers locales para resolver por ids sin RxJS
    const byIds = <T extends { id: number }>(arr: T[], ids?: number[]) => {
      if (!ids?.length) return [] as T[];
      const set = new Set(ids);
      return arr.filter(x => set.has(x.id));
    };

    // Fuentes síncronas del servicio (listas en memoria)
    const allLangs = this.techSvc.getLanguages();
    const allFws = this.techSvc.getFrameworks();
    const allUi = this.techSvc.getUiLibrariesSync();
    const allClientStor = this.techSvc.getClientStorageSync?.() ?? []; // opcional si lo tienes
    const allDBs = this.techSvc.getDatabases();
    const allVcs = this.techSvc.getVersionControlToolsSync();
    const allBaas = this.techSvc.getBaaSPlatformsSync?.() ?? [];
    const allCloud = this.techSvc.getCloudPlatformsSync?.() ?? [];

    return {
      frontFrameworks: byIds(allFws, refs.frontFrameworkIds),
      frontLanguages: byIds(allLangs, refs.frontLanguageIds),
      backFrameworks: byIds(allFws, refs.backFrameworkIds),
      backLanguages: byIds(allLangs, refs.backLanguageIds),
      uiLibraries: byIds(allUi, refs.uiLibraryIds),
      clientStorage: byIds(allClientStor, refs.clientStorageIds),
      databases: byIds(allDBs, refs.databaseIds),
      versionControl: byIds(allVcs, refs.versionControlToolIds),
      baasPlatforms: byIds(allBaas, refs.baasPlatformIds),
      cloudPlatforms: byIds(allCloud, refs.cloudPlatformIds),
    };
  });

  // Sincroniza <dialog> con signal `show` (no toca project())
  private readonly syncDialog = effect(() => {
    if (!this.isReady()) return;
    const dlg = this.dialogRef?.nativeElement;
    if (!dlg) return;
    if (this.show()) {
      if (!dlg.open) dlg.showModal();
    } else {
      if (dlg.open) dlg.close();
    }
  });

  ngAfterViewInit() { this.isReady.set(true); }

  openModal() { this.show.set(true); }
  closeModal() { this.show.set(false); }
  onBackdropClick(ev: MouseEvent) {
    const dlg = this.dialogRef?.nativeElement;
    if (ev.target === dlg) this.closeModal();
  }
  onNativeClose() { if (this.show()) this.show.set(false); }

  // UI helpers
  statusBadge(s: ProjectStatus): string {
    switch (s) {
      case 'released': return 'badge-success';
      case 'finished': return 'badge-primary';
      case 'testing': return 'badge-warning';
      case 'in_progress': return 'badge-info';
      case 'fixing_bugs': return 'badge-error';
      case 'draft': return 'badge-neutral';
      case 'archived': return 'badge-ghost';
      default: return 'badge-ghost';
    }
  }
}
