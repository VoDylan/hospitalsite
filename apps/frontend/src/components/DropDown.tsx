import { MenuItem, Select, SelectChangeEvent } from "@mui/material";

interface DropDownProps {
  items: string[];
  handleChange: (event: SelectChangeEvent) => void;
}

export function DropDown(props: DropDownProps) {
  return (
    <Select
      onChange={props.handleChange}
      inputProps={{ "aria-label": "Without label" }}
    >
      {props.items.map((item) => (
        <MenuItem value={item}>{item}</MenuItem>
      ))}
      ;
    </Select>
  );
}
