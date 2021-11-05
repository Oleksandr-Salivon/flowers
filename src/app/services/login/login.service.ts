import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  unAuthorized: boolean = true;
  constructor() {}

  logOut() {
    localStorage.removeItem('token');
    if (localStorage.getItem('token')) {
      this.unAuthorized = false;
    } else {
      this.unAuthorized = true;
    }
    return this.unAuthorized;
  }
}
