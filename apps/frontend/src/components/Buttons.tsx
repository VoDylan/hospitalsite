import React from "react";
import { Button, Box } from "@mui/material";
import { Login } from "../common/LoginForm.ts";

type LoginButtonsProps = {
  input: Login;
  clear: () => void;
};

function LoginButtons(props: LoginButtonsProps) {
  const handleSubmit = () => {
    console.log(props.input);
    props.clear();
  };

  const handleClear = () => {
    props.clear();
  };

  return (
    <Box display="flex" justifyContent="center" mt={2}>
      <Button
        className="submitButton"
        variant="contained"
        onClick={handleSubmit}
        sx={{
          // Custom styles using sx prop
          backgroundColor: "#012D5A", // Change background color
          color: "white", // Change text color
          borderRadius: "8px", // Change border radius
          marginRight: "5px", // Adjust spacing
          border: "2px solid #F6BD38", // Change border thickness and color
        }}
      >
        Submit
      </Button>
      <Button
        className="clearButton"
        variant="contained"
        onClick={handleClear}
        sx={{
          // Custom styles using sx prop
          backgroundColor: "#012D5A", // Change background color
          color: "white", // Change text color
          borderRadius: "8px", // Change border radius
          marginRight: "-1px", // Adjust spacing
          border: "2px solid #F6BD38", // Change border thickness and color
        }}
      >
        Clear
      </Button>
    </Box>
  );
}

export default LoginButtons;
