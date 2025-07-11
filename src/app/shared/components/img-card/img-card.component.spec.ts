import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImgCardComponent } from './img-card.component';

describe('ImgCardComponent', () => {
  let component: ImgCardComponent;
  let fixture: ComponentFixture<ImgCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ImgCardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ImgCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
