import client from "./bin/database-connection.ts";
import { Prisma} from "database";
import { MapNodeType } from "common/src/map/MapNodeType.ts";
import { MapEdgeType } from "common/src/map/MapEdgeType.ts";
import {EmployeeFieldsType} from "common/src/employee/EmployeeFieldsType.ts";

const loggingPrefix: string = "PrismaScripts: ";

export async function createNodePrisma(node: MapNodeType) {
  console.log(`Adding node ${node.nodeID} to DB`);
  try {
    await client.node.create({
      data: node,
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

export async function updateNodePrisma(node: MapNodeType) {
  try {
    await client.node.update({
      where: {
        nodeID: node.nodeID,
      },
      data: node,
    });
    return 200;
  } catch (e) {
    console.error(e);
    return 400;
  }
}

export async function deleteNodePrisma(nodeID: string) {
  try {
    await client.node.delete({
      where: {
        nodeID: nodeID,
      },
    });
    return 200;
  } catch (e) {
    console.error(e);
    return 400;
  }
}

export async function deleteEdgePrisma(edgeID: string) {
  try {
    await client.edge.delete({
      where: {
        edgeID: edgeID,
      },
    });
    return 200;
  } catch (e) {
    console.error(e);
    return 400;
  }
}

export async function createEdgePrisma(edge: MapEdgeType) {
  console.log(
    `Adding edge (ID: ${edge.edgeID}) between ${edge.startNodeID} and ${edge.endNodeID} to DB`,
  );
  try {
    await client.edge.create({
      data: edge,
    });
  } catch (e) {
    if (e instanceof Prisma.PrismaClientKnownRequestError) {
      console.log(`${loggingPrefix}Edge already exists. Skipping...`);
    } else {
      console.error(e);
    }
  }
  console.log(`Finished adding edge`);
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

export async function getDBNodes(): Promise<MapNodeType[] | null> {
  console.log(`${loggingPrefix}Getting nodes from DB`);
  let nodes: MapNodeType[] | null = null;
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

export async function getDBNodeByID(
  nodeID: string,
): Promise<MapNodeType | null> {
  console.log(`${loggingPrefix}Getting node of id ${nodeID} from DB`);
  let node: MapNodeType | null = null;
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
  employeeID: string,
  nodeID: string,
  serviceType: string,
  services: string,
): Promise<void> {
  console.log("Creating service request");

  try {
    const serviceJson = JSON.stringify(services);

    const createdServiceRequest = await client.serviceRequest.create({
      data: {
        employeeID: employeeID,
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

export async function getDBEdges(): Promise<MapEdgeType[] | null> {
  console.log(`${loggingPrefix}Getting edges from DB`);
  let edges: MapEdgeType[] | null = null;
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

export async function getDBEdgeByEdgeID(
  edgeID: string,
): Promise<MapEdgeType | null> {
  console.log(`${loggingPrefix}Getting edge by ID: ${edgeID}`);
  let edge: MapEdgeType | null = null;
  try {
    edge = await client.edge.findUnique({
      where: {
        edgeID: edgeID,
      },
    });
  } catch (e) {
    console.log(e);
  }

  if (edge == null) {
    console.log(`${loggingPrefix}No edge found with ID ${edgeID}`);
  } else {
    console.log(`${loggingPrefix}Edge found with ID ${edgeID}`);
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

export async function getServiceRequestFromDBByUserID(employeeID: string) {
  let request = null;
  try {
    request = await client.serviceRequest.findMany({
      where: {
        employeeID: employeeID,
      },
    });
  } catch (e) {
    console.error(e);
  }

  if (request == null) {
    console.log(
      `${loggingPrefix}No request found from users with userID ${employeeID}`,
    );
  } else {
    console.log(
      `${loggingPrefix}Request(s) found from users with userID ${employeeID}`,
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

export async function checkUserPatient(userID: number): Promise<boolean> {
  if (await checkUserID(userID)) {
    try {
      const user = await client.user.findUnique({
        where: { userID: userID },
        include: { Patient: true },
      });

      // Check if the user exists and has MedicalWorker association
      if (user && user.Patient.length > 0) {
        console.log(`${loggingPrefix}User ${userID} is a patient`);
        return true;
      } else {
        console.log(`${loggingPrefix}User ${userID} is not a patient`);
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

export async function checkUserAdmin(userID: number): Promise<boolean> {
  if (await checkUserID(userID)) {
    try {
      const user = await client.user.findUnique({
        where: { userID: userID },
        include: { Admin: true },
      });

      // Check if the user exists and has MedicalWorker association
      if (user && user.Admin.length > 0) {
        console.log(`${loggingPrefix}User ${userID} is an admin`);
        return true;
      } else {
        console.log(`${loggingPrefix}User ${userID} is not an admin`);
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

export async function createEmployeePrisma(employeeInfo: EmployeeFieldsType): Promise<boolean> {
    try {
      await client.employee.create({
        data: employeeInfo
      });
      return true;
    } catch(e){
      console.error(e);
      return false;
    }
}
