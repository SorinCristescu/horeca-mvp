
import { IUser } from '@/types/index';
import { NextApiRequest, NextApiResponse} from "next"
import prisma from '@/lib/prisma'
import { hash } from "bcryptjs"


const handler = async (req: NextApiRequest, res: NextApiResponse) => {

    if (req.method === "POST") {
        if (!req.body) return res.status(400).json({ error: "Data is missing!" })

        const { fullName, email, password } = req.body

        const userExists = await prisma.user.findUnique({
            where: {
                email,
              }
        })

        if (userExists) {
            return res.status(409).json({ error: "User already exists!" })
        }
        else {
            const hashedPassword = await hash(password, 12)
            const result = await prisma.user.create({
                data: {
                  fullName,
                  email,
                  password: hashedPassword,
                },
              })
              return res.status(201).json(result)

        }
    }
    else {
        res.status(405).json({ error: "Method not allowed!" })
    }
}

export default handler
