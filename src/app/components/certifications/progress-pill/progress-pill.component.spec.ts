import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProgressPillComponent } from './progress-pill.component';

describe('ProgressPillComponent', () => {
  let component: ProgressPillComponent;
  let fixture: ComponentFixture<ProgressPillComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProgressPillComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProgressPillComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
