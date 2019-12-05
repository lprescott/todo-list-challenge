import { TestBed } from '@angular/core/testing';

import { ListResolver } from './list-resolver.service';

describe('ListResolver', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ListResolver = TestBed.get(ListResolver);
    expect(service).toBeTruthy();
  });
});
