import { TestBed } from '@angular/core/testing';

import { SystemMessagesService } from './system-messages.service';

describe('SystemMessagesService', () => {
  let service: SystemMessagesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SystemMessagesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
