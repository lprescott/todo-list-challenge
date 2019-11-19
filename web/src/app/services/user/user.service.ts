import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../../models/User';
import { TodoService } from '../todo/todo.service';
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
export class UserService {
  // passing an HttpClient through the constructor allows its access
  constructor(private http: HttpClient) {}

  // backend api's controller path
  usersUrl = '/users';

  // get all users
  getUsers(): Observable<User[]> {
    return this.http
      .get<User[]>(this.usersUrl)
      .pipe(catchError(TodoService.handleError));
  }

  // delete the user with the passed id
  deleteUser(user: User): Observable<User> {
    const url = `${this.usersUrl}/${user.id}`;
    return this.http
      .delete<User>(url, httpOptions)
      .pipe(catchError(TodoService.handleError));
  }

  // add the passed observable
  addUser(user: User): Observable<User> {
    return this.http
      .post<User>(this.usersUrl, user, httpOptions)
      .pipe(catchError(TodoService.handleError));
  }

  // toggle completion of the passed observable
  toggleCompleted(user: User): Observable<any> {
    const url = `${this.usersUrl}/${user.id}`;
    return this.http
      .put(url, user, httpOptions)
      .pipe(catchError(TodoService.handleError));
  }

  // update the title of existing user
  updateUser(user: User): Observable<User> {
    const url = `${this.usersUrl}/${user.id}`;
    return this.http
      .put<User>(url, user, httpOptions)
      .pipe(catchError(TodoService.handleError));
  }

  // get user by ID
  getUser(id: number): Observable<User> {
    const url = `${this.usersUrl}/${id}`;
    return this.http.get<User>(url).pipe(catchError(TodoService.handleError));
  }

  // login by username
  login(username: string): Observable<User> {
    const url = `${this.usersUrl}/login/${username}`;
    return this.http.get<User>(url).pipe(catchError(TodoService.handleError));
  }
}
