import { ChangeEvent, useState } from "react";
import { Login } from "../common/LoginForm.ts";
import Textbox from "../components/Textbox.tsx";
import Buttons from "../components/Buttons.tsx";
import { Typography, Box } from "@mui/material";
import background from "frontend/public/background.jpg";

function LoginForm() {
  const [input, setCredentials] = useState<Login>({
    username: "",
    password: "",
  });

  function clear() {
    setCredentials({ username: "", password: "" });
  }

  function handleUsernameInput(e: ChangeEvent<HTMLInputElement>) {
    setCredentials({ ...input, username: e.target.value });
  }

  function handlePasswordInput(e: ChangeEvent<HTMLInputElement>) {
    setCredentials({ ...input, password: e.target.value });
  }

  return (
    <div
      style={{
        position: "relative",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        minWidth: "100wh",
      }}
    >
      <img
        src={background}
        alt="background"
        style={{
          position: "absolute",
          width: "100vw",
          height: "100vh",
          objectFit: "cover",
          objectPosition: "center",
          zIndex: -1,
        }}
      />
      <Box
        sx={{
          backgroundColor: "white",
          padding: "20px",
          width: "50%",
          height: "60%",
          position: "relative",
          zIndex: 0,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Typography
          variant="h4"
          align="center"
          gutterBottom
          style={{ fontSize: "32px" }}
        >
          Login
        </Typography>
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
            >
              <Textbox
                label="Username:"
                value={input.username}
                onChange={handleUsernameInput}
              />
              <Textbox
                label="Password:"
                value={input.password}
                onChange={handlePasswordInput}
              />
              <Buttons input={input} clear={clear} />
            </div>
          </div>
        </div>
      </Box>
    </div>
  );
}

export default LoginForm;
