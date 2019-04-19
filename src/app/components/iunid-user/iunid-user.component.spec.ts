import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IunidUserComponent } from './iunid-user.component';

describe('IunidUserComponent', () => {
  let component: IunidUserComponent;
  let fixture: ComponentFixture<IunidUserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IunidUserComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IunidUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
