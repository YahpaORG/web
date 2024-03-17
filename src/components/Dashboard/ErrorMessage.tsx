import { Center, Heading, Stack, Box } from '@chakra-ui/react'
import { MdError } from 'react-icons/md'

export function ErrorMessage() {
  return (
    <Center p={12} flex={1}>
      <Stack alignItems="center">
        <Box as={MdError} size={64} color="red.400" />
        <Heading fontSize="2xl">Looks like there is an error</Heading>
      </Stack>
    </Center>
  )
}
