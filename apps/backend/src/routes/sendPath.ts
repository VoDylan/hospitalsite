import express, { Router } from "express";
import { LocationInfo } from "common/src/LocationInfo.ts";
import { DetermineAlgorithm } from "../DetermineAlgorithm.ts";
import {TypeCoordinates} from "common/src/TypeCoordinates.ts";

const router: Router = express.Router();

router.post("/", async (req, res) => {
  try {
    const request: LocationInfo = req.body;
    const algorithmName = request.algorithm;
    const startID = request.startNode;
    const endID = request.endNode;

    const determineAlgorithm = new DetermineAlgorithm();
    determineAlgorithm.chooseAlgorithm(algorithmName);

    const path: TypeCoordinates[] | undefined = await determineAlgorithm.runAll(
      startID,
      endID,
    );

    res.status(200).json({
      message: path,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Router: Internal Server Error" });
  }
});
export default router;
