import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import CssBaseline from "@mui/material/CssBaseline";
import Toolbar from "@mui/material/Toolbar";
import RadioButtonCheckedIcon from "@mui/icons-material/RadioButtonChecked";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import SyncIcon from "@mui/icons-material/Sync";
import AltRouteIcon from "@mui/icons-material/AltRoute";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import TopBanner2 from "../components/TopBanner2.tsx";
import React, { useEffect, useRef, useState } from "react";
import MapImage from "../images/00_thelowerlevel1.png";
import { TextField, Button, Stack, Paper, Slide } from "@mui/material";
import "./map.css";
import { Coordinates } from "common/src/Coordinates.ts";
import axios from "axios";
import { LocationInfo } from "common/src/LocationInfo.ts";
import NestedList from "../components/PathfindingSelect.tsx";
import Autocomplete from "@mui/material/Autocomplete";
import GraphManager from "../../../../packages/common/src/map/GraphManager.ts";

function Map() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [startNode, setStartNode] = useState<string>("");
  const [endNode, setEndNode] = useState<string>("");
  const [nodes, setNodes] = useState<string[]>([]);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [nodesData, setNodesData] = useState<Coordinates[]>([]);

  //Pathfinder
  const [open, setOpen] = React.useState(false);
  const [checkedBFS, setCheckedBFS] = React.useState(false);
  const [checkedAS, setCheckedAS] = React.useState(false);
  const [algorithm, setAlgorithm] = React.useState("BFS");

  // const exNodes = [
  //   { label: "Anesthesia Conf Floor L1", node: "CCONF001L1" },
  //   { label: "Medical Records Conference Room Floor L1", node: "CCONF002L1" },
  //   { label: "Abrams Conference Room", node: "CCONF003L1" },
  //   { label: "Day Surgery Family Waiting Floor L1", node: "CDEPT002L1" },
  //   { label: "Day Surgery Family Waiting Exit Floor L1", node: "CDEPT003L1" },
  //   { label: "Medical Records Film Library Floor L1", node: "CDEPT004L1" },
  //   { label: "Outpatient Fluoroscopy Floor L1", node: "CLABS001L1" },
  // ];

  const graphManager = GraphManager.getInstance().nodes;
  console.log("graphNodes:", graphManager);
  const testNodes = graphManager.map((node) => {
    console.log("Node ID:", node.nodeID, "Long Name:", node.longName);
    return {
      label: node.longName, // Assuming `longName` is the label you want to use
      node: node.nodeID,
    };
  });

  // const exLabels = exNodes.map(node => node.label);

  const handleClick = () => {
    setOpen(!open);
  };

  const handleSelectBFS = () => {
    if (checkedAS) {
      setCheckedAS(false);
    }
    setCheckedBFS(!checkedBFS);
    setAlgorithm("BFS");
  };

  const handleSelectAS = () => {
    if (checkedBFS) {
      setCheckedBFS(false);
    }
    setCheckedAS(!checkedAS);
    setAlgorithm("A*");
  };

  // Slide Container
  const [checked, setChecked] = React.useState(false);

  const handleButtonClick = () => {
    setChecked((prev) => !prev);
  };

  const icon = (
    <Paper sx={{ width: "100%", height: "100%" }} elevation={4}>
      <Stack direction="column" sx={{ position: "absolute", top: 4, left: 4 }}>
        <Button
          startIcon={<ArrowBackIcon />}
          onClick={handleButtonClick}
          variant="text"
        >
          {checked ? "back" : "Show from target"}
        </Button>
      </Stack>
    </Paper>
  );

  const handleStartNodeChange = (value: string | null) => {
    if (value) {
      // Find the corresponding node for the selected label
      const selectedNode = testNodes.find((node) => node.label === value);
      if (selectedNode) {
        setStartNode(selectedNode.node);
      }
    } else {
      setStartNode(""); // Handle null value if necessary
    }
  };

  const handleEndNodeChange = (value: string | null) => {
    if (value) {
      // Find the corresponding node for the selected label
      const selectedNode = testNodes.find((node) => node.label === value);
      if (selectedNode) {
        setEndNode(selectedNode.node);
      }
    } else {
      setEndNode(""); // Handle null value if necessary
    }
  };

  const updateNodesData = (newData: Coordinates[]) => {
    setNodesData(newData);
  };

  async function handleSubmit() {
    console.log(startNode);
    console.log(endNode);

    if (startNode.trim() === "" || endNode.trim() === "") {
      setErrorMessage("Please enter both start and end nodes");
      return;
    }

    if (startNode === endNode) {
      setErrorMessage("Please enter different nodes");
      return;
    }

    const request: LocationInfo = { startNode: startNode, endNode: endNode };

    try {
      const response = await axios.post("/api/path", request, {
        headers: { "Content-Type": "application/json" },
      });
      const data = response.data;
      const path = data.message;
      updateNodesData(path);
      setNodes([startNode, endNode]);
      setErrorMessage("");
    } catch (error) {
      console.error("Failed to fetch data:", error);
      setErrorMessage("Failed to fetch data. Please try again.");
    }
  }

  function handleClear() {
    setStartNode(""); // Clear startNode
    setEndNode(""); // Clear endNode
    //stop animation
  }

  useEffect(() => {
    console.log(algorithm);
    console.log(startNode);
    console.log(endNode);

    if (canvasRef.current) {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext("2d");

      if (!ctx) return;

      const image = new Image();
      image.src = MapImage;
      image.onload = () => {
        canvas.width = image.width;
        canvas.height = image.height;

        ctx.drawImage(image, 0, 0, canvas.width, canvas.height);

        if (startNode.trim() === nodes[0] && endNode.trim() === nodes[1]) {
          if (!nodesData) {
            setErrorMessage("There is no path between nodes");
            return;
          }

          let currentTargetIndex = 0;
          let currentX = nodesData[currentTargetIndex].x;
          let currentY = nodesData[currentTargetIndex].y;
          const speed = 1;

          const moveDot = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.drawImage(image, 0, 0, canvas.width, canvas.height);
            ctx.fillStyle = "black";

            for (let i = 0; i < nodesData.length; i++) {
              ctx.beginPath();
              ctx.arc(nodesData[i].x, nodesData[i].y, 5, 0, 2 * Math.PI);
              ctx.fill();
            }

            ctx.lineWidth = 3;
            ctx.beginPath();
            ctx.moveTo(nodesData[0].x, nodesData[0].y);
            for (let i = 1; i < nodesData.length; i++) {
              ctx.lineTo(nodesData[i].x, nodesData[i].y);
            }
            ctx.stroke();

            ctx.fillStyle = "blue";
            ctx.beginPath();
            ctx.arc(currentX, currentY, 10, 0, 2 * Math.PI);
            ctx.fill();

            const dx = nodesData[currentTargetIndex].x - currentX;
            const dy = nodesData[currentTargetIndex].y - currentY;
            const distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < speed) {
              currentTargetIndex = (currentTargetIndex + 1) % nodesData.length;
            } else {
              currentX += (dx / distance) * speed;
              currentY += (dy / distance) * speed;
            }
            if (currentTargetIndex === 0) {
              currentX = nodesData[0].x;
              currentY = nodesData[0].y;
              currentTargetIndex = 1;
            }

            requestAnimationFrame(moveDot);
          };
          moveDot();
        }
      };
    }
  }, [startNode, endNode, nodes, nodesData, algorithm]);

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <TopBanner2 />

      {/*Side Bar*/}
      <Drawer
        variant="permanent"
        sx={{
          width: "2%",
          flexShrink: 1,
          [`& .MuiDrawer-paper`]: {
            width: "18%",
            boxSizing: "border-box",
            boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
            borderRadius: "10px",
            elevation: 10,
            zIndex: 1,
          },
        }}
      >
        <Toolbar />

        <Stack
          display={"flex"}
          direction={"column"}
          sx={{ marginTop: "36%", marginLeft: "4%" }}
        >
          <Stack
            direction={"row"}
            spacing={1}
            sx={{ display: "flex", alignItems: "center" }}
          >
            <RadioButtonCheckedIcon
              sx={{ color: "blue" }}
            ></RadioButtonCheckedIcon>

            <Autocomplete
              onChange={(event, value) => handleStartNodeChange(value)}
              disablePortal
              id="startNode"
              options={testNodes.map((node) => node.label)}
              sx={{ width: "84%" }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Starting Node"
                  value={startNode}
                />
              )}
            />
          </Stack>

          <Stack>
            <MoreVertIcon fontSize={"medium"}></MoreVertIcon>
          </Stack>

          <Stack
            direction={"row"}
            spacing={1}
            sx={{ display: "flex", alignItems: "center" }}
          >
            <LocationOnIcon
              fontSize={"medium"}
              sx={{ color: "red" }}
            ></LocationOnIcon>

            <Autocomplete
              onChange={(event, value) => handleEndNodeChange(value)}
              disablePortal
              id="startNode"
              options={testNodes.map((node) => node.label)}
              sx={{ width: "84%" }}
              renderInput={(params) => (
                <TextField {...params} label="Ending Node" value={endNode} />
              )}
            />
          </Stack>

          {/*Pathfinding selection dropdown*/}
          <Stack
            direction={"row"}
            spacing={1}
            sx={{ display: "flex", alignItems: "center", marginTop: "8%" }}
          >
            <NestedList
              open={open}
              handleClick={handleClick}
              checkedBFS={checkedBFS}
              handleSelectBFS={handleSelectBFS}
              checkedAS={checkedAS}
              handleSelectAS={handleSelectAS}
            />
          </Stack>

          <Stack
            direction={"column"}
            spacing={2}
            sx={{ marginLeft: "10%", marginTop: "4%" }}
          >
            <p style={{ color: "red" }}>{errorMessage}</p>
            <Button
              startIcon={<AltRouteIcon />}
              variant={"contained"}
              sx={{ width: "80%", display: "flex", justifyContent: "center" }}
              onClick={handleSubmit}
            >
              Find Path
            </Button>
            <Button
              startIcon={<SyncIcon />}
              variant={"contained"}
              sx={{ width: "80%", display: "flex", justifyContent: "center" }}
              onClick={handleClear}
            >
              Reset
            </Button>
          </Stack>

          <Box
            sx={{
              width: "90%",
              height: "0.2vh",
              backgroundColor: "#808080",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              marginTop: "20%",
              marginLeft: "2%",
            }}
          ></Box>

          <Stack
            direction={"column"}
            spacing={2}
            sx={{ marginLeft: "10%", marginTop: "20%" }}
          >
            <Button
              variant={"contained"}
              sx={{ width: "80%" }}
              onClick={handleButtonClick}
            >
              {checked ? "Add Filters" : "Add Filters"}
            </Button>
            <Button
              variant={"contained"}
              sx={{ width: "80%", backgroundColor: "#D9D9D9" }}
              onClick={handleClear}
            >
              Clear Filters
            </Button>
            {checked && (
              <Slide
                in={checked}
                direction="up"
                style={{
                  zIndex: 1,
                  backgroundColor: "#F5F7FA",
                  position: "absolute",
                  top: "13%",
                  left: "2.5%",
                  width: "95%",
                  height: "84%",
                }}
              >
                {icon}
              </Slide>
            )}
          </Stack>
        </Stack>
      </Drawer>
      <Box>
        <canvas
          ref={canvasRef}
          style={{
            width: "100%",
            height: "100%",
            position: "relative",
            top: 50,
            left: 0,
            minHeight: "100vh",
          }}
        />
      </Box>
    </Box>
  );
}

export default Map;
