import { MenuItem, Select, SelectChangeEvent } from "@mui/material";
import React from "react";

interface DropDownProps {
  items: string[];
  handleChange: (event: SelectChangeEvent) => string;
}

let retData: string = "";

export function DropDown(props: DropDownProps) {
  return (
    <>
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
    </>
  );
}
