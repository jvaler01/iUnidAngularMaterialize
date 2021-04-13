import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ProfileCompanyComponent } from './profile-company.component';

describe('ProfileCompanyComponent', () => {
  let component: ProfileCompanyComponent;
  let fixture: ComponentFixture<ProfileCompanyComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ProfileCompanyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileCompanyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
