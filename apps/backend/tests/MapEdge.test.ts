import { expect, test } from "vitest";
import DBManager from "../src/DBManager";
import GraphManager from "common/src/map/GraphManager.ts";
import MapEdge from "common/src/map/MapEdge.ts";

const db: DBManager = DBManager.getInstance();
const setupScript = () => {
  db.importNodesAndEdges(
    "./apps/backend/data/L1Nodes.csv",
    "./apps/backend/data/L1Edges.csv",
  );
};

test("Tests the toCSV function in the MapEdges file for all imported edges.", async () => {
  setupScript();
  const edges: MapEdge[] = GraphManager.getInstance().edges;

  expect(edges[0].toCSV()).toStrictEqual("CCONF002L1, WELEV00HL1");
  expect(edges[1].toCSV()).toStrictEqual("CCONF003L1, CHALL002L1");
  expect(edges[2].toCSV()).toStrictEqual("CDEPT002L1, CDEPT003L1");
});

test("Tests the toString function in the MapEdges file for all imported edges.", async () => {
  setupScript();
  const edges: MapEdge[] = GraphManager.getInstance().edges;

  expect(edges[0].toString()).toStrictEqual(
    "Edge: \n" + "\tstartNodeID: CCONF002L1\n" + "\tendNodeID: WELEV00HL1\n",
  );

  expect(edges[1].toString()).toStrictEqual(
    "Edge: \n" + "\tstartNodeID: CCONF003L1\n" + "\tendNodeID: CHALL002L1\n",
  );

  expect(edges[2].toString()).toStrictEqual(
    "Edge: \n" + "\tstartNodeID: CDEPT002L1\n" + "\tendNodeID: CDEPT003L1\n",
  );
});
