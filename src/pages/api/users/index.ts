import { clerkClient, getAuth } from '@clerk/nextjs/server'
import { NextApiRequest, NextApiResponse } from 'next'
import dbConnect from 'utils/dbConnect'

export default async function profilesHandler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const { userId } = getAuth(req)
    await dbConnect()

    if (!userId) return res.status(401).json({ message: 'Unauthorized user' })

    switch (req.method) {
      case 'GET': {
        try {
          const users = await clerkClient.users.getUserList()
          res.status(200).json(users)
        } catch (error) {
          res.status(400).json({ success: false, error })
        }
        break
      }
    }
  } catch (e) {
    console.error(e)
  }
}
