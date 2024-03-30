import { expect, test } from "vitest";
import DBManager from "../src/DBManager";
import MapNode, { NodeFields } from "../src/MapNode";
//import MapEdge, {EdgeFields} from "../src/MapEdge";
import CSVTools from "../src/lib/CSVTools";

//let testTool: CSVTools = new CSVTools();
const testDB = new DBManager();
const setupScript = async () => {
  await testDB.importNodesAndEdges("./L1Nodes.csv", "./L1Edges.csv");
};
const testNode1Fields: NodeFields = {
  nodeID: "CCONF001L1",
  xcoord: 2255,
  ycoord: 849,
  floor: "L1",
  building: "45 Francis",
  nodeType: "CONF",
  longName: "Anesthesia Conf Floor L1",
  shortName: "Conf C001L1",
};
const testNode1 = new MapNode(testNode1Fields);
//let testNode2Fields: NodeFields = {nodeID: "CCONF002L1", xcoord:2665, ycoord:1043, floor:"L1", building:"45 Francis", nodeType:"CONF", longName:"Medical Records Conference Room Floor L1"
//    , shortName:"Conf C002L1"};
//let testNode2 = new MapNode(testNode2Fields);
//let testNode3Fields: NodeFields = {nodeID: "CCONF003L1", xcoord:2445, ycoord:1245, floor:"L1", building:"45 Francis", nodeType:"CONF", longName:"Abrams Conference Room"
//    , shortName:"Conf C003L1"};
//let testNode3 = new MapNode(testNode3Fields);

//let testEdge1Fields: EdgeFields = {startNode: testNode1, endNode: testNode2};
//let testEdge1 = new MapEdge(testEdge1Fields);
//let testEdge2Fields: EdgeFields = {startNode: testNode2, endNode: testNode3};
//let testEdge2 = new MapEdge(testEdge2Fields);
//let testEdge3Fields: EdgeFields = {startNode: testNode3, endNode: testNode1};
//let testEdge3 = new MapEdge(testEdge3Fields);

setupScript().then(() => console.log("Finished setup"));

test("parsing", () => {
  const nodes: string[][] = CSVTools.parseCSVFromFile("./L1Nodes.csv");
  const nodeInfo: NodeFields = {
    nodeID: nodes[1][0],
    xcoord: parseInt(nodes[1][1]),
    ycoord: parseInt(nodes[1][2]),
    floor: nodes[1][3],
    building: nodes[1][4],
    nodeType: nodes[1][5],
    longName: nodes[1][6],
    shortName: nodes[1][7],
  };
  const created: MapNode = new MapNode(nodeInfo);
  expect(created).toStrictEqual(testNode1);
});

/*works
test(CSVTools.parseCSVFromFile, () => {
    console.log(CSVTools.parseCSVFromFile('./L1Nodes.csv'))
});*/

test("exporting", () => {
  testDB.exportNodesAndEdgesToCSV();
});

test(testDB.printNodes, () => {
  testDB.printNodes();
});

test(testDB.printEdges, () => {
  testDB.printEdges();
});

test("Testing output filePath", () => {
  expect(testDB.getCombinedFilepath("newNodeCSV.csv")).toStrictEqual(
    "./output/newNodeCSV.csv",
  );
});
