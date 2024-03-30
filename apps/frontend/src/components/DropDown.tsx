import React, { useState } from "react";
import { MenuItem, Select, SelectChangeEvent } from "@mui/material";

interface DropDownProps {
  items: string[];
}

export function DropDown(props: DropDownProps) {
  const [value, setValue] = useState("");
  const handleChange = (event: SelectChangeEvent) => {
    setValue(event.target.value as string);
  };

  return (
    <Select
      onChange={handleChange}
      value={value}
      inputProps={{ "aria-label": "Without label" }}
    >
      {props.items.map((item) => (
        <MenuItem value={item}>{item}</MenuItem>
      ))}
      ;
    </Select>
  );
}
