import {Component, OnInit, ViewChild , Inject} from '@angular/core';
import {FlightsService} from '../common/services/flights.service';
import {AdvancedFlightModel} from "../common/models/advanced-flight.model";
import {AirportModel} from "../common/models/airport.model";
import {forEach} from "@angular/router/src/utils/collection";
/*import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';*/

@Component({
  selector: 'app-flight-search',
  templateUrl: './flight-search.component.html',
  styleUrls: ['./flight-search.component.css']
})
export class FlightSearchComponent implements OnInit {


  loading = false;
  allFlights: any = [];
  newAllFlights: any = [];
  allCount: number;
  selectedFlight: any;
  selectedFlightAdvanced: AdvancedFlightModel = new AdvancedFlightModel(false, false, false);
  fromAiport: AirportModel = new AirportModel();
  toAirport: AirportModel = new AirportModel();
  flightSelected = false;
  iconUrl;
  polyLinePoints: any = [];
  polyLineHistory: any = [];
  imageAlt: string;
  template: string = `<img src="http://pa1.narvii.com/5722/2c617cd9674417d272084884b61e4bb7dd5f0b15_hq.gif" />`;
  j = 0;
  searchVal = '';
  filtered = [];

  constructor(private flightService: FlightsService) {
    this.selectedFlightAdvanced.airCraftModel = null;
    this.selectedFlightAdvanced.airLine = null;
    this.selectedFlightAdvanced.airLineInfoAvailable = false;
    this.selectedFlightAdvanced.to = null;
    this.selectedFlightAdvanced.from = null;
    this.selectedFlightAdvanced.airCraftModelAvailable = false;
    this.selectedFlightAdvanced.fromAvailable = false;
    this.selectedFlightAdvanced.toAvailable = false;
    this.selectedFlightAdvanced.fromAirportCoordinates = [];
    this.selectedFlightAdvanced.toAirportCoordinates = [];
  }

  ngOnInit() {

    this.loading = true;
    this.onInitGetAll();

    setInterval(() => {
      this.onInitGetAll();
    }, 60000);


  }
  searching(){
    console.log('exe');

    this.filtered = this.allFlights.filter(
      flight => flight[1].toLowerCase().includes(this.searchVal.toLowerCase())
    );

  }

  onInitGetAll() {
    if (!this.flightSelected) {
      this.flightService.getAllFlights().subscribe(
        response => {
          this.allFlights = response.message;
          this.filtered = this.allFlights;
          this.allCount = this.allFlights.length;
          console.log('Count', response.count);
          console.log(this.allFlights);
          this.loading = false
        }
      );
    }
  }

  onClickFlightSelected(icao: string, callsign: string) {
   /* this.spinnerService.show();*/
    this.loading = true;
    this.getFlightOnce(icao);
    this.getImage(icao); // from icao
    this.getAdditionalData(callsign);
    this.flightService.getTrackHistory(callsign).subscribe(
      response => {
        this.selectedFlightAdvanced.historyAvailable = true;
        let Cot: any = {};
        console.log('History Length', response.acList[0].Cot.length);
        Cot = response.acList[0].Cot;
        let y = response.acList[0].Cot.length/3;
        let i = 0;
        let j = 1;
        for(let x=0; x < y; x++ ){
          this.polyLineHistory[x] = {lat:parseFloat(Cot[i]), lon: parseFloat(Cot[j])};
          i += 3;
          j += 3;
        }
      }
    );

    setInterval(() => {
      this.getFlightOnce(icao);
    }, 7000)


  }

  getFlightOnce(icao: string) {


    this.flightService.getSelectedFlight(icao).subscribe(
      response => {
        this.flightSelected = true;
        this.selectedFlight = response.message;
        this.loading = true;
        // this.getAdditionalData(this.selectedFlight[0][1]); // from callsign


        /* this.spinnerService.hide();*/
        /*this.polyLinePoints[0] = { lat:this.selectedFlight[0][6], lon:this.selectedFlight[0][5]};*/
        this.polyLinePoints[this.j] = {lat: this.selectedFlight[0][6], lon: this.selectedFlight[0][5]};
        this.j++;
        if (this.selectedFlight[0][10] > 0 && this.selectedFlight[0][10] < 91) {
          this.iconUrl = 'assets/icons/flight045.png';
        }
        else if (this.selectedFlight[0][10] > 90 && this.selectedFlight[0][10] < 181) {
          this.iconUrl = 'assets/icons/flight135.png';
        }
        else if (this.selectedFlight[0][10] > 180 && this.selectedFlight[0][10] < 271) {
          this.iconUrl = 'assets/icons/flight225.png';
        }
        else {
          this.iconUrl = 'assets/icons/flight315.png';
        }
        console.log('Flight Selected >>' + this.selectedFlight[0][0]);
      },
      error => {

      }
    );
  }

  onCilckBackToWM() {
    location.reload();
  }

