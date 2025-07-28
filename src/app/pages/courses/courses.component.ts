// src/app/pages/courses/courses.component.ts

import { Component, computed, inject } from '@angular/core';
import { TranslocoModule, TranslocoService } from '@jsverse/transloco';
import { toSignal } from '@angular/core/rxjs-interop';

import { PageWrapper } from '../../components/shared/page-wrapper/page-wrapper.component';
import { CourseCardComponent } from '../../components/certifications/course-card/course-card.component';

import { NgFor, NgIf } from '@angular/common';

@Component({
  selector: 'app-courses',
  standalone: true,
  imports: [PageWrapper, TranslocoModule, CourseCardComponent, NgFor, NgIf],
  templateUrl: './courses.component.html',
  styleUrl: './courses.component.css'
})
export class CoursesPage {
  private transloco = inject(TranslocoService);

  translations = toSignal(this.transloco.selectTranslateObject('certifications'), { initialValue: {} });
  courses = computed(() => this.translations()?.items ?? []);

}
