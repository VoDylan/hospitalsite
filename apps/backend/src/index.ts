import DBManager from "./DBManager";
import { closePrismaConnection } from "./PrismaScripts";

const genDBScript = async () => {
  const db: DBManager = new DBManager();

  console.log("Importing node and edge information...");

  db.importNodesAndEdges("./L1Nodes.csv", "./L1Edges.csv");

  console.log("Finished importing information!");

  console.log("Imported Nodes:");
  db.printNodes();

  console.log("Imported Edges:");
  db.printEdges();

  console.log("Exporting nodes and edges to CSV...");
  db.exportNodesAndEdgesToCSV();
  console.log("Finished exporting nodes and edges!");
};

genDBScript().then(() => {
  console.log("DB Execution finished");
  closePrismaConnection().then(() => console.log("Prisma connection closed"));
});
