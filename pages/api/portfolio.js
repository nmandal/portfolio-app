import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();


export default async function handler(req, res) {
    if (req.method === 'POST') {
        return await addPortfolio(req, res);
    }
    else if (req.method == 'GET') {
        return await readPorfolios(req, res);
    }
    else {
        return res.status(405).json({ message: 'Method not allowed', success: false });
    }
}

async function readPorfolios(req, res) {
    const body = req.body;
    try {
        const portfolios = await prisma.portfolio.findMany();
        return res.status(200).json(portfolios, {success: true});
    } catch (error) {
        return res.status(500).json({error: "Error reading from database", success: false});
    }
}

async function addPortfolio(req, res) {
    const body = req.body;
    try {
        const newEntry = await prisma.portfolio.create({
            data: {
                date: body.date
            }
        });
        return res.status(200).json(newEntry, {success: true});
    } catch (error) {
        console.error("Request error", error);
        res.status(500).json({ error: "Error adding portfolio", success:false });
    }
}