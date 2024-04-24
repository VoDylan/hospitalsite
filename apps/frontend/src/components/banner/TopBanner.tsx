import { AppBar, IconButton, Stack, Toolbar, styled } from "@mui/material";
import React from "react";
import bwhLogo from "frontend/src/images/bwh-logo.svg";
import AccountCircle from "@mui/icons-material/AccountCircle";
import { makeStyles } from "@mui/styles";
import SearchBar from "./SearchBar.tsx";
import { Link } from "react-router-dom";
import NavBar from "../navMenu/NavBar.tsx";
import LoginButton from "../auth0/LoginButton.tsx";
import CurrentTime from "../banner/Time.tsx";
import WeatherApp from "./WeatherApp.tsx";
import Carticon from "/carticon.png";

const useStyles = makeStyles({
  logoImage: {
    display: "flex",
    minWidth: "450px",
    maxWidth: "450px",
    minHeight: "120px",
    flexShrink: 0,
  },
});

const LogoIconButton = styled("button")({
  cursor: "pointer",
  background: "transparent",
  border: "none",
  outline: "none",
  "&:active": {
    outline: "none",
  },
  "&:hover": {
    background: "transparent",
  },
});

function TopBanner() {
  const classes = useStyles();

  return (
    <AppBar
      position="fixed"
      sx={{
        backgroundColor: "white",
        height: "120px",
        boxShadow: "0px 2px 8px rgba(0, 0, 0, 0.1)",
        elevation: 1,
      }}
    >
      <Toolbar sx={{ flexGrow: 2, marginLeft: 2 }}>
        <Stack sx={{ marginRight: 2, color: "#012D5A" }}>
          <NavBar />
        </Stack>

        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          display={"flex"}
          sx={{ flexGrow: 1.5, marginRight: "2%" }}
        >
          <Link to="/">
            <LogoIconButton as="span" color="inherit" aria-label="logo">
              <img src={bwhLogo} className={classes.logoImage} alt="bwh logo" />
            </LogoIconButton>
          </Link>
        </Stack>


          <Stack
            direction="row"
            spacing={3}
                 alignItems="center"
                 justifyContent="center"
                 display={"flex"}
                 sx={{ flexGrow: 2, marginRight: "6%"}}>
            <CurrentTime/>
            <WeatherApp/>

          </Stack>

        <Stack
          direction="row"
          spacing={2}
          alignItems="center"
          display={"flex"}
          sx={{ flexGrow: 1 }}
        >
          <SearchBar />
          {/* Replace Sign In button and profile button with LoginButton */}
          <LoginButton />
          <Link to="/">
            <IconButton
              sx={{ color: "#012D5A" }}
              size="large"
              aria-label="account of current user"
            >
              <AccountCircle />
              <Link to={"/Cart"}>
                <img src={Carticon} alt="carticon" />
              </Link>
            </IconButton>
          </Link>
        </Stack>
      </Toolbar>
    </AppBar>
  );
}

export default TopBanner;
