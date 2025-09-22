// src/app/pages/courses/courses.component.ts

import { Component, computed, inject } from '@angular/core';
import { TranslocoModule, TranslocoService } from '@jsverse/transloco';
import { toSignal } from '@angular/core/rxjs-interop';
import { NgFor, NgIf } from '@angular/common';
import { PageWrapper } from '@shared/page-wrapper/page-wrapper.component';
import { CourseCardComponent } from '@certifications/course-card/course-card.component';
import { CertificationsService } from '@core/services/certifications-data.service';
import { VisualAssetsService } from '@core/services/visual-assets.service';
import { CertificationViewModel } from '@core/models/certification-view.model';




@Component({
  selector: 'app-courses',
  standalone: true,
  imports: [PageWrapper, TranslocoModule, CourseCardComponent, NgFor, NgIf],
  templateUrl: './courses.component.html',
  styleUrl: './courses.component.css'
})

export class CoursesPage {
  #transloco = inject(TranslocoService);
  #certService = inject(CertificationsService);
  #assetsService = inject(VisualAssetsService);

  translations = toSignal(this.#transloco.selectTranslateObject('certifications'), {
    initialValue: { items: [] },

  });

  courses = computed((): CertificationViewModel[] => {
    const translated = this.translations().items as any[];
    const technical = this.#certService.getAll();

    return translated.map((item) => {
      const match = technical.find((c) => c.id === item.id);

      // PRIORIDAD: logoId -> technologyIds[0]
      const selectedLogoId = match?.logoId ?? match?.technologyIds?.[0];

      return {
        // traducible
        id: item.id,
        title: item.title,
        issuer: item.issuer,
        type: item.type,
        language: item.language,
        date: item.date,

        // técnico
        certificationImage: match?.certificationImage ?? '',
        certificationUrl: match?.url ?? '',
        durationHours: match?.durationHours ?? undefined,
        completionPercentage: match?.completionPercentage ?? undefined,
        certificateId: match?.certificateId ?? undefined,
        collaborators: match?.collaborators ?? [],
        url: match?.url,

        // tecnología (1er ID)
        logo: selectedLogoId ? this.#assetsService.getLogo(selectedLogoId) : undefined,
        techName: selectedLogoId ? this.#assetsService.getName(selectedLogoId) : undefined,

        // banner dinámico
        isTechCourse: !!(match?.technologyIds?.length),

      };
    });
  });

}
