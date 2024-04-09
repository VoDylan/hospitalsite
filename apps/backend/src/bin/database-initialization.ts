import DBManager from "../DBManager.ts";

export const importDefaultNodeAndEdgeData = async () => {
  await DBManager.getInstance().importNodesAndEdges(
    "./data/L1Nodes.csv",
    "./data/L1Edges.csv",
  );
};
