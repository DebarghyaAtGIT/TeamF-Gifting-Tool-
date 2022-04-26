import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrderDetailsService {
  webapiurl:string = "https://localhost:44324/api/OrderDetails";
  constructor(private _client:HttpClient) { }

  //Post Order details
  public addEntry(user:any):Observable<any> {
    const headers = { 'content-type': 'application/json'};
    var body:string = JSON.stringify(user);
    console.log(body);
    return this._client.post<any>(this.webapiurl,body,{'headers':headers}).pipe(
      catchError(this.handleError)
    );
  }

  //Error Handling
  handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      console.error('An error occurred:', error.error.message);
    } else {
        console.error(error);
    }
    return throwError(
      'Something bad happened; please try again later.');
  };
}
