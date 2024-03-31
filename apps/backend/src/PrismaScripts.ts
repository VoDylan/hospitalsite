import { client } from "./bin/database-connection.ts";
import MapNode from "./MapNode";
import MapEdge from "./MapEdge";
import { exit } from "node:process";
import { Prisma } from "../../../packages/database";

//const prisma = new PrismaClient();

export async function createNodePrisma(nodes: MapNode[]) {
  console.log("Creating nodes");
  for (let i = 0; i < nodes.length; i++) {
    try {
      const currNode: MapNode = nodes[i];
      await client.node.create({
        data: currNode.nodeInfo,
      });
    } catch (e) {
      if (e instanceof Prisma.PrismaClientKnownRequestError) {
        if (e.code == "P2002") {
          console.log("Node already exists. Skipping...");
        }
      } else {
        console.error(e);
      }
    }
  }
  console.log(`Nodes created`);
}

export async function createEdgePrisma(edges: MapEdge[]) {
  console.log("Creating edges");
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
        console.log("Edge already exists. Skipping...");
      } else {
        console.error(e);
      }
    }
  }
  console.log(`Edges created`);
}

export async function clearDBNodes() {
  console.log("Clearing nodes from DB");
  try {
    await client.node.deleteMany({});
  } catch (e) {
    console.error(e);
  }
  console.log("Nodes cleared from DB");
}

export async function clearDBEdges() {
  console.log("Clearing edges from DB");
  try {
    await client.edge.deleteMany({});
  } catch (e) {
    console.error(e);
  }
  console.log("Edges cleared from DB");
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
