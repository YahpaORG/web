import { useQuery } from '@tanstack/react-query'
import { Profile } from 'models/Profile'

export const fetchProfilesQueryKey = 'fetchProfiles'

const fetchProfiles = async (): Promise<Profile[]> => {
  const response = await fetch('/api/profiles')
  return await response.json()
}
export function useProfilesQuery() {
  return useQuery({
    queryKey: [fetchProfilesQueryKey],
    queryFn: fetchProfiles,
  })
}
