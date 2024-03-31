import client from "./bin/database-connection.ts";
import MapNode from "./MapNode";
import MapEdge from "./MapEdge";
import { exit } from "node:process";
import { Prisma } from "../../../packages/database";

//const prisma = new PrismaClient();

async function createNodePrisma(nodes: MapNode[]) {
  console.log("Creating nodes");
  try {
    await client.node.createMany({ data: nodes });
    console.log(`Nodes created`);
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

async function createEdgePrisma(edges: MapEdge[]) {
  console.log("Creating edges");
  try {
    await client.edge.createMany({ data: edges });
    console.log(`Edges created`);
  } catch (e) {
    if (e instanceof Prisma.PrismaClientKnownRequestError) {
      console.log("Edge already exists. Skipping...");
    } else {
      console.error(e);
    }
  }
}

async function openPrismaConnection() {
  try {
    await client.$connect();
  } catch (e) {
    console.error(e);
    await client.$disconnect();
    exit(1);
  }
}

async function closePrismaConnection() {
  try {
    await client.$disconnect();
  } catch (e) {
    console.error(e);
    await client.$disconnect();
    exit(1);
  }
}

export {
  createNodePrisma,
  createEdgePrisma,
  openPrismaConnection,
  closePrismaConnection,
  client,
};
