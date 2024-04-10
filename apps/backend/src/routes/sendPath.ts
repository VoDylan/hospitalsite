import express, { Router } from "express";
// import { BFSalgorithm } from "../BFSalgorithm.ts";
// import {Coordinates} from "common/src/Coordinates.ts";
import { LocationInfo } from "common/src/LocationInfo.ts";

// import { AStarAlgorithm } from "../AStarAlgorithm.ts";
import { BFSalgorithm } from "../BFSalgorithm.ts";

const router: Router = express.Router();

router.post("/", async (req, res) => {
  const request: LocationInfo = req.body;
  const startID = request.startNode;
  const endID = request.endNode;

  const bfs = new BFSalgorithm();
  async function runBfs() {
    await bfs.load_data();
    return bfs.BFS(startID, endID);
  }

  const path = await runBfs();

  res.status(200).json({
    message: path,
  });
});
export default router;
