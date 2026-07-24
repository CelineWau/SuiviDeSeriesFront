import { TestBed } from '@angular/core/testing';

import { ObjectifAnnuel } from './objectif-annuel';

describe('ObjectifAnnuel', () => {
  let service: ObjectifAnnuel;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ObjectifAnnuel);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
