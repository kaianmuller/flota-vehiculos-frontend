import { TestBed } from '@angular/core/testing';

import { AgendamientosService } from './agendamientos.service';

describe('AgendamientosService', () => {
  let service: AgendamientosService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AgendamientosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
