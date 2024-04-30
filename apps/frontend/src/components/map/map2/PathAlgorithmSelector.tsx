import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Collapse from "@mui/material/Collapse";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import React, {useEffect, useState} from "react";
import {PathAlgorithmType} from "frontend/src/common/types/PathAlgorithmType.ts";
import {Box} from "@mui/material";

interface PathAlgorithmSelectorProps {
  algorithm: PathAlgorithmType;
  setAlgorithm: (algorithm: PathAlgorithmType) => void;
}

export default function PathAlgorithmSelector(props: PathAlgorithmSelectorProps) {
  const [algorithm, setAlgorithm] = useState<PathAlgorithmType>(PathAlgorithmType.ASTAR);

  const [open, setOpen] = useState<boolean>(false);

  useEffect(() => {
    setAlgorithm(props.algorithm);
  }, [props.algorithm]);

  return (
    <Box>
      <List
        sx={{bgcolor: "background.paper"}}
        component="nav"
      >
        <ListItemButton sx={{color: "#767674"}} onClick={() => setOpen(!open)}>
          {open ? (
            <ExpandLess sx={{marginRight: "4%"}}/>
          ) : (
            <ExpandMore sx={{marginRight: "4%"}}/>
          )}
          <ListItemText primary="Pathfinding" sx={{color: "#767674"}}/>
        </ListItemButton>
        <Collapse in={open} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <ListItemButton onClick={() => props.setAlgorithm(PathAlgorithmType.BFS)} sx={{pl: 4}}>
              <ListItemIcon>
                <CheckBoxIcon
                  sx={{
                    color: algorithm == PathAlgorithmType.BFS ? "green" : "lightgray"
                  }}
                />
              </ListItemIcon>
              <ListItemText primary="BFS"/>
            </ListItemButton>
            <ListItemButton onClick={() => props.setAlgorithm(PathAlgorithmType.ASTAR)} sx={{pl: 4}}>
              <ListItemIcon>
                <CheckBoxIcon
                  sx={{
                    color: algorithm == PathAlgorithmType.ASTAR ? "green" : "lightgray"
                  }}
                />
              </ListItemIcon>
              <ListItemText primary="A*"/>
            </ListItemButton>
            <ListItemButton onClick={() => props.setAlgorithm(PathAlgorithmType.DFS)} sx={{pl: 4}}>
              <ListItemIcon>
                <CheckBoxIcon
                  sx={{
                    color: algorithm == PathAlgorithmType.DFS ? "green" : "lightgray"
                  }}
                />
              </ListItemIcon>
              <ListItemText primary="DFS"/>
            </ListItemButton>
            <ListItemButton onClick={() => props.setAlgorithm(PathAlgorithmType.DIJKSTRA)} sx={{pl: 4}}>
              <ListItemIcon>
                <CheckBoxIcon
                  sx={{
                    color: algorithm == PathAlgorithmType.DIJKSTRA ? "green" : "lightgray"
                  }}
                />
              </ListItemIcon>
              <ListItemText primary="Dijkstra"/>
            </ListItemButton>
          </List>
        </Collapse>
      </List>
    </Box>
  );
}
