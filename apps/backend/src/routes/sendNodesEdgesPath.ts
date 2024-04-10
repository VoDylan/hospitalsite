import express, { Router } from "express";
import { testingDistance } from "../../tests/testingDistance.ts";
const router: Router = express.Router();
import { sendRequest } from "common/src/sendRequest.ts";

router.post("/", async (req, res) => {
  const body: sendRequest = req.body;
  const request = body.req;
  console.log(request);
  const distances = new testingDistance(request);
  async function runDistances() {
    return await distances.putIntoTypes();
  }

  const path = await runDistances();
  console.log("Does it work?");
  console.log(path);

  res.status(200).json({
    message: path,
  });
});
export default router;

// router.post("/", async (req, res) => {
//   const request: LocationInfo = req.body;
//   const algorithmName = request.algorithm;
//   const startID = request.startNode;
//   const endID = request.endNode;
//
//   let algorithm: Algorithms;
//
//   if (algorithmName == "A*") {
//     algorithm = new AStarAlgorithm();
//   } else {
//     algorithm = new BFSalgorithm();
//   }
//
//   async function runAlgo(): Promise<IDCoordinates[]> {
//     await algorithm.loadData();
//     return algorithm.runAlgorithm(startID, endID);
//   }
//
//   const path: IDCoordinates[] = await runAlgo();
//
//   res.status(200).json({
//     message: path,
//   });
// });
// export default router;
