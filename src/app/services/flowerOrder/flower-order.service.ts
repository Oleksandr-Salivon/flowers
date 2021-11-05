import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, retry, tap } from 'rxjs/operators';
import { Order } from '../../models/order';
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { FlowerOrder } from 'src/app/models/flowerOrder';

@Injectable({
  providedIn: 'root',
})
export class FlowerOrderService {
  status: string = '';
  formData: Order[];
  order: Order;
  flowerOrder: FlowerOrder;
  constructor(private http: HttpClient) {
    this.formData = [];
    this.order = new Order();
    this.flowerOrder = new FlowerOrder();
  }

  readonly baseURL = 'http://localhost:51160/flowerorder';
  private handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      console.error(
        `Backend returned code ${error.status}, body was: `,
        error.error
      );
    }
    // Return an observable with a user-facing error message.
    return throwError('Something bad happened; please try again later.');
  }

  getFlowerOrder() {
    var header = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + localStorage.getItem('token')?.toString(),
    });

    return this.http
      .get(this.baseURL, { headers: header })
      .pipe(catchError(this.handleError));
  }

  postFlowerOrder(flowerOrder: FlowerOrder) {
    var header = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + localStorage.getItem('token')?.toString(),
    });
    return this.http
      .post(this.baseURL, flowerOrder, { headers: header })
      .subscribe((data) => {
        this.status = 'Add successful';
        console.log(this.status);
      });
  }

  putFlowerOrder(flowerOrder: FlowerOrder, oid: number, fid: number) {
    var header = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + localStorage.getItem('token')?.toString(),
    });

    return this.http
      .put(`${this.baseURL}/${fid}_${oid}`, flowerOrder, { headers: header })
      .subscribe(() => {
        this.status = 'Put successful';
        console.log(this.status);
      });
  }

  DelFlowerOrder(oid: number, fid: number) {
    var header = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + localStorage.getItem('token')?.toString(),
    });
    return this.http
      .delete(`${this.baseURL}/${oid}_${fid}`, { headers: header })
      .subscribe(() => {
        this.status = 'Delete successful';
      });
  }

  getFlowerOrderID(oid: number, fid: number) {
    var header = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + localStorage.getItem('token')?.toString(),
    });

    let tmp = this.http.get(`${this.baseURL}/${fid}_${oid}`, {
      headers: header,
    });
    return tmp;
  }
}
