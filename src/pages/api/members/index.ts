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
          const { page = 1, limit = 10 } = req.query
          const skip =
            (parseInt(page as string, 10) - 1) * parseInt(limit as string, 10)

          const members = await MemberModel.find()
            .skip(skip)
            .limit(parseInt(limit as string, 10))

          const totalCount = await MemberModel.countDocuments()
          const totalPages = Math.ceil(
            totalCount / parseInt(limit as string, 10)
          )

          console.log('total profiles')

          res.status(200).json({ members, totalCount, totalPages, skip })
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
