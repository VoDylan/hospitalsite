import express, { Request, Response, Router } from "express";
import DBManager from "../DBManager.ts";
import client from "../bin/database-connection.ts";
import {
  clearDBEdges,
  clearDBNodes,
  createServiceRequest,
  getDBEdgeByStartAndEndNode,
  getDBNodeByID,
  getServiceRequestFromDBByNodeID,
  getServiceRequestFromDBByType,
  getServiceRequestFromDBByUserID,
  getServiceRequestsFromDB,
} from "../PrismaScripts.ts";
import GraphManager from "common/src/GraphManager.ts";

//Create router instance to handle any database requests
const router: Router = express.Router();

//Accepts a GET request to the /api/database/nodes endpoint and returns all nodes stored in the database as an array of JSON
//objects with all node information
router.get("/nodes", async (req: Request, res: Response) => {
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

router.get("/servicerequest", async (req, res) => {
  const requests = await getServiceRequestsFromDB();

  if (requests == null) {
    res.status(404).json({});
  } else {
    res.status(200).json(requests!);
  }
});

router.get("/servicerequest/userid/:userid", async (req, res) => {
  const userID: string = req.params.userid;

  const requests = await getServiceRequestFromDBByUserID(userID);

  if (requests == null) {
    res.status(404).json({});
  } else {
    res.status(200).json(requests!);
  }
});

router.get("/servicerequest/nodeid/:nodeid", async (req, res) => {
  const nodeID: string = req.params.nodeid;

  const requests = await getServiceRequestFromDBByNodeID(nodeID);

  if (requests == null) {
    res.status(404).json({});
  } else {
    res.status(200).json(requests!);
  }
});

router.get("/servicerequest/servicetype/:servicetype", async (req, res) => {
  const serviceType = req.params.servicetype;

  const requests = await getServiceRequestFromDBByType(serviceType);

  if (requests == null) {
    res.status(404).json({});
  } else {
    res.status(200).json(requests!);
  }
});

router.post("/servicerequest", async (req, res) => {
  const data: {
    userID: string;
    nodeID: string;
    serviceType: string;
    services: string;
  } = req.body;

  console.log(data);

  if (GraphManager.getInstance().getNodeByID(data.nodeID) == null) {
    res.status(400).json({
      message: `Room ${data.nodeID} does not exist`,
    });
  } else {
    await createServiceRequest(
      data.userID,
      data.nodeID,
      data.serviceType,
      data.services,
    );

    res.status(200).json({
      message: "Successfully received data",
    });
  }
});

router.post("/uploadnodes", async (req, res) => {
  const data: {
    nodeID: string;
    xcoord: number;
    ycoord: number;
    floor: string;
    building: string;
    nodeType: string;
    longName: string;
    shortName: string;
  }[] = req.body;

  await clearDBEdges();
  await clearDBNodes();

  for (let i = 0; i < data.length; i++) {
    if (data[i].nodeID == "") {
      continue;
    }
    await client.node.create({
      data: data[i],
    });
  }

  res.status(200);
});

router.post("/uploadedges", async (req, res) => {
  const data: {
    startNodeID: string;
    endNodeID: string;
  }[] = req.body;

  await clearDBEdges();

  for (let i = 0; i < data.length; i++) {
    if (data[i].startNodeID == "") {
      continue;
    }
    await client.edge.create({
      data: data[i],
    });
  }

  res.status(200);
});

export default router;
