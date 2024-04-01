import React from "react";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";

interface TextboxProps {
  label: string;
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  type?: "text" | "password"; // Define type prop to indicate input type
}
export const LeftAlignedTextbox = (props: TextboxProps) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <TextField
        id="outlined-basic"
        label={props.label}
        variant="outlined"
        type={props.type} // Set input type
        value={props.value}
        onChange={props.onChange}
      />
    </div>
  );
};

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
