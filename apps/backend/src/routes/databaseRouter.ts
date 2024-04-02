import express, { Router } from "express";
import { getDBEdgeByStartAndEndNode, getDBNodeByID } from "../PrismaScripts.ts";
import DBManager from "../DBManager.ts";

//Create router instance to handle any database requests
const router: Router = express.Router();

//Accepts a GET request to the /api/database/nodes endpoint and returns all nodes stored in the database as an array of JSON
//objects with all node information
router.get("/nodes", async (req, res) => {
  const nodeData = await DBManager.getInstance().updateAndGetNodesFromDB();
  res.status(200).json(nodeData);
});

//Accepts a GET request to the /api/backend/nodes/<NODE_ID> endpoint where <NODE_ID> is replaced by the ID of the node you
//wish to get information about; returns JSON data with the information or an empty JSON object if no node exists with NODE_ID
router.get("/nodes/:nodeid", async (req, res) => {
  const nodeData: object | null = await getDBNodeByID(req.params.nodeid);

  if (nodeData == null) {
    res.status(404).json({});
  } else {
    res.status(200).json(nodeData!);
  }
});

//Accepts a GET request to the /api/database/edges endpoint and returns all edges stored in the database as an array of JSON
//objects with all edge information
router.get("/edges", async (req, res) => {
  const edgeData = await DBManager.getInstance().updateAndGetEdgesFromDB();
  res.status(200).json(edgeData);
});

//Accepts a GET request to the /api/database/edges/<START_NODE_ID>/<END_NODE_ID> accepts a GET request where <START_NODE_ID>
//is replaced by the starting node id and <END_NODE_ID> is replaced with the ending node id; returns JSON data with the edge
//information or an empty JSON object if no node exists with the combination of the starting and ending ids
router.get("/edges/:startNodeID/:endNodeID", async (req, res) => {
  const edgeData: object | null = await getDBEdgeByStartAndEndNode(
    req.params.startNodeID,
    req.params.endNodeID,
  );

  if (edgeData == null) {
    res.status(404).json({});
  } else {
    res.status(200).json(edgeData!);
  }
});

router.post("/servicerequest", async (req, res) => {
  const data: {
    userID: string;
    nodeID: string;
    serviceType: string;
    services: string;
  } = req.body;

  data.nodeID;
  data.userID;
  data.serviceType;
  data.services;

  console.log(data);

  res.status(200).json({
    message: "Successfully received data",
  });
});

export default router;
