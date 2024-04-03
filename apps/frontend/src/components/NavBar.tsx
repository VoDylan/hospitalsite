import { Drawer, Box, Typography, IconButton, Stack } from "@mui/material";
import { useState } from "react";
import MenuIcon from "@mui/icons-material/Menu";
import NavButton from "./NavButton.tsx";

//FIXED
export const NavBar = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  return (
    <>
      <IconButton
        size={"large"}
        edge={"start"}
        color={"inherit"}
        aria-label={"logo"}
        onClick={() => setIsDrawerOpen(true)}
      >
        <MenuIcon />
      </IconButton>
      <Drawer
        anchor={"left"}
        open={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
      >
        <Box p={2} width={"250px"} textAlign={"center"} role={"presentation"}>
          <Typography variant={"h6"} component={"div"}>
            Side Panel
          </Typography>
          <Stack direction="column" spacing={2}>
            <NavButton buttonType={"contained"} name={"Home"} path={"/"} />
            <NavButton buttonType={"contained"} name={"Map"} path={"/Map"} />
            <NavButton
              buttonType={"contained"}
              name={"Services"}
              path={"/Services"}
            />
            <NavButton
              path={"/DisplayDatabase"}
              buttonType={"contained"}
              name={"Database"}
            />
          </Stack>
        </Box>
      </Drawer>
    </>
  );
};

export default NavBar;
