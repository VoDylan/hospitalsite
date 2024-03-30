import { Prisma, PrismaClient } from "./.prisma/client";
import MapNode from "./MapNode";
import MapEdge from "./MapEdge";

const prisma = new PrismaClient();

async function createNodePrisma(node: MapNode) {
  console.log("Creating node");
  try {
    const createdNode = await prisma.node.create({
      data: {
        nodeID: node.nodeID,
        xcoord: node.xcoord,
        ycoord: node.ycoord,
        floor: node.floor,
        building: node.building,
        nodeType: node.nodeType,
        longName: node.longName,
        shortName: node.shortName,
      },
    });
    console.log(`Node created with ID: ${createdNode.nodeID}`);
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

async function createEdgePrisma(edge: MapEdge) {
  console.log("Creating edge");
  try {
    const createdEdge = await prisma.edge.create({
      data: {
        startNodeID: edge.startNode,
        endNodeID: edge.endNode,
      },
    });
    console.log(`Edge created with ID: ${createdEdge.edgeID}`);
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
    await prisma.$connect();
  } catch (e) {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  }
}

async function closePrismaConnection() {
  try {
    await prisma.$disconnect();
  } catch (e) {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  }
}

export {
  createNodePrisma,
  createEdgePrisma,
  openPrismaConnection,
  closePrismaConnection,
};
