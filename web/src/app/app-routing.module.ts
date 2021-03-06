import {NgModule} from '@angular/core';
import {Routes, RouterModule, PreloadAllModules} from '@angular/router';
import {HomeComponent} from './home/home.component';
import { FlightSearchComponent} from './flight-search/flight-search.component';
import { BrowserModule} from "@angular/platform-browser";
import {HttpClientModule} from "@angular/common/http";


const appRoutes: Routes = [

  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: 'flightsearch',
    component: FlightSearchComponent
  }

];

@NgModule({
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot(
      appRoutes,
      {
        //preloadingStrategy: PreloadAllModules  // when we load module wise
      })
  ],
  exports: [RouterModule]
})

export class AppRoutingModule {
}
