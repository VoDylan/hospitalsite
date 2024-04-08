import DBManager from "../DBManager.ts";

export const importDefaultNodeAndEdgeData = async () => {
  DBManager.getInstance().importNodesAndEdges(
    "./data/L1Nodes.csv",
    "./data/L1Edges.csv",
  );

  await DBManager.getInstance().syncNodesAndEdgesToDB();
};
