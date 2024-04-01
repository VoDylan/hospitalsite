import { expect, test } from "vitest";
import MapEdge from "../src/MapEdge";
import DBManager from "../src/DBManager";

const db: DBManager = DBManager.getInstance();
const setupScript = async () => {
  db.importNodesAndEdges("./L1Nodes.csv", "./L1Edges.csv");
};

setupScript().then(() => console.log("Finished setup"));

test("Tests the toCSV function in the MapEdges file for all imported edges.", () => {
  const edges: MapEdge[] = db.mapEdges;

  expect(edges[0].toCSV()).toStrictEqual("CCONF001L1, CCONF002L1");
  expect(edges[1].toCSV()).toStrictEqual("CCONF002L1, CCONF003L1");
  expect(edges[2].toCSV()).toStrictEqual("CCONF003L1, CCONF001L1");
});

test("Tests the toString function in the MapEdges file for all imported edges.", () => {
  const edges: MapEdge[] = db.mapEdges;

  expect(edges[0].toString()).toStrictEqual(
    "Edge: \n" + "\tstartNodeID: CCONF001L1\n" + "\tendNodeID: CCONF002L1\n",
  );

  expect(edges[1].toString()).toStrictEqual(
    "Edge: \n" + "\tstartNodeID: CCONF002L1\n" + "\tendNodeID: CCONF003L1\n",
  );

  expect(edges[2].toString()).toStrictEqual(
    "Edge: \n" + "\tstartNodeID: CCONF003L1\n" + "\tendNodeID: CCONF001L1\n",
  );
});
