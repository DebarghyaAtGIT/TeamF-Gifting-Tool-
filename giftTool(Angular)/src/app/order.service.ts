import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  webapiurl:string = "https://localhost:44324/api/Orders";
  constructor(private _client:HttpClient) { }
  getOrderHistory(id: any): Observable<any>
  {
    return this._client.get(`${this.webapiurl}/${id}`).pipe(
      catchError(this.handleError)
    );
  }

  public getRecentEntry():Observable<any[]> {
    return this._client.get<any[]>(this.webapiurl + "/recentorder/descending").pipe(
      catchError(this.handleError)
    );
  }

  postOrder(user: any): Observable<any>{
    const headers = { 'content-type': 'application/json'};
    var body:string = JSON.stringify(user);
    console.log(body);
    return this._client.post(this.webapiurl,body,{'headers':headers}).pipe(
      catchError(this.handleError)
    );
  }

  deleteOrder(id: any): Observable<any>{
    return this._client.delete(`${this.webapiurl}/${id}`).pipe(
      catchError(this.handleError)
    );
  }

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
