import { getSession } from "@auth0/nextjs-auth0"
import { NextApiRequest, NextApiResponse } from "next"

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    const session = getSession(req, res)
    res.status(200).json({
        success: true,
        data: session
    })
}

export default handler