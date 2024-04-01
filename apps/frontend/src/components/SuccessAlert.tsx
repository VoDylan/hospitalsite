import * as React from "react";
import Alert from "@mui/material/Alert";
import CheckIcon from "@mui/icons-material/Check";

interface SuccessProps {
  text: string;
}
export default function SuccessAlert(props: SuccessProps) {
  return (
    <Alert icon={<CheckIcon fontSize="inherit" />} severity="success">
      {props.text}
    </Alert>
  );
}
