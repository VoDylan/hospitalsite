import {
  MenuItem,
  Select,
  SelectChangeEvent,
  FormControl,
  InputLabel,
} from "@mui/material";
import React from "react";
import { makeStyles } from "@material-ui/core/styles";

interface DropDownProps {
  items: string[];
  handleChange: (event: SelectChangeEvent) => string;
  label: string;
}

let retData: string = "";

const useStyles = makeStyles({
  centeredLabel: {
    textAlign: "left", // Center text within the label
    width: "100%", // Ensure full width
  },
});

export function DropDown(props: DropDownProps) {
  const classes = useStyles();
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
          onChange={(event: SelectChangeEvent) => {
            retData = props.handleChange(event);
          }}
          value={retData}
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
