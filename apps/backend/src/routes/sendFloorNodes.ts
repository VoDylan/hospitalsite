import express from "express";
import { FloorNodes } from "../FloorNodes.ts";
import { IDCoordinates } from "common/src/IDCoordinates.ts";

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const request: { req: string } = req.body;
    const floor = request.req;

    const nodes = new FloorNodes(floor);

    const path: IDCoordinates[] = await nodes.putIntoTypes();

    res.status(200).json({
      message: path,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Router: Internal Server Error" });
  }
});

export default router;
