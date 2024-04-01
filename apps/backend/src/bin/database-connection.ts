import { PrismaClient } from "database";
import { dbManager } from "../DBManager.ts";

const client = new PrismaClient();

export default client;

const importDefaultNodeAndEdgeData = async () => {
  await dbManager.importNodesAndEdges(
    "./data/L1Nodes.csv",
    "./data/L1Edges.csv",
  );
};

importDefaultNodeAndEdgeData().then(() =>
  console.log("Finished importing data into database"),
);

// Prisma automatically closes on shutdown
