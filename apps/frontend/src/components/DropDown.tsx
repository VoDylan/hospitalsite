import {
  MenuItem,
  Select,
  SelectChangeEvent,
  FormControl,
  InputLabel,
} from "@mui/material";
import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";

interface DropDownProps {
  items: string[];
  handleChange: (event: SelectChangeEvent) => string;
  label: string;
}

const useStyles = makeStyles({
  centeredLabel: {
    textAlign: "left", // Center text within the label
    width: "100%", // Ensure full width
  },
});

export function DropDown(props: DropDownProps) {
  const classes = useStyles();
  const [retData, setRetData] = useState<string>("");

  const handleSelectChange = (event: SelectChangeEvent) => {
    setRetData(event.target.value); // Update retData using state
    props.handleChange(event);
  };

  return (
    <div>
      <FormControl fullWidth sx={{ width: 220 }}>
        <InputLabel
          id="demo-simple-select-label"
          className={classes.centeredLabel}
          sx={{
            mx: "12px",
            my: "7px",
          }}
        >
          {props.label}
        </InputLabel>
        <Select
          onChange={handleSelectChange}
          value={retData}
          defaultValue={""}
          labelId="demo-simple-select-label"
          label={props.label}
          sx={{
            mx: "12px",
            my: "7px",
          }}
        >
          {props.items.map((item) => (
            <MenuItem value={item}>{item}</MenuItem>
          ))}
          ;
        </Select>
      </FormControl>
    </div>
  );
}
