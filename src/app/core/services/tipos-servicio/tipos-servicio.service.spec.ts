import { TestBed } from '@angular/core/testing';

import { TiposServicioService } from './tipos-servicio.service';

describe('TiposServicioService', () => {
  let service: TiposServicioService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TiposServicioService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
