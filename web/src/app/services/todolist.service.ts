import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';

import { catchError } from 'rxjs/operators';
import {TodoList} from '../models/TodoList';

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
export class TodolistService {

  // backend api's controller path
  todoListsUrl = '/lists';

  // passing an HttpClient through the constructor allows its access
  constructor(private http: HttpClient) { }

  getTodoLists(): Observable<TodoList[]> {
    return this.http.get<TodoList[]>(this.todoListsUrl)
        .pipe(catchError(this.handleError));

  }

  deleteTodoList(todoList: TodoList): Observable<TodoList> {
    const url = `${this.todoListsUrl}/${todoList.id}`;
    return this.http.delete<TodoList>(url, httpOptions)
        .pipe(catchError(this.handleError));
  }

  addTodoList(todoList: TodoList): Observable<TodoList> {
    return this.http.post<TodoList>(this.todoListsUrl, todoList, httpOptions)
        .pipe(catchError(this.handleError));
  }

  updateTodoList(todoList: TodoList): Observable<TodoList> {
    const url = `${this.todoListsUrl}/${todoList.id}`;
    return this.http.put<TodoList>(url, todoList, httpOptions)
        .pipe(catchError(this.handleError));
  }

  // logs an error depending on the type, and throws an error
  public handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      console.error('An error occurred:', error.error.message);
    } else {
      console.error(`Backend returned code ${error.status}, body was: ${error.error}`);
    }

    return throwError('Something bad happened; please try again later.');
  }
}
