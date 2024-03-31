import React from "react";
import { Button, Box } from "@mui/material";
import { Login } from "../common/LoginForm.ts";

type LoginButtonsProps = {
  input: Login;
  clear: () => void;
  onClick: () => void;
};

function LoginButtons(props: LoginButtonsProps) {
  const handleClear = () => {
    props.clear();
  };

  return (
    <Box display="flex" justifyContent="center" mt={2}>
      <Button
        className="submitButton"
        variant="contained"
        onClick={props.onClick}
        sx={{
          backgroundColor: "#012D5A",
          color: "white",
          borderRadius: "8px",
          marginRight: "5px",
          border: "2px solid #F6BD38",
        }}
      >
        Submit
      </Button>
      <Button
        className="clearButton"
        variant="contained"
        onClick={handleClear}
        sx={{
          backgroundColor: "#012D5A",
          color: "white",
          borderRadius: "8px",
          marginRight: "-1px",
          border: "2px solid #F6BD38",
        }}
      >
        Clear
      </Button>
    </Box>
  );
}

export default LoginButtons;
