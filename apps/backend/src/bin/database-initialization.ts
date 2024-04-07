import DBManager from "../DBManager.ts";

const importDefaultNodeAndEdgeData = async () => {
  DBManager.getInstance().importNodesAndEdges(
    "./data/L1Nodes.csv",
    "./data/L1Edges.csv",
  );

  await DBManager.getInstance().syncNodesAndEdgesToDB();
};

export const initializeDatabase = () => {
  importDefaultNodeAndEdgeData().then(() =>
    console.log("Finished importing data into database"),
  );
};
