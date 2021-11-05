import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import {HttpClientModule} from '@angular/common/http';
import { Route, RouterModule} from '@angular/router';
import { AppRoutingModule } from './app-routing.module';


import { AppComponent } from './app.component';
import { AddFlowersComponent } from './flowers/add-flowers/add-flowers.component';
import { SummuryComponent } from './orders/summury/summury.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AvaliableFlowerService } from './services/avaliable-flowers.service';
import { RegisterComponent } from './user/register/register.component';
import { LoginComponent } from './user/login/login.component';
import { FlowersListComponent } from './flowers/flowers-list/flowers-list.component';
import { OrderComponent } from './orders/order/order.component';
import { FlowerComponent } from './flowers/flower/flower.component';
var myRoutes:Route[]=[
  {path:'login',component:LoginComponent},
  {path:'register',component:RegisterComponent},
  {path:'flowers',component:FlowersListComponent},
  {path:'order',component:OrderComponent},
  {path:'add-flower',component:AddFlowersComponent},
  {path:'app',component:AppComponent},
  {path:'',component:FlowersListComponent},

]
@NgModule({
  declarations: [
    AppComponent,
    AddFlowersComponent,
    SummuryComponent,
    RegisterComponent,
    LoginComponent,
    FlowersListComponent,
    OrderComponent,
    FlowerComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(myRoutes)
  ],
  providers: [AvaliableFlowerService],
  bootstrap: [AppComponent]
})
export class AppModule { }
