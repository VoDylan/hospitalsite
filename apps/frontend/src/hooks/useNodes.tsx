import {MapNodeType} from "common/src/map/MapNodeType.ts";
import {MapEdgeType} from "common/src/map/MapEdgeType.ts";
import GraphManager from "../common/GraphManager.ts";
import MapNode from "common/src/map/MapNode.ts";
import MapEdge from "common/src/map/MapEdge.ts";
import axios from "axios";
import {useEffect, useState} from "react";

export const useNodes = () => {
  const [nodeData, setNodeData] = useState<MapNode[]>([]);
  const [edgeData, setEdgeData] = useState<MapEdge[]>([]);
  const [nodeDataLoaded, setNodeDataLoaded] = useState<boolean>(false);

  useEffect(() => {
    const loadNodeData = async (): Promise<MapNodeType[]> => {
      const nodeData: MapNodeType[] = (await axios.get("/api/database/nodes")).data as MapNodeType[];
      const edgeData: MapEdgeType[] = (await axios.get("/api/database/edges")).data as MapEdgeType[];

      GraphManager.getInstance().resetData();

      nodeData.forEach((node) => {
        if (!GraphManager.getInstance().getNodeByID(node.nodeID))
          GraphManager.getInstance().nodes.push(new MapNode(node));
      });

      edgeData.forEach((edge: MapEdgeType) => {
        if (!GraphManager.getInstance().getEdgeByID(edge.edgeID))
          GraphManager.getInstance().edges.push(
            new MapEdge(
              edge,
              GraphManager.getInstance().getNodeByID(edge.startNodeID)!,
              GraphManager.getInstance().getNodeByID(edge.endNodeID)!,
            ),
          );
      });

      return nodeData;
    };

    console.log(`Loading node Data`);
    if (!nodeDataLoaded) {
      loadNodeData().then(() => {
        setNodeData(GraphManager.getInstance().nodes);
        setEdgeData(GraphManager.getInstance().edges);
        setNodeDataLoaded(true);
        console.log("Data loaded");
      });
    }
  }, [nodeDataLoaded]);

  const setDataLoadedStatus = (status: boolean) => {
    setNodeDataLoaded(status);
  };

  return {nodeData: nodeData, edgeData: edgeData, nodeDataLoaded: nodeDataLoaded, setNodeDataLoaded: setDataLoadedStatus};
};
