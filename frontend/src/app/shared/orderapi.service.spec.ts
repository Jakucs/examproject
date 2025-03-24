import { TestBed } from '@angular/core/testing';

import { OrderapiService } from './orderapi.service';

describe('OrderapiService', () => {
  let service: OrderapiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OrderapiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
