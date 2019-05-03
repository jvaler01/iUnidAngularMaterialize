import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IunidAdminComponent } from './iunid-admin.component';

describe('IunidAdminComponent', () => {
  let component: IunidAdminComponent;
  let fixture: ComponentFixture<IunidAdminComponent>;

  beforeEach(async(() => {
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
