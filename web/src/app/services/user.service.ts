import { Injectable } from '@angular/core';
import {Observable, throwError} from 'rxjs';
import {User} from '../models/User';
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

  getCurrentUser(): Observable<User> {
    const url = '/user/current';
    return this.http.get<User>(url).pipe(catchError(UserService.handleError));
  }
}
