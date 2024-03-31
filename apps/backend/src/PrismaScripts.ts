import client from "./bin/database-connection.ts";
import MapNode from "./MapNode";
import MapEdge from "./MapEdge";
import { exit } from "node:process";
import { Prisma } from "../../../packages/database";

//const prisma = new PrismaClient();

async function createNodePrisma(node: MapNode) {
  console.log("Creating node");
  try {
    const createdNode = await client.node.create({
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
    const createdEdge = await client.edge.create({
      data: {
        startNodeID: edge.startNode.nodeID,
        endNodeID: edge.endNode.nodeID,
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



async function createServiceRequest(userId: number, nodeShortName: string, services: ServiceData): Promise<void> {
    console.log("Creating service request");

    try {
        const serviceJson = JSON.stringify(services);

        const createdServiceRequest = await client.serviceRequest.create({
            data: {
                user: {
                    connect: { userID: userId },
                },
                node: {
                    connect: { shortName: nodeShortName },
                },
                services: serviceJson,
            },
        });

        console.log(`Service request created with ID: ${createdServiceRequest.id}`);
    } catch (e) {
        if (e instanceof Prisma.PrismaClientKnownRequestError) {
            if (e.code === 'P2002') {
                console.log("Service request already exists. Skipping...");
            }
        } else {
            // All other errors
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
