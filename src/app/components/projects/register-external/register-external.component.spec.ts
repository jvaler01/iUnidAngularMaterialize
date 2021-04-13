import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { RegisterExternalComponent } from './register-external.component';

describe('RegisterExternalComponent', () => {
  let component: RegisterExternalComponent;
  let fixture: ComponentFixture<RegisterExternalComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ RegisterExternalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterExternalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
