import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { catchError } from 'rxjs/operators';
import {TodoList} from '../models/TodoList';
import {TodoService} from './todo.service';
import {Todo} from "../models/Todo";

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
        .pipe(catchError(TodoService.handleError));

  }

  deleteTodoList(todoList: TodoList): Observable<TodoList> {
    const url = `${this.todoListsUrl}/${todoList.id}`;
    return this.http.delete<TodoList>(url, httpOptions)
        .pipe(catchError(TodoService.handleError));
  }

  addTodoList(todoList: TodoList): Observable<TodoList> {
    return this.http.post<TodoList>(this.todoListsUrl, todoList, httpOptions)
        .pipe(catchError(TodoService.handleError));
  }

  updateTodoList(todoList: TodoList): Observable<TodoList> {
    const url = `${this.todoListsUrl}/${todoList.id}`;
    return this.http.put<TodoList>(url, todoList, httpOptions)
        .pipe(catchError(TodoService.handleError));
  }

  getTodoList(id: number): Observable<TodoList> {
    const url = `${this.todoListsUrl}/${id}`;
    return this.http.get<TodoList>(url)
        .pipe(catchError(TodoService.handleError));
  }
}
