import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';

import { AppRoutingModule } from "./app-routing.module";
import {ClientService} from "./common/services/client.service";
import { HttpClientModule} from "@angular/common/http";
import { HttpClient} from "@angular/common/http";
import { HttpHandler} from "@angular/common/http";

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    HttpClientModule

  ],
  providers: [
    ClientService,
    HttpClient

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
