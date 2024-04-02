import { Alert, AlertProps, Button, Snackbar } from "@mui/material";
import { FlowerDeliveryFormSubmission } from "../common/FlowerDeliveryFormSubmission.ts";
import axios from "axios";
import { forwardRef, useState } from "react";

interface ButtonProps {
  text: string;
  input: FlowerDeliveryFormSubmission;
  clear: () => void;
}

export function SubmitButton(props: ButtonProps) {
  // Logic for snackbar alert
  const [open, setOpen] = useState(false);
  const [type, setType] = useState("success");
  const [message, setMessage] = useState("");

  const SnackbarAlert = forwardRef<HTMLDivElement, AlertProps>(
    function SnackbarAlert(props, ref) {
      return <Alert elevation={6} ref={ref} {...props} />;
    },
  );

  const handleClose = (
    event?: React.SyntheticEvent | Event,
    reason?: string,
  ) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  function openWithSuccess() {
    setType("success");
    setMessage("Form submitted successfully!");
    setOpen(true);
  }

  function openWithError(message: string) {
    setType("error");
    setMessage(message);
    setOpen(true);
  }

  // Handles the onClick for the submit button and will continue only if all required fields are filled out
  function handleSubmit() {
    if (props.input.flowerType === "") {
      openWithError("Please select a flower type");
    } else if (props.input.name === "") {
      openWithError("Please enter your name");
    } else if (props.input.recipientName === "") {
      openWithError("Please enter the recipient's name");
    } else if (props.input.roomNumber === "") {
      openWithError("Please enter a valid room number");
    } else {
      const submission = props.input;
      console.log(props.input);
      handleClear();
      openWithSuccess();
      pushToDB(submission);
    }
  }

  function handleClear() {
    props.clear();
  }

  // Function for posting the form submission to the database
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
      <Snackbar
        open={open}
        autoHideDuration={5000}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
      >
        {/*@ts-expect-error Severity will only be of type "success" or "error"*/}
        <SnackbarAlert severity={type}>{message}</SnackbarAlert>
      </Snackbar>
    </Button>
  );
}
