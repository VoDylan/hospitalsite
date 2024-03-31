import { PrismaClient } from "database";
import DBManager from "../DBManager.ts";

// Create the prisma client, this automatically connects to the database
export const client = new PrismaClient();

const importDefaultNodeAndEdgeData = async () => {
  const dbManager: DBManager = new DBManager();

  await dbManager.importNodesAndEdges("./L1Nodes.csv", "./L1Edges.csv");
};

importDefaultNodeAndEdgeData().then(() =>
  console.log("Finished importing data into database"),
);

// Prisma automatically closes on shutdown

export default client;
