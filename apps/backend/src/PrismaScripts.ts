import client from "./bin/database-connection.ts";
import MapNode from "./MapNode";
import MapEdge from "./MapEdge";
import { exit } from "node:process";
import { Prisma } from "../../../packages/database";

//const prisma = new PrismaClient();

const loggingPrefix: string = "Prisma: ";

export async function createNodePrisma(nodes: MapNode[]) {
  console.log(`${loggingPrefix}Creating nodes`);
  for (let i = 0; i < nodes.length; i++) {
    try {
      const currNode: MapNode = nodes[i];
      await client.node.create({
        data: currNode.nodeInfo,
      });
    } catch (e) {
      if (e instanceof Prisma.PrismaClientKnownRequestError) {
        if (e.code == "P2002") {
          console.log(`${loggingPrefix}Node already exists. Skipping...`);
        }
      } else {
        console.error(e);
      }
    }
  }
  console.log(`${loggingPrefix}Nodes created`);
}

export async function createEdgePrisma(edges: MapEdge[]) {
  console.log(`${loggingPrefix}Creating edges`);
  for (let i = 0; i < edges.length; i++) {
    try {
      const currEdge: MapEdge = edges[i];
      await client.edge.create({
        data: {
          startNodeID: currEdge.startNodeID,
          endNodeID: currEdge.endNodeID,
        },
      });
    } catch (e) {
      if (e instanceof Prisma.PrismaClientKnownRequestError) {
        console.log(`${loggingPrefix}Edge already exists. Skipping...`);
      } else {
        console.error(e);
      }
    }
  }
  console.log(`${loggingPrefix}Edges created`);
}

export async function clearDBNodes() {
  console.log(`${loggingPrefix}Clearing nodes from DB`);
  try {
    await client.node.deleteMany({});
  } catch (e) {
    console.error(e);
  }
  console.log(`${loggingPrefix}Nodes cleared from DB`);
}

export async function clearDBEdges() {
  console.log(`${loggingPrefix}Clearing edges from DB`);
  try {
    await client.edge.deleteMany({});
  } catch (e) {
    console.error(e);
  }
  console.log(`${loggingPrefix}Edges cleared from DB`);
}

export async function getDBNodes() {
  console.log(`${loggingPrefix}Getting nodes from DB`);
  let nodes: object[] | null = null;
  try {
    nodes = await client.node.findMany({});
  } catch (e) {
    console.error(e);
  }

  if (nodes == null) {
    console.log(`${loggingPrefix}No nodes found`);
  } else {
    console.log(`${loggingPrefix}Obtained all nodes from DB`);
  }

  return nodes;
}

export async function getDBNodeByID(nodeID: string) {
  console.log(`${loggingPrefix}Getting node of id ${nodeID} from DB`);
  let node: object | null = null;
  try {
    node = await client.node.findUnique({
      where: {
        nodeID: nodeID,
      },
    });
  } catch (e) {
    console.error(e);
  }

  if (node == null) {
    console.log(`${loggingPrefix}Node with id ${nodeID} not found`);
  } else {
    console.log(`${loggingPrefix}Node with id ${nodeID} found`);
  }

  return node;
}

export async function getDBEdges() {
  console.log(`${loggingPrefix}Getting edges from DB`);
  let edges: object[] | null = null;
  try {
    edges = await client.edge.findMany({});
  } catch (e) {
    console.error(e);
  }

  if (edges == null) {
    console.log(`${loggingPrefix}No edges found`);
  } else {
    console.log(`${loggingPrefix}Obtained all edges from DB`);
  }

  return edges;
}

export async function getDBEdgeByStartAndEndNode(
  startNodeID: string,
  endNodeID: string,
) {
  console.log(
    `${loggingPrefix}Getting edge by startNodeID ${startNodeID} and endNodeID ${endNodeID}`,
  );
  let edge: object | null = null;
  try {
    edge = await client.edge.findUnique({
      where: {
        pairID: {
          startNodeID: startNodeID,
          endNodeID: endNodeID,
        },
      },
    });
  } catch (e) {
    console.log(e);
  }

  if (edge == null) {
    console.log(
      `${loggingPrefix}No edge found with startNodeID ${startNodeID} and endNodeID ${endNodeID}`,
    );
  } else {
    console.log(
      `${loggingPrefix}Edge found with startNodeID ${startNodeID} and endNodeID ${endNodeID}`,
    );
  }

  return edge;
}

export async function openPrismaConnection() {
  try {
    await client.$connect();
  } catch (e) {
    console.error(e);
    await client.$disconnect();
    exit(1);
  }
}

export async function closePrismaConnection() {
  try {
    await client.$disconnect();
  } catch (e) {
    console.error(e);
    await client.$disconnect();
    exit(1);
  }
}

export { client };
