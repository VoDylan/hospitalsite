import * as React from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";

export default function ComboBox() {
  return (
    <Autocomplete
      disablePortal
      id="combo-box-demo"
      options={nodes}
      sx={{ width: 10000 }}
      renderInput={(params) => (
        <TextField {...params} label="Starting Location" />
      )}
    />
  );
}

// Top 100 films as rated by IMDb users. http://www.imdb.com/chart/top
const nodes = [
  { label: "Anesthesia Conf Floor L1", node: "CCONF001L1" },
  { label: "Medical Records Conference Room Floor L1", node: "CCONF002L1" },
  { label: "Abrams Conference Room", node: "CCONF003L1" },
  { label: "Day Surgery Family Waiting Floor L1", node: "CDEPT002L1" },
  { label: "Day Surgery Family Waiting Exit Floor L1", node: "CDEPT003L1" },
  { label: "Medical Records Film Library Floor L1", node: "CDEPT004L1" },
  { label: "Outpatient Fluoroscopy Floor L1", node: "CLABS001L1" },
];
