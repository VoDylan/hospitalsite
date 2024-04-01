import express, { Router } from "express";
import { getDBEdgeByStartAndEndNode, getDBNodeByID } from "../PrismaScripts.ts";
import { dbManager } from "../DBManager.ts";

const router: Router = express.Router();

router.get("/nodes", async (req, res) => {
  const nodeData = await dbManager.updateAndGetNodesFromDB();
  res.status(200).json(nodeData);
});

router.get("/nodes/:nodeid", async (req, res) => {
  const nodeData: object | null = await getDBNodeByID(req.params.nodeid);

  if (nodeData == null) {
    res.status(404).json({});
  } else {
    res.status(200).json(nodeData!);
  }
});

router.get("/edges", async (req, res) => {
  const edgeData = await dbManager.updateAndGetEdgesFromDB();
  res.status(200).json(edgeData);
});

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

export default router;
