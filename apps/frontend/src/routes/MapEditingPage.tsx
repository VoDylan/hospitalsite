import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
// import { MapNodeType } from "common/src/map/MapNodeType.ts";
// import MapImage from "../images/00_thelowerlevel1.png";
import { nodesDistances } from "common/src/nodesDistances.ts";
import TopBanner2 from "../components/banner/TopBanner2.tsx";
import L1MapImage from "../images/mapImages/00_thelowerlevel1.png";
import L2MapImage from "../images/mapImages/00_thelowerlevel2.png";
import FFMapImage from "../images/mapImages/01_thefirstfloor.png";
import SFMapImage from "../images/mapImages/02_thesecondfloor.png";
import TFMapImage from "../images/mapImages/03_thethirdfloor.png";
import { sendRequest } from "common/src/sendRequest.ts";
import MapSideBar from "../components/map/MapSideBar.tsx";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";

import TextField from "@mui/material/TextField";
import { TransformComponent, TransformWrapper } from "react-zoom-pan-pinch";
import Draggable from "react-draggable";
import { Button } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

// type floorNodes = {
//   l2: NodeFilter[];
//   l1: NodeFilter[];
//   f1: NodeFilter[];
//   f2: NodeFilter[];
//   f3: NodeFilter[];
// };

function MapEditingPage() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  // const [nodeData, setNodesData] = useState<MapNodeType[]>([]);
  const [distancesData, setDistancesData] = useState<nodesDistances[]>([]);
  const floor = useRef<string>("L1");
  const [currImage, setCurrImage] = useState<HTMLImageElement>(() => {
    const image = new Image();
    image.src = L1MapImage;
    return image;
  });
  const [edgeDataLoaded, setEdgeDataLoaded] = useState<boolean>(false);

  /**
   * Use states for side bar
   */

  const [autocompleteNodeData, setAutocompleteNodeData] = useState<
    { label: string; node: string }[]
  >([]);
  const [startNode, setStartNode] = useState<string>("");
  const [endNode, setEndNode] = useState<string>("");
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
          {checked ? "back" : "back"}
        </Button>
      </Stack>

      <Stack
        spacing={"10%"}
        direction="column"
        sx={{
          backgroundColor: "white",
          display: "flex",
          justifyContent: "start",
          alignItems: "start",
          position: "relative",
          marginTop: "16%",
          paddingTop: "6%",
          marginLeft: "1%",
          paddingLeft: "8%",
        }}
      ></Stack>
    </Paper>
  );

  // async function loadNodeData() {
  //   const data: MapNodeType[] = (await axios.get("/api/database/nodes")).data;
  //   setNodesData(data);
  // }

  async function loadEdgesDistance(request: sendRequest) {
    // const req = { req: "L1" };
    const distancesResponse = await axios.post("/api/sendDistances", request, {
      headers: { "Content-Type": "application/json" },
    });
    if (distancesResponse.status !== 200) {
      throw new Error("Failed to fetch data");
    }
    const distancePath = await distancesResponse.data;
    const distanceData = distancePath.message;
    // console.log("distances", distanceData);

    setDistancesData(distanceData);
    console.log("Updated distancesData:", distancePath); // Log the updated value here
  }

  const handleFloorChange = (newFloor: string) => {
    const newImage = new Image();

    switch (newFloor) {
      case "L1":
        loadEdgesDistance({ req: "L1" }).then(() => setEdgeDataLoaded(true));
        newImage.src = L1MapImage;
        floor.current = "L1";
        break;
      case "L2":
        loadEdgesDistance({ req: "L2" }).then(() => setEdgeDataLoaded(true));
        newImage.src = L2MapImage;
        floor.current = "L2";
        break;
      case "1":
        loadEdgesDistance({ req: "1" }).then(() => setEdgeDataLoaded(true));
        newImage.src = FFMapImage;
        floor.current = "1";
        break;
      case "2":
        loadEdgesDistance({ req: "2" }).then(() => setEdgeDataLoaded(true));
        newImage.src = SFMapImage;
        floor.current = "2";
        break;
      case "3":
        loadEdgesDistance({ req: "3" }).then(() => setEdgeDataLoaded(true));
        newImage.src = TFMapImage;
        floor.current = "3";
        break;
      default:
        console.error("Returned map floor is not assigned to an image");
        return;
    }
    setCurrImage(newImage);
  };

  useEffect(() => {
    // if (nodeData.length < 1) {
    //   // console.log("Loading Data");
    //   loadNodeData();
    // }
    if (distancesData.length < 1) {
      // console.log("Loading Distances");
      loadEdgesDistance({ req: "L1" }).then(() => setEdgeDataLoaded(true));
    }

    // console.log(floor.current);
    // console.log(nodeData);

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const processCanvas = () => {
      if (edgeDataLoaded) {
        canvas.width = currImage.width;
        canvas.height = currImage.height;

        ctx.clearRect(0, 0, currImage.width, currImage.height);
        ctx.drawImage(currImage, 0, 0, canvas.width, canvas.height);

        ctx.lineWidth = 2;
        ctx.strokeStyle = "red";
        ctx.font = "15px Arial";

        for (let i = 0; i < distancesData.length; i++) {
          if (distancesData[i]) {
            ctx.beginPath();
            ctx.moveTo(
              distancesData[i].startCoords.x,
              distancesData[i].startCoords.y,
            );
            ctx.lineTo(
              distancesData[i].endCoords.x,
              distancesData[i].endCoords.y,
            );
            ctx.stroke();
            ctx.closePath();

            ctx.fillText(
              distancesData[i].distance.toString(),
              (distancesData[i].startCoords.x + distancesData[i].endCoords.x) /
                2,
              (distancesData[i].startCoords.y + distancesData[i].endCoords.y) /
                2,
            );
          }
        }
      }
    };

    if (currImage.complete) {
      processCanvas();
    }

    // image.src = MapImage;
    currImage.onload = () => {
      processCanvas();
    };

    // ctx.fillStyle = "blue";
    // ctx.strokeStyle = "blue";
    // for (let i = 0; i < filteredNodes.length; i++) {
    //   ctx.beginPath();
    //   ctx.arc(filteredNodes[i].xcoord, filteredNodes[i].ycoord, 5, 0, 2 * Math.PI); // draw circle
    //   ctx.fill();
    // }

    console.log(distancesData); // Log distancesData here to see the updated value
  }, [currImage, distancesData, currImage.complete, edgeDataLoaded]);

  return (
    <div>
      <TopBanner2 />
      {/*Side Bar*/}
      <MapSideBar
        title="Map Editing"
        onChange={(event, value) => handleStartNodeChange(value)}
        autocompleteNodeData={autocompleteNodeData}
        compareFn={(a, b) => a.label.localeCompare(b.label)}
        nodeToLabelIdCallback={(node) => node.label}
        groupBy={(option) => option.charAt(0).toUpperCase()}
        optionLabel={(option) => option}
        renderInput={(params) => (
          <TextField {...params} label="Starting Location" value={startNode} />
        )}
        onChange1={(event, value) => handleEndNodeChange(value)}
        renderInput1={(params) => (
          <TextField {...params} label="Ending Location" value={endNode} />
        )}
        onClick1={handleButtonClick}
        checked={checked}
        icon={icon}
        callback={handleFloorChange}
      />
      <TransformWrapper>
        <TransformComponent>
          <Draggable>
            <canvas
              ref={canvasRef}
              style={{
                width: "100%",
                height: "100%",
                zIndex: 0,
                position: "relative",
              }}
              className={"firstFloorCanvas"}
            />
          </Draggable>
        </TransformComponent>
      </TransformWrapper>
    </div>
  );
}

export default MapEditingPage;
