import { useQuery } from '@tanstack/react-query'
import { Profile } from 'models/Profile'

export const fetchProfileQueryKey = 'fetchMyProfile'

async function fetchProfile(clerkId?: string): Promise<Profile> {
  const response = await fetch(`/api/profiles/${clerkId}`)
  return response.json()
}

export function useUserProfileQuery(userId?: string) {
  return useQuery({
    queryKey: [fetchProfileQueryKey, userId],
    queryFn: () => fetchProfile(userId),
    enabled: !!userId,
  })
}
