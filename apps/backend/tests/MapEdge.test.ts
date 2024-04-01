import { expect, test } from "vitest";
import MapEdge from "../src/MapEdge";
import DBManager from "../src/DBManager";

const db: DBManager = DBManager.getInstance();
const setupScript = async () => {
  await db.importNodesAndEdges(
    "./apps/backend/data/L1Nodes.csv",
    "./apps/backend/data/L1Edges.csv",
  );
};

test("Tests the toCSV function in the MapEdges file for all imported edges.", async () => {
  await setupScript();
  const edges: MapEdge[] = db.mapEdges;

  expect(edges[0].toCSV()).toStrictEqual("CCONF002L1, WELEV00HL1");
  expect(edges[1].toCSV()).toStrictEqual("CCONF003L1, CHALL002L1");
  expect(edges[2].toCSV()).toStrictEqual("CDEPT002L1, CDEPT003L1");
});

test("Tests the toString function in the MapEdges file for all imported edges.", async () => {
  await setupScript();
  const edges: MapEdge[] = db.mapEdges;

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
