import React from "react";
import { Button, Box } from "@mui/material";
import { Login } from "../common/LoginForm.ts";

type LoginButtonsProps = {
  input: Login;
  clear: () => void;
  onClick: () => void; // Add onClick prop
};

function LoginButtons(props: LoginButtonsProps) {
  const handleSubmit = () => {
    // Check if username and password are both "admin"
    if (props.input.username === "admin" && props.input.password === "admin") {
      // Simulate successful login
      alert("Logged in successfully!");
      // Clear the input fields
      props.clear();
      // You can redirect the user to another page here
    } else {
      // Handle invalid credentials
      alert("Invalid username or password!");
      // Clear the input fields
      props.clear();
    }
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
