import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterInternalComponent } from './register-internal.component';

describe('RegisterInternalComponent', () => {
  let component: RegisterInternalComponent;
  let fixture: ComponentFixture<RegisterInternalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegisterInternalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterInternalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
