import { TestBed } from '@angular/core/testing';

import { SesionStatusService } from './sesion-status.service';

describe('SesionStatusService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SesionStatusService = TestBed.get(SesionStatusService);
    expect(service).toBeTruthy();
  });
});
