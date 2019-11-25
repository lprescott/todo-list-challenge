import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { TodoService } from '../todo/todo.service';
import { Router } from '@angular/router';

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

  loggedIn = false;

  constructor(private http: HttpClient, private route: Router ) {}

  // Set the boolean loggedIn, to the passed value
  setLoggedIn(val: boolean) {
    this.loggedIn = val;
  }

  // get user id if authenticated
  authenticate(jwt: string): Observable<string> {
    if (this.loggedIn === true) {
      const url = `auth/${jwt}`;
      return this.http.get<string>(url).pipe(catchError(TodoService.handleError));
    }
  }

  // login by username
  login(username: string): Observable<string> {
    const url = `auth/login/${username}`;
    return this.http.get<string>(url).pipe(tap(_ => this.setLoggedIn(true)), catchError(TodoService.handleError));
  }

  // logout
  logout(): void {
    document.cookie = 'jwt=;';
    this.setLoggedIn(false);
    this.route.navigate(['']);
  }
}
