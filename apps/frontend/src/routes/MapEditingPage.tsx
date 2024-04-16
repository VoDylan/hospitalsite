import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import { nodesDistances } from "common/src/nodesDistances.ts";
import TopBanner from "../components/banner/TopBanner.tsx";
import L1MapImage from "../images/mapImages/00_thelowerlevel1.png";
import L2MapImage from "../images/mapImages/00_thelowerlevel2.png";
import FFMapImage from "../images/mapImages/01_thefirstfloor.png";
import SFMapImage from "../images/mapImages/02_thesecondfloor.png";
import TFMapImage from "../images/mapImages/03_thethirdfloor.png";
import MapSideBar from "../components/map/MapSideBar.tsx";
import TextField from "@mui/material/TextField";
import { TransformComponent, TransformWrapper } from "react-zoom-pan-pinch";

import Draggable from "react-draggable";
import Icon from "../components/map/SlideIcon.tsx";


import {MapNodeType} from "common/src/map/MapNodeType.ts";
import GraphManager from "../common/GraphManager.ts";
import MapNode from "common/src/map/MapNode.ts";
// import {node} from "prop-types";


function MapEditingPage() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  // const [nodeData, setNodesData] = useState<MapNodeType[]>([]);
  const [distancesData, setDistancesData] = useState<nodesDistances[]>([]);
  const [nodesData, setNodesData] = useState<
    MapNodeType[]
  >([]);

  const floor = useRef<string>("L1");
  const [currImage, setCurrImage] = useState<HTMLImageElement>(() => {
    const image = new Image();
    image.src = L1MapImage;
    return image;
  });
  const [edgeDataLoaded, setEdgeDataLoaded] = useState<boolean>(false);
  const [nodeDataLoaded, setNodeDataLoaded] = useState<boolean>(false);

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


  async function loadEdgesDistance(request: {req: string}) {
    // const req = { req: "L1" };
    const distancesResponse = await axios.post("/api/sendDistances", request, {
      headers: { "Content-Type": "application/json" },
    });
    if (distancesResponse.status !== 200) {
      throw new Error("Failed to fetch data");
    }
    const distancePath = await distancesResponse.data;
    const distanceData = distancePath.message;

    setDistancesData(distanceData);
    // console.log("Updated distancesData:", distancePath);
  }

  async function loadNodesData() {
      const data: MapNodeType[] = (await axios.get("/api/database/nodes"))
        .data as MapNodeType[];

      data.forEach((node) => {
        if (!GraphManager.getInstance().getNodeByID(node.nodeID))
          GraphManager.getInstance().nodes.push(new MapNode(node));
      });

      console.log("NODES DATA", data);
      setNodesData(data);
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
    if (distancesData.length < 1 && nodesData.length < 1) {
      // console.log("Loading Distances");
      loadEdgesDistance({ req: "L1" }).then(() => setEdgeDataLoaded(true));
      loadNodesData().then(() => setNodeDataLoaded(true));
    }

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const processCanvas = () => {
      if (edgeDataLoaded && nodeDataLoaded) {
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

    currImage.onload = () => {
      processCanvas();
    };
    // console.log(nodesData);

    // console.log(distancesData); // Log distancesData here to see the updated value
  }, [currImage, distancesData, currImage.complete, edgeDataLoaded, nodesData, nodeDataLoaded]);

  /**
   * FILTER USE STATES
   */

  const [elevatorIconState, setElevatorIconState] = React.useState<
    "plus" | "check"
  >("check");
  const [stairsIconState, setStairsIconState] = React.useState<
    "plus" | "check"
  >("check");
  const [exitsIconState, setExitsIconState] = React.useState<"plus" | "check">(
    "check",
  );
  const [servIconState, setServIconState] = React.useState<"plus" | "check">(
    "check",
  );
  const [infoIconState, setInfoIconState] = React.useState<"plus" | "check">(
    "check",
  );
  const [restroomsIconState, setRestroomsIconState] = React.useState<
    "plus" | "check"
  >("check");
  const [confIconState, setConfIconState] = React.useState<"plus" | "check">(
    "check",
  );
  const [deptIconState, setDeptIconState] = React.useState<"plus" | "check">(
    "check",
  );
  const [labsIconState, setLabsIconState] = React.useState<"plus" | "check">(
    "check",
  );
  const [retlIconState, setRetlIconState] = React.useState<"plus" | "check">(
    "check",
  );
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

  const [filtersApplied, setFiltersApplied] = useState<boolean>(false);


  const handleIconStateToggle = (
    stateSetter: React.Dispatch<React.SetStateAction<"plus" | "check">>,
  ) => {
    return () => {
      stateSetter((prevState) => (prevState === "plus" ? "check" : "plus"));
      setFiltersApplied(false);
    };
  };

  const handleElevatorIconState = handleIconStateToggle(setElevatorIconState);
  const handleStairsIconState = handleIconStateToggle(setStairsIconState);
  const handleExitsIconState = handleIconStateToggle(setExitsIconState);
  const handleInfoIconState = handleIconStateToggle(setInfoIconState);
  const handleServIconState = handleIconStateToggle(setServIconState);
  const handleRestroomsIconState = handleIconStateToggle(setRestroomsIconState);
  const handleConfIconState = handleIconStateToggle(setConfIconState);
  const handleDeptIconState = handleIconStateToggle(setDeptIconState);
  const handleLabsIconState = handleIconStateToggle(setLabsIconState);
  const handleRetlIconState = handleIconStateToggle(setRetlIconState);
  const handleLL1IconState = handleIconStateToggle(setLL1IconState);
  const handleLL2IconState = handleIconStateToggle(setLL2IconState);
  const handleFirstFloorIconState = handleIconStateToggle(
    setFirstFloorIconState,
  );
  const handleSecondFloorIconState = handleIconStateToggle(
    setSecondFloorIconState,
  );
  const handleThirdFloorIconState = handleIconStateToggle(
    setThirdFloorIconState,
  );

  const handleSelectAll = () => {
    setElevatorIconState("check");
    setStairsIconState("check");
    setExitsIconState("check");
    setInfoIconState("check");
    setServIconState("check");
    setRestroomsIconState("check");
    setConfIconState("check");
    setDeptIconState("check");
    setLabsIconState("check");
    setRetlIconState("check");
    setLL1IconState("check");
    setLL2IconState("check");
    setFirstFloorIconState("check");
    setSecondFloorIconState("check");
    setThirdFloorIconState("check");
    setFiltersApplied(false);
  };

  const handleClearAll = () => {
    setElevatorIconState("plus");
    setStairsIconState("plus");
    setExitsIconState("plus");
    setInfoIconState("plus");
    setServIconState("plus");
    setRestroomsIconState("plus");
    setConfIconState("plus");
    setDeptIconState("plus");
    setLabsIconState("plus");
    setRetlIconState("plus");
    setLL1IconState("plus");
    setLL2IconState("plus");
    setFirstFloorIconState("plus");
    setSecondFloorIconState("plus");
    setThirdFloorIconState("plus");
    setFiltersApplied(false);
  };

  return (
    <div>
      <TopBanner />
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
        onClick2={handleSelectAll}
        icon={<Icon
          handleButtonClick={handleButtonClick}
          checked={false}
          confIconState={confIconState}
          deptIconState={deptIconState}
          labsIconState={labsIconState}
          servIconState={servIconState}
          infoIconState={infoIconState}
          restroomsIconState={restroomsIconState}
          elevatorIconState={elevatorIconState}
          stairsIconState={stairsIconState}
          exitsIconState={exitsIconState}
          retlIconState={retlIconState}
          ll1IconState={ll1IconState}
          ll2IconState={ll2IconState}
          firstFloorIconState={firstFloorIconState}
          secondFloorIconState={secondFloorIconState}
          thirdFloorIconState={thirdFloorIconState}
          handleConfIconState={handleConfIconState}
          handleDeptIconState={handleDeptIconState}
          handleLabsIconState={handleLabsIconState}
          handleServIconState={handleServIconState}
          handleInfoIconState={handleInfoIconState}
          handleRestroomsIconState={handleRestroomsIconState}
          handleElevatorIconState={handleElevatorIconState}
          handleStairsIconState={handleStairsIconState}
          handleExitsIconState={handleExitsIconState}
          handleRetlIconState={handleRetlIconState}
          handleLL1IconState={handleLL1IconState}
          handleLL2IconState={handleLL2IconState}
          handleFirstFloorIconState={handleFirstFloorIconState}
          handleSecondFloorIconState={handleSecondFloorIconState}
          handleThirdFloorIconState={handleThirdFloorIconState}
          handleSelectAll={handleSelectAll}
          handleClearAll={handleClearAll}
        />}
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
