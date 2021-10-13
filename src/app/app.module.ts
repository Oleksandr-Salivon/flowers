import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AddFlowersComponent } from './add-flowers/add-flowers.component';
import { SummuryComponent } from './summury/summury.component';
import { AvailableFlowersComponent } from './available-flowers/available-flowers.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FlowerService } from './services/avaliable-flowers.service';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    AddFlowersComponent,
    SummuryComponent,
    AvailableFlowersComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    FormsModule
  ],
  providers: [FlowerService],
  bootstrap: [AppComponent]
})
export class AppModule { }
