import {FlowerDeliveryFormSubmission} from "./formSubmission/FlowerDeliveryFormSubmission.ts";
import {GiftDeliveryFormSubmission} from "./formSubmission/GiftDeliveryFormSubmission.ts";

export class Cart {
  RRose: number;
  WRose: number;
  RCarn: number;
  Tulip: number;
  Balloons: number;
  Cards: number;
  Bears: number;
  location: string;


  constructor() {
    this.RRose = 0;
    this.WRose = 0;
    this.RCarn = 0;
    this.Tulip = 0;
    this.Balloons = 0;
    this.Cards = 0;
    this.Bears = 0;
    this.location = "";
  }

  private parseAmount(amount: string): number {
    if (amount === "") {
      return 0;
    }
    return parseInt(amount, 10);
  }

  public setFlowers(flowers: FlowerDeliveryFormSubmission) {
    if (flowers.roomNumber == this.location){
      this.RRose = this.RRose + this.parseAmount(flowers.RRose);
      this.WRose = this.WRose + this.parseAmount(flowers.WRose);
      this.RCarn = this.RRose + this.parseAmount(flowers.RCarn);
      this.Tulip = this.RRose + this.parseAmount(flowers.Tulip);
    }
    else if (flowers.roomNumber !== this.location){
      this.location = flowers.roomNumber;
      this.RRose = this.parseAmount(flowers.RRose);
      this.WRose = this.parseAmount(flowers.WRose);
      this.RCarn = this.parseAmount(flowers.RCarn);
      this.Tulip = this.parseAmount(flowers.Tulip);
    }
  }

  public setGifts(gifts: GiftDeliveryFormSubmission) {
    if (gifts.location == this.location){
      this.Balloons = this.Balloons + this.parseAmount(gifts.balloons);
      this.Cards = this.Cards + this.parseAmount(gifts.cards);
      this.Bears = this.Bears + this.parseAmount(gifts.bears);
    }
    else if (gifts.location !== this.location){
      this.location = gifts.location;
      this.Balloons = this.parseAmount(gifts.balloons);
      this.Cards = this.parseAmount(gifts.cards);
      this.Bears = this.parseAmount(gifts.bears);
    }
  }
}
