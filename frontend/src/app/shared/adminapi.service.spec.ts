import { TestBed } from '@angular/core/testing';

import { AdminapiService } from './adminapi.service';

describe('AdminapiService', () => {
  let service: AdminapiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AdminapiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
