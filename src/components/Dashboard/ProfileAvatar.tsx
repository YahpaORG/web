import { Stack, Avatar, Text } from '@chakra-ui/react'
import { useUser } from '@clerk/nextjs'

export function ProfileAvatar() {
  const { user } = useUser()
  return (
    <Stack alignItems="center" py={4}>
      <Avatar size="xl" name="My User" src={user?.imageUrl} />
      <Text>{user?.emailAddresses[0].emailAddress}</Text>
      <Text textTransform="capitalize">
        <Text as="span" fontWeight={600}>
          Role:
        </Text>{' '}
        {user?.publicMetadata.role as string}
      </Text>
    </Stack>
  )
}
