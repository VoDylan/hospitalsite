import React from "react";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import "./map.css";
// import Map from "./map.tsx";

const BFSCombo: React.FC = () => {
  const menuItems = [];

  for (let i = 0; i < 20; i++) {
    const value = i * 10;
    menuItems.push(
      <MenuItem key={value} value={value}>
        {value}
      </MenuItem>,
    );
  }

  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <FormControl className={"nodeInputs"}>
        <InputLabel id="demo-simple-select-label">Starting Node</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          label="Age"
        >
          {menuItems}
        </Select>
      </FormControl>

      <FormControl className={"nodeInputs"}>
        <InputLabel id="demo-simple-select-label">Ending Node</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          label="Age"
        >
          {menuItems}
        </Select>
      </FormControl>
    </div>
  );
};

export default BFSCombo;
