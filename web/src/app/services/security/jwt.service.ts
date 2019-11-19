import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { TodoService } from '../todo/todo.service';

// used for delete, post, and put
const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};

@Injectable({
  providedIn: 'root'
})
export class JwtService {
  constructor(private http: HttpClient) {}

  // get user id if authenticated
  authenticate(jwt: string): Observable<string> {
    const url = `auth/${jwt}`;
    return this.http.get<string>(url).pipe(catchError(TodoService.handleError));
  }

  // login by username
  login(username: string): Observable<string> {
    const url = `auth/login/${username}`;
    return this.http.get<string>(url).pipe(catchError(TodoService.handleError));
  }
}
