import express, { Router } from "express";
import { LocationInfo } from "common/src/LocationInfo.ts";
import { BFSalgorithm } from "../BFSalgorithm.ts";
import { AStarAlgorithm } from "../AStarAlgorithm.ts";
import Algorithms from "./Algorithms.ts";
import { IDCoordinates } from "common/src/IDCoordinates.ts";

const router: Router = express.Router();

router.post("/", async (req, res) => {
  const request: LocationInfo = req.body;
  const algorithmName = request.algorithm;
  const startID = request.startNode;
  const endID = request.endNode;

  let algorithm: Algorithms;

  if (algorithmName == "A*") {
    algorithm = new AStarAlgorithm();
  } else {
    algorithm = new BFSalgorithm();
  }

  async function runAlgo(): Promise<IDCoordinates[]> {
    await algorithm.loadData();
    return algorithm.runAlgorithm(startID, endID);
  }

  const path: IDCoordinates[] = await runAlgo();

  res.status(200).json({
    message: path,
  });
});
export default router;
