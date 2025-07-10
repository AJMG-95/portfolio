import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CertificateModal } from './certificate-modal.component';

describe('CertificateModalComponent', () => {
  let component: CertificateModal;
  let fixture: ComponentFixture<CertificateModal>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CertificateModal]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CertificateModal);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
