import { SelectChangeEvent } from "@mui/material";
import {LabelValuePair} from "../../common/LabelValuePair.ts";
import {DropDown} from "./DropDown.tsx";
import {useEffect, useState} from "react";
import axios from "axios";

interface NodeDropDownProps {
  returnedNodeID: string;
  handleChange: (event: SelectChangeEvent) => string;
  label: string;
  filterRoomsOnly?: boolean;
}

interface NodeData {
  nodeID: string;
  longName: string;
  nodeType: string;
}

const NodeDropDown: React.FC<NodeDropDownProps> = (props) => {
  const [nodesFromDB, setNodesFromDB] = useState<NodeData[]>([]);

  useEffect(() => {
    const fetchNodeData = async () => {
      try {
        const response = await axios.get<NodeData[]>("/api/database/nodes");

        const nodeIDs = response.data.map((node) => node.nodeID);
        const longNames = response.data.map((node) => node.longName);
        const nodeTypes = response.data.map((node) => node.nodeType);

        const updatedNodes: NodeData[] = [];

        for (let i = 0; i < nodeIDs.length; i++) {
          if (props.filterRoomsOnly && (
            nodeTypes[i] === "HALL" ||
            nodeTypes[i] === "STAI" ||
            nodeTypes[i] === "EXIT" ||
            nodeTypes[i] === "ELEV" ||
            nodeTypes[i] === "REST"
          )) {
            continue;
          }

          updatedNodes.push({
            nodeID: nodeIDs[i],
            longName: longNames[i],
            nodeType: nodeTypes[i],
          });
        }

        setNodesFromDB(updatedNodes);
      } catch (error) {
        console.error(error);
      }
    };

    fetchNodeData();
  }, [props.filterRoomsOnly]);

  const EmployeeDropDownData: LabelValuePair[] = nodesFromDB.map((node: NodeData) => ({
    value: node.nodeID,
    label: `${node.longName}`
  }));

  return (
    <DropDown
      items={EmployeeDropDownData}
      returnData={props.returnedNodeID}
      label={props.label}
      handleChange={props.handleChange}
    />
  );
};

export default NodeDropDown;
