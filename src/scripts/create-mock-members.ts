import mongoose from 'mongoose'
import dotenv from 'dotenv'
import { faker } from '@faker-js/faker'
import { MemberModel } from '../models/Member'

dotenv.config({ path: '.env.local' })

const MONGO_URI = process.env.MONGODB_URI

const connectDB = async () => {
  try {
    await mongoose.connect(MONGO_URI as string)
    console.log('Connected to DB')
    await createMockMembers(50)
  } catch (error) {
    console.error(error)
  } finally {
    await mongoose.disconnect()
    console.log('Disconnected from DB')
  }
}

async function createMockMembers(count: number) {
  const mockMembers = []
  for (let i = 0; i < count; i++) {
    const member = {
      clerkId: faker.string.uuid(),
      first_name: faker.person.firstName(),
      last_name: faker.person.lastName(),
      occupation: faker.person.jobTitle(),
      primary_address: faker.location.streetAddress(),
      phone_number: faker.phone.number(),
      email_address: faker.internet.email(),
      website_address: faker.internet.url(),
      languages: faker.helpers.arrayElements([
        'English',
        'Français',
        '简体中文',
        'Tiếng Việt',
      ]),
      status: faker.helpers.arrayElement(['pending', 'active', 'rejected']),
      created_at: faker.date.recent(),
    }
    mockMembers.push(member)
  }

  await MemberModel.insertMany(mockMembers)
  console.log(`Successfully created ${mockMembers.length} mock profiles`)
}

connectDB()
