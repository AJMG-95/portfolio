import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  ViewChild,
  effect,
  inject,
  input,
  signal,
  computed,
} from '@angular/core';
import { TranslocoPipe } from '@jsverse/transloco';

import type { Certification, CertInstitution } from '@data/certifications.data';

import { CertificationsService } from '@service/certifications.service';
import { TechnologiesService } from '@service/technologies.service';
import { TechChipsComponent } from '@component/skills/tech-chips/tech-chips.component';
import { SoftSkillLevel } from '../../../data/soft-skills.data';
import { HourPipePipe } from 'app/portfolio/shared/pipes/hour-pipe.pipe';

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
  // Input requerido: no acceder hasta que Angular lo establezca
  cert = input.required<Certification>();

  // modal
  readonly show = signal(false);
  readonly isReady = signal(false);
  @ViewChild('dlg', { static: false }) dialogRef?: ElementRef<HTMLDialogElement>;

  // servicios
  private readonly certSvc = inject(CertificationsService);
  private readonly techSvc = inject(TechnologiesService);

  // ====== Derivados seguros (lazy) ======

  // Institución (resuelta por ID)
  readonly institution = computed<CertInstitution | undefined>(() => {
    const id = this.cert().institutionId;
    return id ? this.certSvc.getInstitutionById(id) : undefined;
  });

  // Techs (resuelve solo si existen techRefs)
  readonly techs = computed<ResolvedTechs | null>(() => {
    const c = this.cert();
    if (!c.techRefs) return null;

    const refs = c.techRefs;
    const byIds = <T extends { id: number }>(arr: T[], ids?: number[]) => {
      if (!ids?.length) return [] as T[];
      const set = new Set(ids);
      return arr.filter(x => set.has(x.id));
    };

    // fuentes síncronas del servicio (en memoria)
    const allLangs = this.techSvc.getLanguages();
    const allFws = this.techSvc.getFrameworks();
    const allUi = this.techSvc.getUiLibrariesSync();
    const allClientStor = this.techSvc.getClientStorageSync();
    const allDBs = this.techSvc.getDatabases();
    const allVcs = this.techSvc.getVersionControlToolsSync();
    const allBaas = this.techSvc.getBaaSPlatformsSync();
    const allCloud = this.techSvc.getCloudPlatformsSync();

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

  ngAfterViewInit() { this.isReady.set(true); }

  // Sincroniza <dialog> con signal show (no toca cert())
  private readonly syncDialog = effect(() => {
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

  // header image: certificado o placeholder
  headerImage(): string {
    const c = this.cert();
    return c.certificationImage ?? 'assets/images/courses/not_certificated_yet.webp';
  }

  // estado derivado del completionPercentage
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

    // Captura a1/a2/b1/b2/c1/c2 en claves tipo 'certs.language.level.b2' o similares
    const match = key.match(/(?:^|[._-])([abc][12])(?:$|[._-])/);
    const level = match ? match[1] : 'a0';

    const map: Record<string, string> = {
      a1: 'badge-ghost',     // muy básico → gris claro
      a2: 'badge-neutral',   // básico → gris
      b1: 'badge-info',      // intermedio → azul
      b2: 'badge-primary',   // intermedio alto → primario
      c1: 'badge-secondary', // avanzado → secondary
      c2: 'badge-success',   // dominio → verde
    };

    return map[level] ?? 'badge-ghost';
  }

  institutionKey(): string | undefined {
    return this.institution()?.key;
  }
}
