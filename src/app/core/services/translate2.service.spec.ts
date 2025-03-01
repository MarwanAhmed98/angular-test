import { TestBed } from '@angular/core/testing';

import { Translate2Service } from './translate2.service';

describe('Translate2Service', () => {
  let service: Translate2Service;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Translate2Service);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
