import express, { Router } from "express";
import { testingDistance } from "../../tests/testingDistance.ts";
const router: Router = express.Router();

router.post("/", async (req, res) => {
  const distances = new testingDistance();
  async function runDistances() {
    return await distances.putIntoTypes();
  }

  const path = await runDistances();

  res.status(200).json({
    message: path,
  });
});
export default router;
