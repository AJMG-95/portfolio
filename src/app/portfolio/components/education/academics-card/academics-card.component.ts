import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { TranslocoPipe } from '@jsverse/transloco';
import { AcademicsPayload, StudyVM } from '@service/academics.service';

@Component({
  selector: 'academics-card',
  standalone: true,
  imports: [TranslocoPipe],
  templateUrl: './academics-card.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AcademicsCardComponent {
  /** Conjunto completo (estudios + instituciones) */
  academics = input.required<AcademicsPayload>();

  /** Acceso cómodo en la plantilla */
  vms(): StudyVM[] {
    return this.academics().studyVMs ?? [];
  }

  /** Util: arma claves i18n reales (tus datos usan 'studies.*' y 'fields.*') */
  titleKey(vm: StudyVM) {
    return `education.${vm.study.titleKey}`;         // p.ej. 'education.studies.hnd_web_app_development'
  }
  fieldKey(vm: StudyVM) {
    return vm.study.fieldKey ? `education.${vm.study.fieldKey}` : null; // 'education.fields.software_development'
  }

  /** Etiqueta del tipo (simple) */
  typeLabel(vm: StudyVM) {
    return vm.study.type === 'university' ? 'University' : 'Institute';
  }
}
