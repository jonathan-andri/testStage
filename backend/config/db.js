import { PrismaClient } from "@prisma/client";

//initialisation instance unique prisma
const prisma = new PrismaClient();

module.exports = prisma;