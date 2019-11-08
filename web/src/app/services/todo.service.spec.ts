import { TestBed } from '@angular/core/testing';

import { TodoService } from './todo.service';
import {HttpClientModule} from '@angular/common/http';
import {FormsModule} from '@angular/forms';

describe('TodoService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [HttpClientModule, FormsModule],
    providers: [TodoService]
  }));

  it('should be created', () => {
    const service: TodoService = TestBed.get(TodoService);
    expect(service).toBeTruthy();
  });
});
