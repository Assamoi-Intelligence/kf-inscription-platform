import { TestBed } from '@angular/core/testing';

import { Participants } from './participants';

describe('Participants', () => {
  let service: Participants;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Participants);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
