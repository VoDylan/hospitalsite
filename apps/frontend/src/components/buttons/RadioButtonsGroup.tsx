import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import { ChangeEvent } from "react";

interface ButtonProps {
  label: string;
  options: string[];
  returnData: string;
  handleChange: (event: ChangeEvent<HTMLInputElement>) => void;
}

export default function RadioButtonsGroup(props: ButtonProps) {
  const handleButtonChange = (event: ChangeEvent<HTMLInputElement>) => {
    props.handleChange(event);
  };

  return (
    <FormControl
      sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      <RadioGroup
        aria-labelledby="demo-radio-buttons-group-label"
        name="radio-buttons-group"
        onChange={handleButtonChange}
        value={props.returnData}
      >
        {props.options.map((item) => (
          // @ts-expect-error this works as intended
          <FormControlLabel
            value={item}
            control={<Radio />}
            label={item}
            key={item.trim().toLowerCase()}
            sx={{
              color: "black",
            }}
          >
            {item}
          </FormControlLabel>
        ))}
      </RadioGroup>
    </FormControl>
  );
}
