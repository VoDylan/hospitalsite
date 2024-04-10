import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import Autocomplete from "@mui/material/Autocomplete";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import Drawer from "@mui/material/Drawer";
import Filter from "../components/Filter.tsx";
import Paper from "@mui/material/Paper";
import RadioButtonCheckedIcon from "@mui/icons-material/RadioButtonChecked";
import Slide from "@mui/material/Slide";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Toolbar from "@mui/material/Toolbar";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import AddIcon from "@mui/icons-material/Add";
import CheckIcon from "@mui/icons-material/Check";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import MoreVertIcon from "@mui/icons-material/MoreVert";
// import SyncIcon from "@mui/icons-material/Sync";
import AltRouteIcon from "@mui/icons-material/AltRoute";
import TopBanner2 from "../components/TopBanner2.tsx";
import MapImage from "../images/00_thelowerlevel1.png";
import NestedList from "../components/PathfindingSelect.tsx";
import "./map.css";
import { Coordinates } from "common/src/Coordinates.ts";
import { LocationInfo } from "common/src/LocationInfo.ts";
import { MapNodeType } from "common/src/map/MapNodeType.ts";
import GraphManager from "../common/GraphManager.ts";
import MapNode from "common/src/map/MapNode.ts";
import Legend from "../components/Legend.tsx";
import { Typography } from "@mui/material";
import FilterManager from "common/src/filter/FilterManager.ts";
import { FilterName } from "common/src/filter/FilterName.ts";
import TypeFilter from "common/src/filter/filters/TypeFilter.ts";
import FloorFilter from "common/src/filter/filters/FloorFilter.ts";
import BuildingFilter from "common/src/filter/filters/BuildingFilter.ts";
import Draggable from "react-draggable";
import { TransformComponent, TransformWrapper } from "react-zoom-pan-pinch";

