import MapNode from "common/src/map/MapNode.ts";
import {useEffect, useState} from "react";
import MapEdge from "common/src/map/MapEdge.ts";
import {MapEdgeType} from "common/src/map/MapEdgeType.ts";
import GraphManager from "../common/GraphManager.ts";
import axios from "axios";

export const useSelectedNodes = () => {
  const [selectedNode1, setSelectedNode1] = useState<MapNode | null>(null);
  const [selectedNode2, setSelectedNode2] = useState<MapNode | null>(null);
  const [edgeBetween, setEdgeBetween] = useState<MapEdge | null>(null);

  useEffect(() => {
    const getEdge = async (edgeID: string) => {
      let edgeBetween: MapEdge | null = null;
      try {
        const response = await axios.get(`/api/database/edges/${edgeID}`, {
          headers: { "Content-Type": "application/json" },
          validateStatus: (stat: number) => {
            return stat == 200 || stat == 404 || stat == 304;
          },
        });
        if (response.status == 200 || response.status == 304) {
          const edgeData: MapEdgeType = response.data;
          edgeBetween = GraphManager.getInstance().getEdgeByID(edgeData.edgeID);
          if (!edgeBetween) {
            console.log(
              `Corresponding edge object for the returned edge data (id ${edgeData.edgeID}) could not be found!`,
            );
          } else {
            console.log(`Edge with edgeID ${edgeBetween.edgeID} found!`);
          }
        } else {
          console.log(`Edge with id ${edgeID} not found`);
        }
      } catch (e) {
        console.error(e);
      }

      return edgeBetween;
    };

    const checkAllEdges = async () => {
      let edgeBetween: MapEdge | null = await getEdge(
        `${selectedNode1!.nodeID}_${selectedNode2!.nodeID}`,
      );
      if (!edgeBetween) {
        edgeBetween = await getEdge(
          `${selectedNode2!.nodeID}_${selectedNode1!.nodeID}`,
        );
      }

      setEdgeBetween(edgeBetween);
    };

    console.log("Checking for edge");

    if (selectedNode1 && selectedNode2) {
      checkAllEdges().then(() => console.log("Finished checking for edge"));
    }
  }, [selectedNode1, selectedNode2]);

  const selectNodeGeneral = (node: MapNode) => {
    if(selectedNode1 && node.nodeID == selectedNode1.nodeID) return;
    if(selectedNode2 && node.nodeID == selectedNode2.nodeID) return;

    if(selectedNode1 && selectedNode2) {
      setSelectedNode1(node);
      setSelectedNode2(null);
    } else if(selectedNode1) {
      setSelectedNode2(node);
    } else {
      setSelectedNode1(node);
    }
  };

  const deselectNodeGeneral = (node: MapNode) => {
    if(!selectedNode1 && !selectedNode2) return;

    if(selectedNode1 && selectedNode1.nodeID == node.nodeID) {
      setSelectedNode1(null);
    } else if(selectedNode2 && selectedNode2.nodeID == node.nodeID) {
      setSelectedNode2(null);
    } else {
      return;
    }
  };

  return {selectedNode1, selectedNode2, edgeBetween, setSelectedNode1, setSelectedNode2, selectNodeGeneral, deselectNodeGeneral};
};
