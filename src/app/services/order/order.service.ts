import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, retry, tap } from 'rxjs/operators';
import { Order } from '../../models/order';
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { OrderPost } from 'src/app/models/orderPost';




@Injectable({
  providedIn: 'root'
})

export class OrderService {
  status: string = '';
  formData: Order[];
  order: Order;
  constructor(private http: HttpClient) {
    (this.formData = []), (this.order = new Order());
  }

  readonly baseURL = 'http://localhost:51160/Order';
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

  getOrder() {
    var header = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + localStorage.getItem('token')?.toString(),
    });

    return this.http
      .get(this.baseURL, { headers: header })
      .pipe(catchError(this.handleError));
  }
  
  postOrder(order: OrderPost) {
    var header = new HttpHeaders({
      'Content-Type': 'application/json', 
      Authorization: 'Bearer ' + localStorage.getItem('token')?.toString(),
    });
    return this.http
      .post(this.baseURL, order, { headers: header })
      .subscribe(() => {
        this.status = 'Add successful';
      });
  }

  putOrder(order: OrderPost, id: any) {
    var header = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + localStorage.getItem('token')?.toString(),
    });
    console.log(order);
    console.log(id);

    return this.http
      .put(`${this.baseURL}/${id}`, order, { headers: header })
      .subscribe(() => {
        this.status = 'Put successful';
        console.log(this.status);
      });
  }

  DelOrder(id: number) {
    var header = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + localStorage.getItem('token')?.toString(),
    });
    return this.http
      .delete(`${this.baseURL}/${id}`, { headers: header })
      .subscribe(() => {
        this.status = 'Delete successful';
      });
  }

  getOrderID(id: number) {
    var header = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + localStorage.getItem('token')?.toString(),
    });

    console.log(this.http.get(`${this.baseURL}/1111`, { headers: header }));

    return this.http
      .get(`${this.baseURL}/${id}`, { headers: header })
      .toPromise()
      .then((res) => {
        this.order = res as Order;
      });
  }
}
