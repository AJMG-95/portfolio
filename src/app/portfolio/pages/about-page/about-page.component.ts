import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { WorkExperienceService } from '@service/work-experience.service';
import { WorkMethodologiesService } from '../../services/work-methodologies.service';
import { AcademicsPayload, AcademicsService } from '@service/academics.service';
import { TechnologiesService } from '@service/technologies.service';
import { SoftSkillsService } from '@service/soft-skills.service';
import { AboutTabsComponent } from './about-tabs/about-tabs.component';
import { ExperienceModalCardComponent } from '@component/experience/experience-modal-card/experience-modal-card.component';
import { toSignal } from '@angular/core/rxjs-interop';
import { AcademicsCardComponent } from '@component/education/academics-card/academics-card.component';
import { TechChipsComponent } from '@component/skills/tech-chips/tech-chips.component';
import { MethodologyChipsComponent } from '@component/skills/methology-chips/methology-chips.component';
import { SoftSkillsGridComponent } from '@component/skills/soft-skills-grid/soft-skills-grid.component';
import { TranslocoPipe } from '@jsverse/transloco';
import { AsyncPipe } from '@angular/common';
import { of } from 'rxjs';

const EMPTY_ACADEMICS: AcademicsPayload = {
  studies: [],
  institutionsById: {},
  studyVMs: [],
};

@Component({
  selector: 'app-about-page',
  imports: [
    TranslocoPipe,
    AsyncPipe,
    AboutTabsComponent,
    ExperienceModalCardComponent,
    AcademicsCardComponent,
    TechChipsComponent,
    MethodologyChipsComponent,
    SoftSkillsGridComponent,
  ],
  templateUrl: './about-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class AboutPageComponent {
  #academicsSvc = inject(AcademicsService);
  #workExpericeSvc = inject(WorkExperienceService);
  #workMethodSvc = inject(WorkMethodologiesService);
  #technologiesSvc = inject(TechnologiesService);
  #softSkillsSvc = inject(SoftSkillsService);

  studies = toSignal(this.#academicsSvc.getAcademics(), { initialValue: EMPTY_ACADEMICS });
  experiences = toSignal(this.#workExpericeSvc.getExperiences());
  methods$ = this.#workMethodSvc.getMethodologies();

  // Frontend / Backend
/*   backLanguages$ = this.#technologiesSvc.getBackLanguages(); */
/*   backFrameworks$ = this.#technologiesSvc.getBackFrameworks(); */
  frontLanguages$ = this.#technologiesSvc.getFrontLanguages();
  frontFrameworks$ = this.#technologiesSvc.getFrontFrameworks();

  // Mobile (nuevo)
  mobileLanguages$ = this.#technologiesSvc.getLanguagesByTrack$('mobile');
  mobileFrameworks$ = this.#technologiesSvc.getFrameworksByTrack$('mobile');

  // Databases (nuevo)
/*   sqlDBs$ = this.#technologiesSvc.getDatabasesByTrack$('sql'); */
/*   nosqlDBs$ = this.#technologiesSvc.getDatabasesByTrack$('nosql'); */

  // Herramientas y UI
  tools$ = this.#technologiesSvc.getProjectManagementTools();
  versionContol$ = this.#technologiesSvc.getVersionControlTools();
  uiLibraries = toSignal(this.#technologiesSvc.getUiLibraries());

  softSkills$ = this.#softSkillsSvc.getAllBranded();

  ui = computed(() => of([...(this.uiLibraries() ?? [])]));

  tabs = ['tabs.skills', 'tabs.experience', 'tabs.education', ];
  selectedTab = signal(0);

  onTabChange(index: number) {
    this.selectedTab.set(index);
  }
}
