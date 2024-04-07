import { expect, test } from "vitest";
import DBManager from "../src/DBManager";
import MapNode from "common/src/MapNode.ts";
import CSVTools from "../src/lib/CSVTools";
import MapEdge from "common/src/MapEdge.ts";
import { MapNodeType } from "common/src/MapNodeType.ts";
import GraphManager from "common/src/GraphManager.ts";

//let testTool: CSVTools = new CSVTools();
const testDB = DBManager.getInstance();

const setupScript = () => {
  testDB.importNodesAndEdges(
    "./apps/backend/data/L1Nodes.csv",
    "./apps/backend/data/L1Edges.csv",
  );
};
const testNode1Fields: MapNodeType = {
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

test("CSV Parsing of Node Data", () => {
  const nodes: string[][] = CSVTools.parseCSVFromFile(
    "./apps/backend/data/L1Nodes.csv",
  );
  const nodeInfo: MapNodeType = {
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

test("Get node objects", () => {
  setupScript();
  const nodes: MapNode[] = GraphManager.getInstance().nodes;

  expect(nodes.length).toStrictEqual(46);

  expect(nodes[25].nodeInfo).toStrictEqual({
    nodeID: "CLABS005L1",
    xcoord: 2770,
    ycoord: 1284,
    floor: "L1",
    building: "45 Francis",
    nodeType: "LABS",
    longName: "CSIR MRI Floor L1",
    shortName: "Lab C005L1",
  });

  expect(nodes[26].nodeInfo).toStrictEqual({
    nodeID: "CREST001L1",
    xcoord: 1732,
    ycoord: 1019,
    floor: "L1",
    building: "Tower",
    nodeType: "REST",
    longName: "Restroom L Elevator Floor L1",
    shortName: "Restroom C001L1",
  });

  expect(nodes[45].nodeInfo).toStrictEqual({
    nodeID: "WELEV00ML1",
    xcoord: 1820,
    ycoord: 1284,
    floor: "L1",
    building: "Tower",
    nodeType: "ELEV",
    longName: "Elevator M Floor L1",
    shortName: "Elevator ML1",
  });
});

test("Get edge objects", () => {
  setupScript();
  const edges: MapEdge[] = GraphManager.getInstance().edges;

  expect(edges.length).toStrictEqual(46);

  expect(`${edges[0].startNodeID} ${edges[0].endNodeID}`).toStrictEqual(
    "CCONF002L1 WELEV00HL1",
  );

  expect(`${edges[7].startNodeID} ${edges[7].endNodeID}`).toStrictEqual(
    "CHALL003L1 CCONF003L1",
  );

  expect(`${edges[45].startNodeID} ${edges[45].endNodeID}`).toStrictEqual(
    "GHALL006L1 GELEV00QL1",
  );
});

test("Export nodes and edges to CSV", () => {
  testDB.exportNodesAndEdgesToCSV();
});

test("Test output filePath generation function", () => {
  expect(testDB.getCombinedFilepath("newNodeCSV.csv")).toStrictEqual(
    "./apps/backend/output/newNodeCSV.csv",
  );

  expect(testDB.getCombinedFilepath("newEdgeCSV.csv")).toStrictEqual(
    "./apps/backend/output/newEdgeCSV.csv",
  );

  expect(testDB.getCombinedFilepath("testfile.csv")).toStrictEqual(
    "./apps/backend/output/testfile.csv",
  );
});

test("Get node by node ID", () => {
  setupScript();
  const testNode1 = GraphManager.getInstance().getNodeByID("CREST003L1")!;
  expect(testNode1).toBeDefined();
  expect(testNode1.nodeInfo).toStrictEqual({
    nodeID: "CREST003L1",
    xcoord: 2300,
    ycoord: 879,
    floor: "L1",
    building: "45 Francis",
    nodeType: "REST",
    longName: "Restroom K Elevator Floor L1",
    shortName: "Restroom C003L1",
  });

  const testNode2 = GraphManager.getInstance().getNodeByID("WELEV00ML1")!;
  expect(testNode2).toBeDefined();
  expect(testNode2.nodeInfo).toStrictEqual({
    nodeID: "WELEV00ML1",
    xcoord: 1820,
    ycoord: 1284,
    floor: "L1",
    building: "Tower",
    nodeType: "ELEV",
    longName: "Elevator M Floor L1",
    shortName: "Elevator ML1",
  });

  const testNode3 = GraphManager.getInstance().getNodeByID("testNull1");

  expect(testNode3).toBeNull();
});
