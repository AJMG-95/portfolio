import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CertificationCard } from './certification-card.component';

describe('CertificationCardComponent', () => {
  let component: CertificationCard;
  let fixture: ComponentFixture<CertificationCard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CertificationCard]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CertificationCard);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
