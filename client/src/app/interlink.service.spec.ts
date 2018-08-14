import { TestBed, inject } from '@angular/core/testing';

import { InterlinkService } from './interlink.service';

describe('InterlinkService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [InterlinkService]
    });
  });

  it('should be created', inject([InterlinkService], (service: InterlinkService) => {
    expect(service).toBeTruthy();
  }));
});
