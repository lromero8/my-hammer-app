import { Injectable } from '@angular/core';
import { User } from './user';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  // endpoint: string = 'http://localhost:5000/api';
  endpoint: string = '/api';
  headers = new HttpHeaders().set('Content-Type', 'application/json');

  constructor(
    private http: HttpClient,
    public router: Router
  ) {
  }

  // Sign-up
  // signUp(user: typeof User): Observable<any> {
  //   let api = `${this.endpoint}/signup`;
  //   return this.http.post(api, user)
  //     .pipe(
  //       catchError(this.handleError)
  //     )
  // }

  signUp(user: typeof User): Observable<any> {
    let api = `${this.endpoint}/signup`;
    return this.http.post(api, user)
      .pipe(map( res => {
        return res;
      }))
  }

  // Sign-in
  // signIn(user: typeof User) {
  //   return this.http.post<any>(`${this.endpoint}/signin`, user)
  //     .subscribe((res: any) => {
  //       localStorage.setItem('access_token', res.token)
  //       this.getUserProfile(res._id).subscribe((res) => {
  //         localStorage.setItem('uid', res.msg._id)
  //         this.router.navigate(['dashboard/' + res.msg._id]);
  //       })
  //     })
  // }

  signIn(user: typeof User) {
    return this.http.post<any>(`${this.endpoint}/signin`, user)
      .pipe(map(res => {
        return res;
      }));
  }  

  getToken() {
    return localStorage.getItem('access_token');
  }

  get isLoggedIn(): boolean {
    let authToken = localStorage.getItem('access_token');
    return (authToken !== null) ? true : false;
  }

  doLogout() {
    let removeToken = localStorage.removeItem('access_token');
    if (removeToken == null) {
      this.router.navigate(['/menu']);
    }
  }

  // User profile
  // getUserProfile(id: any): Observable<any> {
  //   let api = `${this.endpoint}/user-profile/${id}`;
  //   return this.http.get(api, { headers: this.headers }).pipe(
  //     map((res: Response) => {
  //       return res || {}
  //     }),
  //     catchError(this.handleError)
  //   )
  // }

  getUserProfile(id: any) {
    return this.http.get<any>(`${this.endpoint}/user/${id}`, { headers: this.headers })
    .pipe(map(data => {
        return data;
        }));
  }

  // Error 
  handleError(error: HttpErrorResponse) {
    let msg = '';
    if (error.error instanceof ErrorEvent) {
      // client-side error
      msg = error.error.message;
    } else {
      // server-side error
      // msg = `Error Code: ${error.status}\nMessage: ${error.error.message}`;
      msg = error.error;
      
    }
    return throwError(msg);
  }
}