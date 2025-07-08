import { Component } from '@angular/core';
import { PageWrapper } from '../../shared/components/page-wrapper/page-wrapper.component';
import { TranslocoModule } from '@jsverse/transloco';

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [PageWrapper, TranslocoModule],
  templateUrl: './projects.component.html',
  styleUrl: './projects.component.css'
})
export class ProjectsPage {

}
