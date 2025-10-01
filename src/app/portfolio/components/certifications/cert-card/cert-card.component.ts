import {
  ChangeDetectionStrategy,
  Component,
  computed,
  effect,
  ElementRef,
  inject,
  input,
  signal,
  ViewChild,
} from '@angular/core';
import { TranslocoPipe, TranslocoService } from '@jsverse/transloco';

import type { Certification, CertInstitution } from '@data/certifications.data';

import { TechChipsComponent } from '@component/skills/tech-chips/tech-chips.component';
import { CertificationsService } from '@service/certifications.service';
import { TechnologiesService } from '@service/technologies.service';
import { HourPipePipe } from 'app/portfolio/shared/pipes/hour-pipe.pipe';
import { ProgrammingPrinciplesService } from '@service/programming-principles.service';
import type { ProgrammingPrinciple } from '@data/programming-principles.data';

type ResolvedTechs = {
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
};

@Component({
  selector: 'cert-card',
  standalone: true,
  imports: [TranslocoPipe, TechChipsComponent, HourPipePipe],
  templateUrl: './cert-card.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CertCardComponent {
  // Input requerido
  cert = input.required<Certification>();

  // modal
  show = signal(false);
  isReady = signal(false);
  @ViewChild('dlg', { static: false }) dialogRef?: ElementRef<HTMLDialogElement>;

  // servicios
  #certSvc = inject(CertificationsService);
  #techSvc = inject(TechnologiesService);
  #principlesSvc = inject(ProgrammingPrinciplesService);
  #i18n = inject(TranslocoService);

  // ====== Derivados ======
  institution = computed<CertInstitution | undefined>(() => {
    const id = this.cert().institutionId;
    return id ? this.#certSvc.getInstitutionById(id) : undefined;
  });

  techs = computed<ResolvedTechs | null>(() => {
    const c = this.cert();
    if (!c.techRefs) return null;

    const refs = c.techRefs;
    const byIds = <T extends { id: number }>(arr: T[], ids?: number[]) => {
      if (!ids?.length) return [] as T[];
      const set = new Set(ids);
      return arr.filter(x => set.has(x.id));
    };

    const allLangs = this.#techSvc.getLanguages();
    const allFws = this.#techSvc.getFrameworks();
    const allUi = this.#techSvc.getUiLibrariesSync();
    const allClientStor = this.#techSvc.getClientStorageSync();
    const allDBs = this.#techSvc.getDatabases();
    const allVcs = this.#techSvc.getVersionControlToolsSync();
    const allBaas = this.#techSvc.getBaaSPlatformsSync();
    const allCloud = this.#techSvc.getCloudPlatformsSync();

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

  // Principios (IDs -> objetos)
  principles = computed<ProgrammingPrinciple[]>(() => {
    const raw = this.cert().principles ?? [];
    const numericIds = raw
      .map(id => (typeof id === 'string' ? Number(id) : id))
      .filter((n): n is number => Number.isFinite(n));
    const unique = Array.from(new Set(numericIds));
    return unique
      .map(id => this.#principlesSvc.getByIdSync(id))
      .filter((p): p is ProgrammingPrinciple => !!p);
  });

  // Mapea a chips para `tech-chips`
  principleChips = computed(() =>
    this.principles().map(p => ({
      id: p.id,
      // traducimos la key aquí para que el chip muestre el texto final
      name: this.#i18n.translate(p.nameKey),
      // colores neutros suaves (light/dark) para distinguirlos de techs
      color: 'bg-amber-100',
      darkColor: 'bg-amber-900/30',
      // sin logo
    }))
  );

  ngAfterViewInit() { this.isReady.set(true); }

  #syncDialog = effect(() => {
    if (!this.isReady()) return;
    const dlg = this.dialogRef?.nativeElement;
    if (!dlg) return;
    if (this.show()) { if (!dlg.open) dlg.showModal(); }
    else { if (dlg.open) dlg.close(); }
  });

  openModal() { this.show.set(true); }
  closeModal() { this.show.set(false); }
  onBackdropClick(ev: MouseEvent) {
    const dlg = this.dialogRef?.nativeElement;
    if (ev.target === dlg) this.closeModal();
  }
  onNativeClose() { if (this.show()) this.show.set(false); }

  headerImage(): string {
    const c = this.cert();
    return c.certificationImage ?? 'assets/images/courses/not_certificated_yet.webp';
  }

  status(): 'pending' | 'in_progress' | 'completed' {
    const v = this.cert().completionPercentage ?? 0;
    if (v >= 100) return 'completed';
    if (v > 0) return 'in_progress';
    return 'pending';
  }

  statusBadgeClass(): string {
    const s = this.status();
    if (s === 'completed') return 'badge-success';
    if (s === 'in_progress') return 'badge-info';
    return 'badge-warning';
  }

  levelBadgeClass(): string {
    const key = this.cert().levelKey?.toLowerCase() ?? '';
    const match = key.match(/(?:^|[._-])([abc][12])(?:$|[._-])/);
    const level = match ? match[1] : 'a0';
    const map: Record<string, string> = {
      a1: 'badge-ghost',
      a2: 'badge-neutral',
      b1: 'badge-info',
      b2: 'badge-primary',
      c1: 'badge-secondary',
      c2: 'badge-success',
    };
    return map[level] ?? 'badge-ghost';
  }

  institutionKey(): string | undefined {
    return this.institution()?.key;
  }
}
