import React from "react";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";

interface TextboxProps {
  label: string;
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  type?: "text" | "password" | "number"; // Define type prop to indicate input type
}

const useStyles = makeStyles({
  root: {
    display: "flex",
    justifyContent: "center",
    "& .MuiTextField-root": {
      minWidth: "150px", // Adjust width as needed
      maxWidth: "220px",
      minHeight: "75px",
    },
  },
});

export const CenterAlignedNumTextbox = (props: TextboxProps) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <TextField
        id="outlined-number"
        label={props.label}
        variant="outlined"
        type={props.type} // Set input type
        inputProps={{ min: 0 }}
        value={props.value}
        onChange={props.onChange}
      />
    </div>
  );
};
