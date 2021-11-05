import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoginComponent } from './user/login/login.component';
import { FlowerService } from './services/flower/flower.service';
import { LoginService } from './services/login/login.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'flowers';
  unAuthorized: boolean = true;
  name?: string = 'test';
  storage = localStorage.getItem('token');
  constructor(private router: Router, loginService: LoginService) {
    this.unAuthorized = loginService.unAuthorized;
  }

  public localStorageItem() {
    this.name = localStorage.getItem('userName')?.toString();
    return localStorage.getItem('token');
  }
  public localStorageItemName() {
    return localStorage.getItem('userName') === 'Admin';
  }
 
  logOut() {
    localStorage.removeItem('token');
    localStorage.removeItem('userName');
    localStorage.removeItem('status');
    localStorage.removeItem('OrderId');
    this.router.navigate(['login']);
  }
  ngOnInit(): void {
   
  }
}