  getAdditionalData(callsign: string) {
    console.log('Called >', callsign);
    this.flightService.getAdditionalData(callsign).subscribe(
      data => {
        let acList: any = {};
        if (data.hasOwnProperty('acList', 'acList') && data.acList.length != 0) {
          console.log('Array', data.acList);
          acList = data.acList[0];
          if (acList.hasOwnProperty('Op', 'Op')) {
            this.selectedFlightAdvanced.airLine = acList.Op;
            this.selectedFlightAdvanced.airLineInfoAvailable = true;
          }
          if (acList.hasOwnProperty('Mdl', 'Mdl')) {
            this.selectedFlightAdvanced.airCraftModel = acList.Mdl;
            this.selectedFlightAdvanced.airCraftModelAvailable = true;
          }
          if (acList.hasOwnProperty('From', 'From')) {
            this.selectedFlightAdvanced.from = acList.From;
            this.selectedFlightAdvanced.fromAvailable = true;
            this.selectedFlightAdvanced.fromAirportCode = this.selectedFlightAdvanced.from.split(' ', 1)[0];
            console.log('From Airport Code', this.selectedFlightAdvanced.fromAirportCode);
            this.getFromAirpotDetails(this.selectedFlightAdvanced.fromAirportCode);

          }
          if (acList.hasOwnProperty('To', 'To')) {
            this.selectedFlightAdvanced.to = acList.To;
            this.selectedFlightAdvanced.toAvailable = true;
            this.selectedFlightAdvanced.toAirportCode = this.selectedFlightAdvanced.to.split(' ', 1)[0];
            console.log('To Airport Code', this.selectedFlightAdvanced.toAirportCode);
            this.getToAirportDetails(this.selectedFlightAdvanced.toAirportCode);

          }

          if (acList.hasOwnProperty('Year', 'Year')) {
            this.selectedFlightAdvanced.manufacYear = acList.Year;
            this.selectedFlightAdvanced.manufacYearAvailable = true;
          }

          if (acList.hasOwnProperty('Engines','Engines')){
            this.selectedFlightAdvanced.numberOfEngines = acList.Engines;
            this.selectedFlightAdvanced.numberOfEnginesAvailable = true;
            console.warn('Distance >>', acList.Dst);
            console.warn('Manufacturer >>', acList.Man);
            console.warn('Registartion >>', acList.Reg);
          }
          /*    this.selectedFlightAdvanced.airCraftModel = data.acList[0].Mdl;
              this.selectedFlightAdvanced.from = data.acList[0].From;
              this.selectedFlightAdvanced.to = data.acList[0].To;*/
        }
        /*console.log('Aircraft', this.selectedFlightAdvanced.airCraftModel);
        console.log('From', this.selectedFlightAdvanced.from);
        console.log('To', this.selectedFlightAdvanced.to);*/
      }
    );
  }

  getImage(icao: string) {
    this.flightService.getAircraftImages(icao).subscribe(
      response => {
        console.log('Images JSON >>', response);
        if (response.hasOwnProperty('data', 'data')) {
          this.selectedFlightAdvanced.imageURL = response.data[0].image;
          this.selectedFlightAdvanced.imageURL = this.selectedFlightAdvanced.imageURL.replace('thumbnails', 'small');
          console.log(this.selectedFlightAdvanced.imageURL);
        }
        else {
          this.imageAlt = response.error;
        }
      },
      error => {
        this.imageAlt = error;
      }
    )
  }

  getFromAirpotDetails(icao: string) {
    this.flightService.getAirpotDetails(icao).subscribe(
      response => {

        if (response.hasOwnProperty('name', 'name')) {
          console.log('From Airport Data Received', response);
          this.selectedFlightAdvanced.fromAirportCoordinates[0] = Number(response.longitude);
          this.selectedFlightAdvanced.fromAirportCoordinates[1] = Number(response.latitude);
          this.fromAiport.name = response.name;
          this.flightService.getWeather(response.latitude,response.longitude).subscribe(
              data => {
                this.fromAiport.weatherData = data;
                this.fromAiport.weatherSummary = data.weather[0].description;
                console.log('From Weather Data >>>>', data);
              }

          );
          console.log(this.selectedFlightAdvanced.fromAirportCoordinates);


        }
        else {

        }
      }
    );
  }

  getToAirportDetails(icao: string) {
    this.flightService.getAirpotDetails(icao).subscribe(
      response => {
        if (response.hasOwnProperty('name', 'name')) {
          console.log('To Airport Data Received', response);
          this.selectedFlightAdvanced.toAirportCoordinates[0] = Number(response.longitude);
          this.selectedFlightAdvanced.toAirportCoordinates[1] = Number(response.latitude);
          this.toAirport.name = response.name;
          this.flightService.getWeather(response.latitude,response.longitude).subscribe(
            data => {
              this.toAirport.weatherData = data;
              this.toAirport.weatherSummary = data.weather[0].description;
              console.log('To Weather Data >>>>', data);
            }

          );
          console.log(this.selectedFlightAdvanced.toAirportCoordinates);


        }
        else {

        }
      }
    );
  }

}
