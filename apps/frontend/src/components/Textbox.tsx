import React from "react";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";

// Styles
const useStyles = makeStyles({
  root: {
    display: "flex",
    justifyContent: "center",
    "& .MuiTextField-root": {
      margin: "10px",
      width: "200px", // Adjust width as needed
    },
  },
});

interface TextboxProps {
  label: string;
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const Textbox: React.FC<TextboxProps> = ({ label, value, onChange }) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <TextField
        id="outlined-basic"
        label={label}
        variant="outlined"
        value={value}
        onChange={onChange}
      />
    </div>
  );
};

export default Textbox;
