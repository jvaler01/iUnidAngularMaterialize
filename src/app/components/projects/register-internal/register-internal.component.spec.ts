import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { RegisterInternalComponent } from './register-internal.component';

describe('RegisterInternalComponent', () => {
  let component: RegisterInternalComponent;
  let fixture: ComponentFixture<RegisterInternalComponent>;

  beforeEach(waitForAsync(() => {
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
