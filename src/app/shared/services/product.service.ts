import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {catchError, tap} from 'rxjs/operators';

import {IProduct} from '../../products/product';

@Injectable({
    providedIn: 'root'
})

export class ProductService{

  private ProductsUrl = 'api/products/products.json';

  constructor(private http: HttpClient){

  }

  getProducts(): Observable<IProduct[]>{
    return this.http.get<IProduct[]>(this.ProductsUrl).pipe(
      tap(data=> {return data}),
      catchError(this.handleError)
    );
  }
  private handleError(err: HttpErrorResponse){
    let errorMessage = '';
    if(err.error instanceof ErrorEvent){
      errorMessage = `An error occured: ${err.error.message}`;
    }else{
      errorMessage = `Server returned code: ${err.status}, error Message is: ${err.message}`;
    }
    console.log(errorMessage);
    return throwError(errorMessage)

  }
}