import DBManager from "../DBManager.ts";

export const importDefaultNodeAndEdgeData = async () => {
  await DBManager.getInstance().importNodesAndEdges(
    "./data/nodes.csv",
    "./data/edges.csv",
  );
};
