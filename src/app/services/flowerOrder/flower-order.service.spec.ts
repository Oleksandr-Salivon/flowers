import { TestBed } from '@angular/core/testing';

import { FlowerOrderService } from './flower-order.service';

describe('FlowerOrderService', () => {
  let service: FlowerOrderService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FlowerOrderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
