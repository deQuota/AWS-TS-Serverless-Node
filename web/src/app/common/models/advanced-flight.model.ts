export class AdvancedFlightModel {

  airCraftModel: string;
  airCraftModelAvailable: boolean;
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

  constructor(airCraftModelAvailable: boolean, fromAvailable: boolean, toAvailable: boolean) {
    this.airCraftModelAvailable = airCraftModelAvailable;
    this.fromAvailable = fromAvailable;
    this.toAvailable = toAvailable;
  }
}
