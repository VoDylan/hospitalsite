import { FlowerDeliveryFormSubmission } from "../../common/formSubmission/FlowerDeliveryFormSubmission.ts";
import { GiftDeliveryFormSubmission } from "../../common/formSubmission/GiftDeliveryFormSubmission.ts";


export const flowerCart: FlowerDeliveryFormSubmission[] = [];
export const giftCart: GiftDeliveryFormSubmission[] = [];

export function updateCart(flowers?: FlowerDeliveryFormSubmission, gifts?: GiftDeliveryFormSubmission) {
  if (flowers !== undefined) {
    flowerCart.push(flowers);
  }
  if (gifts !== undefined) {
    giftCart.push(gifts);
  }

}
