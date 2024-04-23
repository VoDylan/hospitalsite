import { FlowerDeliveryFormSubmission } from "../../common/formSubmission/FlowerDeliveryFormSubmission.ts";
import { useState } from "react";
import { GiftDeliveryFormSubmission } from "../../common/formSubmission/GiftDeliveryFormSubmission.ts";

type form = {
  flowers?: FlowerDeliveryFormSubmission;
  gifts?: GiftDeliveryFormSubmission;
};

let forms: form[];
let newForm: form;

export function useCart(flowers?: FlowerDeliveryFormSubmission, gifts?: GiftDeliveryFormSubmission) {
  const [cart, setCart] = useState<form[]>();
  if (flowers !== undefined) {
    newForm.flowers = flowers;
    newForm.gifts = undefined;
    forms.push(newForm);
    setCart(forms);
  }
  if (gifts !== undefined) {
    newForm.flowers = undefined;
    newForm.gifts = gifts;
    forms.push(newForm);
    setCart(forms);
  }
}
