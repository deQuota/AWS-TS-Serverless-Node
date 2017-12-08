import {Component, OnInit} from '@angular/core';
import {FlightsService} from '../common/services/flights.service';
import {AdvancedFlightModel} from "../common/models/advanced-flight.model";

/*import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';*/

@Component({
  selector: 'app-flight-search',
  templateUrl: './flight-search.component.html',
  styleUrls: ['./flight-search.component.css']
})
export class FlightSearchComponent implements OnInit {

  loading = false;
  allFlights: any;
  allCount: number;
  selectedFlight: any;
  selectedFlightAdvanced: AdvancedFlightModel = new AdvancedFlightModel(false, false, false);
  flightSelected = false;
  iconUrl;
  polyLinePoints: any = [];
  imageAlt: string;
  template: string = `<img src="http://pa1.narvii.com/5722/2c617cd9674417d272084884b61e4bb7dd5f0b15_hq.gif" />`;
  j = 0;

  constructor(private flightService: FlightsService) {
    this.selectedFlightAdvanced.airCraftModel = null;
    this.selectedFlightAdvanced.to = null;
    this.selectedFlightAdvanced.from = null;
    this.selectedFlightAdvanced.airCraftModelAvailable = false;
    this.selectedFlightAdvanced.fromAvailable = false;
    this.selectedFlightAdvanced.toAvailable = false;
  }

  ngOnInit() {

    this.loading = true;
    this.onInitGetAll();

    setInterval(() => {
      this.onInitGetAll();
    }, 20000);


  }

  onInitGetAll() {
    if (!this.flightSelected) {
      this.flightService.getAllFlights().subscribe(
        response => {
          this.allFlights = response.message;
          this.allCount = response.count;
          console.log('Count', response.count);
          console.log(this.allFlights);
          this.loading = false
        }
      );
    }
  }

  onClickFlightSelected(icao: string) {
    /*this.spinnerService.show();*/
    this.loading = true;
    this.getFlightOnce(icao);
    this.getImage(icao); // from icao

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
        this.getAdditionalData(this.selectedFlight[0][1]); // from callsign


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

  getAdditionalData(icao: string){
    console.log('Called >', icao);
    this.flightService.getAdditionalData(icao).subscribe(
      data => {
        let acList: any = {};
        if (data.hasOwnProperty('acList', 'acList')&& data.acList.length != 0) {
          console.log('Array',data.acList);
          acList = data.acList[0];
          if (acList.hasOwnProperty('Mdl', 'Mdl')) {
            this.selectedFlightAdvanced.airCraftModel = acList.Mdl;
            this.selectedFlightAdvanced.airCraftModelAvailable = true;
          }
          if (acList.hasOwnProperty('From', 'From')) {
            this.selectedFlightAdvanced.from = acList.From;
            this.selectedFlightAdvanced.fromAvailable = true;
          }
          if (acList.hasOwnProperty('To', 'To')) {
            this.selectedFlightAdvanced.to = acList.To;
            this.selectedFlightAdvanced.toAvailable = true;
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

  getImage(icao :string){
    this.flightService.getAircraftImages(icao).subscribe(
      response =>{
        console.log('Images JSON >>',response);
        if(response.hasOwnProperty('data','data')){
        this.selectedFlightAdvanced.imageURL = response.data[0].image;
        this.selectedFlightAdvanced.imageURL = this.selectedFlightAdvanced.imageURL.replace('thumbnails', 'small');
        console.log(this.selectedFlightAdvanced.imageURL);
        }
        else {
          this.imageAlt = response.error;
        }
      },
      error =>{
          this.imageAlt = error;
      }
    )
  }

}
