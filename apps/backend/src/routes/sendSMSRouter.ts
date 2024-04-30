import express, { Router } from "express";
import sendSMS from "./sendSMS.ts";

const router: Router = express.Router();

router.post("/", async (req, res) => {
  try {
    sendSMS();
    res.status(200).json({ message: "SMS sent successfully" });
  } catch (error) {
    console.error("Error sending SMS: ", error);
    res.status(500).json({ error: "failed to send SMS" });
  }
});

export default router;
