import mongoose, { Model } from 'mongoose'

export interface Member {
  clerkId: string
  first_name: string
  last_name: string
  occupation: string
  primary_address: string
  email_address: string
  phone_number: string
  website_address: string
  languages: string[]
  about_me: string
  status: 'pending' | 'active' | 'rejected'
  created_at: Date
  updated_at?: Date
}

interface MemberDocument extends Member, mongoose.Document {}

const MemberSchema = new mongoose.Schema<MemberDocument>({
  clerkId: {
    type: String,
    required: true,
    unique: true,
  },
  first_name: {
    type: String,
    required: true,
  },
  last_name: {
    type: String,
    required: true,
  },
  occupation: {
    type: String,
    required: true,
  },
  primary_address: {
    type: String,
    required: true,
  },
  email_address: {
    type: String,
    required: true,
    unique: true,
  },
  phone_number: {
    type: String,
    required: true,
    unique: true,
  },
  website_address: {
    type: String,
    required: true,
  },
  languages: {
    type: [String],
    required: true,
  },
  about_me: {
    type: String,
    required: false,
  },
  status: {
    type: String,
    enum: ['pending', 'active', 'rejected'],
    default: 'pending',
  },
  created_at: {
    type: Date,
    default: new Date(),
  },
  updated_at: {
    type: Date,
    default: undefined,
  },
})

export const MemberModel: Model<MemberDocument> =
  mongoose.models.Members ||
  mongoose.model<MemberDocument>('Members', MemberSchema)
