import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContactInfo } from './contact-info.component';

describe('ContactInfoComponent', () => {
  let component: ContactInfo;
  let fixture: ComponentFixture<ContactInfo>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ContactInfo]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ContactInfo);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