function Map() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [startNode, setStartNode] = useState<string>("");
  const [endNode, setEndNode] = useState<string>("");
  const [nodes, setNodes] = useState<string[]>([]);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [nodesData, setNodesData] = useState<Coordinates[]>([]);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [dbNodeData, setDBNodesData] = useState<MapNodeType[]>([]);
  const [nodeDataLoaded, setNodeDataLoaded] = useState<boolean>(false);
  const [autocompleteNodeData, setAutocompleteNodeData] = useState<
    { label: string; node: string }[]
  >([]);

  //Pathfinder
  const [open, setOpen] = React.useState(false);
  const [checkedBFS, setCheckedBFS] = React.useState(true);
  const [checkedAS, setCheckedAS] = React.useState(false);
  const [algorithm, setAlgorithm] = React.useState("BFS");

  const loadNodeData = async (): Promise<MapNodeType[]> => {
    const data: MapNodeType[] = (await axios.get("/api/database/nodes"))
      .data as MapNodeType[];

    data.forEach((node) => {
      if (!GraphManager.getInstance().getNodeByID(node.nodeID))
        GraphManager.getInstance().nodes.push(new MapNode(node));
    });

    console.log(GraphManager.getInstance().nodes);

    return data;
  };

  const populateAutocompleteData = () => {
    const graphNodes: MapNode[] = GraphManager.getInstance().nodes;
    const nodeAssociations: { label: string; node: string }[] = graphNodes.map(
      (node) => {
        console.log("Node ID:", node.nodeID, "Long Name:", node.longName);
        return {
          label: node.longName, // Assuming `longName` is the label you want to use
          node: node.nodeID,
        };
      },
    );

    setAutocompleteNodeData(nodeAssociations);
  };

  const registerFilters = () => {
    FilterManager.getInstance().registerFilter(
      FilterName.TYPE,
      () => new TypeFilter(),
    );
    FilterManager.getInstance().registerFilter(
      FilterName.FLOOR,
      () => new FloorFilter(),
    );
    FilterManager.getInstance().registerFilter(
      FilterName.BUILDING,
      () => new BuildingFilter(),
    );
  };

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
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [iconState, setIconState] = React.useState<"plus" | "check">("plus"); // State to track icon state

  const handleButtonClick = () => {
    setChecked((prev) => !prev);
  };

  const [elevatorIconState, setElevatorIconState] = React.useState<
    "plus" | "check"
  >("check");
  const [stairsIconState, setStairsIconState] = React.useState<
    "plus" | "check"
  >("check");
  const [exitsIconState, setExitsIconState] = React.useState<"plus" | "check">(
    "check",
  );
  const [infoIconState, setInfoIconState] = React.useState<"plus" | "check">(
    "check",
  );
  const [restroomsIconState, setRestroomsIconState] = React.useState<
    "plus" | "check"
  >("check");
  const [ll1IconState, setLL1IconState] = React.useState<"plus" | "check">(
    "check",
  );
  const [ll2IconState, setLL2IconState] = React.useState<"plus" | "check">(
    "check",
  );
  const [firstFloorIconState, setFirstFloorIconState] = React.useState<
    "plus" | "check"
  >("check");
  const [secondFloorIconState, setSecondFloorIconState] = React.useState<
    "plus" | "check"
  >("check");
  const [thirdFloorIconState, setThirdFloorIconState] = React.useState<
    "plus" | "check"
  >("check");

  const handleElevatorIconState = () => {
    setElevatorIconState((prevState) =>
      prevState === "plus" ? "check" : "plus",
    );
  };
  const handleStairsIconState = () => {
    setStairsIconState((prevState) =>
      prevState === "plus" ? "check" : "plus",
    );
  };
  const handleExitsIconState = () => {
    setExitsIconState((prevState) => (prevState === "plus" ? "check" : "plus"));
  };
  const handleInfoIconState = () => {
    setInfoIconState((prevState) => (prevState === "plus" ? "check" : "plus"));
  };
  const handleRestroomsIconState = () => {
    setRestroomsIconState((prevState) =>
      prevState === "plus" ? "check" : "plus",
    );
  };

  const handleLL1IconState = () => {
    setLL1IconState((prevState) => (prevState === "plus" ? "check" : "plus"));
  };
  const handleLL2IconState = () => {
    setLL2IconState((prevState) => (prevState === "plus" ? "check" : "plus"));
  };
  const handleFirstFloorIconState = () => {
    setFirstFloorIconState((prevState) =>
      prevState === "plus" ? "check" : "plus",
    );
  };
  const handleSecondFloorIconState = () => {
    setSecondFloorIconState((prevState) =>
      prevState === "plus" ? "check" : "plus",
    );
  };
  const handleThirdFloorIconState = () => {
    setThirdFloorIconState((prevState) =>
      prevState === "plus" ? "check" : "plus",
    );
  };

  const handleSelectAll = () => {
    setElevatorIconState("check");
    setStairsIconState("check");
    setExitsIconState("check");
    setInfoIconState("check");
    setRestroomsIconState("check");
    setLL1IconState("check");
    setLL2IconState("check");
    setFirstFloorIconState("check");
    setSecondFloorIconState("check");
    setThirdFloorIconState("check");
  };

  const handleClearAll = () => {
    setElevatorIconState("plus");
    setStairsIconState("plus");
    setExitsIconState("plus");
    setInfoIconState("plus");
    setRestroomsIconState("plus");
    setLL1IconState("plus");
    setLL2IconState("plus");
    setFirstFloorIconState("plus");
    setSecondFloorIconState("plus");
    setThirdFloorIconState("plus");
  };

  const icon = (
    <Paper sx={{ width: "100%", height: "100%" }} elevation={4}>
      <Stack direction="column" sx={{ position: "absolute", top: 4, left: 4 }}>
        <Button
          startIcon={<ArrowBackIcon />}
          onClick={handleButtonClick}
          variant="text"
        >
          {checked ? "back" : "back"}
        </Button>
      </Stack>

      <Stack
        spacing={"14%"}
        direction="column"
        sx={{
          display: "flex",
          justifyContent: "start",
          alignItems: "start",
          position: "relative",
          marginTop: "28%",
          marginLeft: "10%",
        }}
      >
        <Stack direction="column" spacing={1}>
          <Stack
            direction="row"
            sx={{ display: "flex", alignItems: "center" }}
            spacing={4.8}
          >
            <Filter iconColor="#0000FF" filterName="Elevators" filterType={1} />
            {elevatorIconState === "plus" ? (
              <AddIcon
                onClick={handleElevatorIconState}
                fontSize="medium"
                sx={{ color: "rgba(0, 0, 255, 0.5)" }}
              />
            ) : (
              <CheckIcon
                onClick={handleElevatorIconState}
                fontSize="medium"
                sx={{ color: "rgba(0, 0, 255, 0.5)" }}
              />
            )}
          </Stack>
          <Stack
            direction="row"
            sx={{ display: "flex", alignItems: "center" }}
            spacing={8.8}
          >
            <Filter iconColor="#008000" filterName="Stairs" filterType={1} />
            {stairsIconState === "plus" ? (
              <AddIcon
                onClick={handleStairsIconState}
                fontSize="medium"
                sx={{ color: "rgba(0, 0, 255, 0.5)" }}
              />
            ) : (
              <CheckIcon
                onClick={handleStairsIconState}
                fontSize="medium"
                sx={{ color: "rgba(0, 0, 255, 0.5)" }}
              />
            )}
          </Stack>
          <Stack
            direction="row"
            sx={{ display: "flex", alignItems: "center" }}
            spacing={9.6}
          >
            <Filter iconColor="#FF0000" filterName="Exits" filterType={1} />
            {exitsIconState === "plus" ? (
              <AddIcon
                onClick={handleExitsIconState}
                fontSize="medium"
                sx={{ color: "rgba(0, 0, 255, 0.5)" }}
              />
            ) : (
              <CheckIcon
                onClick={handleExitsIconState}
                fontSize="medium"
                sx={{ color: "rgba(0, 0, 255, 0.5)" }}
              />
            )}
          </Stack>
        </Stack>
        <Stack direction="column" spacing={1}>
          <Stack
            direction="row"
            sx={{ display: "flex", alignItems: "center" }}
            spacing={10.9}
          >
            <Filter iconColor="#8877CC" filterName="Info" filterType={1} />
            {infoIconState === "plus" ? (
              <AddIcon
                onClick={handleInfoIconState}
                fontSize="medium"
                sx={{ color: "rgba(0, 0, 255, 0.5)" }}
              />
            ) : (
              <CheckIcon
                onClick={handleInfoIconState}
                fontSize="medium"
                sx={{ color: "rgba(0, 0, 255, 0.5)" }}
              />
            )}
          </Stack>
          <Stack
            direction="row"
            sx={{ display: "flex", alignItems: "center" }}
            spacing={2.9}
          >
            <Filter iconColor="#63CA00" filterName="Restrooms" filterType={1} />
            {restroomsIconState === "plus" ? (
              <AddIcon
                onClick={handleRestroomsIconState}
                fontSize="medium"
                sx={{ color: "rgba(0, 0, 255, 0.5)" }}
              />
            ) : (
              <CheckIcon
                onClick={handleRestroomsIconState}
                fontSize="medium"
                sx={{ color: "rgba(0, 0, 255, 0.5)" }}
              />
            )}
          </Stack>
        </Stack>

        {/*Floors*/}
        <Stack
          direction="column"
          sx={{ display: "flex", justfiyContent: "start", paddingLeft: "2%" }}
          spacing={2}
        >
          <Stack
            direction="row"
            sx={{ display: "flex", alignItems: "center" }}
            spacing={14.7}
          >
            <Filter iconColor="#63CA00" filterName="LL 1" filterType={0} />
            {ll1IconState === "plus" ? (
              <AddIcon
                onClick={handleLL1IconState}
                fontSize="medium"
                sx={{ color: "rgba(0, 0, 255, 0.5)" }}
              />
            ) : (
              <CheckIcon
                onClick={handleLL1IconState}
                fontSize="medium"
                sx={{ color: "rgba(0, 0, 255, 0.5)" }}
              />
            )}
          </Stack>
          <Stack
            direction="row"
            sx={{ display: "flex", alignItems: "center" }}
            spacing={14.7}
          >
            <Filter iconColor="#63CA00" filterName="LL 2" filterType={0} />
            {ll2IconState === "plus" ? (
              <AddIcon
                onClick={handleLL2IconState}
                fontSize="medium"
                sx={{ color: "rgba(0, 0, 255, 0.5)" }}
              />
            ) : (
              <CheckIcon
                onClick={handleLL2IconState}
                fontSize="medium"
                sx={{ color: "rgba(0, 0, 255, 0.5)" }}
              />
            )}
          </Stack>
          <Stack
            direction="row"
            sx={{ display: "flex", alignItems: "center" }}
            spacing={9.5}
          >
            <Filter iconColor="#63CA00" filterName="1st Floor" filterType={0} />
            {firstFloorIconState === "plus" ? (
              <AddIcon
                onClick={handleFirstFloorIconState}
                fontSize="medium"
                sx={{ color: "rgba(0, 0, 255, 0.5)" }}
              />
            ) : (
              <CheckIcon
                onClick={handleFirstFloorIconState}
                fontSize="medium"
                sx={{ color: "rgba(0, 0, 255, 0.5)" }}
              />
            )}
          </Stack>
          <Stack
            direction="row"
            sx={{ display: "flex", alignItems: "center" }}
            spacing={4.6}
          >
            <Filter
              iconColor="#63CA00"
              filterName="Second Floor"
              filterType={0}
            />
            {secondFloorIconState === "plus" ? (
              <AddIcon
                onClick={handleSecondFloorIconState}
                fontSize="medium"
                sx={{ color: "rgba(0, 0, 255, 0.5)" }}
              />
            ) : (
              <CheckIcon
                onClick={handleSecondFloorIconState}
                fontSize="medium"
                sx={{ color: "rgba(0, 0, 255, 0.5)" }}
              />
            )}
          </Stack>
          <Stack
            direction="row"
            sx={{ display: "flex", alignItems: "center" }}
            spacing={7.2}
          >
            <Filter
              iconColor="#63CA00"
              filterName="Third Floor"
              filterType={0}
            />
            {thirdFloorIconState === "plus" ? (
              <AddIcon
                onClick={handleThirdFloorIconState}
                fontSize="medium"
                sx={{ color: "rgba(0, 0, 255, 0.5)" }}
              />
            ) : (
              <CheckIcon
                onClick={handleThirdFloorIconState}
                fontSize="medium"
                sx={{ color: "rgba(0, 0, 255, 0.5)" }}
              />
            )}
          </Stack>
        </Stack>

        {/*Buttons*/}
        <Stack
          direction="column"
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: "90%",
          }}
          spacing={1}
        >
          <Button
            variant={"contained"}
            sx={{ display: "flex", justifyContent: "center", minWidth: "90%" }}
            onClick={handleSelectAll}
          >
            Select All
          </Button>

          <Button
            variant={"contained"}
            sx={{
              display: "flex",
              justifyContent: "center",
              minWidth: "90%",
              backgroundColor: "#D9D9D9",
            }}
            onClick={handleClearAll}
          >
            Clear All
          </Button>
        </Stack>
      </Stack>
    </Paper>
  );

  const handleStartNodeChange = (value: string | null) => {
    if (value) {
      // Find the corresponding node for the selected label
      const selectedNode = autocompleteNodeData.find(
        (node) => node.label === value,
      );
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
      const selectedNode = autocompleteNodeData.find(
        (node) => node.label === value,
      );
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

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  function handleClear() {
    setStartNode(""); // Clear startNode
    setEndNode(""); // Clear endNode
    //stop animation
  }

  useEffect(() => {
    if (!nodeDataLoaded) {
      registerFilters();
      loadNodeData().then((data: MapNodeType[]) => {
        setDBNodesData(data);
        setNodeDataLoaded(true);
      });
    } else {
      populateAutocompleteData();
    }

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

        ctx.drawImage(image, 0, 0, image.width, image.height);

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
  }, [nodeDataLoaded, startNode, endNode, nodes, nodesData, algorithm]);

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <TopBanner2 />

      {/*Side Bar*/}
      <Drawer
        variant="permanent"
        sx={{
          [`& .MuiDrawer-paper`]: {
            width: "18%",
            // marginTop: "7.2%",
            height: "100%",
            minWidth: "18%",
            boxSizing: "border-box",
            boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
            elevation: 100,
            zIndex: 1,
            border: "3px solid rgba(0, 0, 0, 0.05)",
          },
        }}
      >
        <Toolbar />

        <Stack display={"flex"} direction={"column"} sx={{ marginLeft: "4%" }}>
          <Typography
            color={"#003A96"}
            align={"center"}
            fontStyle={"Open Sans"}
            fontSize={30}
            sx={{ marginBottom: "10%", marginRight: "4%", marginTop: "30%" }}
          >
            Navigation
          </Typography>

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
              options={autocompleteNodeData.map((node) => node.label)}
              sx={{ width: "75%" }}
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
              options={autocompleteNodeData.map((node) => node.label)}
              sx={{ width: "75%" }}
              renderInput={(params) => (
                <TextField {...params} label="Ending Node" value={endNode} />
              )}
            />
          </Stack>

          {/*Pathfinding selection dropdown*/}
          <Stack
            direction={"row"}
            spacing={1}
            sx={{
              display: "flex",
              alignItems: "center",
              marginTop: "8%",
              marginLeft: "2%",
            }}
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
              onClick={handleSelectAll}
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

      <Box
        width={window.innerWidth}
        height={window.innerHeight}
        overflow={"clip"}
      >
        <TransformWrapper>
          <TransformComponent>
            <Draggable>
              <canvas
                ref={canvasRef}
                style={{
                  position: "relative",
                  top: 50,
                  left: 0,
                  minHeight: "100vh",
                  maxHeight: "100%",
                  maxWidth: "100%",
                }}
              />
            </Draggable>
          </TransformComponent>
        </TransformWrapper>
      </Box>
      <Legend />
    </Box>
  );
}

export default Map;
