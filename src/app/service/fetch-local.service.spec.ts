import { TestBed, inject } from '@angular/core/testing';

import { FetchLocalService } from './fetch-local.service';

describe('FetchLocalService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FetchLocalService]
    });
  });

  it('should be created', inject([FetchLocalService], (service: FetchLocalService) => {
    expect(service).toBeTruthy();
  }));
});
