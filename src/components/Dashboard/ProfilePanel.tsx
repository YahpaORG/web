import { Box, Button, Heading, Stack, Text } from '@chakra-ui/react'
import { useUserProfileQuery } from 'hooks/useUserProfileQuery'
import ErrorPanel from './ErrorPanel'
import LoadingPanel from './LoadingPanel'
import Link from 'next/link'
import { useUser } from '@clerk/nextjs'
import Section from 'components/Section'

export default function ProfilePanel() {
  const { user } = useUser()
  const { data: profile, error, isLoading } = useUserProfileQuery(user?.id)

  if (error) return <ErrorPanel />
  if (isLoading) return <LoadingPanel />

  return (
    <Section>
      {profile ? (
        <>
          <Text>
            Hello, {profile?.first_name} {profile?.last_name}
          </Text>
          <Box as="pre">{JSON.stringify(profile, null, 2)}</Box>
        </>
      ) : (
        <Stack alignItems="center" py={5}>
          <Heading fontSize="2xl">You do not have a profile yet.</Heading>
          <Box>
            <Button
              as={Link}
              colorScheme="green"
              href="/dashboard/create-profile"
            >
              Create Profile
            </Button>
          </Box>
        </Stack>
      )}
    </Section>
  )
}
