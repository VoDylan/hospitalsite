import { ChangeEvent, useState } from "react";
import { Login } from "../common/LoginForm.ts";
import Textbox from "../components/Textbox.tsx";
import Buttons from "../components/Buttons.tsx";
import { Typography, Box } from "@mui/material";
import background from "frontend/public/Background.jpg";
import logo from "frontend/public/logo.png";

function LoginForm() {
  const [input, setCredentials] = useState<Login>({
    username: "",
    password: "",
  });

  function clear() {
    setCredentials({ username: "", password: "" });
  }

  function handleLogin() {
    if (input.username === "admin" && input.password === "admin") {
      // Simulate successful login
      alert("Logged in successfully!");
      // You can redirect the user to another page here
    } else {
      // Handle invalid credentials
      alert("Invalid username or password!");
      // Optionally, clear the input fields
      clear();
    }
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
          style={{ width: "70%", height: "12%", marginBottom: "20px" }} // Adjust the size and position of the logo
        />
        <Typography
          variant="h4"
          align="center"
          gutterBottom
          style={{ fontSize: "26px" }}
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
                type="password" // Specify type as "password"
              />
              <Buttons onClick={handleLogin} input={input} clear={clear} />
            </div>
          </div>
        </div>
      </Box>
    </div>
  );
}

export default LoginForm;
