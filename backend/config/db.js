const { PrismaClient } = require('@prisma/client');

//initialisation instance unique prisma
const prisma = new PrismaClient();

module.exports = prisma;