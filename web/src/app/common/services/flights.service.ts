import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {HttpHeaders} from "@angular/common/http";
import { FlightsearchModel} from "../../flight-search/flightsearch.model";


@Injectable()

export class FlightsService {


  constructor(private http: HttpClient) {

  }

  getGeoFlights() {
    return this.http.get<any>('https://xbmt91wcr0.execute-api.us-east-1.amazonaws.com/dev/geofilteredflights'); // this ones body should contain geo data
  }

  getAllFlights(){
    return this.http.get<any>('https://xbmt91wcr0.execute-api.us-east-1.amazonaws.com/dev/flights/');
  }

  getSelectedFlight(icao: string){
    return this.http.get<any>(`https://xbmt91wcr0.execute-api.us-east-1.amazonaws.com/dev/flights/${icao}`);
  }

  getAdditionalData(callsign: string){
    return this.http.get<any>(`https://cors-anywhere.herokuapp.com/https://public-api.adsbexchange.com/VirtualRadar/AircraftList.json?fCallC=`+callsign); // should be directly, CORS
  }
  getAircraftImages(icao: string){
    return this.http.get<any>('https://cors-anywhere.herokuapp.com/http://www.airport-data.com/api/ac_thumb.json?m='+icao); // should be directly, CORS
  }
}
