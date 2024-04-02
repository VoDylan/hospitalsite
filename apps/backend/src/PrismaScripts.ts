import client from "./bin/database-connection.ts";
import MapNode from "./MapNode";
import MapEdge from "./MapEdge";
import { exit } from "node:process";
import { Prisma } from "database";

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

export async function clearDBRequests() {
  console.log(`${loggingPrefix}Clearing service requests from DB`);
  try {
    await client.serviceRequest.deleteMany({});
  } catch (e) {
    console.error(e);
  }

  console.log(`${loggingPrefix}Service requests cleared from DB`);
}

export async function getDBNodes() {
  console.log(`${loggingPrefix}Getting nodes from DB`);
  let nodes = null;
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
  let node = null;
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

export async function createServiceRequest(
  userID: string,
  nodeID: string,
  serviceType: string,
  services: string,
): Promise<void> {
  console.log("Creating service request");

  try {
    const serviceJson = JSON.stringify(services);

    const createdServiceRequest = await client.serviceRequest.create({
      data: {
        userID: userID,
        node: {
          connect: {
            nodeID: nodeID,
          },
        },
        serviceType: serviceType,
        services: serviceJson,
      },
    });

    console.log(`Service request created with ID: ${createdServiceRequest.id}`);
  } catch (e) {
    if (e instanceof Prisma.PrismaClientKnownRequestError) {
      if (e.code === "P2002") {
        console.log("Service request already exists. Skipping...");
      }
    } else {
      // All other errors
      console.error(e);
    }
  }
}

export async function getDBEdges() {
  console.log(`${loggingPrefix}Getting edges from DB`);
  let edges = null;
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
  let edge = null;
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

export async function getServiceRequestsFromDB() {
  let requests = null;
  try {
    requests = await client.serviceRequest.findMany();
  } catch (e) {
    console.error(e);
  }

  if (requests == null) {
    console.log(`${loggingPrefix}No service requests found in DB`);
  } else {
    console.log(`${loggingPrefix}Service requests found in DB`);
  }

  return requests;
}

export async function getServiceRequestFromDBByType(serviceType: string) {
  let request = null;
  try {
    request = await client.serviceRequest.findMany({
      where: {
        serviceType: serviceType,
      },
    });
  } catch (e) {
    console.error(e);
  }

  if (request == null) {
    console.log(
      `${loggingPrefix}No request found with serviceType ${serviceType}`,
    );
  } else {
    console.log(
      `${loggingPrefix}Request(s) found with serviceType ${serviceType}`,
    );
  }

  return request;
}

export async function getServiceRequestFromDBByNodeID(nodeID: string) {
  let request = null;
  try {
    request = await client.serviceRequest.findMany({
      where: {
        nodeID: nodeID,
      },
    });
  } catch (e) {
    console.error(e);
  }

  if (request == null) {
    console.log(
      `${loggingPrefix}No request found from rooms with nodeID ${nodeID}`,
    );
  } else {
    console.log(
      `${loggingPrefix}Request(s) found from rooms with nodeID ${nodeID}`,
    );
  }

  return request;
}

export async function getServiceRequestFromDBByUserID(userID: string) {
  let request = null;
  try {
    request = await client.serviceRequest.findMany({
      where: {
        userID: userID,
      },
    });
  } catch (e) {
    console.error(e);
  }

  if (request == null) {
    console.log(
      `${loggingPrefix}No request found from users with userID ${userID}`,
    );
  } else {
    console.log(
      `${loggingPrefix}Request(s) found from users with userID ${userID}`,
    );
  }
  return request;
}

// Uses userID to check if user is in database
export async function checkUserID(userID: number) {
  let user = null;
  try {
    user = await client.user.findMany({
      where: {
        userID: userID,
      },
    });
  } catch (e) {
    console.error(e);
  }
  if (user == null) {
    console.log(
      `${loggingPrefix}User ${userID} does not exist within current database`,
    );
    return false;
  } else {
    console.log(
      `${loggingPrefix}User ${userID} is within the current database`,
    );
    return true;
  }
}

export async function checkUserMedicalStaff(userID: number): Promise<boolean> {
  if (await checkUserID(userID)) {
    try {
      const user = await client.user.findUnique({
        where: { userID: userID },
        include: { MedicalWorker: true },
      });

      // Check if the user exists and has MedicalWorker association
      if (user && user.MedicalWorker.length > 0) {
        console.log(
          `${loggingPrefix}User ${userID} is a part of medical staff`,
        );
        return true;
      } else {
        console.log(
          `${loggingPrefix}User ${userID} is not a part of medical staff`,
        );
        return false;
      }
    } catch (e) {
      console.error(e);
      return false;
    }
  } else {
    console.log(
      `${loggingPrefix}User ${userID} does not exist in current database`,
    );
    return false;
  }
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
