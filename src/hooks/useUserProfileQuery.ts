import { useQuery } from '@tanstack/react-query'
import { Member } from 'models/Member'

export const fetchProfileQueryKey = 'fetchMyProfile'

async function fetchProfile(clerkId?: string): Promise<Member> {
  const response = await fetch(`/api/members/${clerkId}`)
  return response.json()
}

export function useUserProfileQuery(userId?: string) {
  return useQuery({
    queryKey: [fetchProfileQueryKey, userId],
    queryFn: () => fetchProfile(userId),
    enabled: !!userId,
  })
}
