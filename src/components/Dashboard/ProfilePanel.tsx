import { Box, Button, Heading, Stack, TabPanel, Text } from '@chakra-ui/react'
import useProfileQuery from 'hooks/useProfileQuery'
import ErrorPanel from './ErrorPanel'
import LoadingPanel from './LoadingPanel'
import Link from 'next/link'

export default function ProfilePanel() {
  const { data: profile, error, isLoading } = useProfileQuery()

  if (error) return <ErrorPanel />
  if (isLoading) return <LoadingPanel />

  return (
    <TabPanel>
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
    </TabPanel>
  )
}
