export class AdvancedFlightModel {

  airCraftModel: string;
  airCraftModelAvailable: boolean;
  manufacYear: string;
  manufacYearAvailable: boolean;
  numberOfEngines: string;
  numberOfEnginesAvailable: boolean;
  airLine: string;
  airLineInfoAvailable : boolean;
  from: string;
  fromAirportCode: string;
  fromAvailable: boolean;
  fromAirportCoordinates: number[];
  to: string;
  toAirportCode: string;
  toAvailable: boolean;
  toAirportCoordinates: number[];
  imageURL : string;
  historyAvailable: boolean;
  history: any;

  constructor(airCraftModelAvailable: boolean, fromAvailable: boolean, toAvailable: boolean) {
    this.airCraftModelAvailable = airCraftModelAvailable;
    this.fromAvailable = fromAvailable;
    this.toAvailable = toAvailable;
  }
}
