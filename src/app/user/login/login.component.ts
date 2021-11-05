import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AppComponent } from '../../app.component';
import { Customer } from '../../models/customer';
import { CustomerService } from '../../services/customer/customer.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  customer: Customer;
  rePass: string;
  myForm: FormGroup;
  unAuthorized: boolean = true;
  constructor(
    private customerService: CustomerService,
    private router: Router,
    private log: AppComponent
  ) {
    this.customer = new Customer();
    this.rePass = '';
    this.myForm = new FormGroup({
      uid: new FormControl(null, [Validators.required]),
      pass: new FormControl(null, [Validators.required]),
    });
  }
  public get uid(): any {
    return this.myForm.get('uid');
  }
  public get pass(): any {
    return this.myForm.get('pass');
  }

  login() {
    console.log('From the register component');
    console.log('--------------------------');
    if (this.myForm.valid) {
      this.customer.customerId = this.uid.value;
      this.customer.password = this.pass.value;
      console.log(this.customer);

      this.customerService.getUsingAPI(this.customer).subscribe((data) => {
        var customer: Customer = data as Customer;
        localStorage.setItem('token', customer.jwtToken);
        localStorage.setItem('userName', customer.customerId);
        this.router
          .navigateByUrl('/app', { skipLocationChange: true })
          .then(() => {
            this.router.navigate(['flowers']);
          });
      });
    }
  }

  ngOnInit(): void {}
}
