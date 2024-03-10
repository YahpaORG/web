import {
  UseMutationOptions,
  useMutation,
  useQueryClient,
} from '@tanstack/react-query'
import { fetchProfileQueryKey } from './useUserProfileQuery'

export type CreateProfileFormData = {
  first_name: string
  last_name: string
  occupation: string
  primary_address: string
  email_address: string
  phone_number: string
  website_address: string
  languages: string[]
  about_me: string
}

const createProfile = async (formData: CreateProfileFormData) => {
  const response = await fetch('/api/profiles', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(formData),
  })
  return response.json()
}

export default function useCreateProfileMutation(
  options?: UseMutationOptions<
    CreateProfileFormData,
    Error,
    CreateProfileFormData
  >
) {
  const queryClient = useQueryClient()
  return useMutation({
    ...options,
    mutationFn: createProfile,
    mutationKey: ['createProfile'],
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: [fetchProfileQueryKey] }),
  })
}
