import express, { Router } from "express";
import {
  getDBEdgeByStartAndEndNode,
  getDBEdges,
  getDBNodeByID,
  getDBNodes,
} from "../PrismaScripts.ts";

const router: Router = express.Router();

router.get("/nodes", async (req, res) => {
  const nodeData = await getDBNodes();
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
  const edgeData = await getDBEdges();
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
