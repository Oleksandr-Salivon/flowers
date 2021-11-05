import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Customer } from '../../models/customer';
import { CustomerService } from '../../services/customer/customer.service';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  customer: Customer;
  rePass: string;
  myForm: FormGroup;
  constructor(
    private customerService: CustomerService,
    private router: Router
  ) {
    this.customer = new Customer();
    this.rePass = '';
    this.myForm = new FormGroup({
      uid: new FormControl(null, [Validators.required]),
      pass: new FormControl(null, [Validators.required]),
      repass: new FormControl(null, [Validators.required]),
      email: new FormControl(null, [Validators.required]),
      uname: new FormControl(null, [
        Validators.required,
        Validators.minLength(3),
      ]),
    });
  }
  public get uid(): any {
    return this.myForm.get('uid');
  }
  public get pass(): any {
    return this.myForm.get('pass');
  }
  public get repass(): any {
    return this.myForm.get('repass');
  }
  public get uname(): any {
    return this.myForm.get('uname');
  }
  public get email(): any {
    return this.myForm.get('email');
  }

  confirmPass(){
    return this.pass.value == this.repass.value ? true:false
  } 
  register() {
    console.log('From the register component');
    console.log(this.uname);
    console.log('--------------------------');
    if (this.myForm.valid) {
      console.log('valid');

      this.customer.customerId = this.uid.value;
      this.customer.password = this.pass.value;
      this.customer.name = this.uname.value;
      this.customer.email = this.email.value;

      this.customerService.registerUsingAPI(this.customer).subscribe((data) => {
        var customer: Customer = data as Customer;
        console.log(customer);
        // localStorage.setItem("token",customer.jwtToken)
        this.router.navigate(['login']);
      });
    }
  }
  ngOnInit(): void {}
}
