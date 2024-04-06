import React from "react";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";

// Styles
const useStyles = makeStyles({
  root: {
    display: "flex",
    justifyContent: "center",
    "& .MuiTextField-root": {
      margin: "1vw",
      width: "200px", // Adjust width as needed
    },
  },
});

interface TextboxProps {
  label: string;
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  type?: "text" | "password"; // Define type prop to indicate input type
}

const Textbox: React.FC<TextboxProps> = ({ label, value, onChange, type }) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <TextField
        id="outlined-basic"
        label={label}
        variant="outlined"
        type={type} // Set input type
        value={value}
        onChange={onChange}
      />
    </div>
  );
};

export default Textbox;
