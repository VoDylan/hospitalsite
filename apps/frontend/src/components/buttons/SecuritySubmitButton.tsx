import { Alert, AlertProps, Button, Snackbar } from "@mui/material";
import axios, { isAxiosError } from "axios";
import { forwardRef, useState } from "react";
import { SecurityRequestFormSubmission } from "../../common/formSubmission/SecurityRequestFormSubmission.ts";
// import { FlowerDeliveryFormSubmission } from "../../common/formSubmission/FlowerDeliveryFormSubmission.ts";
import { HTTPResponseType } from "common/src/HTTPResponseType.ts";

interface ButtonProps {
  text: string;
  input: SecurityRequestFormSubmission;
  clear: () => void;
  // updateSubmissionList: () => void;
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
  async function handleSubmit() {
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
      const submission = props.input;
      console.log(props.input);

      const result: { success: boolean; data: HTTPResponseType } =
        await pushToDB(submission);

      if (!result.success) {
        openWithError(
          `Failed to post form data to database: ${result.data.message}`,
        );
      } else {
        handleClear();
        openWithSuccess();

        // Remove these once connected to DB
        // handleClear();
        // openWithSuccess();
      }
    }
  }

  function handleClear() {
    props.clear();
  }

  async function pushToDB(form: SecurityRequestFormSubmission) {
    const returnData = {
      userID: "admin",
      nodeID: form.location,
      serviceType: "security-request",
      services: form,
    };

    let statusCode = undefined;
    let data: HTTPResponseType;

    try {
      const res = await axios.post("/api/database/servicerequest", returnData, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      statusCode = res.status;
      data = JSON.parse(JSON.stringify(res.data));
    } catch (e) {
      if (isAxiosError(e)) {
        if (e.response != null) {
          data = JSON.parse(JSON.stringify(e.response!.data));
          console.log(`Failed to send form data to database: ${data.message}`);
        } else {
          data = {
            message: "Unknown error",
          };
          console.log(`Failed to send form data to database: ${data.message}`);
        }
      } else {
        data = {
          message: "Unknown error",
        };
        console.log(`Failed to send form data to database: ${data.message}`);
      }
    }

    if (statusCode != undefined) {
      console.log(`Success: response code - ${statusCode}`);
      return {
        success: true,
        data: data!,
      };
    }

    return {
      success: false,
      data: data!,
    };
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
