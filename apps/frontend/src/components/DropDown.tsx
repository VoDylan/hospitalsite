import { MenuItem, Select, SelectChangeEvent } from "@mui/material";
import React from "react";
import { makeStyles } from "@material-ui/core/styles";

interface DropDownProps {
  items: string[];
  handleChange: (event: SelectChangeEvent) => string;
}

let retData: string = "";

const useStyles = makeStyles({
  root: {
    display: "flex",
    justifyContent: "flex-start",
    "& .MuiTextField-root": {
      margin: "10px",
      width: "200px", // Adjust width as needed
    },
  },
});

export function DropDown(props: DropDownProps) {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Select
        onChange={(event: SelectChangeEvent) => {
          retData = props.handleChange(event);
        }}
        value={retData}
      >
        {props.items.map((item) => (
          <MenuItem value={item}>{item}</MenuItem>
        ))}
        ;
      </Select>
    </div>
  );
}
