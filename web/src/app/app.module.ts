import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';

import { AppRoutingModule } from "./app-routing.module";
import {ClientService} from "./common/services/client.service";
import { FlightsService} from './common/services/flights.service';
import { HttpClientModule} from "@angular/common/http";
import { HttpClient} from "@angular/common/http";
import { HttpHandler} from "@angular/common/http";
import {InlineEditorModule} from '@qontu/ngx-inline-editor';
import { FlightSearchComponent } from './flight-search/flight-search.component';

import { AgmCoreModule} from "@agm/core";

import { LoadingModule } from 'ngx-loading';

import { NgxGaugeModule } from 'ngx-gauge';
import { StatusGraphicComponent } from './status-graphic/status-graphic.component';



/*import { Ng4LoadingSpinnerModule } from 'ng4-loading-spinner';*/



@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    FlightSearchComponent,
    StatusGraphicComponent


  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    HttpClientModule,
    InlineEditorModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyBsEKEciQmGRaFdGqELGAgudgT-c_0iPGQ'
    }),

    /*Ng4LoadingSpinnerModule.forRoot(),*/
    LoadingModule,
    NgxGaugeModule,


  ],
  providers: [
    ClientService,
    FlightsService,
    HttpClient

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
