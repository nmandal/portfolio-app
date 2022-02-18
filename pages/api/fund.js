import { PrismaClient } from '@prisma/client';
// import { fund_information } from 'data/fund_information';

const prisma = new PrismaClient();


export default async function handler(req, res) {
    if (req.method === 'POST') {
        return
        // return await addFund(req, res);
    }
    else if (req.method == 'GET') {
        return await readFunds(req, res);
    }
    else {
        return res.status(405).json({ message: 'Method not allowed', success: false });
    }
}

async function readFunds(req, res) {
    const body = req.body;
    try {
        const funds = await prisma.fund.findMany();
        return res.status(200).json(funds, {success: true});
    } catch (error) {
        return res.status(500).json({error: "Error reading from database", success: false});
    }
}

// async function addFund(req, res) {
//     const body = req.body;
//     let fundSymbol = body.symbol
//     const { pid } = req.query
//     console.log(pid)
//     try {
//         fetch(`https://interview-api-proxy.herokuapp.com/v1/last/stocks/${body.symbol}`)
//         .then(res => {
//             console.log(res)
//             let data = res.data
//             console.log(data)
//             let fundPrice = data.last.price

//             // let fund = fund_information.find((f) => f.symbol === fundSymbol);
//             // if (fundInformation) { 
//             //   let fundName = fund.name || "";
//             //   let fundAssetClass = fund.assetClass || "";

//             // }
    
//             const newEntry = prisma.fund.create({
//                 data: {
//                     name: fundName,
//                     symbol: symbol,
//                     assetClass: fundAssetClass,
//                     price: fundPrice,
//                     portfolio: pid
//                 }
//             });
//         })

//         return res.status(200).json(newEntry, {success: true});
//     } catch (error) {
//         console.error("Request error", error);
//         res.status(500).json({ error: "Error adding portfolio", success:false });
//     }
// }