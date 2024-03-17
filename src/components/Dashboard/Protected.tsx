import { useRole } from 'hooks/useRole'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { LoadingSpinner } from './LoadingSpinner'

/**
 * This component will verify if a User has the Admin role,
 * if they do not, then the user will be redirected to the dashboard
 *
 */
export function Protected({ children }: React.PropsWithChildren<unknown>) {
  const { isAdmin, isLoaded } = useRole()
  const router = useRouter()

  useEffect(() => {
    if (!isAdmin) {
      router.push('/dashboard')
    }
  }, [isAdmin, router])

  if (!isLoaded || !isAdmin) return <LoadingSpinner />

  return <>{children}</>
}
