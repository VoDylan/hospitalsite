// NestedList.tsx
import * as React from "react";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Collapse from "@mui/material/Collapse";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import CheckBoxIcon from "@mui/icons-material/CheckBox";

interface NestedListProps {
  open: boolean;
  handleClick: () => void;
  checkedBFS: boolean;
  handleSelectBFS: () => void;
  checkedAS: boolean;
  handleSelectAS: () => void;
}

const NestedList: React.FC<NestedListProps> = ({
  open,
  handleClick,
  checkedBFS,
  handleSelectBFS,
  checkedAS,
  handleSelectAS,
}) => {
  return (
    <List
      sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}
      component="nav"
    >
      <ListItemButton sx={{ color: "#767674" }} onClick={handleClick}>
        {open ? (
          <ExpandLess sx={{ marginRight: "4%" }} />
        ) : (
          <ExpandMore sx={{ marginRight: "4%" }} />
        )}
        <ListItemText primary="Pathfinding" sx={{ color: "#767674" }} />
      </ListItemButton>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <ListItemButton onClick={handleSelectBFS} sx={{ pl: 4 }}>
            <ListItemIcon>
              <CheckBoxIcon
                sx={{ color: checkedBFS ? "green" : "lightgray" }}
              />
            </ListItemIcon>
            <ListItemText primary="BFS" />
          </ListItemButton>
          <ListItemButton onClick={handleSelectAS} sx={{ pl: 4 }}>
            <ListItemIcon>
              <CheckBoxIcon sx={{ color: checkedAS ? "green" : "lightgray" }} />
            </ListItemIcon>
            <ListItemText primary="A*" />
          </ListItemButton>
        </List>
      </Collapse>
    </List>
  );
};

export default NestedList;
