import { Injectable } from '@angular/core';
import {
    HttpClient,
    HttpErrorResponse,
    HttpHeaders
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { TodoList } from '../../models/TodoList';
import { catchError } from 'rxjs/operators';

const httpOptions = {
    headers: new HttpHeaders({
        'Content-Type': 'application/json'
    })
};

@Injectable({
    providedIn: 'root'
})
export class ListService {
    todoListsUrl = '/lists';

    constructor(private http: HttpClient) {}

    // get all todolists
    getTodoLists(): Observable<TodoList[]> {
        return this.http
            .get<TodoList[]>(this.todoListsUrl)
            .pipe(catchError(this.handleError));
    }

    // delete the passed todolist
    deleteTodoList(todoList: TodoList): Observable<TodoList> {
        const url = `${this.todoListsUrl}/${todoList.id}`;
        return this.http
            .delete<TodoList>(url, httpOptions)
            .pipe(catchError(this.handleError));
    }

    // add the passed todolist
    addTodoList(todoList: TodoList): Observable<TodoList> {
        return this.http
            .post<TodoList>(this.todoListsUrl, todoList, httpOptions)
            .pipe(catchError(this.handleError));
    }

    // update the passed todolist
    updateTodoList(todoList: TodoList): Observable<TodoList> {
        const url = `${this.todoListsUrl}/${todoList.id}`;
        return this.http
            .put<TodoList>(url, todoList, httpOptions)
            .pipe(catchError(this.handleError));
    }

    // get todolist by id
    getTodoList(id: number): Observable<TodoList> {
        const url = `${this.todoListsUrl}/${id}`;
        return this.http.get<TodoList>(url).pipe(catchError(this.handleError));
    }

    handleError(error: HttpErrorResponse) {
        if (error.error instanceof ErrorEvent) {
            console.error('An error occurred:', error.error.message);
        } else {
            console.error(
                `Backend returned code ${error.status}, body was: ${error.error}`
            );
        }

        return throwError('Something bad happened; please try again later.');
    }
}
