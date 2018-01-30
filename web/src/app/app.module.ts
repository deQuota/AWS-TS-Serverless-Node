import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';

import { AppRoutingModule } from "./app-routing.module";
import {ClientService} from "./common/services/client.service";
import { FlightsService} from './common/services/flights.service';
import {NotifierService} from "./common/services/notifier.service";
import { HttpClientModule} from "@angular/common/http";
import { HttpClient} from "@angular/common/http";
import { FormsModule} from "@angular/forms";
import { HttpHandler} from "@angular/common/http";
import {InlineEditorModule} from '@qontu/ngx-inline-editor';
import { FlightSearchComponent } from './flight-search/flight-search.component';

import { AgmCoreModule} from "@agm/core";

import { LoadingModule } from 'ngx-loading';


import { NgxGaugeModule } from 'ngx-gauge';
import { StatusGraphicComponent } from './status-graphic/status-graphic.component';
import { WeatherPopupComponent } from './weather-popup/weather-popup.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NotificatorComponent } from './notificator/notificator.component';




/*import { Ng4LoadingSpinnerModule } from 'ng4-loading-spinner';*/



@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    FlightSearchComponent,
    StatusGraphicComponent,
    WeatherPopupComponent,
    NotificatorComponent


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
    FormsModule



  ],
  providers: [
    ClientService,
    FlightsService,
    HttpClient,
    NotifierService


  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
