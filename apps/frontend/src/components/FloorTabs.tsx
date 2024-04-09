import { Button, Stack } from "@mui/material";

function Floors() {
  return (
    <Stack
      direction="column"
      spacing={0.1}
      sx={{
        position: "fixed",
        right: "1%",
        top: "60%",
      }}
    >
      <Button
        variant="contained"
        sx={{
          backgroundColor: "white",
          width: "60px",
          height: "60px",
          borderRadius: "2px",
          color: "#767674", // Text color
          "&:hover": {
            color: "white", // Text color on hover
          },
        }}
      >
        3
      </Button>
      <Button
        variant="contained"
        sx={{
          backgroundColor: "white",
          width: "60px",
          height: "60px",
          borderRadius: "2px",
          color: "#767674", // Text color
          "&:hover": {
            color: "white", // Text color on hover
          },
        }}
      >
        2
      </Button>
      <Button
        variant="contained"
        sx={{
          backgroundColor: "white",
          width: "60px",
          height: "60px",
          borderRadius: "2px",
          color: "#767674", // Text color
          "&:hover": {
            color: "white", // Text color on hover
          },
        }}
      >
        1
      </Button>
      <Button
        variant="contained"
        sx={{
          backgroundColor: "white",
          width: "60px",
          height: "60px",
          borderRadius: "2px",
          color: "#767674", // Text color
          "&:hover": {
            color: "white", // Text color on hover
          },
        }}
      >
        L1
      </Button>
      <Button
        variant="contained"
        sx={{
          backgroundColor: "white",
          width: "60px",
          height: "60px",
          borderRadius: "2px",
          color: "#767674", // Text color
          "&:hover": {
            color: "white", // Text color on hover
          },
        }}
      >
        L2
      </Button>
    </Stack>
  );
}

export default Floors;
