import { TestBed } from '@angular/core/testing';

import { ProteinsService } from './proteins.service';

describe('ProteinsService', () => {
  let service: ProteinsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProteinsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
