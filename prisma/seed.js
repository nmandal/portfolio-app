const { PrismaClient } = require('@prisma/client');
const { allocations, fundInformation, fundPrices, portfolios } = require('../data/seed_data.ts');
const prisma = new PrismaClient();

const load = async () => {
    try {
        await prisma.portfolio.deleteMany();
        console.log("Deleted records in portfolio table");

        await prisma.allocation.deleteMany();
        console.log("Deleted records in allocation table");

        await prisma.fund.deleteMany();
        console.log("Deleted records in fund table");

        await prisma.price.deleteMany();
        console.log("Deleted records in price table");

        await prisma.$queryRaw`ALTER TABLE Portfolio AUTO_INCREMENT = 1`;
        console.log("reset portfolio auto increment to 1");

        await prisma.$queryRaw`ALTER TABLE Allocation AUTO_INCREMENT = 1`;
        console.log("reset allocation auto increment to 1");

        await prisma.$queryRaw`ALTER TABLE Fund AUTO_INCREMENT = 1`;
        console.log("reset fund auto increment to 1");

        await prisma.$queryRaw`ALTER TABLE Price AUTO_INCREMENT = 1`;
        console.log("reset price auto increment to 1");

        await prisma.portfolio.createMany({
            data: portfolios
        });
        console.log("Added portfolio data");

        await prisma.allocation.createMany({
            data: allocations
        });
        console.log("Added allocation data");

        await prisma.fund.createMany({
            data: fundInformation
        });
        console.log("Added fund data");

        await prisma.price.createMany({
            data: fundPrices
        });
        console.log("Added price data");
    } catch (e) {
        console.error(e);
        process.exit(1);
    } finally {
        await prisma.$disconnect();
    };
}

load();