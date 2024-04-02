import { PrismaClient } from "database";
import DBManager from "../DBManager.ts";

const client = new PrismaClient();

export default client;

const importDefaultNodeAndEdgeData = async () => {
  DBManager.getInstance().importNodesAndEdges(
    "./data/L1Nodes.csv",
    "./data/L1Edges.csv",
  );

  await DBManager.getInstance().syncNodesAndEdgesToDB();
};

if (DBManager != undefined) {
  importDefaultNodeAndEdgeData().then(() =>
    console.log("Finished importing data into database"),
  );
}

// Prisma automatically closes on shutdown
