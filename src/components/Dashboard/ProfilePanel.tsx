import { Box, TabPanel, Text } from '@chakra-ui/react'
import useProfileQuery from 'hooks/useProfileQuery'
import CreateProfile from './CreateProfile'
import ErrorPanel from './ErrorPanel'
import LoadingPanel from './LoadingPanel'

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
        <CreateProfile />
      )}
    </TabPanel>
  )
}
