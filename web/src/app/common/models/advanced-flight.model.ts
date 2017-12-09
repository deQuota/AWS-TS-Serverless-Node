export class AdvancedFlightModel {

  airCraftModel: string;
  airCraftModelAvailable: boolean;
  from: string;
  fromAirportCode: string;
  fromAvailable: boolean;
  to: string;
  toAirportCode: string;
  toAvailable: boolean;
  imageURL : string;

  constructor(airCraftModelAvailable: boolean, fromAvailable: boolean, toAvailable: boolean) {
    this.airCraftModelAvailable = airCraftModelAvailable;
    this.fromAvailable = fromAvailable;
    this.toAvailable = toAvailable;
  }
}
