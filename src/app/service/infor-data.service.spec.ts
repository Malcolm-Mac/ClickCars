import { TestBed } from '@angular/core/testing';

import { InforDataService } from './infor-data.service';

describe('InforDataService', () => {
  let service: InforDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InforDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
