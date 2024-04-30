import express, { Router } from "express";
import nodemailer from "nodemailer";
import client from "../bin/database-connection.ts";

const router: Router = express.Router();

const transporter = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: "vdylan24@gmail.com",
    pass: "xxtgihhgvcuievmd",
  },
});

router.post("/", async (req, res) => {
  const nodeInfo = await client.node.findUnique({
    where: {
      nodeID: req.body.location,
    },
  });

  let locationInformation: string = req.body.location;

  if (nodeInfo) locationInformation = nodeInfo.longName;

  const mailOptions = {
    from: "vdylan24@gmail.com",
    to: req.body.to,
    subject: "Appointment Reminder",
    html:
      "You have an appointment in " +
      locationInformation +
      " on " +
      req.body.date +
      ". See you soon!",
  };

  transporter.sendMail(mailOptions, (error) => {
    if (error) {
      return res.status(500).send(error);
    }
    res.status(200).send("Email sent successfully");
  });
});

export default router;
