import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { MapNodeType } from "common/src/map/MapNodeType.ts";
import GraphManager from "../common/GraphManager.ts";
import MapNode from "common/src/map/MapNode.ts";

function MapEditingPage() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [nodeData, setNodesData] = useState<MapNodeType[]>([]);

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

  useEffect(() => {
    if (!nodeData) {
      loadNodeData().then((r) => setNodesData(r));
    }

    console.log(nodeData);
  });

  return (
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
  );
}

export default MapEditingPage;
