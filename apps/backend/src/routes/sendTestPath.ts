import express, { Router } from "express";
import { testingDistance } from "../../tests/testingDistance.ts";
const router: Router = express.Router();

router.get("/", async (req, res) => {
  const distances = new testingDistance("l1");
  async function runDistances() {
    return await distances.putIntoTypes();
  }

  const path = await runDistances();

  res.status(200).json({
    message: path,
  });
});
export default router;
