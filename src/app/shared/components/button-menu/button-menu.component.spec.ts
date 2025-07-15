import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ButtonMenu } from './button-menu.component';

describe('ButtonMenuComponent', () => {
  let component: ButtonMenu;
  let fixture: ComponentFixture<ButtonMenu>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ButtonMenu]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ButtonMenu);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
