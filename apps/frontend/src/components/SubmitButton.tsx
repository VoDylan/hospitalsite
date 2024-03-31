import { Button } from "@mui/material";
import { FlowerDeliveryFormSubmission } from "../common/FlowerDeliveryFormSubmission.ts";

interface ButtonProps {
  text: string;
  input: FlowerDeliveryFormSubmission;
  clear: () => void;
}
export function SubmitButton(props: ButtonProps) {
  function handleSubmit() {
    console.log(props.input);
    props.clear();
  }

  return (
    <Button
      variant="contained"
      id={"submitButton"}
      onClick={() => handleSubmit()}
    >
      {props.text}
    </Button>
  );
}
