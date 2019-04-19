import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IunidCompanyComponent } from './iunid-company.component';

describe('IunidCompanyComponent', () => {
  let component: IunidCompanyComponent;
  let fixture: ComponentFixture<IunidCompanyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IunidCompanyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IunidCompanyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
