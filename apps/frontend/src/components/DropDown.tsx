import {
  MenuItem,
  Select,
  SelectChangeEvent,
  FormControl,
  InputLabel,
} from "@mui/material";
import { makeStyles } from "@material-ui/core/styles";

interface DropDownProps {
  items: string[];
  handleChange: (event: SelectChangeEvent) => string;
  label: string;
  returnData: string;
}

const useStyles = makeStyles({
  centeredLabel: {
    textAlign: "left", // Center text within the label
    width: "100%", // Ensure full width
  },
});

export function DropDown(props: DropDownProps) {
  const classes = useStyles();

  const handleSelectChange = (event: SelectChangeEvent) => {
    props.handleChange(event);
  };

  return (
    <div>
      <FormControl fullWidth sx={{ width: 200, height: 70 }}>
        <InputLabel
          id="demo-simple-select-label"
          className={classes.centeredLabel}
          sx={
            {
              // mx: "12px",
              // my: "7px",
            }
          }
        >
          {props.label}
        </InputLabel>
        <Select
          onChange={handleSelectChange}
          value={props.returnData}
          defaultValue={""}
          labelId="demo-simple-select-label"
          label={props.label}
          sx={
            {
              // mx: "12px",
              // my: "7px",
            }
          }
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
