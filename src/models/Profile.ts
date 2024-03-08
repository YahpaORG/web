import mongoose, { Model } from 'mongoose'

export interface Profile extends mongoose.Document {
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
}

const ProfileSchema = new mongoose.Schema<Profile>({
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
    default: 'pending',
  },
})

export const ProfileModel: Model<Profile> =
  mongoose.models.Profiles || mongoose.model<Profile>('Profiles', ProfileSchema)
