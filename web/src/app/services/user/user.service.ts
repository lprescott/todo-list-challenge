import { Injectable } from '@angular/core';
import {Observable, throwError} from 'rxjs';
import {User} from '../../models/User';
import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import { catchError } from 'rxjs/operators';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};

@Injectable({
  providedIn: 'root'
})
export class UserService {

  usersUrl = '/users';

  constructor(private http: HttpClient) {}

  // logs an error depending on the type, and throws an error
  public static handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      console.error('An error occurred:', error.error.message);
    } else {
      console.error(
        `Backend returned code ${error.status}, body was: ${error.error}`
      );
    }

    return throwError('Something bad happened; please try again later.');
  }

  getCurrentUser(): Observable<any> {
    const url = '/user/current';
    return this.http.get<any>(url).pipe(catchError(UserService.handleError));
  }

  // delete the user with the passed id
  deleteUser(user: User): Observable<User> {
    const url = `${this.usersUrl}/${user.id}`;
    return this.http
      .delete<User>(url, httpOptions)
      .pipe(catchError(this.handleError));
  }

  // add the passed observable
  addUser(user: User): Observable<User> {
    return this.http
      .post<User>(this.usersUrl, user, httpOptions)
      .pipe(catchError(this.handleError));
  }

  // toggle completion of the passed observable
  toggleCompleted(user: User): Observable<any> {
    const url = `${this.usersUrl}/${user.id}`;
    return this.http
      .put(url, user, httpOptions)
      .pipe(catchError(this.handleError));
  }

  // update the title of existing user
  updateUser(user: User): Observable<User> {
    const url = `${this.usersUrl}/${user.id}`;
    return this.http
      .put<User>(url, user, httpOptions)
      .pipe(catchError(this.handleError));
  }

  // get user by ID
  getUser(id: number): Observable<User> {
    const url = `${this.usersUrl}/${id}`;
    return this.http.get<User>(url)
      .pipe(catchError(this.handleError));
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
