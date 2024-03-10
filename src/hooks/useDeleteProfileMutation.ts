import {
  UseMutationOptions,
  useMutation,
  useQueryClient,
} from '@tanstack/react-query'
import { fetchProfilesQueryKey } from './useProfilesQuery'

const deleteProfile = async (profileId: string) => {
  const response = await fetch(`/api/profiles/${profileId}`, {
    method: 'DELETE',
  })
  return response.json()
}

export function useDeleteProfileMutation(
  options?: UseMutationOptions<unknown, Error, unknown>
) {
  const queryClient = useQueryClient()
  return useMutation({
    ...options,
    mutationFn: deleteProfile,
    mutationKey: ['deleteProfile'],
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [fetchProfilesQueryKey] })
      queryClient.refetchQueries({ queryKey: [fetchProfilesQueryKey] })
    },
    onError: (error) => {
      console.log(error)
    },
  })
}
