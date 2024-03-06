import { Box, Button, Heading, Stack } from '@chakra-ui/react'
import { useState } from 'react'
import CreateProfileForm from './CreateProfileForm'

export default function CreateProfile() {
  const [showForm, setShowForm] = useState<boolean>(false)

  return (
    <Box>
      {showForm ? (
        <CreateProfileForm />
      ) : (
        <Stack alignItems="center" py={5}>
          <Heading fontSize="2xl">You do not have a profile yet.</Heading>
          <Box>
            <Button colorScheme="green" onClick={() => setShowForm(true)}>
              Create Profile
            </Button>
          </Box>
        </Stack>
      )}
    </Box>
  )
}
