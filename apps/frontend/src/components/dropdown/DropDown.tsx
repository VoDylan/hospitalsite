import {
  MenuItem,
  Select,
  SelectChangeEvent,
  FormControl,
  InputLabel,
} from "@mui/material";
import { makeStyles } from "@material-ui/core/styles";
import {LabelValuePair} from "../../common/LabelValuePair.ts";

interface DropDownProps {
  items: LabelValuePair[] | string[];
  handleChange: (event: SelectChangeEvent) => string;
  label: string;
  returnData: string | number;
}

const isOptionArray = (
  items: LabelValuePair[] | string[],
): items is LabelValuePair[] => {
  return (
    items.length > 0 &&
    typeof items[0] === "object" &&
    "value" in items[0] &&
    "label" in items[0]
  );
};

const useStyles = makeStyles({
  root: {
    display: "flex",
    justifyContent: "center",
    minWidth: "150px", // Adjust width as needed
  },
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

  const renderItems = () => {
    if (isOptionArray(props.items)) {
      return props.items.map((item) => (
        <MenuItem key={item.value} value={item.value}>
          {item.label}
        </MenuItem>
      ));
    } else {
      return props.items.map((item) => (
        <MenuItem key={item} value={item}>
          {item}
        </MenuItem>
      ));
    }
  };

  return (
    <div className={classes.root}>
      <FormControl sx={{ width: 223, height: 75 }}>
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
          {renderItems()}
        </Select>
      </FormControl>
    </div>
  );
}
