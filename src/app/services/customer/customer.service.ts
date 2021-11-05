import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Customer } from '../../models/customer';

@Injectable({
  providedIn: 'root',
})
export class CustomerService {
  constructor(private http: HttpClient) {}

  registerUsingAPI(customer: Customer) {
    return this.http.post('http://localhost:51160/api/Customer', customer);
  }
  getUsingAPI(customer: Customer) {
    return this.http.post(
      'http://localhost:51160/api/Customer/Login',
      customer
    );
  }
}
