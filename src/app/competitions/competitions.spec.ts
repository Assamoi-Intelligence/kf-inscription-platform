import { TestBed } from '@angular/core/testing';

import { Competitions } from './competitions';

describe('Competitions', () => {
  let service: Competitions;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Competitions);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
