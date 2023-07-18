import prisma from '@/lib/prisma';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { method, body } = req;

    switch (method) {
        case "GET":
            const venues = await prisma.venue.findMany()
            res.status(200).json(venues);
            break;
        case "POST":
            const created = await prisma.venue.create({
                data: body
            })
            res.status(201).json({message: "Venue was created!", created});  
            break;
        default:
            res.setHeader("Allow", ["GET", "POST"]);
            res.status(405).end(`Method ${method} Not Allowed`);
            break;
        }
    }