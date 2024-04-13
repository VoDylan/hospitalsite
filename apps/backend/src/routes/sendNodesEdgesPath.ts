import express, { Router } from "express";
import { testingDistance } from "../lib/testingDistance.ts";
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
  // console.log("Does it work?");
  // console.log(path);

  res.status(200).json({
    message: path,
  });
});
export default router;
