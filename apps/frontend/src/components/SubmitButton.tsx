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
    if (props.input.flowerType === "-- Select Flower Type --") {
      alert("Please select a flower type");
    } else if (props.input.name === "") {
      alert("Please enter your name");
    } else if (props.input.recipientName === "") {
      alert("Please enter the recipient's name");
    } else if (props.input.roomNumber === "") {
      alert("Please enter a valid room number");
    } else {
      const submission = props.input;
      console.log(props.input);
      handleClear();
      alert("Success!");
      pushToDB(submission);
    }
  }

  function handleClear() {
    props.clear();
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
      color={"primary"}
    >
      {props.text}
    </Button>
  );
}
