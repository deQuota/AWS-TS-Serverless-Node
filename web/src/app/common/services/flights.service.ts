import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {HttpHeaders} from "@angular/common/http";
import { FlightsearchModel} from "../../flight-search/flightsearch.model";


@Injectable()

export class FlightsService {


  constructor(private http: HttpClient) {

  }

  getAllFlights() {
    return this.http.get<any>('https://xbmt91wcr0.execute-api.us-east-1.amazonaws.com/dev/flights');
  }

  getSelectedFlight(icao: string){
    return this.http.get<any>(`https://xbmt91wcr0.execute-api.us-east-1.amazonaws.com/dev/flights/${icao}`);
  }
}
