import { Drawer, Typography, IconButton, Stack } from "@mui/material";
import { useState } from "react";
import MenuIcon from "@mui/icons-material/Menu";
import NavButton from "./NavButton.tsx";

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
        <Stack direction={"column"} p={4} width={"15vw"} role={"presentation"}>
          <Typography
            variant={"h6"}
            component={"div"}
            sx={{ marginBottom: "10%" }}
          >
            Side Panel
          </Typography>
          <Stack
            direction="column"
            spacing={2}
            sx={{ display: "flex", alignItems: "start" }}
          >
            <NavButton name={"Home"} path={"/"} />
            <NavButton name={"Directions"} path={"/Map"} />
            <NavButton name={"Services"} path={"/Services"} />
            <NavButton path={"/DisplayDatabase"} name={"Database"} />
            <NavButton path={"/MapEditingPage"} name={"EDITING PAGE"} />
          </Stack>
        </Stack>
      </Drawer>
    </>
  );
};

export default NavBar;
