import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {HttpHeaders} from "@angular/common/http";
import {FlightsearchModel} from "../../flight-search/flightsearch.model";


@Injectable()

export class FlightsService {


  constructor(private http: HttpClient) {

  }

  getGeoFlights() {
    return this.http.get<any>('https://xbmt91wcr0.execute-api.us-east-1.amazonaws.com/dev/geofilteredflights'); // this ones body should contain geo data
  }

  getAllFlights() {
    return this.http.get<any>('https://xbmt91wcr0.execute-api.us-east-1.amazonaws.com/dev/flights/');
  }

  getSelectedFlight(icao: string) {
    return this.http.get<any>(`https://xbmt91wcr0.execute-api.us-east-1.amazonaws.com/dev/flights/${icao}`);
  }

  getAdditionalData(callsign: string) {
    return this.http.get<any>(`https://cors-anywhere.herokuapp.com/https://public-api.adsbexchange.com/VirtualRadar/AircraftList.json?fCallC=` + callsign); // should be directly, CORS
    /*return this.http.get<any>(`https://public-api.adsbexchange.com/VirtualRadar/AircraftList.json?fCallC=` + callsign);*/ // should be directly, COR
  }

  getAircraftImages(icao: string) {
    return this.http.get<any>('https://cors-anywhere.herokuapp.com/http://www.airport-data.com/api/ac_thumb.json?m=' + icao); // should be directly, CORS
    /* return this.http.get<any>('http://www.airport-data.com/api/ac_thumb.json?m=' + icao);*/
  }

  getAirpotDetails(icao: string) {
    return this.http.get<any>('https://cors-anywhere.herokuapp.com/http://www.airport-data.com/api/ap_info.json?icao=' + icao);
    /*return this.http.get<any>('http://www.airport-data.com/api/ap_info.json?icao=' + icao);*/
  }

  getTrackHistory(callsign: string) {
    return this.http.get<any>('https://cors-anywhere.herokuapp.com/https://public-api.adsbexchange.com/VirtualRadar/AircraftList.json?trFmt=f&fCallC=' + callsign);
  }

  getWeather(lat: string, lon: string) {
    return this.http.get<any>('https://cors-anywhere.herokuapp.com/http://api.openweathermap.org/data/2.5/weather?lat=' + lat + '&lon=' + lon + '&APPID=8ca8fd47df1931a2eb8de0aca18b3b6e');
  }
}
