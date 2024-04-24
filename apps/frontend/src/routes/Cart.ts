import {FlowerDeliveryFormSubmission} from "../common/formSubmission/FlowerDeliveryFormSubmission.ts";
import {GiftDeliveryFormSubmission} from "../common/formSubmission/GiftDeliveryFormSubmission.ts";

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

  public setFlowers(flowers: FlowerDeliveryFormSubmission) {
    if (flowers.roomNumber == this.location){
      this.RRose = this.RRose + parseInt(flowers.RRose);
      this.WRose = this.WRose + parseInt(flowers.WRose);
      this.RCarn = this.RRose + parseInt(flowers.RCarn);
      this.Tulip = this.RRose + parseInt(flowers.Tulip);
    }
    else if (flowers.roomNumber !== this.location){
      this.location = flowers.roomNumber;
      this.RRose = parseInt(flowers.RRose);
      this.WRose = parseInt(flowers.WRose);
      this.RCarn = parseInt(flowers.RCarn);
      this.Tulip = parseInt(flowers.Tulip);
    }
  }

  public setGifts(gifts: GiftDeliveryFormSubmission) {
    if (gifts.location == this.location){
      this.Balloons = this.Balloons + parseInt(gifts.balloons);
      this.Cards = this.Cards + parseInt(gifts.cards);
      this.Bears = this.Bears + parseInt(gifts.bears);
    }
    else if (gifts.location !== this.location){
      this.location = gifts.location;
      this.Balloons = parseInt(gifts.balloons);
      this.Cards = parseInt(gifts.cards);
      this.Bears = parseInt(gifts.bears);
    }
  }
}
