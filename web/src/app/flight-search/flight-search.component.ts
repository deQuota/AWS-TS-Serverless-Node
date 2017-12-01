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
    setInterval(() => {
      this.flightService.getSelectedFlight(icao).subscribe(
        response => {
          this.flightSelected = true;
          this.selectedFlight = response.message;
          console.log('Flight Selected >>' + this.selectedFlight[0][0]);
        }
      );
    }, 1000)


  }

}
