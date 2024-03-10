import { useUser } from '@clerk/nextjs'

export function useRole() {
  const { user, isLoaded } = useUser()

  const isAdmin = user?.publicMetadata.role === 'admin'

  return { isAdmin, isLoaded }
}
