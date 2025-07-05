import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrintPdfButton } from './print-pdf-button.component';

describe('PrintPdfButton', () => {
  let component: PrintPdfButton;
  let fixture: ComponentFixture<PrintPdfButton>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PrintPdfButton]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PrintPdfButton);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
