import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { RegisterCompanyComponent } from './register-company.component';

describe('RegisterCompanyComponent', () => {
  let component: RegisterCompanyComponent;
  let fixture: ComponentFixture<RegisterCompanyComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ RegisterCompanyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterCompanyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
