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
  lat: number = 51.678418;
  lng: number = 7.809007;

  markers:any = [
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
    },{
      lat: 51.673858,
      lng: 7.815982,
      label: 'X',
      draggable: true
    }
  ];

  allFlights: any;
  allCount: number;

  ngOnInit() {



      setInterval(() => {
        this.flightService.getAllFlights().subscribe(
          response => {
            this.allFlights = response.message;
            this.allCount = response.count;
            console.log('Count', response.count);
            console.log(this.allFlights);
          }
        );
      }, 10000);



  }

  onClickFlightSelected(icao: string){

  }

}
