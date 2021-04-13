import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { IunidAdminComponent } from './iunid-admin.component';

describe('IunidAdminComponent', () => {
  let component: IunidAdminComponent;
  let fixture: ComponentFixture<IunidAdminComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ IunidAdminComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IunidAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
