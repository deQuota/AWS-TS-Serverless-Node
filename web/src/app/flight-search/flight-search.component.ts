import {Component, OnInit} from '@angular/core';
import {FlightsService} from '../common/services/flights.service';

@Component({
  selector: 'app-flight-search',
  templateUrl: './flight-search.component.html',
  styleUrls: ['./flight-search.component.css']
})
export class FlightSearchComponent implements OnInit {

  constructor(private flightService: FlightsService) {
  }

  title: string = 'My first AGM project';
  lat: number = -28.678418;
  lng: number = 153.809007;

  markers: any = [
    {
      lat: 51.673858,
      lng: 7.815982,
      label: 'A',
      draggable: true
    },
    {
      lat: 51.373858,
      lng: 7.215982,
      label: 'B',
      draggable: false
    },
    {
      lat: 51.723858,
      lng: 7.105982,
      label: 'C',
      draggable: true
    }, {
      lat: 51.673858,
      lng: 7.815982,
      label: 'X',
      draggable: true
    }
  ];

  allFlights: any;
  allCount: number;
  selectedFlight: any;
  flightSelected = false;
  iconUrl;
  polyLinePoints:any = [];

  ngOnInit() {

    this.onInitGetAll();

    setInterval(() => {
      this.onInitGetAll();
    }, 10000);


  }

  onInitGetAll() {
    if (!this.flightSelected) {
      this.flightService.getAllFlights().subscribe(
        response => {
          this.allFlights = response.message;
          this.allCount = response.count;
          console.log('Count', response.count);
          console.log(this.allFlights);
        }
      );
    }
  }

  onClickFlightSelected(icao: string) {
    this.getFlightOnce(icao);
    let j=1;
    setInterval(() => {
      this.getFlightOnce(icao);
      this.polyLinePoints[j] = { lat:this.selectedFlight[0][6], lon:this.selectedFlight[0][5]};
      j++;
    }, 7000)


  }
  getFlightOnce(icao: string){

    this.flightService.getSelectedFlight(icao).subscribe(
      response => {
        this.flightSelected = true;
        this.selectedFlight = response.message;
        this.polyLinePoints[0] = { lat:this.selectedFlight[0][6], lon:this.selectedFlight[0][5]};
        if(this.selectedFlight[0][10]>0 && this.selectedFlight[0][10]<91){
          this.iconUrl = 'assets/icons/flight045.png';
        }
        else if(this.selectedFlight[0][10]>90 && this.selectedFlight[0][10]<181){
          this.iconUrl = 'assets/icons/flight135.png';
        }
        else if(this.selectedFlight[0][10]>180 && this.selectedFlight[0][10]<271){
          this.iconUrl = 'assets/icons/flight225.png';
        }
        else{
          this.iconUrl = 'assets/icons/flight315.png';
        }
        console.log('Flight Selected >>' + this.selectedFlight[0][0]);
      }
    );
  }

}
