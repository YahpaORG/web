import { getAuth } from '@clerk/nextjs/server'
import { ProfileModel } from 'models/Profile'
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
          const profiles = await ProfileModel.find({})
          res.status(200).json(profiles)
        } catch (error) {
          res.status(400).json({ success: false, error })
        }
        break
      }

      case 'POST': {
        try {
          const body = req.body
          const profile = await ProfileModel.create({
            clerkId: userId,
            ...body,
          })
          return res.status(201).json({ success: true, data: profile })
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
