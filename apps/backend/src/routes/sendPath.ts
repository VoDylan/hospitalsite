import express, { Router } from "express";
import { LocationInfo } from "common/src/LocationInfo.ts";
import { AStarAlgorithm } from "../AStarAlgorithm.ts";
import Algorithms from "../Algorithms.ts";
import { IDCoordinates } from "common/src/IDCoordinates.ts";
import { DFSalgorithm } from "../DFSalgorithm.ts";

const router: Router = express.Router();

async function runAlgo(
  algorithm: Algorithms,
  startID: string,
  endID: string,
): Promise<IDCoordinates[]> {
  await algorithm.loadData();
  return algorithm.runAlgorithm(startID, endID);
}

router.post("/", async (req, res) => {
  try {
    const request: LocationInfo = req.body;
    const algorithmName = request.algorithm;
    const startID = request.startNode;
    const endID = request.endNode;

    let algorithm: Algorithms;

    if (algorithmName == "A*") {
      algorithm = new AStarAlgorithm();
    } else {
      algorithm = new DFSalgorithm();
    }

    const path: IDCoordinates[] = await runAlgo(algorithm, startID, endID);

    res.status(200).json({
      message: path,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Router: Internal Server Error" });
  }
});
export default router;
