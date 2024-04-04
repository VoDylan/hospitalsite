import {
  AppBar,
  Button,
  Stack,
  Toolbar,
  styled,
  IconButton,
} from "@mui/material";
import React from "react";
import bwhLogo from "frontend/public/bwh-logo.svg";
import AccountCircle from "@mui/icons-material/AccountCircle";
import { makeStyles } from "@mui/styles";
import SearchBar from "./SearchBar.tsx";
import { Link } from "react-router-dom";
import NavBar from "./NavBar.tsx";

// {
//   /*WITH NAV BAR*/
// }
// import {useLocation} from 'react-router-dom';
// import Tabs from "@mui/material/Tabs";
// import {Box, Tab} from "@mui/material";
// import { TabContext } from '@mui/lab';

const useStyles = makeStyles({
  logoImage: {
    display: "flex",
    minWidth: "450px", // Set the minimum width
    maxWidth: "450px", // Set the minimum width
    minHeight: "120px", // Set the minimum height
    flexShrink: 0, // Prevent shrinking
  },
});

// Customize BWH Logo to have just a link and no button outline
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

  {
    /*WITH NAV BAR*/
  }
  // const location = useLocation();
  // Set tab values when switching pages
  // const [value, setValue] = React.useState(getTabIndex(location.pathname));
  // const handleChange = (_event: React.SyntheticEvent, newValue: number) => {
  //     setValue(newValue);
  // };

  return (
    <AppBar position="fixed" sx={{ backgroundColor: "white", height: "120px" }}>
      <Toolbar sx={{ flexGrow: 2, marginLeft: 2 }}>
        <Stack sx={{ marginRight: 2, color: "#012D5A" }}>
          <NavBar />
        </Stack>

        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          display={"flex"}
          sx={{ flexGrow: 8 }}
        >
          <Link to="/">
            <LogoIconButton as="span" color="inherit" aria-label="logo">
              <img src={bwhLogo} className={classes.logoImage} alt="bwh logo" />
            </LogoIconButton>
          </Link>
        </Stack>

        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          display={"flex"}
          marginRight={10}
          sx={{ flexGrow: 2 }}
        >
          {/*WITH NAV BAR*/}
          {/*<TabContext value={value}>*/}
          {/*    <Box>*/}
          {/*        <Tabs*/}
          {/*            value={value}*/}
          {/*            onChange={handleChange}*/}
          {/*            aria-label="nav tabs example"*/}
          {/*            role="navigation"*/}
          {/*        >*/}
          {/*            <Tab label="Home" component={Link} to='/' />*/}
          {/*            <Tab label="Directions" component={Link} to="/Map" />*/}
          {/*            <Tab label="Services" component={Link} to="/Services" />*/}
          {/*        </Tabs>*/}
          {/*    </Box>*/}
          {/*</TabContext>*/}
        </Stack>

        <Stack
          direction="row"
          spacing={2}
          alignItems="center"
          display={"flex"}
          sx={{ flexGrow: 1 }}
        >
          <SearchBar />
          <Button
            sx={{ width: 220 }}
            component={Link}
            to="/Login"
            variant="contained"
          >
            Sign Out
          </Button>

          {/*Profile button links to login page for now*/}
          <Link to="/Login">
            <IconButton
              sx={{ color: "#012D5A" }}
              size="large"
              aria-label="account of current user"
            >
              <AccountCircle />
            </IconButton>
          </Link>
        </Stack>
      </Toolbar>
    </AppBar>
  );
}

{
  /*WITH NAV BAR*/
}
// function getTabIndex(path: string): number {
//     switch (path) {
//         case "/":
//             return 0;
//         case "/Map":
//             return 1;
//         case "/Services":
//             return 2;
//         default:
//             return 0;
//     }
// }
export default TopBanner;
