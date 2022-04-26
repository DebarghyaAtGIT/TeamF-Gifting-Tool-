import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { User } from './user';

@Injectable({
  providedIn: 'root',
})
export class GiftToolService {
  webapiurl1: string = 'https://localhost:44324/api/Users';
  constructor(private _client: HttpClient) {}

  //Get Users' details
  public getAll(emailid: string): Observable<User[]> {
    return this._client.get<User[]>(this.webapiurl1 + '/' + emailid);
  }

  //Register/Create User
  public addUser(user: any): Observable<any> {
    const headers = { 'content-type': 'application/json' };
    var body: string = JSON.stringify(user);

    return this._client
      .post<any>(this.webapiurl1, body, { headers: headers })
      .pipe(catchError(this.handleError));
  }

  //LogIn User
  getLoggedUser(data: any): Observable<any> {
    return this._client
      .post(this.webapiurl1 + '/loginuser', data, { responseType: 'json' })
      .pipe(catchError(this.handleError));
  }

  //LogOut User
  logOutUser(id: any): Observable<any> {
    var temp = 'logout';
    return this._client.put(`${this.webapiurl1}/${temp}/${id}`, {});
  }

  //Handle Error
  handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      console.log(error);
    } else {
      alert(error.error);
    }
    return throwError('Something bad happened; please try again later.');
  }
}
