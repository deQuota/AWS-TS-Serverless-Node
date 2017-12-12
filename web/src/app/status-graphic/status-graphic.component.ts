import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-status-graphic',
  templateUrl: './status-graphic.component.html',
  styleUrls: ['./status-graphic.component.css']
})
export class StatusGraphicComponent implements OnInit {

  @Input() selectedFlight: any;

  speedGaugeType = "semi";
  speedGaugeValue = this.speedGaugeValue;
  speedGaugeMax = 1100;
  speedGaugeLabel = "Speed";
  speedGaugeAppendText = "km/h";
  speedGaugeThickness = 15;


  headingGuageType = "full";
  headingGuageValue = this.speedGaugeValue;
  headingGuageMax = 360;
  headingGuageLabel = "Heading";
  headingGuageAppendText = "° deg";
  headingGuageThickness = 10;
  headingGuageThresholdConfig = {
    '0': {color: "red"}
  };


  altitudeGaugeType = "semi";
  altitudeGaugeValue = this.altitudeGaugeValue;
  altitudeGaugeMax = 45000;
  altitudeGaugeLabel = "Altitude";
  altitudeGaugeAppendText = "ft";
  altitudeGaugeThickness = 15;
  altitudeGaugeThresholdConfig = {
    '0': {color: 'green'},
    '20000': {color: 'orange'},
    '40000': {color: 'red'}
  };

  constructor() { }

  ngOnInit() {
    console.log('Selected flight recieved to Graphical section', this.selectedFlight);
    setInterval(() => {
      this.setValuesToSpeedGuage();
      this.setValuesToAltitudeGuage();
      this.setValuesToHeadingGuage();

    },1000)

  }

  setValuesToSpeedGuage(){

    this.speedGaugeValue = Math.floor(Number(this.selectedFlight[0][9])*3.6); // ms-1 to kmph
  }
  setValuesToAltitudeGuage(){
    this.altitudeGaugeValue = Math.floor(Number(this.selectedFlight[0][7])*3.28084); // meters to feet
  }
  setValuesToHeadingGuage(){
    this.headingGuageValue = Math.floor(Number(this.selectedFlight[0][10]));
  }

}
