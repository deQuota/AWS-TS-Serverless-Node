export class AdvancedFlightModel {

  airCraftModel: string;
  airCraftModelAvailable: boolean;
  from: string;
  fromAvailable: boolean;
  to: string;
  toAvailable: boolean;
  imageURL : string;

  constructor(airCraftModelAvailable: boolean, fromAvailable: boolean, toAvailable: boolean) {
    this.airCraftModelAvailable = airCraftModelAvailable;
    this.fromAvailable = fromAvailable;
    this.toAvailable = toAvailable;
  }
}
