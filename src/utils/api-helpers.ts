import { Member } from 'models/Member'
import type { CreateMemberInput } from 'types/create-form'

function getErrorMessage(error: unknown) {
  if (error instanceof Error) return error.message
  return String(error)
}

export async function fetcher<T>(
  url: string,
  options?: RequestInit
): Promise<T> {
  try {
    const response = await fetch(url, options)

    if (!response.ok) {
      throw new Error(`HTTP error: Status: ${response.status}`)
    }

    const data: T = await response.json()
    return data
  } catch (error) {
    const message = getErrorMessage(error)
    throw new Error(`Error fetching data: ${message}`)
  }
}

export async function getOneMember(clerkId?: string) {
  const response = await fetcher<Member>(`/api/members/${clerkId}`)
  return response
}

export async function getAllMembers(): Promise<Member[]> {
  const response = await fetch('/api/members')
  return await response.json()
}

export async function createMember(input: CreateMemberInput) {
  const response = await fetch('/api/members', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(input),
  })
  return response.json()
}

export async function deleteMember(clerkId: string) {
  const response = await fetch(`/api/members/${clerkId}`, {
    method: 'DELETE',
  })
  return response.json()
}
