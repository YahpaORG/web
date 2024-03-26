import { getAuth } from '@clerk/nextjs/server'
import { MemberModel } from 'models/Member'
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
          const limit = parseInt(req?.query?.limit as string, 10) ?? 10
          const page = parseInt(req?.query?.page as string, 10)
          const skip = (page - 1) * limit

          const members = await MemberModel.find().skip(skip).limit(limit)

          const totalCount = await MemberModel.countDocuments()
          const totalPages = Math.ceil(totalCount / limit)

          res.status(200).json({ members, totalCount, totalPages })
        } catch (error) {
          res.status(400).json({ success: false, error })
        }
        break
      }

      case 'POST': {
        try {
          const body = req.body
          const profile = await MemberModel.create({
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
