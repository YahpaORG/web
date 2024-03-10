import { useQuery } from '@tanstack/react-query'
import { Member } from 'models/Member'

export const fetchProfilesQueryKey = 'fetchProfiles'

const fetchProfiles = async (): Promise<Member[]> => {
  const response = await fetch('/api/members')
  return await response.json()
}
export function useProfilesQuery() {
  return useQuery({
    queryKey: [fetchProfilesQueryKey],
    queryFn: fetchProfiles,
  })
}
