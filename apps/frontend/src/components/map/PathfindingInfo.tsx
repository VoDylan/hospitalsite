import {Button, Stack} from "@mui/material";
import AltRouteIcon from "@mui/icons-material/AltRoute";
import PathAlgorithmSelector from "./map2/PathAlgorithmSelector.tsx";
import React, {useEffect, useState} from "react";
import {PathAlgorithmType} from "../../common/types/PathAlgorithmType.ts";
import {LocationInfo} from "common/src/LocationInfo.ts";
import MapNode from "common/src/map/MapNode.ts";
import axios from "axios";
import {TypeCoordinates} from "common/src/TypeCoordinates.ts";
import TextDirections from "./map2/TextDirections.tsx";
import {Floor} from "common/src/map/Floor.ts";

interface PathfindingInfoProps {
  startNode: MapNode | null;
  endNode: MapNode | null;
  setPathNodesDataCallback: (newPathNodesData: TypeCoordinates[]) => void;
  setFloor: (newFloor: Floor) => void;
}

export default function PathfindingInfo(props: PathfindingInfoProps) {
  const [algorithm, setAlgorithm] = useState<PathAlgorithmType>(PathAlgorithmType.ASTAR);
  const [startNode, setStartNode] = useState<MapNode | null>(props.startNode);
  const [endNode, setEndNode] = useState<MapNode | null>(props.endNode);

  const [pathNodesData, setPathNodesData] = useState<TypeCoordinates[]>([]);

  const [textDirectionsEnabled, setTextDirectionsEnabled] = useState<boolean>(false);

  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSubmit = () => {
    if (!startNode || !endNode) {
      setErrorMessage("Please enter both start and end nodes");
      return;
    }

    if (startNode.nodeID == endNode.nodeID) {
      setErrorMessage("Please enter different nodes");
      return;
    }

    const request: LocationInfo = {
      algorithm: algorithm,
      startNode: startNode.nodeID,
      endNode: endNode.nodeID,
    };

    try {
      axios.post("/api/path", request, {
        headers: { "Content-Type": "application/json" },
      }).then(res => {
        const data = res.data;
        const path = data.message;

        setPathNodesData(path);
        props.setPathNodesDataCallback(path);
        props.setFloor(startNode.floor as Floor);

        console.log(path);

        if(!path) {
          setErrorMessage("There is no path between nodes");
        } else {
          setErrorMessage("");
        }

        setTextDirectionsEnabled(true);
      });

    } catch (error) {
      console.error("Failed to fetch data:", error);
      setErrorMessage("Failed to fetch data. Please try again.");
    }
  };

  useEffect(() => {
    setStartNode(props.startNode);
  }, [props.startNode]);

  useEffect(() => {
    setEndNode(props.endNode);
  }, [props.endNode]);

  return (
    <Stack>
      <PathAlgorithmSelector
        algorithm={algorithm}
        setAlgorithm={setAlgorithm}
      />
      <Button
        startIcon={<AltRouteIcon />}
        variant={"contained"}
        sx={{
          minWidth: "75%",
          marginRight: "auto",
          marginLeft: "auto",
        }}
        onClick={handleSubmit}
      >
        Find Path
      </Button>
      <TextDirections
        textDirectionsEnabled={textDirectionsEnabled}
        pathNodesData={pathNodesData}
        setFloor={props.setFloor}
      />
    </Stack>
  );
}
