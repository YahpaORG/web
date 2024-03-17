import { Stack } from '@chakra-ui/react'
import { useRole } from 'hooks/useRole'

import { Text } from '@chakra-ui/react'
import Link, { LinkProps } from 'next/link'
import { useRouter } from 'next/router'

export function DashboardLink({
  children,
  ...props
}: React.PropsWithChildren<LinkProps>) {
  const router = useRouter()
  const isActiveLink = router.asPath === props.href

  return (
    <Link {...props}>
      <Text
        p={2}
        fontWeight={600}
        borderRadius="lg"
        textAlign="center"
        background={isActiveLink ? 'gray.100' : undefined}
        _hover={{ background: 'gray.200' }}
      >
        {children}
      </Text>
    </Link>
  )
}

export function DashboardLinks() {
  const { isAdmin } = useRole()
  return (
    <Stack as="nav">
      <Stack flexDirection="column" gap={2}>
        <DashboardLink href="/dashboard">My Profile</DashboardLink>
        {isAdmin && (
          <DashboardLink href="/dashboard/members">Members</DashboardLink>
        )}
      </Stack>
    </Stack>
  )
}
