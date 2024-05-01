import axios from "axios";
import MapNode from "common/src/map/MapNode.ts";

export default function updateDBNode(node: MapNode) {
  try {
    axios
      .put("/api/database/nodes/updatenode", node.nodeInfo, {
        headers: { "Content-Type": "application/json" },
      })
      .then((res) => {
        console.log("Updated node!");
        console.log(res.data);
      });
  } catch (e) {
    console.log("Failed to update node");
  }
}
