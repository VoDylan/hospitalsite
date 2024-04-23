import { FlowerDeliveryFormSubmission } from "../../common/formSubmission/FlowerDeliveryFormSubmission.ts";
import { GiftDeliveryFormSubmission } from "../../common/formSubmission/GiftDeliveryFormSubmission.ts";

type form = {
  flowers?: FlowerDeliveryFormSubmission;
  gifts?: GiftDeliveryFormSubmission;
};

export const cart: form[] = [];
let newForm: form;

export function updateCart(flowers?: FlowerDeliveryFormSubmission, gifts?: GiftDeliveryFormSubmission) {
  if (flowers !== undefined) {
    newForm.flowers = flowers;
    newForm.gifts = undefined;
    cart.push(newForm);
  }
  if (gifts !== undefined) {
    newForm.flowers = undefined;
    newForm.gifts = gifts;
    cart.push(newForm);
  }

}
