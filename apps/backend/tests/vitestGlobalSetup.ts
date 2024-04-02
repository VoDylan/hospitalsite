import DBManager from "../src/DBManager.ts";

const setupScript = async () => {
  await DBManager.getInstance().importNodesAndEdges(
    "./apps/backend/data/L1Nodes.csv",
    "./apps/backend/data/L1Edges.csv",
  );
};

export default async function setup() {
  await setupScript();
}
