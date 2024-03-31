import { expect, test } from "vitest";
import DBManager from "../src/DBManager";
import MapNode from "../src/MapNode";

const db: DBManager = new DBManager();
const setupScript = async () => {
  db.importNodesAndEdges("./L1Nodes.csv", "./L1Edges.csv");
};
setupScript().then(() => console.log("Finished setup"));

test("Tests the toCSV function in the MapNode class for all imported nodes.", () => {
  const nodes: MapNode[] = db.mapNodes;

  expect(nodes[0].toCSV()).toStrictEqual(
    "CCONF001L1, 2255, 849, L1, 45 Francis, CONF, Anesthesia Conf Floor L1, Conf C001L1",
  );
  expect(nodes[1].toCSV()).toStrictEqual(
    "CCONF002L1, 2665, 1043, L1, 45 Francis, CONF, Medical Records Conference Room Floor L1, Conf C002L1",
  );
  expect(nodes[2].toCSV()).toStrictEqual(
    "CCONF003L1, 2445, 1245, L1, 45 Francis, CONF, Abrams Conference Room, Conf C003L1",
  );
});

test("Tests the toString function in the MapEdges file for all imported edges.", () => {
  const nodes: MapNode[] = db.mapNodes;

  expect(nodes[0].toString()).toStrictEqual(
    "Node: \n" +
      "\tnodeID: CCONF001L1\n" +
      "\txcoord: 2255\n" +
      "\tycoord: 849\n" +
      "\tfloor: L1\n" +
      "\tbuilding: 45 Francis\n" +
      "\tnodeType: CONF\n" +
      "\tlongName: Anesthesia Conf Floor L1\n" +
      "\tshortName: Conf C001L1\n",
  );

  expect(nodes[1].toString()).toStrictEqual(
    "Node: \n" +
      "\tnodeID: CCONF002L1\n" +
      "\txcoord: 2665\n" +
      "\tycoord: 1043\n" +
      "\tfloor: L1\n" +
      "\tbuilding: 45 Francis\n" +
      "\tnodeType: CONF\n" +
      "\tlongName: Medical Records Conference Room Floor L1\n" +
      "\tshortName: Conf C002L1\n",
  );

  expect(nodes[2].toString()).toStrictEqual(
    "Node: \n" +
      "\tnodeID: CCONF003L1\n" +
      "\txcoord: 2445\n" +
      "\tycoord: 1245\n" +
      "\tfloor: L1\n" +
      "\tbuilding: 45 Francis\n" +
      "\tnodeType: CONF\n" +
      "\tlongName: Abrams Conference Room\n" +
      "\tshortName: Conf C003L1\n",
  );
});
