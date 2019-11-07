import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Todo } from '../models/Todo';

// this const outlines the used http content-type in a JSON format
// used for delete, post, and put
const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
}

@Injectable({
  providedIn: 'root'
})
export class TodoService {

  // instead of a real backend jsonplaceholder can be used as a rest API
  todosUrl = 'https://jsonplaceholder.typicode.com/todos';

  // this addition to the above todosUrl limits the received todo items to zero
  todosLimit = '?_limit=5';

  // passing an HttpClient through the constructor allows its access
  constructor(private http: HttpClient) { }

  // get todos with the limit 0
  // observables provide support for passing messages between publishers and subscribers
  getTodos(): Observable<Todo[]> {
    return this.http.get<Todo[]>(`${this.todosUrl}${this.todosLimit}`);
  }

  // delete the todo with the passed id
  deleteTodo(todo: Todo): Observable<Todo> {
    const url = `${this.todosUrl}/${todo.id}`;
    return this.http.delete<Todo>(url, httpOptions);
  }

  // add the passed observable
  addTodo(todo: Todo): Observable<Todo> {
    return this.http.post<Todo>(this.todosUrl, todo, httpOptions);
  }

  // toggle completion of the passed observable
  toggleCompleted(todo: Todo): Observable<any> {
    const url = `${this.todosUrl}/${todo.id}`;
    return this.http.put(url, todo, httpOptions);
  }

  // update the title of a existing todo
  updateTodo(todo: Todo): Observable<Todo> {
    const url = `${this.todosUrl}/${todo.id}`;
    return this.http.put<Todo>(url, todo, httpOptions);
  }
}
