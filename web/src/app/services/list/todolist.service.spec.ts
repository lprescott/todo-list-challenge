import { TestBed } from '@angular/core/testing';

import { TodolistService } from './todolist.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('TodolistService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [HttpClientTestingModule]
  }));

  it('should be created', () => {
    const service: TodolistService = TestBed.get(TodolistService);
    expect(service).toBeTruthy();
  });
});
