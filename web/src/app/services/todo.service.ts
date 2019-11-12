import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';

import { Todo } from '../models/Todo';
import { catchError } from 'rxjs/operators';

// this const outlines the used http content-type in a JSON format
// used for delete, post, and put
const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};

@Injectable({
  providedIn: 'root'
})
export class TodoService {

  // backend api's controller path
  todosUrl = '/todos';

  // passing an HttpClient through the constructor allows its access
  constructor(private http: HttpClient) { }

  // get todos with the limit 0
  // observables provide support for passing messages between publishers and subscribers
  getTodos(): Observable<Todo[]> {
    return this.http.get<Todo[]>(this.todosUrl)
        .pipe(catchError(this.handleError));

  }

  // delete the todo with the passed id
  deleteTodo(todo: Todo): Observable<Todo> {
    const url = `${this.todosUrl}/${todo.id}`;
    return this.http.delete<Todo>(url, httpOptions)
      .pipe(catchError(this.handleError));
  }

  // add the passed observable
  addTodo(todo: Todo): Observable<Todo> {
    return this.http.post<Todo>(this.todosUrl, todo, httpOptions)
      .pipe(catchError(this.handleError));
  }

  // toggle completion of the passed observable
  toggleCompleted(todo: Todo): Observable<any> {
    const url = `${this.todosUrl}/${todo.id}`;
    return this.http.put(url, todo, httpOptions)
      .pipe(catchError(this.handleError));
  }

  // update the title of existing todo
  updateTodo(todo: Todo): Observable<Todo> {
    const url = `${this.todosUrl}/${todo.id}`;
    return this.http.put<Todo>(url, todo, httpOptions)
      .pipe(catchError(this.handleError));
  }

  // logs an error depending on the type, and throws an error
  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      console.error('An error occurred:', error.error.message);
    } else {
      console.error(`Backend returned code ${error.status}, body was: ${error.error}`);
    }

    return throwError('Something bad happened; please try again later.');
  }
}
