import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class AddressService {
  webapiurl:string = "https://localhost:44324/api/Address"
  constructor(private _client:HttpClient) { }

  public get(pincode:string):Observable<any[]> {
    return this._client.get<any[]>(this.webapiurl + "/" +pincode).pipe(
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
