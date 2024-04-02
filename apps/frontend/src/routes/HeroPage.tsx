import { Box, Stack } from "@mui/material";
import background from "/Background.jpg";
import logo from "/logo.png";
import NavButton from "../components/NavButton.tsx";

function HeroPage() {
  return (
    <div
      style={{
        position: "relative",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        minWidth: "100wh",
        background: `url(${background})`, // Set the background image
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <Box
        sx={{
          backgroundColor: "white",
          opacity: "90%",
          padding: "20px",
          width: "50%",
          height: "60%",
          minHeight: "80",
          position: "relative",
          zIndex: 0,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <img
          src={logo}
          alt="Logo"
          style={{ width: "70%", height: "12%", marginBottom: "5%" }} // Adjust the size and position of the logo
        />
        <Stack direction="row" spacing={2}>
          <NavButton
            path={"/Login"}
            buttonType={"contained"}
            name={"Admin Login"}
          />
          <NavButton
            path={"/Map"}
            buttonType={"contained"}
            name={"Guest Login"}
          />
        </Stack>

        <div className="SanitationDiv">
          <div
            className={"formDiv"}
            style={{ width: "100%", textAlign: "center" }}
          >
            <div
              className={"inputDiv"}
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            ></div>
          </div>
        </div>
      </Box>
    </div>
  );
}

export default HeroPage;
