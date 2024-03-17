import { Box, Button, Heading, Stack, Text } from '@chakra-ui/react'
import { useQuery } from '@tanstack/react-query'
import Section from 'components/Section'
import Link from 'next/link'
import { getOneMember } from 'utils/api-helpers'
import { ErrorMessage } from './ErrorMessage'
import { LoadingSpinner } from './LoadingSpinner'
import { useUser } from '@clerk/nextjs'

export function MemberProfile() {
  const { user, isLoaded } = useUser()
  const {
    data: member,
    error,
    isLoading,
  } = useQuery({
    enabled: !!user?.id,
    queryKey: [getOneMember.name, user?.id],
    queryFn: () => getOneMember(user?.id),
  })

  if (error) return <ErrorMessage />
  if (isLoading || !isLoaded) return <LoadingSpinner />

  return (
    <Section>
      {member ? (
        <>
          <Text>
            Hello, {member?.first_name} {member?.last_name}
          </Text>
          <Box as="pre">{JSON.stringify(member, null, 2)}</Box>
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
