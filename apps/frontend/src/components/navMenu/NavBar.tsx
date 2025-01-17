import {
  Drawer,
  IconButton,
  Button,
  Box,
  Typography,
  Divider,
  List,
  ListItem,
} from "@mui/material";
import { useState } from "react";
import MenuIcon from "@mui/icons-material/Menu";
import HomeIcon from "@mui/icons-material/Home";
import MapIcon from "@mui/icons-material/Map";
import AnnouncementIcon from "@mui/icons-material/Announcement";
import StorageIcon from "@mui/icons-material/Storage";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import CalculateIcon from '@mui/icons-material/Calculate';
import { blue } from "@mui/material/colors";

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
        sx={{
          zIndex: 9999,
        }}
      >
        <Box
          sx={{
            bgcolor: "#003A96",
            height: "100%",
            width: "100%",
          }}
        >
          <List
            sx={{
              padding: 2,
            }}
          >
            <ListItem>
              <Button
                variant="text"
                href={"/"}
                startIcon={<HomeIcon sx={{ color: blue[200] }} />}
              >
                <Typography color="white">Home</Typography>
              </Button>
            </ListItem>
            <Divider sx={{ bgcolor: "white" }} />
            <ListItem>
              <Button
                variant="text"
                href={"/Map"}
                startIcon={<MapIcon sx={{ color: blue[200] }} />}
              >
                <Typography color="white">Directions</Typography>
              </Button>
            </ListItem>
            <ListItem>
              <Button
                variant="text"
                href={"/MapEditingPage"}
                startIcon={<ModeEditIcon sx={{ color: blue[200] }} />}
              >
                <Typography color="white">Map Editor</Typography>
              </Button>
            </ListItem>
            <Divider
              sx={{
                bgcolor: "white",
              }}
            />
            <ListItem>
              <Button
                variant="text"
                href={"/Services"}
                startIcon={<AnnouncementIcon sx={{ color: blue[200] }} />}
              >
                <Typography color="white">Services</Typography>
              </Button>
            </ListItem>
            <ListItem>
              <Button
                variant="text"
                href={"/Calculator"}
                startIcon={<CalculateIcon sx={{ color: blue[200] }} />}
              >
                <Typography color="white">Health Calculator</Typography>
              </Button>
            </ListItem>
            <ListItem>
              <Button
                variant="text"
                href={"/DisplayDatabase"}
                startIcon={<StorageIcon sx={{ color: blue[200] }} />}
              >
                <Typography color="white">Database</Typography>
              </Button>
            </ListItem>
          </List>
        </Box>
      </Drawer>
    </>
  );
};

export default NavBar;
