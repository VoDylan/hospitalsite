import { Button } from "@mui/material";
import { FlowerDeliveryFormSubmission } from "../common/FlowerDeliveryFormSubmission.ts";
import axios from "axios";

interface ButtonProps {
  text: string;
  input: FlowerDeliveryFormSubmission;
  clear: () => void;
}
export function SubmitButton(props: ButtonProps) {
  function handleSubmit() {
    const submission = props.input;
    console.log(props.input);
    props.clear;
    pushToDB(submission);
  }

  async function pushToDB(form: FlowerDeliveryFormSubmission) {
    const res = await axios.post("/api/FlowerDelivery", form, {
      headers: {
        "content-type": "Application/json",
      },
    });
    if (res.status == 200) {
      console.log("success");
    }
  }

  return (
    <Button
      variant="contained"
      id={"submitButton"}
      onClick={() => handleSubmit()}
      color={"secondary"}
    >
      {props.text}
    </Button>
  );
}
