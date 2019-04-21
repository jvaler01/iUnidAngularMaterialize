import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchColaboratorComponent } from './search-colaborator.component';

describe('SearchColaboratorComponent', () => {
  let component: SearchColaboratorComponent;
  let fixture: ComponentFixture<SearchColaboratorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchColaboratorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchColaboratorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
