import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, retry, tap } from 'rxjs/operators';
import { Flower } from '../../models/flowers';

@Injectable({
  providedIn: 'root',
})
export class FlowerService {
  status: string = '';
  formData: Flower[];
  flower: Flower;
  constructor(private http: HttpClient) {
    (this.formData = []), (this.flower = new Flower());
  }

  readonly baseURL = 'http://localhost:51160/Flower';
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

  getFlower() {
    var header = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + localStorage.getItem('token')?.toString(),
    });

    return this.http
      .get(this.baseURL, { headers: header })
      .pipe(catchError(this.handleError));
  }
  
  postFlower(flower: Flower) {
    var header = new HttpHeaders({
      'Content-Type': 'application/json', 
      Authorization: 'Bearer ' + localStorage.getItem('token')?.toString(),
    });
    return this.http
      .post(this.baseURL, flower, { headers: header })
      .subscribe(() => {
        this.status = 'Add successful';
      });
  }

  putFlower(flower: Flower, id: any) {
    var header = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + localStorage.getItem('token')?.toString(),
    });
    console.log(flower);
    console.log(id);

    return this.http
      .put(`${this.baseURL}/${id}`, flower, { headers: header })
      .subscribe(() => {
        this.status = 'Put successful';
        console.log(this.status);
      });
  }

  DelFlower(id: number) {
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

  getFlowerID(id: number) {
    var header = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + localStorage.getItem('token')?.toString(),
    });
    return this.http
      .get(`${this.baseURL}/${id}`, { headers: header })
      .toPromise()
      .then((res) => {
        this.flower = res as Flower;
      });
  }
}
