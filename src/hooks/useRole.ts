import { useUser } from '@clerk/nextjs'

export function useRole() {
  const { user } = useUser()

  const isAdmin = user?.publicMetadata.role === 'admin'

  return { isAdmin }
}
