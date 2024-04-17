import createError, { HttpError } from "http-errors";
import express, { Express, NextFunction, Request, Response } from "express";
import cookieParser from "cookie-parser";
import logger from "morgan";
import databaseRouter from "./routes/databaseRouter";
import sendPath from "./routes/sendPath";
import sendTestPath from "./routes/sendTestPath.ts";
import sendNodesEdgesPath from "./routes/sendNodesEdgesPath.ts";
import sendFloorNodes from "./routes/sendFloorNodes.ts";
import {auth} from "express-oauth2-jwt-bearer";

const app: Express = express(); // Set up the backend

// Setup generic middlewear
app.use(
  logger("dev", {
    stream: {
      // This is a "hack" that gets the output to appear in the remote debugger :)
      write: (msg) => console.info(msg),
    },
  }),
); // This records all HTTP requests
app.use(express.json()); // This processes requests as JSON
app.use(express.urlencoded({ extended: false })); // URL parser
app.use(cookieParser()); // Cookie parser

// Setup routers. ALL ROUTERS MUST use /api as a start point, or they
// won't be reached by the default proxy and prod setup

//Open the /api/database endpoint and connect to the databaseRouter
app.use("/api/database", databaseRouter);
app.use("/api/path", sendPath);
app.use("/api/testPath", sendTestPath);
app.use("/api/sendDistances", sendNodesEdgesPath);
app.use("/api/sendNodes", sendFloorNodes);
app.use("/healthcheck", (req, res) => {
  res.status(200).send();

  if (!process.env["VITETEST"]) {
    app.use(
      auth( {
        audience: "/api",
        issuerBaseURL: "/https://dev-1bg6tdr43pzdkebi.us.auth0.com/api/v2/",
        tokenSigningAlg: "RS256",
      })
    );
  }
});

/**
 * Catch all 404 errors, and forward them to the error handler
 */
app.use(function (req: Request, res: Response, next: NextFunction): void {
  // Have the next (generic error handler) process a 404 error
  next(createError(404));
});

/**
 * Generic error handler
 */
app.use((err: HttpError, req: Request, res: Response): void => {
  res.statusMessage = err.message; // Provide the error message

  res.locals.error = req.app.get("env") === "development" ? err : {};

  // Reply with the error
  res.status(err.status || 500);
});

export default app; // Export the backend, so that www.ts can start it
