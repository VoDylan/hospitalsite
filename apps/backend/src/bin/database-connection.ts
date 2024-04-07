import { PrismaClient } from "database";

const client = new PrismaClient();

export default client;

// Prisma automatically closes on shutdown
