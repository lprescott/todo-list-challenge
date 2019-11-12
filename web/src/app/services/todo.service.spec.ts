import { TestBed } from '@angular/core/testing';

import { BrowserModule } from '@angular/platform-browser';
import { TodoService } from './todo.service';
import { HttpClientModule } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { Todo } from '../models/Todo';

describe('TodoService', () => {

  // create a mock httpMock object and service used for testing
  let httpMock: HttpTestingController;
  let service: TodoService;

  // create a todo for testing
  const firstTodo = new Todo();
  firstTodo.id = 1;
  firstTodo.title = 'Test Todo';
  firstTodo.completed = false;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        BrowserModule,
        HttpClientModule,
        HttpClientTestingModule
      ],
      providers: [
        TodoService
      ]
    });

    httpMock = TestBed.get(HttpTestingController);
    service = TestBed.get(TodoService);
  });

  it('should be created', () => {
    service = TestBed.get(TodoService);
    expect(service).toBeTruthy();
  });

  it('should addTodo() and POST', () => {
    service.addTodo(firstTodo).subscribe(todo =>
      expect(todo).toEqual(firstTodo)
    );

    const request = httpMock.expectOne('/todos');

    expect(request.request.method).toEqual('POST');
    request.flush(firstTodo);
    httpMock.verify();
  });

  it('should updateTodo() and PUT', () => {
    service.updateTodo(firstTodo).subscribe(todo =>
      expect(todo).toEqual(firstTodo)
    );

    const request = httpMock.expectOne('/todos/1');

    expect(request.request.method).toEqual('PUT');
    request.flush(firstTodo);
    httpMock.verify();
  });

  it('should deleteTodo() and DELETE', () => {
    service.deleteTodo(firstTodo).subscribe(() =>
      expect(null).toEqual(null)
    );

    const request = httpMock.expectOne('/todos/1');

    expect(request.request.method).toEqual('DELETE');
    request.flush({});
    httpMock.verify();
  });

  it('should getTodos() and GET', () => {
    service.getTodos().subscribe(todos =>
      expect(todos).toEqual([firstTodo])
    );

    const request = httpMock.expectOne('/todos');

    expect(request.request.method).toEqual('GET');
    request.flush([firstTodo]);
    httpMock.verify();
  });

  it('should toggleCompleted() and PUT', () => {
    service.toggleCompleted(firstTodo).subscribe(todo =>
      expect(todo.completed).toEqual(firstTodo.completed)
    );

    const request = httpMock.expectOne('/todos/1');

    expect(request.request.method).toEqual('PUT');
    request.flush(firstTodo);
    httpMock.verify();
  });

  afterEach(() => {
    httpMock.verify();
  });
});
