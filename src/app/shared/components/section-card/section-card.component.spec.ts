import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SectionCard } from './section-card.component';

describe('SectionCardComponent', () => {
  let component: SectionCard;
  let fixture: ComponentFixture<SectionCard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SectionCard]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SectionCard);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
