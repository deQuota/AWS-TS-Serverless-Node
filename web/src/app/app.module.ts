import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';

import { AppRoutingModule } from "./app-routing.module";
import {ClientService} from "./common/services/client.service";
import { HttpClientModule} from "@angular/common/http";
import { HttpClient} from "@angular/common/http";
import { HttpHandler} from "@angular/common/http";
import {InlineEditorModule} from '@qontu/ngx-inline-editor';
import { FlightSearchComponent } from './flight-search/flight-search.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    FlightSearchComponent,

  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    HttpClientModule,
    InlineEditorModule

  ],
  providers: [
    ClientService,
    HttpClient

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
