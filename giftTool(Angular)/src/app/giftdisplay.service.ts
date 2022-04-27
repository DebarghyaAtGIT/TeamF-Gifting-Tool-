import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Gifts } from './gifts';

@Injectable({
  providedIn: 'root',
})
export class GiftdisplayService {
  webapiurl: string = 'https://localhost:44324/api';
  constructor(private _client: HttpClient) {}

  //Get All gifts
  getAll(): Observable<Gifts[]> {
    return this._client
      .get<Gifts[]>(this.webapiurl + '/Gifts')
      .pipe(catchError(this.handleError));
  }

  //Serach Products
  searchResult(searchedFor: string): Observable<any[]> {
    return this._client
      .get<any[]>(this.webapiurl + '/GiftCategory/search/' + searchedFor)
      .pipe(catchError(this.handleError));
  }

  //Product Recommendations
  giftRecomendation(userid: number): Observable<any[]> {
    return this._client
      .get<any[]>(this.webapiurl + '/GiftCategory/recomendation/' + userid)
      .pipe(catchError(this.handleError));
  }

  //Get gift details by giftId
  showSpecificGift(giftid: number): Observable<any[]> {
    return this._client
      .get<any[]>(this.webapiurl + '/Gifts/category/' + giftid)
      .pipe(catchError(this.handleError));
  }

  //Show More Products
  showOtherProducts(giftid: number): Observable<any[]> {
    var id = String(giftid);
    return this._client
      .get<any[]>(this.webapiurl + '/Gifts/otherproducts/' + id)
      .pipe(catchError(this.handleError));
  }

  //Show random gifts if user has not made any purchases yet or logged out
  showRandomResult(): Observable<any[]> {
    return this._client
      .get<any[]>(this.webapiurl + '/GiftCategory/random')
      .pipe(catchError(this.handleError));
  }
  
  //Update quantity in inventory after purchase
  updateQuantityValueAfterPurchase(giftObj:any,giftid:number) {

    return this._client.put(`${this.webapiurl}/Gifts/${giftid}`,giftObj).pipe(
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
    return throwError('Something bad happened; please try again later.');
  }
}
