import express from "express";
import { FloorNodes } from "../FloorNodes.ts";
import { IDCoordinates } from "common/src/IDCoordinates.ts";
const router = express.Router();

router.post("/", async (req, res) => {
  const request: { req: string } = req.body;
  const floor = request.req;

  const nodes = new FloorNodes(floor);

  async function run(): Promise<IDCoordinates[]> {
    return await nodes.putIntoTypes();
  }

  const path: IDCoordinates[] = await run();
  console.log(path);

  res.status(200).json({
    message: path,
  });
});

export default router;
