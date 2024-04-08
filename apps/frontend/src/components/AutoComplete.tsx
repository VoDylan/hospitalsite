import * as React from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";

interface ComboProps {
  text: string;
}

export default function ComboBox(props: ComboProps) {
  return (
    <Autocomplete
      disablePortal
      id="combo-box-demo"
      options={nodes}
      sx={{ width: "84%" }}
      renderInput={(params) => (
        <TextField {...params} label={props.text} />
      )}
    />
  );
}


const nodes = [
  { label: "Anesthesia Conf Floor L1", node: "CCONF001L1" },
  { label: "Medical Records Conference Room Floor L1", node: "CCONF002L1" },
  { label: "Abrams Conference Room", node: "CCONF003L1" },
  { label: "Day Surgery Family Waiting Floor L1", node: "CDEPT002L1" },
  { label: "Day Surgery Family Waiting Exit Floor L1", node: "CDEPT003L1" },
  { label: "Medical Records Film Library Floor L1", node: "CDEPT004L1" },
  { label: "Outpatient Fluoroscopy Floor L1", node: "CLABS001L1" },
];
