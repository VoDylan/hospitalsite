import { Alert, AlertProps, Button, Snackbar } from "@mui/material";
// import axios, { isAxiosError } from "axios";
import { forwardRef, useState } from "react";
// import { HTTPResponseType } from "common/src/HTTPResponseType.ts";
import { SecurityRequestFormSubmission } from "../common/SecurityRequestFormSubmission.ts";

interface ButtonProps {
  text: string;
  input: SecurityRequestFormSubmission;
  clear: () => void;
  updateSubmissionList: () => void;
}

export function SecuritySubmitButton(props: ButtonProps) {
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
    if (props.input.location === "") {
      openWithError("Please select a room");
    } else if (props.input.name === "") {
      openWithError("Please enter your name");
    } else if (props.input.priority === "") {
      openWithError("Please select a priority");
    } else if (props.input.securityCategory === "") {
      openWithError("Please select a category");
    } else if (props.input.status === "") {
      openWithError("Please select a status");
    } else if (props.input.securityPersonnel === "") {
      openWithError("Please select a personnel");
    } else {
      // Not needed for iteration 2
      // const submission = props.input;
      console.log(props.input);

      // const result: { success: boolean; data: HTTPResponseType } =
      //   await pushToDB(submission);

      // if (!result.success) {
      //   openWithError(
      //     `Failed to post form data to database: ${result.data.message}`,
      //   );
      // } else {
      //   handleClear();
      //   openWithSuccess();

      // Remove these once connected to DB
      props.updateSubmissionList();
      handleClear();
      openWithSuccess();
    }
  }
  // }

  function handleClear() {
    props.clear();
  }

  return (
    <Button
      variant="contained"
      id={"submitButton"}
      onClick={() => handleSubmit()}
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
