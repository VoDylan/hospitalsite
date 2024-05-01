import React from "react";
import { Button } from "@mui/material";
import Box from "@mui/material/Box";

interface ToggleButtonProps {
  onClick: () => void; // Callback function for button click
  buttonText: string; // Text to display on the button
}

const MapToggleBar: React.FC<ToggleButtonProps> = ({ onClick, buttonText }) => {
  return (
    <Box>
      <Button
        variant={"text"}
        sx={{
          color: "#767674",
          backgroundColor: "#F5F7FA",
          borderRadius: "1%",
          border: "0.5px solid rgba(0, 0, 0, 0.05)",
          opacity: "0.8",
          height: "25px",
          width: "200px"
        }}
        onClick={onClick}
      >
        {buttonText}
      </Button>
    </Box>

  );
};

export default MapToggleBar;
